const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { createServer } = require('../../server');
const { createTestAuthStore } = require('./auth');

function element() {
  let tekst = '';
  return {
    style: {},
    children: [],
    disabled: false,
    value: '',
    onclick: null,
    get textContent() { return tekst; },
    set textContent(value) { tekst = value; this.children = []; },
    appendChild(child) { this.children.push(child); }
  };
}

function frontend(fetch, hostname = 'localhost') {
  const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
  const felter = {};
  for (const match of html.matchAll(/id="([^"]+)"/g)) felter[match[1]] = element();
  const sider = [...html.matchAll(/id="([^"]+)" class="side"/g)].map(match => felter[match[1]]);
  const document = {
    getElementById: id => felter[id],
    getElementsByClassName: () => sider,
    createElement: element
  };
  const context = vm.createContext({ document, fetch, Date, console, location: { hostname } });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../script.js'), 'utf8'), context);
  return { context, felter };
}

function createCookieFetch(base) {
  let cookie = '';
  return async function cookieFetch(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (cookie) headers.set('Cookie', cookie);
    const response = await fetch(base + url, { ...options, headers });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) cookie = setCookie.split(';')[0];
    return response;
  };
}

function createFixtureDatabase(checkIns) {
  const source = path.join(__dirname, '../fixtures');
  const dbDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stadionhopper-ui-'));
  for (const filename of fs.readdirSync(source).filter(name => name.endsWith('.json'))) {
    fs.copyFileSync(path.join(source, filename), path.join(dbDir, filename));
  }
  if (checkIns) fs.writeFileSync(path.join(dbDir, 'Check_ins.json'), JSON.stringify(checkIns, null, 2) + '\n');
  return dbDir;
}

async function startTestServer(t, options = {}) {
  const dbDir = createFixtureDatabase(options.checkIns);
  const server = createServer({ dbDir, authStore: createTestAuthStore() });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    await new Promise(resolve => server.close(resolve));
    fs.rmSync(dbDir, { recursive: true, force: true });
  });
  return { base: 'http://127.0.0.1:' + server.address().port, dbDir };
}

async function waitFor(predicate, message = 'Timed out waiting for frontend state') {
  for (let attempt = 0; attempt < 200; attempt++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error(message);
}

module.exports = { frontend, createCookieFetch, startTestServer, waitFor };
