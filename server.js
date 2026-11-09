const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const { createAuthStore, SESSION_TTL_MS } = require("./auth");

const DEFAULT_DB_DIR = path.join(__dirname, "Database");

function parseTable(source, filename = "data") {
  const normalized = source
    .replace(/\bNone\b/g, "null")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/,\s*([}\]])/g, "$1");
  const rows = JSON.parse(normalized);
  if (!Array.isArray(rows)) throw new Error(filename + " must contain a JSON array");
  return rows.filter(row => row && typeof row === "object" &&
    Object.values(row).some(value => value !== null && value !== ""));
}

async function readTable(dbDir, filename) {
  const fullPath = path.join(dbDir, filename);
  return parseTable(await fs.readFile(fullPath, "utf8"), filename);
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(body));
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const item of header.split(";")) {
    const separator = item.indexOf("=");
    if (separator < 0) continue;
    if (item.slice(0, separator).trim() === name) {
      try { return decodeURIComponent(item.slice(separator + 1).trim()); } catch { return null; }
    }
  }
  return null;
}

function sessionCookie(token, req, maxAge = Math.floor(SESSION_TTL_MS / 1000)) {
  const secure = Boolean(req.socket.encrypted);
  return "stadionhopper_session=" + encodeURIComponent(token) +
    "; Path=/; HttpOnly; SameSite=Lax; Max-Age=" + maxAge + (secure ? "; Secure" : "");
}

function clearSessionCookie(req) {
  return "stadionhopper_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0" +
    (req.socket.encrypted ? "; Secure" : "");
}

async function getMatches(dbDir) {
  const [originalMatches, originalClubs, originalStadiums, community] = await Promise.all([
    readTable(dbDir, "Matches.json"),
    readTable(dbDir, "Clubs.json"),
    readTable(dbDir, "Stadiums.json"),
    readCommunity(dbDir)
  ]);
  const matches = originalMatches.concat(community.matches);
  const clubs = originalClubs.concat(community.clubs);
  const stadiums = originalStadiums.concat(community.stadiums);

  return matches
    .filter(match => match.match_id != null)
    .map(match => {
      const homeClubId = match.home_club_id ?? match.club_id;
      const awayClubId = match.away_club_id ?? null;
      const homeClub = clubs.find(club => club.club_id != null &&
        homeClubId != null && String(club.club_id) === String(homeClubId));
      const awayClub = clubs.find(club => club.club_id != null &&
        awayClubId != null && String(club.club_id) === String(awayClubId));
      const stadium = stadiums.find(item => item.stadium_id != null &&
        match.stadium_id != null && String(item.stadium_id) === String(match.stadium_id));

      return {
        ...match,
        club_name: homeClub?.name ?? null,
        home_club_name: homeClub?.name ?? null,
        away_club_name: awayClub?.name ?? null,
        stadium_name: stadium?.name ?? null,
        stadium_address: stadium?.address ?? stadium?.adress ?? null
      };
    })
    .sort((a, b) => String(a.match_date ?? "").localeCompare(String(b.match_date ?? "")));
}

async function readCommunity(dbDir) {
  try {
    const data = JSON.parse(await fs.readFile(path.join(dbDir, "Community.json"), "utf8"));
    if (!["matches", "clubs", "stadiums"].every(key => Array.isArray(data[key]))) {
      throw new Error("Invalid community data");
    }
    return data;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { matches: [], clubs: [], stadiums: [] };
  }
}

async function getMatchOptions(dbDir) {
  const [clubs, stadiums, community] = await Promise.all([
    readTable(dbDir, "Clubs.json"), readTable(dbDir, "Stadiums.json"), readCommunity(dbDir)
  ]);
  return {
    clubs: clubs.concat(community.clubs).filter(row => row.club_id != null && row.name),
    stadiums: stadiums.concat(community.stadiums).filter(row => row.stadium_id != null && row.name)
  };
}

function normalizedName(value) {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("nb-NO");
}

function matchInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "JSON-objekt forventet." };
  }
  const result = {};
  for (const [key, label] of [["home_club_name", "Hjemmelag"], ["away_club_name", "Bortelag"],
    ["stadium_name", "Spillested"]]) {
    if (typeof input[key] !== "string" || input[key].trim().length < 2 ||
        input[key].length > 100 || /[<>\x00-\x1f\x7f]/.test(input[key])) {
      return { error: label + " må ha 2–100 tegn uten HTML eller kontrolltegn." };
    }
    result[key] = input[key].normalize("NFKC").trim().replace(/\s+/g, " ");
  }
  if (normalizedName(result.home_club_name) === normalizedName(result.away_club_name)) {
    return { error: "Hjemmelag og bortelag må være forskjellige." };
  }
  const date = typeof input.match_date === "string" ? new Date(input.match_date) : new Date(NaN);
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(input.match_date || "") ||
      isNaN(date.getTime()) || date.toISOString().slice(0, 19) !== input.match_date.slice(0, 19)) {
    return { error: "Oppgi en gyldig dato og et klokkeslett." };
  }
  result.match_date = date.toISOString();
  return result;
}

// Serialize read/check/write within one Node process; atomic rename avoids partial files.
// Multiple server processes must use a real shared database instead.
const matchWrites = new Map();
function createMatch(dbDir, user, input) {
  const key = path.resolve(dbDir);
  const pending = (matchWrites.get(key) || Promise.resolve()).then(async () => {
    const data = matchInput(input);
    if (data.error) return { status: 400, body: data };
    const matches = await getMatches(dbDir);
    const duplicate = matches.find(match =>
      typeof match.home_club_name === "string" && typeof match.away_club_name === "string" &&
      normalizedName(match.home_club_name) === normalizedName(data.home_club_name) &&
      normalizedName(match.away_club_name) === normalizedName(data.away_club_name) &&
      new Date(match.match_date).getTime() === new Date(data.match_date).getTime());
    if (duplicate) return { status: 409, body: {
      error: "Denne kampen finnes allerede. Se kampen i kalenderen.", match_id: duplicate.match_id
    } };
    const community = await readCommunity(dbDir);
    const options = await getMatchOptions(dbDir);
    function resolveName(rows, extra, field, name) {
      let row = rows.find(item => normalizedName(item.name) === normalizedName(name));
      if (!row) {
        row = { [field]: rows.reduce((max, item) => Math.max(max, Number(item[field]) || 0), 0) + 1, name };
        rows.push(row); extra.push(row);
      }
      return row;
    }
    const home = resolveName(options.clubs, community.clubs, "club_id", data.home_club_name);
    const away = resolveName(options.clubs, community.clubs, "club_id", data.away_club_name);
    const stadium = resolveName(options.stadiums, community.stadiums, "stadium_id", data.stadium_name);
    const match = {
      match_id: matches.reduce((max, item) => Math.max(max, Number(item.match_id) || 0), 0) + 1,
      match_date: data.match_date, status: "scheduled", stadium_id: stadium.stadium_id,
      home_club_id: home.club_id, away_club_id: away.club_id,
      source: "community", verification_status: "unverified",
      created_by: user.user_id, submitted_by: user.username, created_at: new Date().toISOString()
    };
    community.matches.push(match);
    const temporary = path.join(dbDir, "Community." + randomUUID() + ".tmp");
    try {
      await fs.writeFile(temporary, JSON.stringify(community, null, 2) + "\n", { flag: "wx" });
      await fs.rename(temporary, path.join(dbDir, "Community.json"));
    } finally {
      await fs.rm(temporary, { force: true });
    }
    return { status: 201, body: { match: {
      ...match, club_name: home.name, home_club_name: home.name, away_club_name: away.name,
      stadium_name: stadium.name, stadium_address: stadium.address ?? stadium.adress ?? null
    } } };
  });
  const tail = pending.catch(() => {});
  matchWrites.set(key, tail);
  tail.then(() => { if (matchWrites.get(key) === tail) matchWrites.delete(key); });
  return pending;
}

