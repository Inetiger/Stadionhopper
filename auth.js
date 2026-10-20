const { randomBytes, timingSafeEqual } = require("node:crypto");

// Kun fiktive kontoer for lokal prototype. Ikke bruk disse legitimasjonene i produksjon.
const TEST_USERS = Object.freeze([
  { username: "Testbruker", password: "hopper123" },
  { username: "Testbruker2", password: "hopper456" }
]);

const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  if (a.length !== b.length) {
    // Utfør en sammenligning også ved ulik lengde før vi avviser.
    timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
    return false;
  }
  return timingSafeEqual(a, b);
}

function createAuthStore({ now = () => Date.now(), ttlMs = SESSION_TTL_MS } = {}) {
  const sessions = new Map();

  function purgeExpired() {
    const current = now();
    for (const [token, session] of sessions) {
      if (session.expiresAt <= current) sessions.delete(token);
    }
  }

  function authenticate(username, password) {
    if (typeof username !== "string" || typeof password !== "string") return null;
    const normalized = username.trim().toLowerCase();
    const candidate = TEST_USERS.find(user => user.username.toLowerCase() === normalized);
    if (!candidate || !safeEqual(password, candidate.password)) return null;
    return { username: candidate.username };
  }

  function createSession(user) {
    purgeExpired();
    const token = randomBytes(32).toString("hex");
    sessions.set(token, {
      username: user.username,
      expiresAt: now() + ttlMs
    });
    return { token, expiresAt: sessions.get(token).expiresAt };
  }

  function getSession(token) {
    if (typeof token !== "string" || !token) return null;
    purgeExpired();
    const session = sessions.get(token);
    if (!session) return null;
    return { username: session.username, expiresAt: session.expiresAt };
  }

  function destroySession(token) {
    if (typeof token === "string") sessions.delete(token);
  }

  return { authenticate, createSession, getSession, destroySession, purgeExpired };
}

module.exports = { TEST_USERS, SESSION_TTL_MS, createAuthStore };
