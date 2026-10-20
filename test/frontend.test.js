const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { createServer } = require('../server');

// Lite DOM-testmiljø: kontrollerer faktisk visningslogikk, ikke nettleserlayout.
function frontend(fetch, hostname = 'localhost') {
  function element() {
    let tekst = '';
    return { style: {}, children: [], disabled: false,
      get textContent() { return tekst; },
      set textContent(value) { tekst = value; this.children = []; },
      appendChild(child) { this.children.push(child); }
    };
  }
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const felter = {};
  for (const match of html.matchAll(/id="([^"]+)"/g)) felter[match[1]] = element();
  const sider = [...html.matchAll(/id="([^"]+)" class="side"/g)].map(m => felter[m[1]]);
  const document = { getElementById: id => felter[id], getElementsByClassName: () => sider,
    createElement: element };
  const context = vm.createContext({ document, fetch, Date, console, location: { hostname } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
  return { context, felter };
}
const ferdig = () => new Promise(resolve => setImmediate(resolve));

test('frontend uses real API fixtures, selects by ID and shows correct details', async t => {
  const server = createServer({ dbDir: path.join(__dirname, 'fixtures') });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port;
  let requests = [];
  const ui = frontend(url => { requests.push(url); return fetch(base + url); });
  // Wait for actual HTTP response rather than a fixed timer.
  for (let i = 0; i < 100 && ui.felter.kampstatus.textContent === 'Laster kamper …'; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  assert.equal(ui.felter.kampstatus.textContent, '');
  const kort = [...ui.felter.kommende.children, ...ui.felter.tidligere.children];
  assert.equal(kort.length, 2);
  kort[0].children[2].onclick();
  for (let i = 0; i < 100 && ui.felter.detaljstatus.textContent === 'Laster kamp …'; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  assert.equal(ui.felter.detaljstatus.textContent, '');
  assert.ok(requests.includes('/api/matches/100'));
  assert.equal(ui.felter.detaljnavn.textContent, kort[0].children[0].textContent);
  ui.context.visValgtBesok();
  assert.equal(ui.felter.kampnavn.textContent, ui.felter.detaljnavn.textContent);
  assert.equal(ui.felter.innsjekking.style.display, 'block');
  for (const [url, type] of [['/', 'text/html'], ['/style.css', 'text/css'], ['/script.js', 'text/javascript']]) {
    const response = await fetch(base + url);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get('content-type').startsWith(type));
  }
  assert.equal((await fetch(base + '/Database/Users.json')).status, 404);
  assert.equal((await fetch(base + '/server.js')).status, 404);
});

test('frontend shows loading, empty, malformed response and network failure', async () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  assert.equal(ui.felter.kampstatus.textContent, 'Laster kamper …');
  await ferdig();
  assert.equal(ui.felter.kampstatus.textContent, 'Ingen kamper tilgjengelig.');
  assert.equal(ui.felter.tidligere.textContent, 'Ingen tidligere kamper.');
  for (const fetch of [async () => { throw Error('offline'); },
    async () => ({ ok: false }), async () => ({ ok: true, json: async () => ({}) })]) {
    const feil = frontend(fetch);
    await ferdig();
    assert.match(feil.felter.kampstatus.textContent, /Kunne ikke hente/);
    await feil.context.hentKamp(999);
    await ferdig();
    assert.equal(feil.felter.besokknapp.disabled, true);
    assert.match(feil.felter.detaljstatus.textContent, /Kunne ikke hente/);
  }
});

test('frontend sorts dates, handles missing fields, and treats club names as text', async () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [
    { match_id: 2, match_date: '2099-02-01', home_club_name: '<img onerror=alert(1)>' },
    { match_id: 1, match_date: '2099-01-01' }
  ] }) }));
  await ferdig();
  const kort = ui.felter.kommende.children;
  assert.equal(kort.length, 2);
  assert.match(kort[0].children[0].textContent, /Ukjent hjemmelag/);
  assert.match(kort[1].children[0].textContent, /<img/);
  assert.match(kort[0].children[1].textContent, /Stadion mangler/);
});