async function getPosts(dbDir) {
  const [posts, users] = await Promise.all([
    readTable(dbDir, "Posts.json"),
    readTable(dbDir, "Users.json")
  ]);

  return posts
    .filter(post => post.post_id != null &&
      typeof post.content === "string" && post.content.trim() !== "" &&
      post.user_id != null &&
      users.some(user => user.user_id != null &&
        String(user.user_id) === String(post.user_id)))
    .map(post => {
      const author = users.find(user => user.user_id != null &&
        String(user.user_id) === String(post.user_id));
      return {
        ...post,
        content: post.content.trim(),
        author_name: author?.username ?? author?.name ?? null
      };
    })
    .sort((a, b) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")));
}


// Internal lookup resolves the identity already authenticated by the server session.
async function getUser(dbDir, username) {
  if (typeof username !== "string" || !username.trim() || username.trim().length > 40) return null;
  const users = await readTable(dbDir, "Users.json");
  return users.find(user => typeof user.username === "string" &&
    user.username.toLowerCase() === username.trim().toLowerCase()) ?? null;
}

async function getCheckins(dbDir, user) {
  let rows = [];
  try {
    rows = await readTable(dbDir, "Check_ins.json");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const matches = await getMatches(dbDir);
  return rows
    .filter(row => row.user_id != null && String(row.user_id) === String(user.user_id))
    .map(row => {
      const match = matches.find(item => String(item.match_id) === String(row.match_id));
      return {
        check_in_id: row.check_in_id,
        checked_in_at: row.checked_in_at,
        user_id: row.user_id,
        match_id: row.match_id,
        match_date: match?.match_date ?? null,
        status: match?.status ?? null,
        home_club_name: match?.home_club_name ?? null,
        away_club_name: match?.away_club_name ?? null,
        stadium_id: match?.stadium_id ?? null,
        stadium_name: match?.stadium_name ?? null,
        stadium_address: match?.stadium_address ?? null
      };
    })
    .sort((a, b) => String(b.checked_in_at ?? "").localeCompare(String(a.checked_in_at ?? "")));
}

async function saveCheckins(dbDir, rows) {
  await fs.mkdir(dbDir, { recursive: true });
  await fs.writeFile(path.join(dbDir, "Check_ins.json"), JSON.stringify(rows, null, 2) + "\n", "utf8");
}

async function readRequestJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw, "utf8") > 16_384) {
      throw Object.assign(new Error("Forespørselen er for stor."), { statusCode: 413 });
    }
  }
  try {
    return JSON.parse(raw || "{}");
  } catch {
    throw Object.assign(new Error("Ugyldig JSON i forespørselen."), { statusCode: 400 });
  }
}

