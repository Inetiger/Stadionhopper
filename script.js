// Sidebytte som i W3Schools sitt eksempel om faner (tabs).
function visSide(navn) {
  var sider = document.getElementsByClassName('side');
  for (var nummer = 0; nummer < sider.length; nummer++) {
    sider[nummer].style.display = 'none';
  }
  document.getElementById(navn).style.display = 'block';
  if (navn === 'feed') hentInnlegg();
  if (navn === 'profil') hentProfilHistorikk();
}

function visKamper() {
  renderKalender();
}

function visMaaned(forskyvning) {
  kalenderMaaned.setMonth(kalenderMaaned.getMonth() + forskyvning, 1);
  renderKalender();
}

function datoNokkel(dato) {
  return dato.getFullYear() + '-' + String(dato.getMonth() + 1).padStart(2, '0') +
    '-' + String(dato.getDate()).padStart(2, '0');
}

function renderKalender() {
  var kalender = document.getElementById('kampkalender');
  if (!kalender) return;
  kalender.textContent = '';
  var aar = kalenderMaaned.getFullYear();
  var maaned = kalenderMaaned.getMonth();
  var maanedsnøkkel = aar + '-' + String(maaned + 1).padStart(2, '0');
  document.getElementById('kalendertittel').textContent =
    kalenderMaaned.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' });

  var kamperPerDag = {};
  kamper.forEach(function(kamp) {
    var dato = new Date(kamp.match_date || '');
    if (isNaN(dato.getTime()) || dato.getFullYear() !== aar || dato.getMonth() !== maaned) return;
    var nokkel = datoNokkel(dato);
    if (!kamperPerDag[nokkel]) kamperPerDag[nokkel] = [];
    kamperPerDag[nokkel].push(kamp);
  });

  ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].forEach(function(dag) {
    var overskrift = document.createElement('div');
    overskrift.className = 'ukedag';
    overskrift.textContent = dag;
    kalender.appendChild(overskrift);
  });

  var forste = new Date(aar, maaned, 1);
  var startdag = (forste.getDay() + 6) % 7;
  var antallDager = new Date(aar, maaned + 1, 0).getDate();
  for (var tom = 0; tom < startdag; tom++) {
    var blank = document.createElement('div');
    blank.className = 'kalenderdag tom';
    if (blank.setAttribute) blank.setAttribute('aria-hidden', 'true');
    kalender.appendChild(blank);
  }

  for (var dagNummer = 1; dagNummer <= antallDager; dagNummer++) {
    var dato = new Date(aar, maaned, dagNummer);
    var nokkel = datoNokkel(dato);
    var celle = document.createElement('section');
    celle.className = 'kalenderdag';
    if (nokkel === valgtDato) celle.className += ' valgt-dag';

    var datoknapp = document.createElement('button');
    datoknapp.type = 'button';
    datoknapp.className = 'kalenderdato';
    datoknapp.textContent = String(dagNummer);
    if (datoknapp.setAttribute) datoknapp.setAttribute('aria-label',
      dato.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' }));
    datoknapp.onclick = function(dagNokkel) {
      return function() { velgKalenderdag(dagNokkel); };
    }(nokkel);
    celle.appendChild(datoknapp);

    (kamperPerDag[nokkel] || []).forEach(function(kamp) {
      var kampknapp = document.createElement('button');
      kampknapp.type = 'button';
     
      kampknapp.className = 'kalenderkamp';
      var tidspunkt = new Date(kamp.match_date);

      if (!isNaN(tidspunkt.getTime()) && tidspunkt < new Date()) {
  kampknapp.className += ' kalenderkamp-tidligere';
}
      kampknapp.textContent = tidspunkt.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }) +
        ' ' + kampnavn(kamp);
      if (kamp.stadium_name) kampknapp.title = kamp.stadium_name;
      kampknapp.onclick = function(id) {
        return function() { hentKamp(id); };
      }(kamp.match_id);
      celle.appendChild(kampknapp);
    });
    kalender.appendChild(celle);
  }

  if (!valgtDato || valgtDato.slice(0, 7) !== maanedsnøkkel) {
    var iDag = new Date();
    valgtDato = datoNokkel(iDag.getFullYear() === aar && iDag.getMonth() === maaned ? iDag : forste);
  }
  velgKalenderdag(valgtDato, true);
}

