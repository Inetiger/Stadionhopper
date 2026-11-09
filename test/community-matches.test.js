const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { frontend, createCookieFetch, startTestServer, waitFor } = require('./helpers/frontend');

const valid = {
  home_club_name: 'Molde FK', away_club_name: 'Gossen IL J15',
  stadium_name: 'Ny bane, Aukra', match_date: '2027-04-10T13:30:00.000Z'
};
async function signedIn(base, second = false) {
  const request = createCookieFetch(base);
  const response = await request('/api/login', { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      username: second ? 'Testbruker2' : 'Testbruker',
      password: second ? 'test-only-password-two' : 'test-only-password-one'
    }) });
  assert.equal(response.status, 200);
  return request;
}
function post(request, data) {
  return request('/api/matches', { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

test('community match persists references, is shared, and supports existing check-ins', async t => {
  const { base, dbDir } = await startTestServer(t);
  const original = await fs.readFile(path.join(dbDir, 'Matches.json'), 'utf8');
  const request = await signedIn(base);
  const response = await post(request, { ...valid, created_by: 999,
    match_id: 1, verification_status: 'verified', submitted_by: 'forged' });
  assert.equal(response.status, 201);
  const { match } = await response.json();
  assert.equal(match.created_by, 1);
  assert.equal(match.submitted_by, 'Testbruker');
  assert.equal(match.verification_status, 'unverified');
  assert.equal(match.source, 'community');
  assert.equal(match.home_club_id, 1, 'reuses the existing club');
  assert.equal(match.away_club_name, valid.away_club_name);
  const community = JSON.parse(await fs.readFile(path.join(dbDir, 'Community.json'), 'utf8'));
  assert.equal(community.matches.length, 1);
  assert.ok(community.clubs.some(club => club.club_id === match.away_club_id));
  assert.ok(community.stadiums.some(stadium => stadium.stadium_id === match.stadium_id));
  assert.equal(await fs.readFile(path.join(dbDir, 'Matches.json'), 'utf8'), original);
  const other = await signedIn(base, true);
  const all = await (await other('/api/matches')).json();
  assert.ok(all.matches.some(row => row.match_id === match.match_id));
  const detail = await (await other('/api/matches/' + match.match_id)).json();
  assert.equal(detail.match.stadium_name, valid.stadium_name);
  const visit = await other('/api/check-ins', { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ match_id: match.match_id }) });
  assert.equal(visit.status, 201);
  const history = await (await other('/api/check-ins')).json();
  assert.equal(history.check_ins[0].away_club_name, valid.away_club_name);
  const options = await (await other('/api/match-options')).json();
  assert.ok(options.clubs.some(row => row.name === valid.away_club_name));
});

test('match registration rejects unauthenticated, invalid, oversized and duplicate input', async t => {
  const { base } = await startTestServer(t);
  assert.equal((await post((url, options) => fetch(base + url, options), valid)).status, 401);
  const request = await signedIn(base);
  for (const input of [null, [], {}, { ...valid, home_club_name: '   ' },
    { ...valid, away_club_name: ' molde   fk ' }, { ...valid, stadium_name: '<img onerror=alert(1)>' },
    { ...valid, stadium_name: 'x'.repeat(101) }, { ...valid, match_date: '2027-02-30T13:30:00Z' },
    { ...valid, match_date: '2027-04-10' }, { ...valid, match_date: 'garbage' }]) {
    const response = await post(request, input);
    assert.equal(response.status, 400, JSON.stringify(input));
    assert.ok((await response.json()).error);
  }
  assert.equal((await request('/api/matches', { method: 'POST',
    headers: { 'Content-Type': 'application/json' }, body: '{' })).status, 400);
  assert.equal((await request('/api/matches', { method: 'POST', body: '{}' })).status, 415);
  assert.equal((await post(request, { ...valid, stadium_name: 'x'.repeat(17000) })).status, 413);
  assert.equal((await post(request, valid)).status, 201);
  const duplicate = await post(request, { ...valid, home_club_name: '  MOLDE   FK ', stadium_name: 'Annen bane' });
  assert.equal(duplicate.status, 409);
  assert.ok((await duplicate.json()).match_id);
});

test('parallel registration never loses records and rejects simultaneous duplicates', async t => {
  const { base, dbDir } = await startTestServer(t);
  const request = await signedIn(base);
  const responses = await Promise.all(Array.from({ length: 8 }, (_, i) =>
    post(request, { ...valid, away_club_name: 'Lag ' + i })));
  assert.ok(responses.every(response => response.status === 201));
  const duplicates = await Promise.all([post(request, valid), post(request, valid)]);
  assert.deepEqual(duplicates.map(response => response.status).sort(), [201, 409]);
  const stored = JSON.parse(await fs.readFile(path.join(dbDir, 'Community.json'), 'utf8'));
  assert.equal(stored.matches.length, 9);
  assert.equal(new Set(stored.matches.map(row => row.match_id)).size, 9);
  assert.equal(new Set(stored.clubs.map(row => row.club_id)).size, stored.clubs.length);
});

function fill(ui, input = valid) {
  ui.felter.nytthjemmelag.value = input.home_club_name;
  ui.felter.nyttbortelag.value = input.away_club_name;
  ui.felter.nyttspillested.value = input.stadium_name;
  ui.felter.nytttidspunkt.value = '2027-04-10T15:30';
}

test('frontend registers through the API and selects the new calendar date and details', async t => {
  const { base } = await startTestServer(t);
  const request = createCookieFetch(base);
  const ui = frontend(request);
  await waitFor(() => ui.felter.kampstatus.textContent !== 'Laster kamper …');
  await ui.context.startNyKamp();
  assert.equal(ui.felter.innlogging.style.display, 'block');
  ui.felter.brukernavn.value = 'Testbruker';
  ui.felter.passord.value = 'test-only-password-one';
  await ui.context.velgTestprofil();
  await waitFor(() => ui.felter.leggtilkamp.style.display === 'block' && ui.felter.nykampstatus.textContent === '');
  fill(ui);
  await ui.context.lagreNyKamp();
  assert.equal(ui.felter.kamper.style.display, 'block');
  assert.equal(ui.context.valgtDato, '2027-04-10');
  assert.match(ui.felter.kampstatus.textContent, /andre på samme server/);
  const match = ui.context.kamper.find(row => row.source === 'community');
  ui.context.hentKamp(match.match_id);
  await waitFor(() => ui.felter.detaljstatus.textContent !== 'Laster kamp …');
  assert.match(ui.felter.detaljkilde.textContent, /Ikke bekreftet/);
  assert.equal(ui.felter.bortelag.textContent, valid.away_club_name);
});

test('frontend preserves draft on failure and blocks double submit', async () => {
  let postCount = 0, release;
  const ui = frontend(async (url, options) => {
    if (options?.method === 'POST') {
      postCount++;
      return new Promise(resolve => { release = () => resolve({ ok: false, json: async () => ({ error: 'Denne kampen finnes allerede.' }) }); });
    }
    return { ok: true, json: async () => url === '/api/match-options' ?
      { clubs: [], stadiums: [] } : { matches: [] } };
  });
  await ui.context.startNyKamp();
  assert.equal(ui.context.ventendeKamp, true);
  assert.equal(ui.felter.innlogging.style.display, 'block');
  ui.context.aktivBruker = { user_id: 1, username: 'Testbruker' };
  fill(ui);
  const saving = ui.context.lagreNyKamp();
  await ui.context.lagreNyKamp();
  assert.equal(postCount, 1);
  release(); await saving;
  assert.match(ui.felter.nykampstatus.textContent, /finnes allerede/);
  assert.equal(ui.felter.nytthjemmelag.value, valid.home_club_name);
  assert.equal(ui.felter.lagrekampknapp.disabled, false);
});

test('Pages demo persists new matches across reload and refuses false success without storage', async () => {
  const seed = { matches: [], posts: [], users: [] };
  const fetchDemo = async () => ({ ok: true, json: async () => seed });
  const values = new Map();
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const ui = frontend(fetchDemo, 'inetiger.github.io');
  ui.context.localStorage = storage;
  ui.context.aktivBruker = { user_id: 1, username: 'alex' };
  fill(ui);
  await ui.context.lagreNyKamp();
  assert.match(ui.felter.kampstatus.textContent, /deles ikke/);
  const reloaded = frontend(fetchDemo, 'inetiger.github.io');
  reloaded.context.localStorage = storage;
  await reloaded.context.hentKamper();
  assert.equal(reloaded.context.kamper.length, 1);
  const detail = await reloaded.context.hentData('/api/matches/1');
  assert.equal(detail.match.away_club_name, valid.away_club_name);
  const blocked = frontend(fetchDemo, 'inetiger.github.io');
  blocked.context.aktivBruker = { user_id: 1, username: 'alex' };
  fill(blocked);
  await blocked.context.lagreNyKamp();
  assert.match(blocked.felter.nykampstatus.textContent, /ikke lagret/);
  assert.equal(blocked.context.kamper.length, 0);
});
