const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("GitHub Pages demo data has usable match and post records", () => {
  const filename = path.join(__dirname, "..", "demo", "data.json");
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));

  assert.ok(Array.isArray(data.matches));
  assert.ok(data.matches.length > 0);
  assert.ok(Array.isArray(data.posts));
  assert.ok(data.posts.length > 0);

  for (const match of data.matches) {
    assert.notEqual(match.match_id, undefined);
    assert.ok(match.home_club_name);
    assert.ok(match.away_club_name);
    assert.ok(match.stadium_name);
    assert.ok(Number.isFinite(Date.parse(match.match_date)));
  }

  for (const post of data.posts) {
    assert.ok(post.author_name);
    assert.ok(post.content);
    assert.ok(Number.isFinite(Date.parse(post.created_at)));
  }
});


test("GitHub Pages demo includes three shared fictional test profiles", () => {
  const filename = path.join(__dirname, "..", "demo", "data.json");
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  assert.deepEqual(data.users.map(user => user.username), ["alex", "sam", "maria"]);
  assert.ok(data.users.every(user => user.password && user.display_name && user.favorite_club));
});