function velgKalenderdag(nokkel, ikkeRender) {
  valgtDato = nokkel;
  var dag = new Date(nokkel + 'T12:00:00');
  document.getElementById('dagstitel').textContent =
    dag.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  var liste = document.getElementById('dagliste');
  liste.textContent = '';
  var funnet = kamper.filter(function(kamp) {
    var dato = new Date(kamp.match_date || '');
    return !isNaN(dato.getTime()) && datoNokkel(dato) === nokkel;
  }).sort(function(a, b) { return String(a.match_date || '').localeCompare(String(b.match_date || '')); });
  if (!funnet.length) {
    liste.textContent = 'Ingen kamper denne dagen.';
  } else {
    funnet.forEach(function(kamp) {
      var kort = document.createElement('article');
      var navn = document.createElement('h3');
      var info = document.createElement('p');
      var knapp = document.createElement('button');
      navn.textContent = kampnavn(kamp);
      info.textContent = new Date(kamp.match_date).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }) +
        ' · ' + (kamp.stadium_name || 'Stadion mangler');
      knapp.textContent = 'Se kampdetaljer →';
      knapp.disabled = kamp.match_id == null;
      knapp.onclick = function() { hentKamp(kamp.match_id); };
      kort.appendChild(navn); kort.appendChild(info); kort.appendChild(knapp);
      liste.appendChild(kort);
    });
  }
  if (!ikkeRender) renderKalenderUtenDag();
}

function renderKalenderUtenDag() {
  var celler = document.getElementById('kampkalender').children;
  for (var i = 7; i < celler.length; i++) {
    var celle = celler[i];
    if (!celle.className || celle.className.indexOf('kalenderdag') < 0) continue;
    celle.className = celle.className.replace(' valgt-dag', '');
    var datoknapp = celle.children[0];
    if (datoknapp && parseInt(datoknapp.textContent, 10) &&
      valgtDato === kalenderMaaned.getFullYear() + '-' +
      String(kalenderMaaned.getMonth() + 1).padStart(2, '0') + '-' +
      String(parseInt(datoknapp.textContent, 10)).padStart(2, '0')) {
      celle.className += ' valgt-dag';
    }
  }
}

function visKamp(navn, dato, stadion) {
  document.getElementById('kampnavn').textContent = navn;
  document.getElementById('kampdato').textContent = dato;
  document.getElementById('stadionnavn').textContent = stadion;
  visSide('innsjekking');
  klargjorBesok();
}

// W3Schools: Fetch API, DOM Nodes, Array sort og Date.
var valgtKamp;
var listekall = 0;
var detaljkall = 0;

function kampnavn(kamp) {
  return (kamp.home_club_name || 'Ukjent hjemmelag') + ' – ' +
    (kamp.away_club_name || 'Ukjent bortelag');
}