test('feed renders actual API posts newest first, as text, without changing test data', async t => {
  const os = require('node:os');
  const dbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stadion-feed-'));
  fs.writeFileSync(path.join(dbDir, 'Users.json'), JSON.stringify([{ user_id: 1, username: 'Testforfatter' }]));
  fs.writeFileSync(path.join(dbDir, 'Posts.json'), JSON.stringify([
    { post_id: 1, user_id: 1, created_at: '2026-10-01T12:00:00Z', content: 'Eldre innlegg' },
    { post_id: 2, user_id: 1, created_at: '2026-10-02T12:00:00Z', content: '<img onerror=alert(1)>\nNy linje' }
  ]));
  const server = createServer({ dbDir });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); fs.rmSync(dbDir, { recursive: true }); });
  const base = 'http://127.0.0.1:' + server.address().port;
  const ui = frontend(url => fetch(base + url));
  ui.context.visSide('feed');
  assert.equal(ui.felter.feedstatus.textContent, 'Laster innlegg …');
  for (let i = 0; i < 100 && ui.felter.feedstatus.textContent === 'Laster innlegg …'; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  assert.equal(ui.felter.feedstatus.textContent, '');
  assert.equal(ui.felter.innlegg.children.length, 2);
  const kort = ui.felter.innlegg.children[0];
  assert.equal(kort.children[0].textContent, 'Testforfatter');
  assert.ok(kort.children[1].textContent);
  assert.equal(kort.children[2].textContent, '<img onerror=alert(1)>\nNy linje');
  assert.equal(ui.felter.innlegg.children[1].children[2].textContent, 'Eldre innlegg');
  assert.equal(ui.felter.feed.style.display, 'block');
});

test('feed handles empty, failed and malformed replies; retry replaces previous cards', async () => {
  let posts = [{ author_name: null, created_at: null, content: 'Test' }];
  let response = () => Promise.resolve({ ok: true, json: async () => ({ posts }) });
  const ui = frontend(url => url === '/api/posts' ? response() : Promise.resolve({ ok: true, json: async () => ({ matches: [] }) }));
  ui.context.visSide('feed');
  await ferdig();
  assert.equal(ui.felter.innlegg.children[0].children[0].textContent, 'Ukjent forfatter');
  assert.equal(ui.felter.innlegg.children[0].children[1].textContent, 'Tidspunkt mangler');
  posts = [];
  ui.context.hentInnlegg();
  await ferdig();
  assert.equal(ui.felter.feedstatus.textContent, 'Ingen innlegg ennå.');
  assert.equal(ui.felter.innlegg.children.length, 0);
  for (const feil of [() => Promise.reject(Error('offline')), () => Promise.resolve({ ok: false }),
    () => Promise.resolve({ ok: true, json: async () => ({ posts: null }) })]) {
    response = feil;
    ui.context.hentInnlegg();
    await ferdig();
    assert.match(ui.felter.feedstatus.textContent, /Kunne ikke hente innlegg/);
  }
  response = () => Promise.resolve({ ok: true, json: async () => ({ posts: [{ content: 'Ny prøve' }] }) });
  ui.context.hentInnlegg();
  await ferdig();
  assert.equal(ui.felter.feedstatus.textContent, '');
  assert.equal(ui.felter.innlegg.children.length, 1);
});

test('GitHub Pages uses the static demo file for matches, details and social feed', async () => {
  const demo = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'demo', 'data.json'), 'utf8'));
  const requests = [];
  const ui = frontend(async url => {
    requests.push(url);
    return { ok: true, json: async () => demo };
  }, 'inetiger.github.io');

  await ferdig();
  assert.match(ui.felter.demostatus.textContent, /fiktive data/);
  assert.equal(ui.felter.kommende.children.length + ui.felter.tidligere.children.length, demo.matches.length);
  assert.ok(requests.every(url => url === 'demo/data.json'));

  const kort = [...ui.felter.kommende.children, ...ui.felter.tidligere.children].find(item => item.children[2].onclick);
  kort.children[2].onclick();
  await ferdig();
  assert.equal(ui.felter.detaljnavn.textContent, kort.children[0].textContent);

  ui.context.visSide('feed');
  await ferdig();
  assert.equal(ui.felter.innlegg.children.length, demo.posts.length);
  assert.equal(ui.felter.innlegg.children[0].children[0].textContent, demo.posts[0].author_name);
  assert.ok(requests.every(url => url === 'demo/data.json'));
});
