const test = require("node:test");
const assert = require("node:assert/strict");
const { createAuthStore, hashPassword } = require("../auth");

test("rejects missing, non-string, blank and oversized credentials", () => {
  const auth = createAuthStore({
    users: [{ username: "KnownUser", password: "test-only-password" }]
  });
  for (const [username, password] of [
    [undefined, "test-only-password"],
    ["KnownUser", undefined],
    ["", "test-only-password"],
    ["   ", "test-only-password"],
    ["x".repeat(41), "test-only-password"],
    ["KnownUser", "x".repeat(1025)],
    [42, "test-only-password"],
    ["KnownUser", { value: "test-only-password" }]
  ]) {
    assert.equal(auth.authenticate(username, password), null);
  }
});

test("configured credentials use a salt and scrypt hash, not a stored plaintext password", () => {
  const salt = "0123456789abcdef0123456789abcdef";
  const password = "test-only-password";
  const passwordHash = hashPassword(password, salt);
  const auth = createAuthStore({
    users: [{ username: "KnownUser", salt, passwordHash }]
  });
  assert.deepEqual(auth.authenticate("knownuser", password), { username: "KnownUser" });
  assert.equal(auth.authenticate("KnownUser", "incorrect"), null);
  assert.equal(JSON.stringify(auth), "{}");
  assert.doesNotMatch(JSON.stringify({ salt, passwordHash }), /test-only-password/);
});

test("malformed configured user records fail closed", () => {
  assert.throws(() => createAuthStore({ users: [{ username: "KnownUser" }] }), /scrypt salt\/hash/);
  assert.throws(() => createAuthStore({ users: [{ username: "" , password: "x" }] }), /username/);
  assert.throws(() => createAuthStore({ users: "not-an-array" }), /array/);
});

test("malformed environment configuration does not silently enable accounts", () => {
  const previous = process.env.STADIONHOPPER_TEST_USERS;
  try {
    process.env.STADIONHOPPER_TEST_USERS = "{bad-json";
    assert.throws(() => createAuthStore(), /must be a JSON array/);
    process.env.STADIONHOPPER_TEST_USERS = "";
    assert.equal(createAuthStore().authenticate("Testbruker", "anything"), null);
  } finally {
    if (previous === undefined) delete process.env.STADIONHOPPER_TEST_USERS;
    else process.env.STADIONHOPPER_TEST_USERS = previous;
  }
});