function kampdato(kamp) {
    var dato = new Date(kamp.match_date || '');
    return isNaN(dato.getTime()) ? 'Tidspunkt mangler' :
        dato.toLocaleString('nb-NO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
}


// GitHub Pages serverer bare statiske filer, ikke Node-API-et.
var demomodus = location.hostname === 'inetiger.github.io';
if (demomodus) {
  document.getElementById('demostatus').textContent =
    'Demo · fiktive testkontoer · innsjekkinger lagres i denne nettleseren.';
}

// Dette er med vilje en offentlig demo: aldri bruk ekte passord eller personopplysninger her.
var demoCheckinsMemory = [];
function demoLesInnsjekkinger() {
  try {
    if (typeof localStorage !== 'undefined') {
      var lagret = localStorage.getItem('stadionhopper-demo-checkins');
      if (lagret) {
        var parsed = JSON.parse(lagret);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (feil) { /* Fortsett med minnebasert lagring. */ }
  return demoCheckinsMemory.slice();
}
function demoSkrivInnsjekkinger(innsjekkinger) {
  demoCheckinsMemory = innsjekkinger.slice();
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('stadionhopper-demo-checkins', JSON.stringify(innsjekkinger));
    }
  } catch (feil) { /* Innsjekkingen virker i denne fanen selv uten varig lagring. */ }
}

function hentData(adresse) {
  var kilde = demomodus ? 'demo/data.json' : adresse;
  return fetch(kilde).then(function(svar) {
    if (!svar.ok) throw new Error('Kunne ikke hente data');
    return svar.json();
  }).then(function(data) {
    if (!demomodus) return data;
    if (adresse === '/api/matches') return { matches: data.matches };
    if (adresse === '/api/posts') return { posts: data.posts };
    var id = decodeURIComponent(adresse.split('/').pop());
    var kamp = data.matches.find(function(kamp) { return String(kamp.match_id) === id; });
    if (!kamp) throw new Error('Fant ikke kampen');
    return { match: kamp };
  });
}

var kamper = [];
var kalenderMaaned = new Date();
kalenderMaaned.setDate(1);
var valgtDato = '';
document.getElementById('forrigemnd').onclick = function() { visMaaned(-1); };
document.getElementById('nestemnd').onclick = function() { visMaaned(1); };

function hentKamper() {
  var kall = ++listekall;
  var status = document.getElementById('kampstatus');
  status.textContent = 'Laster kamper …';
  hentData('/api/matches').then(function(data) {
    if (kall !== listekall) return;
    if (!Array.isArray(data.matches)) throw new Error('Ugyldig kampliste');
    kamper = data.matches.slice().filter(function(kamp) {
      return kamp.match_date && !isNaN(new Date(kamp.match_date).getTime());
    }).sort(function(a, b) {
      return String(a.match_date || '').localeCompare(String(b.match_date || ''));
    });
    status.textContent = kamper.length ? '' : 'Ingen kamper tilgjengelig.';
    renderKalender();
  }).catch(function() {
    if (kall === listekall) status.textContent = 'Kunne ikke hente kamper. Prøv på nytt.';
  });
}

function hentKamp(id) {
  var kall = ++detaljkall;
  visSide('kampdetaljer');
  valgtKamp = null;
  document.getElementById('besokknapp').disabled = true;
  document.getElementById('detaljkort').style.display = 'none';
  document.getElementById('detaljstatus').textContent = 'Laster kamp …';
  hentData('/api/matches/' + encodeURIComponent(id)).then(function(data) {
    if (kall !== detaljkall) return;
    if (!data.match || String(data.match.match_id) !== String(id)) throw new Error('Ugyldig kamp');
    valgtKamp = data.match;
    document.getElementById('detaljnavn').textContent = kampnavn(valgtKamp);
    document.getElementById('detaljdato').textContent = kampdato(valgtKamp);
    document.getElementById('detaljstadion').textContent = valgtKamp.stadium_name || 'Stadion mangler';
    document.getElementById('detaljkort').style.display = 'block';
    document.getElementById('detaljstatus').textContent = '';
    document.getElementById('besokknapp').disabled = false;
  }).catch(function() {
    if (kall !== detaljkall) return;
    document.getElementById('detaljstatus').textContent = 'Kunne ikke hente kampen. Gå tilbake og prøv igjen.';
  });
}

var ventendeBesok = false;
function visValgtBesok() {
  if (valgtKamp && !aktivBruker) {
    ventendeBesok = true;
    visSide('innlogging');
    document.getElementById('brukerstatus').textContent = 'Velg en testprofil for å fortsette med valgt kamp.';
    return;
  }
  if (valgtKamp) visKamp(kampnavn(valgtKamp), kampdato(valgtKamp), valgtKamp.stadium_name || 'Stadion mangler');
}

visSide('innlogging');
visKamper();
document.getElementById('forrigemnd').onclick = function() { visMaaned(-1); };
document.getElementById('nestemnd').onclick = function() { visMaaned(1); };
hentKamper();

// Samme Fetch- og DOM-metoder som kampoversikten (W3Schools).
var feedkall = 0;
function hentInnlegg() {
  var kall = ++feedkall;
  var status = document.getElementById('feedstatus');
  var liste = document.getElementById('innlegg');
  liste.textContent = '';
  status.textContent = 'Laster innlegg …';
  hentData('/api/posts').then(function(data) {
    if (kall !== feedkall) return;
    if (!Array.isArray(data.posts)) throw new Error('Ugyldig feed');
    var innleggsliste = data.posts.slice();
    if (demomodus) {
      demoLesInnsjekkinger().forEach(function(besok, indeks) {
        innleggsliste.push({
          post_id: 'demo-checkin-' + indeks,
          author_name: besok.display_name || besok.username || 'Testbruker',
          created_at: besok.checked_in_at,
          content: 'sjekket inn på ' + (besok.stadium_name || 'et stadion') + ' (' + kampnavn(besok) + ').'
        });
      });
      innleggsliste.sort(function(a, b) {
        return String(b.created_at || '').localeCompare(String(a.created_at || ''));
      });
    }
    innleggsliste.forEach(function(innlegg) {
      var kort = document.createElement('article');
      var forfatter = document.createElement('h3');
      var tidspunkt = document.createElement('p');
      var tekst = document.createElement('p');
      var dato = new Date(innlegg.created_at || '');
      forfatter.textContent = innlegg.author_name || 'Ukjent forfatter';
      tidspunkt.textContent = isNaN(dato.getTime()) ? 'Tidspunkt mangler' : dato.toLocaleString('nb-NO');
      tekst.textContent = innlegg.content || 'Innhold mangler';
      kort.appendChild(forfatter);
      kort.appendChild(tidspunkt);
      kort.appendChild(tekst);
      liste.appendChild(kort);
    });
    status.textContent = innleggsliste.length ? '' : 'Ingen innlegg ennå.';
  }).catch(function() {
    if (kall === feedkall) status.textContent = 'Kunne ikke hente innlegg. Prøv på nytt.';
  });
}

// Profil og historikk hentes fra backend når lokal API er tilgjengelig.
function profilstatus(melding) {
  document.getElementById('profilnavn').textContent = '';
  document.getElementById('historikk').textContent = '';
  document.getElementById('profilstatus').textContent = melding;
}

function visProfil(bruker, innsjekkinger) {
  profilstatus('');
  if (!bruker || bruker.user_id == null) {
    profilstatus('Ingen testprofil er valgt. Velg en testprofil først.');
    return;
  }
  if (!Array.isArray(innsjekkinger)) {
    profilstatus('Kunne ikke vise historikken. Prøv igjen senere.');
    return;
  }
  document.getElementById('profilnavn').textContent = bruker.username || 'Ukjent brukernavn';
  // Lokal avgrensning er ekstra kontroll, ikke autentisering eller tilgangsvern.
  var egne = innsjekkinger.filter(function(besok) {
    return besok && besok.user_id != null && String(besok.user_id) === String(bruker.user_id);
  });
  egne.sort(function(a, b) {
    return String(b.checked_in_at || '').localeCompare(String(a.checked_in_at || ''));
  });
  var liste = document.getElementById('historikk');
  if (!egne.length) liste.textContent = 'Ingen kampbesøk ennå.';
  egne.forEach(function(besok) {
    var kort = document.createElement('article');
    var navn = document.createElement('h3');
    var info = document.createElement('p');
    var dato = new Date(besok.checked_in_at || '');
    navn.textContent = kampnavn(besok);
    info.textContent = (isNaN(dato.getTime()) ? 'Besøksdato mangler' : dato.toLocaleString('nb-NO')) +
      ' · ' + (besok.stadium_name || 'Stadion mangler');
    kort.appendChild(navn);
    kort.appendChild(info);
    liste.appendChild(kort);
  });
}

// Innlogging gir en serverstyrt økt; frontend sender aldri bruker-ID som autorisasjon.
var aktivBruker = null;
async function velgTestprofil() {
  var navn = document.getElementById('brukernavn').value.trim();
  var passord = document.getElementById('passord').value;
  var status = document.getElementById('brukerstatus');
  if (!navn || navn.length > 40 || !passord) {
    status.textContent = 'Skriv brukernavn og passord.';
    return;
  }
  status.textContent = 'Kontrollerer testkonto …';
  if (demomodus) {
    try {
      var demoSvar = await fetch('demo/data.json');
      if (!demoSvar.ok) throw new Error('Kunne ikke hente testkontoer.');
      var demoData = await demoSvar.json();
      var demoBruker = (demoData.users || []).find(function(bruker) {
        return String(bruker.username || '').toLowerCase() === navn.toLowerCase() && bruker.password === passord;
      });
      if (!demoBruker) throw new Error('Feil brukernavn eller passord. Prøv en av testkontoene som vises.');
      aktivBruker = { user_id: demoBruker.user_id, username: demoBruker.username,
        display_name: demoBruker.display_name || demoBruker.username,
        favorite_club: demoBruker.favorite_club || '' };
      status.textContent = '';
      document.getElementById('passord').value = '';
      profilstatus('Innlogget testkonto · fiktiv profil for demonstrasjon.');
      document.getElementById('profilnavn').textContent = aktivBruker.display_name +
        (aktivBruker.favorite_club ? ' · Favorittlag: ' + aktivBruker.favorite_club : '');
      if (ventendeBesok && valgtKamp) { ventendeBesok = false; visValgtBesok(); }
      else visSide('profil');
    } catch (feil) { aktivBruker = null; status.textContent = feil.message || 'Kunne ikke logge inn.'; }
    return;
  }
  status.textContent = 'Logger inn …';
  try {
    var svar = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ username: navn, password: passord })
    });
    var data = await svar.json();
    if (!svar.ok || !data.user || data.user.user_id == null) throw new Error(data.error || 'Kunne ikke logge inn.');
    aktivBruker = data.user;
    status.textContent = '';
    document.getElementById('passord').value = '';
    profilstatus('Innlogget testkonto. Økten håndteres av backend.');
    document.getElementById('profilnavn').textContent = aktivBruker.username;
    if (ventendeBesok && valgtKamp) {
      ventendeBesok = false;
      visValgtBesok();
    } else visSide('profil');
  } catch (feil) {
    aktivBruker = null;
    status.textContent = feil.message || 'Kunne ikke logge inn. Kontroller at backend kjører.';
  }
}

