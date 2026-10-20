// Sidebytte som i W3Schools sitt eksempel om faner (tabs).
function visSide(navn) {
  var sider = document.getElementsByClassName('side');
  for (var nummer = 0; nummer < sider.length; nummer++) {
    sider[nummer].style.display = 'none';
  }
  document.getElementById(navn).style.display = 'block';
  if (navn === 'feed') hentInnlegg();
}

function visKamper(navn) {
  document.getElementById('kommende').style.display = 'none';
  document.getElementById('tidligere').style.display = 'none';
  document.getElementById(navn).style.display = 'block';
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
  return isNaN(dato.getTime()) ? 'Tidspunkt mangler' : dato.toLocaleString('nb-NO');
}

// GitHub Pages serverer bare statiske filer, ikke Node-API-et.
var demomodus = location.hostname === 'inetiger.github.io';
if (demomodus) {
  document.getElementById('demostatus').textContent =
    'Demo · fiktive data · ingen innlogging eller lagring. Backend testes lokalt.';
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

function hentKamper() {
  var kall = ++listekall;
  var status = document.getElementById('kampstatus');
  status.textContent = 'Laster kamper …';
  document.getElementById('kommende').textContent = '';
  document.getElementById('tidligere').textContent = '';
  hentData('/api/matches').then(function(data) {
    if (kall !== listekall) return;
    if (!Array.isArray(data.matches)) throw new Error('Ugyldig kampliste');
    data.matches.sort(function(a, b) {
      return String(a.match_date || '').localeCompare(String(b.match_date || ''));
    });
    data.matches.forEach(function(kamp) {
      var dato = new Date(kamp.match_date || '');
      var gruppe = dato < new Date() ? 'tidligere' : 'kommende';
      var kort = document.createElement('article');
      var navn = document.createElement('h3');
      var info = document.createElement('p');
      var knapp = document.createElement('button');
      navn.textContent = kampnavn(kamp);
      info.textContent = kampdato(kamp) + ' · ' + (kamp.stadium_name || 'Stadion mangler');
      knapp.textContent = 'Se kampdetaljer →';
      knapp.disabled = kamp.match_id == null;
      knapp.onclick = function() { hentKamp(kamp.match_id); };
      kort.appendChild(navn);
      kort.appendChild(info);
      kort.appendChild(knapp);
      document.getElementById(gruppe).appendChild(kort);
    });
    ['kommende', 'tidligere'].forEach(function(gruppe) {
      var liste = document.getElementById(gruppe);
      if (!liste.children.length) liste.textContent = 'Ingen ' + gruppe + ' kamper.';
    });
    status.textContent = data.matches.length ? '' : 'Ingen kamper tilgjengelig.';
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

function visValgtBesok() {
  if (valgtKamp) visKamp(kampnavn(valgtKamp), kampdato(valgtKamp), valgtKamp.stadium_name || 'Stadion mangler');
}

visSide('innlogging');
visKamper('kommende');
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
    data.posts.forEach(function(innlegg) {
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
    status.textContent = data.posts.length ? '' : 'Ingen innlegg ennå.';
  }).catch(function() {
    if (kall === feedkall) status.textContent = 'Kunne ikke hente innlegg. Prøv på nytt.';
  });
}

// Visningsfunksjoner for #53. Backend-kobling avklares i #52/#73.
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

// Midlertidig testprofil i fanens minne. Ingen autentisering eller lagring.
var aktivBruker = null;
function velgTestprofil() {
  var navn = document.getElementById('brukernavn').value.trim();
  var status = document.getElementById('brukerstatus');
  if (!navn || navn.length > 40) {
    status.textContent = 'Skriv et brukernavn på 1–40 tegn.';
    return;
  }
  aktivBruker = { user_id: 'test:' + navn.toLowerCase(), username: navn };
  status.textContent = '';
  profilstatus('Testprofil i denne fanen. Historikk og lagring er ikke koblet til ennå.');
  document.getElementById('profilnavn').textContent = navn;
  visSide('profil');
}

function avsluttTestprofil() {
  aktivBruker = null;
  profilstatus('Ingen testprofil er valgt.');
  document.getElementById('brukernavn').value = '';
  document.getElementById('brukerstatus').textContent = '';
  visSide('innlogging');
}

// #56: backend kobler til en funksjon som returnerer et Promise i #55.
// Funksjonen må avvise med feil dersom besøket ikke faktisk blir lagret.
var lagreBesok = null;
var lagrerBesok = false;
var bekreftetBesok = '';

function klargjorBesok() {
  var status = document.getElementById('besokstatus');
  var knapp = document.getElementById('bekreftbesok');
  knapp.disabled = true;
  if (!aktivBruker) status.textContent = 'Velg en testprofil før du bekrefter besøket.';
  else if (!valgtKamp) status.textContent = 'Velg en kamp fra kampoversikten først.';
  else if (!lagreBesok) status.textContent = 'Lagring er ikke koblet til ennå.';
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
