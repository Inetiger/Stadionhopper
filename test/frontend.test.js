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
  ui.context.aktivBruker = { user_id: 'test:a', username: 'A' };
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

test('profile switches between two users without retaining the previous history', () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  const visits = [
    { user_id: 1, checked_in_at: '2026-10-01', home_club_name: 'Eldre', stadium_name: 'Testbane' },
    { user_id: 2, checked_in_at: '2026-10-03', home_club_name: 'Annen bruker' },
    { user_id: 1, checked_in_at: '2026-10-02', home_club_name: '<img onerror=alert(1)>' }
  ];
  ui.context.visProfil({ user_id: 1, username: 'Test A' }, visits);
  assert.equal(ui.felter.profilnavn.textContent, 'Test A');
  assert.equal(ui.felter.historikk.children.length, 2);
  assert.match(ui.felter.historikk.children[0].children[0].textContent, /<img/);
  ui.context.visProfil({ user_id: 2, username: 'Test B' }, visits);
  assert.equal(ui.felter.profilnavn.textContent, 'Test B');
  assert.equal(ui.felter.historikk.children.length, 1);
  assert.match(ui.felter.historikk.children[0].children[0].textContent, /Annen bruker/);
  ui.context.visProfil({ user_id: 2, username: 'Test B' }, []);
  assert.equal(ui.felter.historikk.textContent, 'Ingen kampbesøk ennå.');
  ui.context.profilstatus('Laster profil …');
  assert.equal(ui.felter.profilnavn.textContent, '');
  assert.equal(ui.felter.historikk.children.length, 0);
});

test('profile clears stale data on missing user or invalid history and handles absent fields', () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  ui.context.visProfil({ user_id: 1 }, [{ user_id: 1 }]);
  assert.equal(ui.felter.profilnavn.textContent, 'Ukjent brukernavn');
  assert.match(ui.felter.historikk.children[0].children[1].textContent, /Besøksdato mangler/);
  ui.context.visProfil(null, []);
  assert.match(ui.felter.profilstatus.textContent, /Ingen testprofil/);
  assert.equal(ui.felter.historikk.children.length, 0);
  ui.context.visProfil({ user_id: 1 }, null);
  assert.match(ui.felter.profilstatus.textContent, /Kunne ikke vise/);
  assert.equal(ui.felter.profilnavn.textContent, '');
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

test('test profile validates name, fetches real fixture users and clears old history', async () => {
  const ui = frontend(async url => {
    if (url === '/api/login') {
      const { username } = JSON.parse(arguments[1]?.body || '{}');
      return { ok: true, json: async () => ({ user: { user_id: username === 'Test A' ? 11 : 12, username } }) };
    }
    if (url === '/api/check-ins') return { ok: true, json: async () => ({ check_ins: [] }) };
    return { ok: true, json: async () => ({ matches: [] }) };
  });
  ui.felter.brukernavn.value = '   ';
  await ui.context.velgTestprofil();
  assert.equal(ui.context.aktivBruker, null);
  assert.match(ui.felter.brukerstatus.textContent, /Skriv brukernavn og passord/);
  ui.felter.brukernavn.value = '  Test A  ';
  ui.felter.passord.value = 'fake-password';
  await ui.context.velgTestprofil();
  await ferdig();
  assert.equal(ui.context.aktivBruker.username, 'Test A');
  assert.equal(ui.felter.profilnavn.textContent, 'Test A');
  assert.equal(ui.felter.profil.style.display, 'block');
  ui.context.visProfil(ui.context.aktivBruker, [{ user_id: 'test:test a', home_club_name: 'Gammel historikk' }]);
  ui.felter.brukernavn.value = '<b>Test B</b>';
  ui.felter.passord.value = 'fake-password';
  await ui.context.velgTestprofil();
  await ferdig();
  assert.equal(ui.felter.profilnavn.textContent, '<b>Test B</b>');
  assert.equal(ui.felter.historikk.children.length, 0);
  assert.equal(ui.felter.profilstatus.textContent, ''); // Historikken er lastet fra backend.
  await ui.context.avsluttTestprofil();
  assert.equal(ui.context.aktivBruker, null);
  assert.equal(ui.felter.profilnavn.textContent, '');
  assert.equal(ui.felter.brukernavn.value, '');
  assert.equal(ui.felter.innlogging.style.display, 'block');
});

test('test profile rejects long names and a fresh page has no active profile', async () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  ui.felter.brukernavn.value = 'x'.repeat(41);
  await ui.context.velgTestprofil();
  assert.equal(ui.context.aktivBruker, null);
  const ny = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  assert.equal(ny.context.aktivBruker, null);
});

