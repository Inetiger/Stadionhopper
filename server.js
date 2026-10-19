const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = __dirname;
const DB_DIR = process.env.STADIONHOPPER_DB_DIR || path.join(ROOT, "Database");
const PORT = Number(process.env.PORT || 3000);
const TABLES = {
  check_ins: "Check_ins.json",
  clubs: "Clubs.json",
  events: "Events.json",
  matches: "Matches.json",
  posts: "Posts.json",
  stadiums: "Stadiums.json",
  users: "Users.json"
};
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function parseTable(source, filename) {
  // Existing templates currently contain Python None and trailing commas.
  const normalized = source
    .replace(/\bNone\b/g, "null")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/,\s*([}\]])/g, "$1");
  const rows = JSON.parse(normalized);
  if (!Array.isArray(rows)) throw new Error(filename + " must contain a JSON array");
  // The current files are schema templates with one all-empty row. Treat it as empty data.
  return rows.filter(row => row && typeof row === "object" &&
    Object.values(row).some(value => value !== null && value !== ""));
}

async function readTable(name) {
  const filename = TABLES[name];
  if (!filename) throw new Error("Unknown table: " + name);
  return parseTable(await fs.readFile(path.join(DB_DIR, filename), "utf8"), filename);
}

async function writeTable(name, rows) {
  const filename = TABLES[name];
  if (!filename) throw new Error("Unknown table: " + name);
  const target = path.join(DB_DIR, filename);
  const temporary = target + ".tmp";
  await fs.writeFile(temporary, JSON.stringify(rows, null, 2) + "\n", "utf8");
  await fs.rename(temporary, target);
}

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(payload));
}

async function bodyJson(req) {
  let text = "";
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 50_000) throw Object.assign(new Error("Request body too large"), { statusCode: 413 });
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw Object.assign(new Error("Request body must be valid JSON"), { statusCode: 400 });
  }
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.getTime() <= Date.now();
}

async function matchesWithDetails() {
  const [matches, clubs, stadiums] = await Promise.all([
    readTable("matches"), readTable("clubs"), readTable("stadiums")
  ]);
  return matches.filter(match => match.match_id != null).map(match => {
    const club = clubs.find(item => item.club_id != null && String(item.club_id) === String(match.club_id));
    const stadium = stadiums.find(item => item.stadium_id != null && String(item.stadium_id) === String(match.stadium_id));
    return {
      ...match,
      club_name: club?.name ?? null,
      stadium_name: stadium?.name ?? null,
      stadium_address: stadium?.adress ?? stadium?.address ?? null
    };
  }).sort((a, b) => String(a.match_date || "").localeCompare(String(b.match_date || "")));
}

async function postsWithAuthors() {
  const [posts, users] = await Promise.all([readTable("posts"), readTable("users")]);
  return posts.filter(post => post.post_id != null && typeof post.content === "string" && post.content.trim())
    .map(post => {
      const author = users.find(user => user.user_id != null && String(user.user_id) === String(post.user_id));
      return {
        ...post,
        author: author?.username ?? null
      };
    }).sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
}

function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));
      if (req.method === "GET" && url.pathname === "/api/health") {
        return json(res, 200, { status: "ok" });
      }
      if (req.method === "GET" && url.pathname === "/api/matches") {
        return json(res, 200, { matches: await matchesWithDetails() });
      }
      const matchDetails = url.pathname.match(/^\/api\/matches\/([^/]+)$/);
      if (req.method === "GET" && matchDetails) {
        const id = decodeURIComponent(matchDetails[1]);
        const matches = await matchesWithDetails();
        const match = matches.find(item => String(item.match_id) === id);
        return match ? json(res, 200, { match }) : json(res, 404, { error: "Fant ikke kampen." });
      }
      if (req.method === "GET" && url.pathname === "/api/check-ins") {
        const [checkIns, matches] = await Promise.all([readTable("check_ins"), matchesWithDetails()]);
        const knownMatchIds = new Set(matches.map(item => String(item.match_id)));
        return json(res, 200, {
          check_ins: checkIns.filter(item => item.check_in_id != null && item.match_id != null &&
            knownMatchIds.has(String(item.match_id)))
        });
      }
      if (req.method === "POST" && url.pathname === "/api/check-ins") {
        const input = await bodyJson(req);
        if (input.match_id == null || !validDate(input.checked_in_at)) {
          return json(res, 400, { error: "match_id og en gyldig checked_in_at-dato må oppgis." });
        }
        const [matches, checkIns] = await Promise.all([readTable("matches"), readTable("check_ins")]);
        if (!matches.some(item => item.match_id != null && String(item.match_id) === String(input.match_id))) {
          return json(res, 400, { error: "Kampen finnes ikke i Database/Matches.json." });
        }
        if (checkIns.some(item => item.match_id != null && String(item.match_id) === String(input.match_id))) {
          return json(res, 409, { error: "Denne kampen har allerede en innsjekking." });
        }
        // No authentication/session system exists yet. Do not accept a user_id from the client
        // and pretend it is verified. Null clearly marks an anonymous prototype check-in.
        const nextId = checkIns.reduce((max, item) => Math.max(max, Number(item.check_in_id) || 0), 0) + 1;
        const checkIn = {
          check_in_id: nextId,
          checked_in_at: new Date(input.checked_in_at).toISOString(),
          user_id: null,
          match_id: input.match_id
        };
        checkIns.push(checkIn);
        await writeTable("check_ins", checkIns);
        return json(res, 201, { check_in: checkIn });
      }
      const deleteCheckIn = url.pathname.match(/^\/api\/check-ins\/([^/]+)$/);
      if (req.method === "DELETE" && deleteCheckIn) {
        const id = decodeURIComponent(deleteCheckIn[1]);
        const checkIns = await readTable("check_ins");
        const next = checkIns.filter(item => String(item.check_in_id) !== id);
        if (next.length === checkIns.length) return json(res, 404, { error: "Fant ikke innsjekkingen." });
        await writeTable("check_ins", next);
        return json(res, 200, { deleted: true });
      }
      if (req.method === "GET" && url.pathname === "/api/posts") {
        return json(res, 200, { posts: await postsWithAuthors() });
      }

      if (req.method === "GET") {
        const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
        const file = path.resolve(ROOT, "." + pathname);
        if (!file.startsWith(ROOT + path.sep) || file.startsWith(path.resolve(DB_DIR) + path.sep)) {
          return json(res, 403, { error: "Forbidden" });
        }
        const type = MIME[path.extname(file)];
        if (!type) return json(res, 404, { error: "Fant ikke filen." });
        const content = await fs.readFile(file);
        res.writeHead(200, { "Content-Type": type, "X-Content-Type-Options": "nosniff" });
        return res.end(content);
      }
      return json(res, 404, { error: "Ukjent endepunkt." });
    } catch (error) {
      const status = error.statusCode || (error.code === "ENOENT" ? 404 : 500);
      if (status >= 500) console.error(error);
      return json(res, status, {
        error: status === 400 ? error.message : status === 413 ? error.message :
          status === 404 ? "Fant ikke filen eller ressursen." : "Serverfeil ved lesing eller skriving av JSON-data."
      });
    }
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => console.log("Stadionhopper kjører på http://localhost:" + PORT));
}

module.exports = { createServer, parseTable, readTable, writeTable, matchesWithDetails, postsWithAuthors };