async function hentProfilHistorikk() {
  if (!aktivBruker) {
    profilstatus('Ingen testprofil er valgt. Velg en testprofil først.');
    return;
  }
  if (demomodus) {
    visProfil(aktivBruker, demoLesInnsjekkinger());
    return;
  }
  document.getElementById('historikk').textContent = '';
  document.getElementById('profilstatus').textContent = 'Laster profil og historikk …';
  try {
    var svar = await fetch('/api/check-ins', { headers: { Accept: 'application/json' } });
    var data = await svar.json();
    if (!svar.ok || !Array.isArray(data.check_ins)) throw new Error(data.error || 'Kunne ikke hente historikk.');
    visProfil(aktivBruker, data.check_ins);
  } catch (feil) {
    profilstatus('Kunne ikke hente historikk. Kontroller at backend kjører, og prøv igjen.');
  }
}

async function avsluttTestprofil() {
  ventendeBesok = false;
  valgtKamp = null;
  try {
    if (!demomodus) await fetch('/api/logout', { method: 'POST', headers: { Accept: 'application/json' } });
  } catch (feil) {
    // Lokal tilstand ryddes uansett; serverøkt utløper også automatisk.
  }
  aktivBruker = null;
  profilstatus('Ingen testprofil er valgt.');
  document.getElementById('brukernavn').value = '';
  document.getElementById('passord').value = '';
  document.getElementById('brukerstatus').textContent = '';
  visSide('innlogging');
}

