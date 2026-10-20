const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createServer, parseTable } = require("../server");

async function makeDb() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "stadionhopper-matches-"));
  const tables = {
    "Matches.json": [
      { match_id: 2, match_date: "2026-10-12", stadium_id: 8, home_club_id: 4, away_club_id: 5 },
      { match_id: 1, match_date: "2026-10-10", stadium_id: 7, club_id: 4 }
    ],
    "Clubs.json": [
      { club_id: 4, name: "Molde FK" },
      { club_id: 5, name: "Eide og Omegn FK" }
    ],
    "Stadiums.json": [
      { stadium_id: 7, name: "Aker Stadion", address: "Molde" },
      { stadium_id: 8, name: "Eide kunstgressbane", adress: "Eide" }
    ]
  };
  for (const [filename, rows] of Object.entries(tables)) {
    await fs.writeFile(path.join(dir, filename), JSON.stringify(rows), "utf8");
  }
  return dir;
}

test("normalizes existing None values and trailing commas", () => {
  assert.deepEqual(parseTable('[{"id": None, "name": None,}]', "fixture"), []);
  assert.deepEqual(parseTable('[{"id": 1, "name": "Molde",}]', "fixture"),
    [{ id: 1, name: "Molde" }]);
});

test("lists matches sorted by date with club and stadium details", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });

  const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/matches");
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.matches.map(match => match.match_id), [1, 2]);
  assert.equal(body.matches[0].home_club_name, "Molde FK");
  assert.equal(body.matches[0].stadium_name, "Aker Stadion");
  assert.equal(body.matches[1].away_club_name, "Eide og Omegn FK");
  assert.equal(body.matches[1].stadium_address, "Eide");
});

test("returns one match by ID and a clear 404 for an unknown ID", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });

  const base = "http://127.0.0.1:" + server.address().port;
  const found = await fetch(base + "/api/matches/2");
  assert.equal(found.status, 200);
  assert.equal((await found.json()).match.stadium_name, "Eide kunstgressbane");
  const missing = await fetch(base + "/api/matches/999");
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: "Fant ikke kampen." });
});
