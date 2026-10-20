const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createServer } = require("../server");
const { createTestAuthStore } = require("./helpers/auth");

async function setup(t) {
  const dbDir = await fs.mkdtemp(path.join(os.tmpdir(), "stadionhopper-checkins-"));
  await fs.cp(path.join(__dirname, "fixtures"), dbDir, { recursive: true });
  await fs.writeFile(path.join(dbDir, "Check_ins.json"), "[]\n");
  const server = createServer({ dbDir, authStore: createTestAuthStore() });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });
  return { dbDir, base: "http://127.0.0.1:" + server.address().port };
}

async function login(base, username, password) {
  const response = await fetch(base + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  assert.equal(response.status, 200);
  return { Cookie: response.headers.get("set-cookie").split(";")[0] };
}

test("invalid or duplicate check-ins never create extra persisted rows", async t => {
  const { dbDir, base } = await setup(t);
  const headers = await login(base, "Testbruker", "test-only-password-one");
  const post = match_id => fetch(base + "/api/check-ins", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ match_id })
  });

  assert.equal((await post(999999)).status, 404);
  assert.equal((await post("not-a-match")).status, 400);
  assert.equal((await post(-1)).status, 400);
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(dbDir, "Check_ins.json"), "utf8")), []);

  assert.equal((await post(100)).status, 201);
  assert.equal((await post(100)).status, 409);
  const saved = JSON.parse(await fs.readFile(path.join(dbDir, "Check_ins.json"), "utf8"));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].user_id, 1);
  assert.equal(saved[0].match_id, 100);
});

test("check-in history stays isolated between users and empty history is an array", async t => {
  const { base } = await setup(t);
  const first = await login(base, "Testbruker", "test-only-password-one");
  const second = await login(base, "Testbruker2", "test-only-password-two");

  const empty = await fetch(base + "/api/check-ins", { headers: second });
  assert.equal(empty.status, 200);
  assert.deepEqual((await empty.json()).check_ins, []);

  const created = await fetch(base + "/api/check-ins", {
    method: "POST",
    headers: { ...first, "Content-Type": "application/json" },
    body: JSON.stringify({ match_id: 100, username: "Testbruker2" })
  });
  assert.equal(created.status, 201);
  assert.equal((await created.json()).check_in.user_id, 1);

  const firstHistory = await fetch(base + "/api/check-ins", { headers: first });
  const secondHistory = await fetch(base + "/api/check-ins", { headers: second });
  assert.equal((await firstHistory.json()).check_ins.length, 1);
  assert.deepEqual((await secondHistory.json()).check_ins, []);
});
