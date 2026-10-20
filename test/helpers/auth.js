const { createAuthStore } = require("../../auth");

// These are disposable test-only credentials, not real user secrets.
function createTestAuthStore(options = {}) {
  return createAuthStore({
    ...options,
    users: [
      { username: "Testbruker", password: "test-only-password-one" },
      { username: "Testbruker2", password: "test-only-password-two" }
    ]
  });
}

module.exports = { createTestAuthStore };
