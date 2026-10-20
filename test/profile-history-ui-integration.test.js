const test = require('node:test');
const assert = require('node:assert/strict');
const { frontend, createCookieFetch, startTestServer, waitFor } = require('./helpers/frontend');

test('profile history is loaded from the active session and isolated between two users', async t => {
  const checkIns = [
    { check_in_id: 1, checked_in_at: '2026-10-19T10:00:00.000Z', user_id: 1, match_id: 100 },
    { check_in_id: 2, checked_in_at: '2026-10-18T10:00:00.000Z', user_id: 2, match_id: 101 }
  ];
  const { base } = await startTestServer(t, { checkIns });
  const apiFetch = createCookieFetch(base);
  const ui = frontend(apiFetch);
  await waitFor(() => ui.felter.kampstatus.textContent !== 'Laster kamper …');

  ui.felter.brukernavn.value = 'Testbruker';
  ui.felter.passord.value = 'test-only-password-one';
  await ui.context.velgTestprofil();
  await waitFor(() => ui.felter.historikk.children.length === 1);
  const firstUserMatch = ui.felter.historikk.children[0].children[0].textContent;
  assert.equal(ui.felter.profilnavn.textContent, 'Testbruker');
  assert.match(ui.felter.historikk.children[0].children[1].textContent, /Aker Stadion/);

  await ui.context.avsluttTestprofil();
  ui.felter.brukernavn.value = 'Testbruker2';
  ui.felter.passord.value = 'test-only-password-two';
  await ui.context.velgTestprofil();
  await waitFor(() => ui.felter.historikk.children.length === 1 &&
    ui.felter.historikk.children[0].children[0].textContent !== firstUserMatch);
  assert.equal(ui.felter.profilnavn.textContent, 'Testbruker2');
  assert.match(ui.felter.historikk.children[0].children[1].textContent, /Riksfjord Stadion/);
  assert.notEqual(ui.felter.historikk.children[0].children[0].textContent, firstUserMatch);
});
