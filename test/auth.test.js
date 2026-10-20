const test = require("node:test");
const assert = require("node:assert/strict");
const { createAuthStore, SESSION_TTL_MS } = require("../auth");
const { createTestAuthStore } = require("./helpers/auth");

test("prototype credentials authenticate only known fictional accounts", () => {
  const auth = createTestAuthStore();
  assert.deepEqual(auth.authenticate("Testbruker", "test-only-password-one"), { username: "Testbruker" });
  assert.deepEqual(auth.authenticate("testbruker2", "test-only-password-two"), { username: "Testbruker2" });
  assert.equal(auth.authenticate("Testbruker", "wrong"), null);
  assert.equal(auth.authenticate("unknown", "test-only-password-one"), null);
  assert.equal(auth.authenticate("", "test-only-password-one"), null);
});

test("sessions use unguessable tokens and expire automatically", () => {
  let now = 1000;
  const auth = createTestAuthStore({ now: () => now, ttlMs: 5000 });
  const created = auth.createSession({ username: "Testbruker" });
  assert.match(created.token, /^[a-f0-9]{64}$/);
  assert.equal(created.expiresAt, 6000);
  assert.deepEqual(auth.getSession(created.token), { username: "Testbruker", expiresAt: 6000 });
  now = 6000;
  assert.equal(auth.getSession(created.token), null);
  assert.equal(auth.destroySession(created.token), undefined);
  assert.equal(SESSION_TTL_MS, 2 * 60 * 60 * 1000);
});

test("default auth store does not contain implicit public accounts", () => {
  assert.equal(createAuthStore().authenticate("Testbruker", "test-only-password-one"), null);
});