// #56: skriv til API-et og avvis Promise ved HTTP-/nettverksfeil.
async function lagreBesok(bruker, kampId) {
  if (demomodus) {
    var innsjekkinger = demoLesInnsjekkinger();
    var eksisterende = innsjekkinger.find(function(besok) {
      return String(besok.user_id) === String(bruker.user_id) && String(besok.match_id) === String(kampId);
    });
    if (eksisterende) return eksisterende;
    var kamp = kamper.find(function(element) { return String(element.match_id) === String(kampId); }) || valgtKamp || {};
    var ny = { check_in_id: Date.now(), user_id: bruker.user_id, username: bruker.username,
      display_name: bruker.display_name || bruker.username, match_id: kamp.match_id == null ? kampId : kamp.match_id,
      home_club_name: kamp.home_club_name || 'Ukjent hjemmelag', away_club_name: kamp.away_club_name || 'Ukjent bortelag',
      stadium_name: kamp.stadium_name || 'Stadion mangler', checked_in_at: new Date().toISOString() };
    innsjekkinger.push(ny);
    demoSkrivInnsjekkinger(innsjekkinger);
    return ny;
  }
  var svar = await fetch('/api/check-ins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ match_id: kampId })
  });
  var data = await svar.json();
  if (!svar.ok || !data.check_in) throw new Error(data.error || 'Kunne ikke lagre besøket.');
  return data.check_in;
}
var lagrerBesok = false;
var bekreftetBesok = '';

