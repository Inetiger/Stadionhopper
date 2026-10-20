// Sidebytte som i W3Schools sitt eksempel om faner (tabs).
function visSide(navn) {
  var sider = document.getElementsByClassName('side');
  for (var nummer = 0; nummer < sider.length; nummer++) {
    sider[nummer].style.display = 'none';
  }
  document.getElementById(navn).style.display = 'block';
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

// Pages kjører ikke Node. Bruk demo bare på den avtalte Pages-adressen.
var demomodus = location.hostname === 'inetiger.github.io';
if (demomodus) document.getElementById('demostatus').textContent =
  'Demo · fiktive data · ingen innlogging eller lagring. Backend testes lokalt.';

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