test('check-in blocks missing profile or backend and never claims storage happened', () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  ui.context.klargjorBesok();
  assert.equal(ui.felter.bekreftbesok.disabled, true);
  assert.match(ui.felter.besokstatus.textContent, /testprofil/);
  ui.context.aktivBruker = { user_id: 'test:a', username: 'A' };
  ui.context.valgtKamp = { match_id: 1 };
  ui.context.klargjorBesok();
  assert.equal(ui.felter.bekreftbesok.disabled, false);
  assert.match(ui.felter.besokstatus.textContent, /Kontroller kamp/);
});

test('check-in preserves selection on error, allows retry, blocks double submit and confirms after success', async () => {
  const ui = frontend(async () => ({ ok: true, json: async () => ({ matches: [] }) }));
  ui.context.aktivBruker = { user_id: 'test:a', username: 'A' };
  ui.context.valgtKamp = { match_id: 7 };
  ui.context.lagreBesok = async () => { throw Error('testfeil'); };
  await ui.context.bekreftBesok();
  assert.match(ui.felter.besokstatus.textContent, /Kunne ikke lagre/);
  assert.equal(ui.felter.bekreftbesok.disabled, false);
  assert.equal(ui.context.valgtKamp.match_id, 7);
  let ferdigLagring;
  let antall = 0;
  ui.context.lagreBesok = (bruker, id) => {
    antall++;
    assert.equal(bruker.username, 'A');
    assert.equal(id, 7);
    return new Promise(resolve => { ferdigLagring = resolve; });
  };
  const vent = ui.context.bekreftBesok();
  assert.equal(ui.felter.bekreftbesok.disabled, true);
  await ui.context.bekreftBesok();
  assert.equal(antall, 1);
  assert.match(ui.felter.besokstatus.textContent, /Lagrer/);
  ferdigLagring();
  await vent;
  assert.match(ui.felter.besokstatus.textContent, /er bekreftet/);
  assert.equal(ui.felter.bekreftbesok.disabled, true);
});


test('selected match survives profile selection and resumes check-in confirmation', async () => {
  const ui = frontend(async (url, options) => url === '/api/login'
    ? { ok: true, json: async () => ({ user: { user_id: 11, username: JSON.parse(options.body).username } }) }
    : url === '/api/check-ins'
      ? { ok: true, json: async () => ({ check_ins: [] }) }
      : { ok: true, json: async () => ({ matches: [] }) });
  ui.context.valgtKamp = { match_id: 7, home_club_name: 'Testlag', stadium_name: 'Testbane' };
  ui.context.visValgtBesok();
  assert.equal(ui.felter.innlogging.style.display, 'block');
  assert.equal(ui.context.valgtKamp.match_id, 7);
  ui.felter.brukernavn.value = '  ';
  await ui.context.velgTestprofil();
  assert.equal(ui.context.ventendeBesok, true);
  ui.felter.brukernavn.value = 'Test';
  ui.felter.passord.value = 'fake-password';
  await ui.context.velgTestprofil();
  assert.equal(ui.felter.innsjekking.style.display, 'block');
  assert.equal(ui.felter.stadionnavn.textContent, 'Testbane');
  assert.match(ui.felter.kampnavn.textContent, /Testlag/);
  assert.equal(ui.context.ventendeBesok, false);
  assert.equal(ui.felter.bekreftbesok.disabled, false); // Backend-integrasjonen gjør knappen tilgjengelig.
});

test('cancelled check-in does not unexpectedly resume after profile selection', async () => {
  const ui = frontend(async (url, options) => url === '/api/login'
    ? { ok: true, json: async () => ({ user: { user_id: 11, username: JSON.parse(options.body).username } }) }
    : url === '/api/check-ins'
      ? { ok: true, json: async () => ({ check_ins: [] }) }
      : { ok: true, json: async () => ({ matches: [] }) });
  ui.context.valgtKamp = { match_id: 7 };
  ui.context.visValgtBesok();
  ui.context.avbrytBesok();
  ui.felter.brukernavn.value = 'Test';
  await ui.context.velgTestprofil();
  assert.equal(ui.felter.profil.style.display, 'block');
  await ui.context.avsluttTestprofil();
  assert.equal(ui.context.valgtKamp, null);
  assert.equal(ui.context.ventendeBesok, false);
});