async function createCheckin(dbDir, username, matchId) {
  const user = await getUser(dbDir, username);
  if (!user) return { status: 404, body: { error: "Fant ikke testprofilen." } };
  if ((typeof matchId !== "number" && typeof matchId !== "string") ||
      String(matchId).trim() === "" || !/^\d+$/.test(String(matchId))) {
    return { status: 400, body: { error: "Ugyldig kamp-ID." } };
  }
  const matches = await getMatches(dbDir);
  const match = matches.find(item => String(item.match_id) === String(matchId));
  if (!match) return { status: 404, body: { error: "Fant ikke kampen." } };

  let rows = [];
  try {
    rows = await readTable(dbDir, "Check_ins.json");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (rows.some(row => String(row.user_id) === String(user.user_id) &&
      String(row.match_id) === String(match.match_id))) {
    return { status: 409, body: { error: "Du har allerede sjekket inn på denne kampen." } };
  }

  const nextId = rows.reduce((max, row) => Math.max(max, Number(row.check_in_id) || 0), 0) + 1;
  const checkin = {
    check_in_id: nextId,
    checked_in_at: new Date().toISOString(),
    user_id: user.user_id,
    match_id: match.match_id
  };
  rows.push(checkin);
  await saveCheckins(dbDir, rows);
  const checkIns = await getCheckins(dbDir, user);
  return { status: 201, body: { check_in: checkIns.find(row => String(row.check_in_id) === String(nextId)) } };
}

function createServer({ dbDir = process.env.STADIONHOPPER_DB_DIR || DEFAULT_DB_DIR, authStore = createAuthStore() } = {}) {
  async function getSessionUser(req) {
    const token = readCookie(req, "stadionhopper_session");
    const session = authStore.getSession(token);
    if (!session) return null;
    return getUser(dbDir, session.username);
  }

  return http.createServer(async (req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    try {
      // Bare disse offentlige frontend-filene skal kunne lastes ned.
      const filer = {
        "/": ["index.html", "text/html"],
        "/index.html": ["index.html", "text/html"],
        "/style.css": ["style.css", "text/css"],
        "/script.js": ["script.js", "text/javascript"],
        "/demo/data.json": ["demo/data.json", "application/json"]
      };
      if (req.method === "GET" && Object.hasOwn(filer, pathname)) {
        const [filnavn, type] = filer[pathname];
        const innhold = await fs.readFile(path.join(__dirname, filnavn));
        res.writeHead(200, { "Content-Type": type + "; charset=utf-8",
          "X-Content-Type-Options": "nosniff" });
        return res.end(innhold);
      }


      if (req.method === "POST" && pathname === "/api/login") {
        const input = await readRequestJson(req);
        if (!input || typeof input !== "object" || Array.isArray(input)) {
          return sendJson(res, 400, { error: "JSON-objekt forventet." });
        }
        const identity = authStore.authenticate(input.username, input.password);
        if (!identity) return sendJson(res, 401, { error: "Ugyldig brukernavn eller passord." });
        const user = await getUser(dbDir, identity.username);
        if (!user) return sendJson(res, 401, { error: "Testkontoen finnes ikke i dette datasettet." });
        const session = authStore.createSession(identity);
        res.setHeader("Set-Cookie", sessionCookie(session.token, req));
        return sendJson(res, 200, { user: { user_id: user.user_id, username: user.username } });
      }

      if (req.method === "GET" && pathname === "/api/session") {
        const user = await getSessionUser(req);
        return user
          ? sendJson(res, 200, { user: { user_id: user.user_id, username: user.username } })
          : sendJson(res, 401, { error: "Du er ikke logget inn." });
      }

      if (req.method === "POST" && pathname === "/api/logout") {
        authStore.destroySession(readCookie(req, "stadionhopper_session"));
        res.setHeader("Set-Cookie", clearSessionCookie(req));
        return sendJson(res, 200, { ok: true });
      }

      if (req.method === "GET" && pathname === "/api/profile") {
        const user = await getSessionUser(req);
        return user
          ? sendJson(res, 200, { user: { user_id: user.user_id, username: user.username } })
          : sendJson(res, 401, { error: "Du er ikke logget inn." });
      }

      if (req.method === "GET" && pathname === "/api/check-ins") {
        const user = await getSessionUser(req);
        return user
          ? sendJson(res, 200, { check_ins: await getCheckins(dbDir, user) })
          : sendJson(res, 401, { error: "Du er ikke logget inn." });
      }

      if (req.method === "POST" && pathname === "/api/check-ins") {
        const user = await getSessionUser(req);
        if (!user) return sendJson(res, 401, { error: "Du er ikke logget inn." });
        const input = await readRequestJson(req);
        if (!input || typeof input !== "object" || Array.isArray(input)) {
          return sendJson(res, 400, { error: "JSON-objekt forventet." });
        }
        const result = await createCheckin(dbDir, user.username, input.match_id);
        return sendJson(res, result.status, result.body);
      }

      if (req.method === "GET" && pathname === "/api/matches") {
        return sendJson(res, 200, { matches: await getMatches(dbDir) });
      }

      if (req.method === "GET" && pathname === "/api/match-options") {
        return sendJson(res, 200, await getMatchOptions(dbDir));
      }

      if (req.method === "POST" && pathname === "/api/matches") {
        const user = await getSessionUser(req);
        if (!user) return sendJson(res, 401, { error: "Logg inn før du legger til en kamp." });
        if (!String(req.headers["content-type"] || "").startsWith("application/json")) {
          return sendJson(res, 415, { error: "Forespørselen må være JSON." });
        }
        const result = await createMatch(dbDir, user, await readRequestJson(req));
        return sendJson(res, result.status, result.body);
      }

      if (req.method === "GET" && pathname === "/api/posts") {
        return sendJson(res, 200, { posts: await getPosts(dbDir) });
      }

      const detail = pathname.match(/^\/api\/matches\/([^/]+)$/);
      if (req.method === "GET" && detail) {
        let id;
        try {
          id = decodeURIComponent(detail[1]);
        } catch {
          return sendJson(res, 400, { error: "Ugyldig kamp-ID." });
        }
        const matches = await getMatches(dbDir);
        const match = matches.find(item => String(item.match_id) === id);
        return match
          ? sendJson(res, 200, { match })
          : sendJson(res, 404, { error: "Fant ikke kampen." });
      }

      return sendJson(res, 404, { error: "Ukjent endepunkt." });
    } catch (error) {
      const status = error.statusCode || 500;
      const message = status === 400 || status === 413 ? error.message : "Kunne ikke lese data.";
      return sendJson(res, status, { error: message });
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  const server = createServer();
  server.listen(port, () => {
    console.log(`Stadionhopper API listening on http://localhost:${port}`);
  });
}

module.exports = { createServer, parseTable, getMatches, getPosts, getUser, getCheckins, createCheckin };
