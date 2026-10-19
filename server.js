const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = __dirname;
const DB = path.join(ROOT, "Database");
const PORT = Number(process.env.PORT || 3000);
const FILES = {
  checkIns: "Check_ins.json",
  clubs: "Clubs.json",
  events: "Events.json",
  matches: "Matches.json",
  posts: "Posts.json",
  stadiums: "Stadiums.json",
  users: "Users.json"
};
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8" };

async function readDb(key) {
  const text = await fs.readFile(path.join(DB, FILES[key]), "utf8");
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error(FILES[key] + " must contain a JSON array");
  return data;
}
async function writeDb(key, data) {
  const file = path.join(DB, FILES[key]);
  const temp = file + ".tmp";
  await fs.writeFile(temp, JSON.stringify(data, null, 2) + "\n", "utf8");
  await fs.rename(temp, file);
}
function send(res, status, data, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(type.startsWith("application/json") ? JSON.stringify(data) : data);
}
async function readBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 20_000) throw new Error("Request body is too large");
  }
  return raw ? JSON.parse(raw) : {};
}
function makeId(prefix) { return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8); }

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname.startsWith("/api/")) {
      if (req.method === "GET" && url.pathname === "/api/matches") {
        const [matches, clubs, stadiums] = await Promise.all([readDb("matches"), readDb("clubs"), readDb("stadiums")]);
        const result = matches.filter(m => m && m.match_id && m.match_date).map(m => {
          const club = clubs.find(c => c.club_id === m.club_id || c.club_id === m.home_club_id);
          const stadium = stadiums.find(s => s.stadium_id === m.stadium_id);
          return {
            id: String(m.match_id),
            home: m.home_club_name || m.home || (club && club.name) || "Lag ikke angitt",
            away: m.away_club_name || m.opponent_name || m.away || "Motstander ikke angitt",
            date: String(m.match_date).slice(0, 10),
            time: m.match_time || "",
            stadium: (stadium && stadium.name) || m.stadium_name || "Stadion ikke angitt",
            city: m.city || (stadium && (stadium.city || stadium.adress || stadium.address)) || "",
            status: m.status || ""
          };
        });
        return send(res, 200, result);
      }
      if (req.method === "GET" && url.pathname === "/api/check-ins") {
        const [checkIns, matches] = await Promise.all([readDb("checkIns"), readDb("matches")]);
        return send(res, 200, checkIns.filter(v => v && v.check_in_id && v.match_id).map(v => ({
          id: String(v.check_in_id), matchId: String(v.match_id),
          date: String(v.checked_in_at || "").slice(0, 10), note: v.note || ""
        })).filter(v => matches.some(m => String(m.match_id) === v.matchId)));
      }
      if (req.method === "POST" && url.pathname === "/api/check-ins") {
        const body = await readBody(req);
        if (!body || typeof body.matchId !== "string" || typeof body.date !== "string") return send(res, 400, { error: "Kamp og dato må oppgis." });
        const date = new Date(body.date + "T12:00:00");
        if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date) || Number.isNaN(date.getTime()) || body.date > new Date().toISOString().slice(0, 10)) return send(res, 400, { error: "Velg en gyldig dato som ikke er i fremtiden." });
        const matches = await readDb("matches");
        if (!matches.some(m => String(m.match_id) === body.matchId)) return send(res, 404, { error: "Fant ikke kampen i Database/Matches.json." });
        const checkIns = await readDb("checkIns");
        if (checkIns.some(v => v && String(v.match_id) === body.matchId)) return send(res, 409, { error: "Denne kampen er allerede registrert." });
        const entry = {
          check_in_id: makeId("checkin"),
          checked_in_at: body.date,
          user_id: body.userId || "local-demo-user",
          match_id: body.matchId,
          note: typeof body.note === "string" ? body.note.trim().slice(0, 240) : ""
        };
        checkIns.push(entry);
        await writeDb("checkIns", checkIns);
        return send(res, 201, { id: entry.check_in_id, matchId: entry.match_id, date: entry.checked_in_at, note: entry.note });
      }
      const deleteMatch = url.pathname.match(/^\/api\/check-ins\/([^/]+)$/);
      if (req.method === "DELETE" && deleteMatch) {
        const id = decodeURIComponent(deleteMatch[1]);
        const checkIns = await readDb("checkIns");
        const next = checkIns.filter(v => !v || String(v.check_in_id) !== id);
        if (next.length === checkIns.length) return send(res, 404, { error: "Fant ikke innsjekkingen." });
        await writeDb("checkIns", next);
        return send(res, 200, { deleted: true });
      }
      return send(res, 404, { error: "Ukjent API-endepunkt." });
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const file = path.resolve(ROOT, "." + pathname);
    if (!file.startsWith(ROOT + path.sep) && file !== path.join(ROOT, "index.html")) return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    const data = await fs.readFile(file);
    return send(res, 200, data, MIME[path.extname(file)] || "application/octet-stream");
  } catch (error) {
    if (error instanceof SyntaxError) return send(res, 400, { error: "Ugyldig JSON." });
    if (error.code === "ENOENT") return send(res, 404, { error: "Fant ikke filen." });
    console.error(error);
    return send(res, 500, { error: "Serverfeil. Sjekk terminalen for detaljer." });
  }
});

server.listen(PORT, () => console.log("Stadionhopper kjører på http://localhost:" + PORT));
