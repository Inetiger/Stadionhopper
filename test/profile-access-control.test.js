const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { createServer } = require("../server");
const { createAuthStore } = require("../auth");

test("profile and history access follows the server session and rejects expired sessions", async t => {
  let now = 10_000;
  const authStore = createAuthStore({
    now: () => now,
    ttlMs: 1000,
    users: [{ username: "Testbruker", password: "test-only-password" }]
  });
  const session = authStore.createSession({ username: "Testbruker" });
  const server = createServer({
    dbDir: path.join(__dirname, "fixtures"),
    authStore
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = "http://127.0.0.1:" + server.address().port;
  const headers = { Cookie: "stadionhopper_session=" + session.token };

  const profile = await fetch(base + "/api/profile?username=someone-else", { headers });
  assert.equal(profile.status, 200);
  assert.deepEqual(await profile.json(), {
    user: { user_id: 1, username: "Testbruker" }
  });
  const history = await fetch(base + "/api/check-ins?username=someone-else", { headers });
  assert.equal(history.status, 200);
  assert.deepEqual((await history.json()).check_ins, []);

  now = 11_000;
  assert.equal((await fetch(base + "/api/profile", { headers })).status, 401);
  assert.equal((await fetch(base + "/api/check-ins", { headers })).status, 401);
});

test("profile and history never expose data without a valid session", async t => {
  const server = createServer({ dbDir: path.join(__dirname, "fixtures") });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = "http://127.0.0.1:" + server.address().port;

  for (const cookie of [undefined, "stadionhopper_session=invalid-token"]) {
    const headers = cookie ? { Cookie: cookie } : {};
    assert.equal((await fetch(base + "/api/profile?username=Testbruker", { headers })).status, 401);
    assert.equal((await fetch(base + "/api/check-ins?username=Testbruker", { headers })).status, 401);
  }
});
