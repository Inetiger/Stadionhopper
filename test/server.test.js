const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const SERVER = path.join(ROOT, "server.js");
const template = (key, rows) => JSON.stringify(rows, null, 2) + "\n";

async function fixture() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "stadionhopper-test-"));
  const files = {
    "Matches.json": [{ match_id: 1, match_date: "2026-10-10", status: "scheduled", stadium_id: 5, club_id: 2 }],
    "Check_ins.json": [],
    "Clubs.json": [{ club_id: 2, name: "Molde FK", type: "football" }],
    "Stadiums.json": [{ stadium_id: 5, name: "Aker Stadion", adress: "Molde" }],
    "Users.json": [{ user_id: 3, username: "tester", created_at: "2026-01-01" }],
    "Posts.json": [{ post_id: 1, content: "Kampdag!", created_at: "2026-10-01T10:00:00Z", user_id: 3 }],
    "Events.json": []
  };
  for (const [name, rows] of Object.entries(files)) await fs.writeFile(path.join(dir, name), template(name, rows));
  return dir;
}
async function startServer(dbDir) {
  const child = spawn(process.execPath, [SERVER], {
    env: { ...process.env, PORT: "0", STADIONHOPPER_DB_DIR: dbDir },
    cwd: ROOT, stdio: ["ignore", "pipe", "pipe"]
  });
  // Use a separate test server instance with an ephemeral port, rather than racing for a fixed port.
  child.kill();
  const { createServer } = require(SERVER);
  const server = createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { server, base: "http://127.0.0.1:" + server.address().port };
}
test("database templates with None and trailing commas are normalized", async () => {
  const { parseTable } = require(SERVER);
  assert.deepEqual(parseTable('[{"id": None, "name": None,}]', "fixture"), []);
  assert.deepEqual(parseTable('[{"id": 2, "name": "A",}]', "fixture"), [{ id: 2, name: "A" }]);
});
test("matches endpoint joins clubs and stadiums; unknown id returns 404", async t => {
  const dir = await fixture();
  const original = process.env.STADIONHOPPER_DB_DIR;
  process.env.STADIONHOPPER_DB_DIR = dir;
  // DB_DIR is evaluated at require time, so clear the module cache for each isolated fixture.
  delete require.cache[require.resolve(SERVER)];
  const { createServer } = require(SERVER);
  const server = createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await fs.rm(dir, { recursive: true, force: true }); if (original === undefined) delete process.env.STADIONHOPPER_DB_DIR; else process.env.STADIONHOPPER_DB_DIR = original; delete require.cache[require.resolve(SERVER)]; });
  const base = "http://127.0.0.1:" + server.address().port;
  const response = await fetch(base + "/api/matches");
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.matches[0].club_name, "Molde FK");
  assert.equal(data.matches[0].stadium_name, "Aker Stadion");
  assert.equal((await fetch(base + "/api/matches/999")).status, 404);
});
test("check-in validates references, rejects duplicates, persists, and deletes", async t => {
  const dir = await fixture();
  const original = process.env.STADIONHOPPER_DB_DIR;
  process.env.STADIONHOPPER_DB_DIR = dir;
  delete require.cache[require.resolve(SERVER)];
  const { createServer } = require(SERVER);
  const server = createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await fs.rm(dir, { recursive: true, force: true }); if (original === undefined) delete process.env.STADIONHOPPER_DB_DIR; else process.env.STADIONHOPPER_DB_DIR = original; delete require.cache[require.resolve(SERVER)]; });
  const base = "http://127.0.0.1:" + server.address().port;
  const bad = await fetch(base + "/api/check-ins", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ match_id: 999, checked_in_at: "2026-10-01T12:00:00Z" }) });
  assert.equal(bad.status, 400);
  const created = await fetch(base + "/api/check-ins", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ match_id: 1, checked_in_at: new Date().toISOString() }) });
  assert.equal(created.status, 201);
  const checkIn = (await created.json()).check_in;
  assert.equal(checkIn.user_id, null);
  const duplicate = await fetch(base + "/api/check-ins", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ match_id: 1, checked_in_at: new Date().toISOString() }) });
  assert.equal(duplicate.status, 409);
  const saved = JSON.parse(await fs.readFile(path.join(dir, "Check_ins.json"), "utf8"));
  assert.equal(saved.length, 1);
  assert.equal((await fetch(base + "/api/check-ins/" + checkIn.check_in_id, { method: "DELETE" })).status, 200);
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(dir, "Check_ins.json"), "utf8")), []);
});
test("posts endpoint adds author and filters empty template rows", async t => {
  const dir = await fixture();
  const original = process.env.STADIONHOPPER_DB_DIR;
  process.env.STADIONHOPPER_DB_DIR = dir;
  delete require.cache[require.resolve(SERVER)];
  const { createServer } = require(SERVER);
  const server = createServer();
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await fs.rm(dir, { recursive: true, force: true }); if (original === undefined) delete process.env.STADIONHOPPER_DB_DIR; else process.env.STADIONHOPPER_DB_DIR = original; delete require.cache[require.resolve(SERVER)]; });
  const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/posts");
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.posts.length, 1);
  assert.equal(data.posts[0].author, "tester");
});
