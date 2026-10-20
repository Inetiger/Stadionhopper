const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { createServer } = require("../server");
const { createTestAuthStore } = require("./helpers/auth");

async function startServer(t) {
  const server = createServer({
    dbDir: path.join(__dirname, "fixtures"),
    authStore: createTestAuthStore()
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return "http://127.0.0.1:" + server.address().port;
}

test("login rejects invalid credentials without echoing credentials or revealing account state", async t => {
  const base = await startServer(t);
  for (const body of [
    { username: "Testbruker", password: "wrong-secret-value" },
    { username: "does-not-exist", password: "wrong-secret-value" },
    { username: "", password: "wrong-secret-value" },
    { username: "Testbruker" }
  ]) {
    const response = await fetch(base + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    assert.equal(response.status, 401);
    const text = await response.text();
    assert.match(text, /Ugyldig brukernavn eller passord/);
    assert.doesNotMatch(text, /wrong-secret-value|does-not-exist/);
    assert.equal(response.headers.get("set-cookie"), null);
  }
});

test("successful login creates an HttpOnly session without returning the token", async t => {
  const base = await startServer(t);
  const response = await fetch(base + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "Testbruker", password: "test-only-password-one" })
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    user: { user_id: 1, username: "Testbruker" }
  });
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie, /^stadionhopper_session=/);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Max-Age=7200/);
  assert.doesNotMatch(cookie, /test-only-password-one/);
});

test("session endpoint restores the logged-in user and logout invalidates the session", async t => {
  const base = await startServer(t);
  const login = await fetch(base + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "Testbruker2", password: "test-only-password-two" })
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  const headers = { Cookie: cookie };

  const session = await fetch(base + "/api/session", { headers });
  assert.equal(session.status, 200);
  assert.deepEqual((await session.json()).user, { user_id: 2, username: "Testbruker2" });

  const logout = await fetch(base + "/api/logout", { method: "POST", headers });
  assert.equal(logout.status, 200);
  assert.match(logout.headers.get("set-cookie"), /Max-Age=0/);
  assert.equal((await fetch(base + "/api/session", { headers })).status, 401);
});

test("malformed login JSON returns a generic client error", async t => {
  const base = await startServer(t);
  const response = await fetch(base + "/api/login", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{"
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Ugyldig JSON i forespørselen." });
});
