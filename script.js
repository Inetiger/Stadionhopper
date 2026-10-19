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

visSide('innlogging');
