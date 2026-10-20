const test = require('node:test');
const assert = require('node:assert/strict');
const { frontend, createCookieFetch, startTestServer, waitFor } = require('./helpers/frontend');

test('frontend login creates a real backend session and logout invalidates it', async t => {
  const { base } = await startTestServer(t);
  const apiFetch = createCookieFetch(base);
  const ui = frontend(apiFetch);

  await waitFor(() => ui.felter.kampstatus.textContent !== 'Laster kamper …');
  ui.felter.brukernavn.value = 'Testbruker';
  ui.felter.passord.value = 'test-only-password-one';
  await ui.context.velgTestprofil();

  assert.equal(ui.context.aktivBruker.username, 'Testbruker');
  assert.equal(ui.felter.profil.style.display, 'block');
  assert.equal(ui.felter.passord.value, '');
  const session = await apiFetch('/api/session');
  assert.equal(session.status, 200);
  assert.deepEqual((await session.json()).user, { user_id: 1, username: 'Testbruker' });

  await ui.context.avsluttTestprofil();
  assert.equal(ui.context.aktivBruker, null);
  assert.equal(ui.felter.innlogging.style.display, 'block');
  assert.equal((await apiFetch('/api/session')).status, 401);
});
