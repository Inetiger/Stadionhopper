const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { createServer } = require("../server");

test("representative fixture dataset has linked clubs and stadiums", async t => {
  const dbDir = path.join(__dirname, "fixtures");
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/matches");
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.matches.length, 2);
  assert.deepEqual(body.matches.map(match => match.match_id), [100, 101]);
  assert.equal(body.matches[0].home_club_name, "Molde FK");
  assert.equal(body.matches[0].away_club_name, "Eide og Omegn FK");
  assert.equal(body.matches[0].stadium_name, "Aker Stadion");
  assert.equal(body.matches[1].home_club_name, "Skåla IL");
  assert.equal(body.matches[1].stadium_address, "Eide");
});
