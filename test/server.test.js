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
    ],
    "Users.json": [
      { user_id: 1, username: "Testbruker" },
      { user_id: 2, username: "Testbruker2" },
      { user_id: 11, username: "kari" },
      { user_id: 12, username: "ola" }
    ],
    "Check_ins.json": [],
    "Posts.json": [
      { post_id: 1, content: "  Første innlegg  ", created_at: "2026-10-10T12:00:00Z", user_id: 11 },
      { post_id: 2, content: "Nyere innlegg", created_at: "2026-10-12T12:00:00Z", user_id: 12 },
      { post_id: 3, content: "   ", created_at: "2026-10-13T12:00:00Z", user_id: 11 },
      { post_id: 4, content: "Mangler forfatter", created_at: "2026-10-14T12:00:00Z", user_id: null },
      { post_id: 5, content: "Ukjent bruker", created_at: "2026-10-15T12:00:00Z", user_id: 999 }
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


test("lists valid social posts newest first with author names", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });

  const response = await fetch("http://127.0.0.1:" + server.address().port + "/api/posts");
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.posts.map(post => post.post_id), [2, 1]);
  assert.equal(body.posts[0].author_name, "ola");
  assert.equal(body.posts[1].author_name, "kari");
  assert.equal(body.posts[1].content, "Første innlegg");
});


async function login(base, username = "Testbruker", password = "hopper123") {
  const response = await fetch(base + "/api/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const cookieHeader = response.headers.get("set-cookie");
  return { response, cookie: cookieHeader ? cookieHeader.split(";")[0] : "" };
}

test("profile and check-in APIs require a session and isolate identity from client input", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });
  const base = "http://127.0.0.1:" + server.address().port;

  assert.equal((await fetch(base + "/api/profile?username=kari")).status, 401);
  assert.equal((await fetch(base + "/api/check-ins?username=kari")).status, 401);
  const badLogin = await login(base, "Testbruker", "wrong-password");
  assert.equal(badLogin.response.status, 401);
  assert.equal((await fetch(base + "/api/session")).status, 401);

  const signedIn = await login(base);
  assert.equal(signedIn.response.status, 200);
  assert.match(signedIn.cookie, /^stadionhopper_session=/);
  assert.match(signedIn.response.headers.get("set-cookie"), /HttpOnly/);
  assert.match(signedIn.response.headers.get("set-cookie"), /SameSite=Lax/);
  const headers = { Cookie: signedIn.cookie, Accept: "application/json" };

  let response = await fetch(base + "/api/session", { headers });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).user, { user_id: 1, username: "Testbruker" });

  response = await fetch(base + "/api/profile?username=kari", { headers });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { user: { user_id: 1, username: "Testbruker" } });

  response = await fetch(base + "/api/check-ins?username=kari", { headers });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).check_ins, []);

  response = await fetch(base + "/api/check-ins", {
    method: "POST", headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ username: "kari", match_id: 1 })
  });
  assert.equal(response.status, 201);
  const created = (await response.json()).check_in;
  assert.equal(created.user_id, 1, "client-supplied username must not select the owner");
  assert.equal(created.match_id, 1);
  assert.equal(created.stadium_name, "Aker Stadion");
  assert.ok(created.checked_in_at);

  const persisted = JSON.parse(await fs.readFile(path.join(dbDir, "Check_ins.json"), "utf8"));
  assert.equal(persisted.length, 1);
  assert.equal(persisted[0].user_id, 1);

  const secondLogin = await login(base, "Testbruker2", "hopper456");
  assert.equal(secondLogin.response.status, 200);
  const secondHeaders = { Cookie: secondLogin.cookie, Accept: "application/json" };
  response = await fetch(base + "/api/check-ins", { headers: secondHeaders });
  assert.deepEqual((await response.json()).check_ins, []);
  response = await fetch(base + "/api/check-ins", {
    method: "POST", headers: { ...secondHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ username: "Testbruker", match_id: 2 })
  });
  assert.equal(response.status, 201);
  assert.equal((await response.json()).check_in.user_id, 2);
  response = await fetch(base + "/api/check-ins", { headers });
  assert.equal((await response.json()).check_ins.length, 1);

  response = await fetch(base + "/api/check-ins", {
    method: "POST", headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ username: "Testbruker", match_id: 1 })
  });
  assert.equal(response.status, 409);

  response = await fetch(base + "/api/logout", { method: "POST", headers });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("set-cookie"), /Max-Age=0/);
  assert.equal((await fetch(base + "/api/profile", { headers })).status, 401);
  assert.equal((await fetch(base + "/api/check-ins", { headers })).status, 401);
});

test("check-in API validates match IDs after authenticating the session", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });
  const base = "http://127.0.0.1:" + server.address().port;
  const { response: loginResponse, cookie } = await login(base);
  assert.equal(loginResponse.status, 200);
  const post = body => fetch(base + "/api/check-ins", {
    method: "POST",
    headers: { Cookie: cookie, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  assert.equal((await post({ match_id: 999 })).status, 404);
  assert.equal((await post({ match_id: "nope" })).status, 400);
  assert.equal((await post({ match_id: -1 })).status, 400);
  assert.equal((await post({ match_id: 1.5 })).status, 400);
  assert.equal((await post(null)).status, 400);
  assert.equal((await post({ match_id: 1 })).status, 201);
});

test("check-in API reports malformed JSON as 400 for an authenticated user", async t => {
  const dbDir = await makeDb();
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    await fs.rm(dbDir, { recursive: true, force: true });
  });
  const base = "http://127.0.0.1:" + server.address().port;
  const { cookie } = await login(base);
  const response = await fetch(base + "/api/check-ins", {
    method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json" }, body: "{"
  });
  assert.equal(response.status, 400);
});
