const test = require("node:test");
const assert = require("node:assert/strict");
const { createAuthStore, SESSION_TTL_MS } = require("../auth");

test("prototype credentials authenticate only known fictional accounts", () => {
  const auth = createAuthStore();
  assert.deepEqual(auth.authenticate("Testbruker", "hopper123"), { username: "Testbruker" });
  assert.deepEqual(auth.authenticate("testbruker2", "hopper456"), { username: "Testbruker2" });
  assert.equal(auth.authenticate("Testbruker", "wrong"), null);
  assert.equal(auth.authenticate("unknown", "hopper123"), null);
  assert.equal(auth.authenticate("", "hopper123"), null);
});

test("sessions use unguessable tokens and expire automatically", () => {
  let now = 1000;
  const auth = createAuthStore({ now: () => now, ttlMs: 5000 });
  const created = auth.createSession({ username: "Testbruker" });
  assert.match(created.token, /^[a-f0-9]{64}$/);
  assert.equal(created.expiresAt, 6000);
  assert.deepEqual(auth.getSession(created.token), { username: "Testbruker", expiresAt: 6000 });
  now = 6000;
  assert.equal(auth.getSession(created.token), null);
  assert.equal(auth.destroySession(created.token), undefined);
  assert.equal(SESSION_TTL_MS, 2 * 60 * 60 * 1000);
});
