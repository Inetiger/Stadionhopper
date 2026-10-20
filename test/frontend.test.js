const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { createServer } = require('../server');

// Lite DOM-testmiljø: kontrollerer faktisk visningslogikk, ikke nettleserlayout.
function frontend(fetch) {
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
  const context = vm.createContext({ document, fetch, Date, console });
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
