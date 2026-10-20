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

function hentData(adresse) {
  return fetch(adresse).then(function(svar) {
    if (!svar.ok) throw new Error('Kunne ikke hente data');
    return svar.json();
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
