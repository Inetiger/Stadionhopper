const { randomBytes, timingSafeEqual, scryptSync } = require("node:crypto");

const SESSION_TTL_MS = 2 * 60 * 60 * 1000;
const HASH_BYTES = 64;

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  if (a.length !== b.length) {
    timingSafeEqual(Buffer.alloc(32), Buffer.alloc(32));
    return false;
  }
  return timingSafeEqual(a, b);
}

function hashPassword(password, salt) {
  return scryptSync(password, salt, HASH_BYTES).toString("hex");
}

function normalizeUsers(users) {
  if (!Array.isArray(users)) throw new TypeError("Test users must be an array.");
  return users.map(user => {
    if (!user || typeof user.username !== "string" || !user.username.trim()) {
      throw new TypeError("Each test user needs a username.");
    }
    if (typeof user.password === "string") {
      const salt = randomBytes(16).toString("hex");
      return {
        username: user.username.trim(),
        salt,
        passwordHash: hashPassword(user.password, salt)
      };
    }
    if (typeof user.salt === "string" && /^[a-f0-9]{32,128}$/i.test(user.salt) &&
        typeof user.passwordHash === "string" && /^[a-f0-9]{128}$/i.test(user.passwordHash)) {
      return { username: user.username.trim(), salt: user.salt, passwordHash: user.passwordHash };
    }
    throw new TypeError("Each test user needs a password for test injection or a scrypt salt/hash.");
  });
}

function loadConfiguredUsers() {
  const configured = process.env.STADIONHOPPER_TEST_USERS;
  if (!configured) return [];
  let users;
  try {
    users = JSON.parse(configured);
  } catch {
    throw new Error("STADIONHOPPER_TEST_USERS must be a JSON array of hashed test users.");
  }
  return normalizeUsers(users);
}

function createAuthStore({ now = () => Date.now(), ttlMs = SESSION_TTL_MS, users = loadConfiguredUsers() } = {}) {
  const credentials = normalizeUsers(users);
  const sessions = new Map();

  function purgeExpired() {
    const current = now();
    for (const [token, session] of sessions) {
      if (session.expiresAt <= current) sessions.delete(token);
    }
  }

  function authenticate(username, password) {
    if (typeof username !== "string" || typeof password !== "string" ||
        !username.trim() || username.trim().length > 40 || password.length > 1024) return null;
    const normalized = username.trim().toLowerCase();
    const candidate = credentials.find(user => user.username.toLowerCase() === normalized);
    if (!candidate) return null;
    const suppliedHash = hashPassword(password, candidate.salt);
    return safeEqual(suppliedHash, candidate.passwordHash)
      ? { username: candidate.username }
      : null;
  }

  function createSession(user) {
    purgeExpired();
    const token = randomBytes(32).toString("hex");
    sessions.set(token, { username: user.username, expiresAt: now() + ttlMs });
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

module.exports = { SESSION_TTL_MS, createAuthStore, hashPassword };
