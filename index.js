(() => {
  "use strict";
  const list = document.querySelector("#match-list");
  const historyList = document.querySelector("#history-list");
  const feedList = document.querySelector("#feed-list");
  const visitCount = document.querySelector("#visit-count");
  const dialog = document.querySelector("#checkin-dialog");
  const form = document.querySelector("#checkin-form");
  const dateInput = document.querySelector("#visit-date");
  const matchLabel = document.querySelector("#dialog-match");
  const error = document.querySelector("#form-error");
  const toast = document.querySelector("#toast");
  let matches = [], visits = [], filter = "upcoming", selectedMatch = null, toastTimer, stadiumMap;
  const today = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[ch]);
  const dateLabel = value => {
    const d = new Date(String(value).length === 10 ? value + "T12:00:00" : value);
    return Number.isNaN(d.getTime()) ? "Dato ikke satt" : new Intl.DateTimeFormat("no-NO",{day:"numeric",month:"short",year:"numeric"}).format(d);
  };
  async function api(url, options={}) {
    const response = await fetch(url,{...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});
    const data = await response.json().catch(()=>({}));
    if (!response.ok) throw new Error(data.error || "Forespørselen feilet.");
    return data;
  }
  function notify(message) {
    toast.textContent=message; toast.classList.add("is-visible"); clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),3200);
  }
  function renderMatches() {
    const visible=matches.filter(m=>!m.match_date ? filter==="upcoming" : filter==="upcoming" ? String(m.match_date).slice(0,10)>=today() : String(m.match_date).slice(0,10)<today());
    if (!visible.length) { list.innerHTML='<div class="empty-state"><h3>Ingen kamper i datasettet ennå</h3><p>Legg inn kamper i Database/Matches.json og knytt dem til klubber og stadioner.</p></div>'; return; }
    list.innerHTML=visible.map(m=>{
      const id=String(m.match_id), checked=visits.some(v=>String(v.match_id)===id);
      const date=m.match_date ? dateLabel(String(m.match_date).slice(0,10)) : "Dato ikke satt";
      const time=m.match_time ? " · "+m.match_time : "";
      const home=m.home_club_name||m.club_name||"Hjemmelag ikke satt";
      const away=m.away_club_name||"Bortelag ikke satt";
      return `<article class="match-card"><div class="match-banner"><span class="match-date">${esc(date+time)}</span></div><div class="match-content">
        <p class="match-city">${esc(m.stadium_name||"Stadion ikke satt")}${m.stadium_address ? " · "+esc(m.stadium_address):""}</p>
        <div class="teams"><div><strong>${esc(home)}</strong><span>Hjemmelag</span></div><span class="versus">VS</span><div class="away-team"><strong>${esc(away)}</strong><span>Bortelag</span></div></div>
        <p>Status: ${esc(m.status||"Ikke angitt")}</p>
        <button class="button ${checked?"button-secondary":"button-primary"} button-full" data-checkin="${esc(id)}" ${checked?"disabled":""}>${checked?"✓ Besøk registrert":"Registrer besøk"}</button>
        <button class="text-button" data-details="${esc(id)}">Vis detaljer</button>
      </div></article>`;
    }).join("");
  }
  function renderHistory() {
    visitCount.textContent=visits.length+" besøk";
    if(!visits.length){historyList.innerHTML='<div class="empty-state"><h3>Ingen registrerte besøk</h3><p>Innsjekkingene dine vises her etter at du registrerer dem.</p></div>';return;}
    historyList.innerHTML=[...visits].sort((a,b)=>String(b.checked_in_at||"").localeCompare(String(a.checked_in_at||""))).map(v=>{
      const m=matches.find(x=>String(x.match_id)===String(v.match_id));
      return \`<article class="history-item"><div class="history-icon">✓</div><div class="history-details"><strong>\${esc((m?.home_club_name||m?.club_name||"Kamp #"+v.match_id)+(m?.away_club_name ? " – "+m.away_club_name : ""))} · \${esc(m?.stadium_name||"Stadion")}</strong><span>\${esc(v.checked_in_at?dateLabel(String(v.checked_in_at).slice(0,10)):"Dato ikke satt")}</span></div><button class="remove-visit" data-remove="\${esc(v.check_in_id)}">Slett</button></article>\`;
    }).join("");
  }
  function renderMap(stadiums) {
    const container = document.querySelector("#stadium-map");
    const message = document.querySelector("#map-message");
    if (!container) return;
    const located = (stadiums || []).filter(s => Number.isFinite(Number(s.latitude)) && s.latitude !== null && s.latitude !== "" && Number.isFinite(Number(s.longitude)) && s.longitude !== null && s.longitude !== "");
    if (!located.length) {
      message.textContent = "Ingen stadioner har gyldige koordinater i Database/Stadiums.json.";
      container.innerHTML = '<p class="map-fallback">Legg til latitude og longitude for å vise stadioner på kartet.</p>';
      return;
    }
    if (!window.L) {
      message.textContent = "Kartbiblioteket kunne ikke lastes. Stadionene har fortsatt koordinater i JSON-dataene.";
      container.innerHTML = '<ul class="map-fallback">' + located.map(s => '<li>' + esc(s.name || "Stadion") + ' (' + esc(s.latitude) + ', ' + esc(s.longitude) + ')</li>').join("") + '</ul>';
      return;
    }
    if (stadiumMap) { stadiumMap.remove(); stadiumMap = null; }
    container.innerHTML = "";
    stadiumMap = window.L.map(container).setView([64.2, 10.2], 4);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(stadiumMap);
    const markers = [];
    located.forEach(s => {
      const marker = window.L.marker([Number(s.latitude), Number(s.longitude)]).addTo(stadiumMap);
      marker.bindPopup('<strong>' + esc(s.name || "Stadion") + '</strong><br>' + esc(s.adress || s.address || ""));
      markers.push(marker);
    });
    if (markers.length > 1) stadiumMap.fitBounds(window.L.featureGroup(markers).getBounds().pad(0.15));
    else if (markers.length === 1) stadiumMap.setView(markers[0].getLatLng(), 13);
    message.textContent = located.length + " stadion(er) vises. Kartfliser leveres av OpenStreetMap.";
  }

  async function refresh() {
    list.innerHTML='<div class="empty-state"><h3>Laster …</h3></div>';
    try {
      const [m,c,p,s]=await Promise.all([api("/api/matches"),api("/api/check-ins"),api("/api/posts"),api("/api/stadiums")]);
      matches=m.matches||[]; visits=c.check_ins||[]; renderMap(s.stadiums||[]);
      renderMatches(); renderHistory();
      const posts=p.posts||[];
      feedList.innerHTML=posts.length?posts.map(post=>\`<article class="history-item"><div class="history-details"><strong>\${esc(post.author||"Ukjent forfatter")}</strong><p>\${esc(post.content)}</p><span>\${esc(post.created_at||"")}</span></div></article>\`).join(""):'<div class="empty-state"><h3>Feeden er tom</h3><p>Ingen innlegg er lagt inn ennå.</p></div>';
    } catch(e) {
      list.innerHTML='<div class="empty-state"><h3>Kunne ikke lese JSON-data</h3><p>'+esc(e.message)+' Kontroller at serveren kjører med npm start.</p></div>';
      historyList.innerHTML=""; feedList.innerHTML="";
    }
  }
  function openCheckin(id) {
    selectedMatch=matches.find(m=>String(m.match_id)===String(id)); if(!selectedMatch)return;
    if(visits.some(v=>String(v.match_id)===String(id)))return notify("Kampen er allerede registrert.");
    matchLabel.textContent=(selectedMatch.club_name||"Klubb")+" · "+(selectedMatch.stadium_name||"Stadion");
    dateInput.value=today(); dateInput.max=today(); error.textContent=""; dialog.showModal();
  }
  list.addEventListener("click",async event=>{
    const check=event.target.closest("[data-checkin]"), details=event.target.closest("[data-details]");
    if(check&&!check.disabled)return openCheckin(check.dataset.checkin);
    if(details){try{const r=await api("/api/matches/"+encodeURIComponent(details.dataset.details));const m=r.match;notify((m.club_name||"Klubb")+" · "+(m.stadium_name||"Stadion")+" · "+(m.match_date||"Dato ikke satt"));}catch(e){notify(e.message);}}
  });
  historyList.addEventListener("click",async event=>{
    const button=event.target.closest("[data-remove]");if(!button)return;
    try{await api("/api/check-ins/"+encodeURIComponent(button.dataset.remove),{method:"DELETE"});await refresh();notify("Innsjekkingen er slettet fra JSON-filen.");}catch(e){notify(e.message);}
  });
  document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
    filter=button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});
    renderMatches();
  }));
  document.querySelector("#close-dialog").addEventListener("click",()=>dialog.close());
  form.addEventListener("submit",async event=>{
    event.preventDefault();if(!selectedMatch)return;
    if(!dateInput.value||dateInput.value>today()){error.textContent="Velg en dato som ikke er i fremtiden.";return;}
    try {
      await api("/api/check-ins",{method:"POST",body:JSON.stringify({match_id:selectedMatch.match_id,checked_in_at:new Date(dateInput.value+"T12:00:00").toISOString()})});
      dialog.close();await refresh();notify("Innsjekkingen er lagret i Database/Check_ins.json.");
    } catch(e){error.textContent=e.message;}
  });
  refresh();
})();