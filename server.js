const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

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

async function getMatches(dbDir) {
  const [matches, clubs, stadiums] = await Promise.all([
    readTable(dbDir, "Matches.json"),
    readTable(dbDir, "Clubs.json"),
    readTable(dbDir, "Stadiums.json")
  ]);

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

async function getPosts(dbDir) {
  const [posts, users] = await Promise.all([
    readTable(dbDir, "Posts.json"),
    readTable(dbDir, "Users.json")
  ]);

  return posts
    .filter(post => post.post_id != null &&
      typeof post.content === "string" && post.content.trim() !== "" &&
      post.user_id != null)
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

function createServer({ dbDir = process.env.STADIONHOPPER_DB_DIR || DEFAULT_DB_DIR } = {}) {
  return http.createServer(async (req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    try {
      if (req.method === "GET" && pathname === "/api/matches") {
        return sendJson(res, 200, { matches: await getMatches(dbDir) });
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
      const status = error instanceof SyntaxError ? 500 : error.code === "ENOENT" ? 500 : 500;
      return sendJson(res, status, { error: "Kunne ikke lese data." });
    }
  });
}

module.exports = { createServer, parseTable, getMatches, getPosts };
