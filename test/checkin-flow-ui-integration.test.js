const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { frontend, createCookieFetch, startTestServer, waitFor } = require('./helpers/frontend');

test('user can check in from match details and see the persisted visit in profile history', async t => {
  const { base, dbDir } = await startTestServer(t);
  const apiFetch = createCookieFetch(base);
  const ui = frontend(apiFetch);
  await waitFor(() => ui.felter.kampstatus.textContent !== 'Laster kamper …');

  ui.felter.brukernavn.value = 'Testbruker';
  ui.felter.passord.value = 'test-only-password-one';
  await ui.context.velgTestprofil();
  assert.equal(ui.context.aktivBruker.username, 'Testbruker');

  assert.ok(ui.context.kamper.length > 0, 'fixture should provide at least one match');
  const firstMatchDate = new Date(ui.context.kamper[0].match_date);
  ui.context.velgKalenderdag(ui.context.datoNokkel(firstMatchDate));
  const cards = [...ui.felter.dagliste.children];
  assert.ok(cards.length > 0, 'calendar should show the selected match date');
  const selectedCard = cards[0];
  const expectedMatchName = selectedCard.children[0].textContent;
  selectedCard.children[2].onclick();
  await waitFor(() => ui.felter.detaljstatus.textContent === '' && !ui.felter.besokknapp.disabled);

  ui.context.visValgtBesok();
  assert.equal(ui.felter.innsjekking.style.display, 'block');
  assert.equal(ui.felter.kampnavn.textContent, expectedMatchName);
  assert.equal(ui.felter.bekreftbesok.disabled, false);

  await ui.context.bekreftBesok();
  assert.match(ui.felter.besokstatus.textContent, /Besøket er bekreftet/);
  await waitFor(() => ui.felter.historikk.children.length === 1);

  const savedRows = JSON.parse(fs.readFileSync(path.join(dbDir, 'Check_ins.json'), 'utf8'));
  assert.equal(savedRows.length, 1);
  assert.equal(String(savedRows[0].user_id), '1');
  assert.equal(String(savedRows[0].match_id), String(ui.context.valgtKamp.match_id));
  assert.equal(ui.felter.historikk.children.length, 1);
  assert.match(ui.felter.historikk.children[0].children[0].textContent, /–/);
});