function klargjorBesok() {
  var status = document.getElementById('besokstatus');
  var knapp = document.getElementById('bekreftbesok');
  knapp.disabled = true;
  if (!aktivBruker) status.textContent = 'Velg en testprofil før du bekrefter besøket.';
  else if (!valgtKamp) status.textContent = 'Velg en kamp fra kampoversikten først.';
  else if (lagrerBesok) status.textContent = 'Lagrer besøket …';
  else if (bekreftetBesok === aktivBruker.user_id + ':' + valgtKamp.match_id)
    status.textContent = 'Besøket er bekreftet.';
  else {
    status.textContent = 'Kontroller kamp og stadion før du bekrefter.';
    knapp.disabled = false;
  }
}

async function bekreftBesok() {
  klargjorBesok();
  if (document.getElementById('bekreftbesok').disabled) return;
  var bruker = aktivBruker;
  var kamp = valgtKamp;
  lagrerBesok = true;
  klargjorBesok();
  try {
    await lagreBesok(bruker, kamp.match_id);
    bekreftetBesok = bruker.user_id + ':' + kamp.match_id;
    await hentProfilHistorikk();
    document.getElementById('besokstatus').textContent = demomodus ?
      'Besøket er lagret i denne nettleseren og vises i profilen og den sosiale feeden.' :
      'Besøket er lagret i backend.';
  } catch (feil) {
    lagrerBesok = false;
    if (aktivBruker === bruker && valgtKamp === kamp) {
      klargjorBesok();
      document.getElementById('besokstatus').textContent = 'Kunne ikke lagre besøket. Prøv igjen.';
      return;
    }
  }
  lagrerBesok = false;
  klargjorBesok();
}

function avbrytBesok() {
  ventendeBesok = false;
  visSide('kamper');
}

async function gjenopprettOkt() {
  if (demomodus) return;
  try {
    var svar = await fetch('/api/session', { headers: { Accept: 'application/json' } });
    if (!svar.ok) return;
    var data = await svar.json();
    if (data.user && data.user.user_id != null) {
      aktivBruker = data.user;
      profilstatus('Innlogget testkonto. Økten håndteres av backend.');
      document.getElementById('profilnavn').textContent = aktivBruker.username;
    }
  } catch (feil) {
    // Innlogging er ikke påkrevd for å utforske kamper.
  }
}
gjenopprettOkt();
