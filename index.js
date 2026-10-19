(() => {
  "use strict";

  // Eksempeldata for prototypen. Kan senere erstattes med data fra backend.
  const matches = [
    { id: "molde-rosenborg-2026", home: "Molde FK", away: "Rosenborg", date: "2026-10-24", time: "18:00", stadium: "Aker Stadion", city: "Molde", accent: "blue" },
    { id: "bodo-brann-2026", home: "Bodø/Glimt", away: "Brann", date: "2026-10-27", time: "19:00", stadium: "Aspmyra stadion", city: "Bodø", accent: "yellow" },
    { id: "viking-molde-2026", home: "Viking FK", away: "Molde FK", date: "2026-11-01", time: "17:00", stadium: "Lyse Arena", city: "Stavanger", accent: "red" },
    { id: "rosenborg-viking-2026", home: "Rosenborg", away: "Viking FK", date: "2026-09-20", time: "16:00", stadium: "Lerkendal", city: "Trondheim", accent: "dark" },
    { id: "brann-bodo-2026", home: "Brann", away: "Bodø/Glimt", date: "2026-09-13", time: "18:00", stadium: "Brann Stadion", city: "Bergen", accent: "red" }
  ];

  const STORAGE_KEY = "stadionhopper.visits.v1";
  const list = document.querySelector("#match-list");
  const historyList = document.querySelector("#history-list");
  const visitCount = document.querySelector("#visit-count");
  const dialog = document.querySelector("#checkin-dialog");
  const form = document.querySelector("#checkin-form");
  const dateInput = document.querySelector("#visit-date");
  const noteInput = document.querySelector("#visit-note");
  const matchLabel = document.querySelector("#dialog-match");
  const toast = document.querySelector("#toast");
  const error = document.querySelector("#form-error");
  let filter = "upcoming";
  let selectedMatch = null;
  let toastTimeout;

  const today = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  };

  function loadVisits() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter(v =>
        v && typeof v.id === "string" && typeof v.matchId === "string" &&
        typeof v.date === "string" && matches.some(m => m.id === v.matchId)
      ) : [];
    } catch {
      return [];
    }
  }

  let visits = loadVisits();

  function saveVisits() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
      return true;
    } catch {
      showToast("Kunne ikke lagre lokalt. Kontroller nettleserens lagringsinnstillinger.");
      return false;
    }
  }

  function formatDate(value) {
    const date = new Date(value + "T12:00:00");
    return new Intl.DateTimeFormat("no-NO", { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function renderMatches() {
    const visible = matches.filter(match => filter === "upcoming" ? match.date >= today() : match.date < today());
    if (!visible.length) {
      list.innerHTML = '<div class="empty-state"><span>⚽</span><h3>Ingen kamper i denne listen</h3><p>Prøv den andre fanen for å se flere kamper.</p></div>';
      return;
    }

    list.innerHTML = visible.sort((a, b) => filter === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date))
      .map(match => {
        const checkedIn = visits.some(v => v.matchId === match.id);
        return `<article class="match-card">
          <div class="match-banner ${match.accent}">
            <span class="stadium-symbol" aria-hidden="true">⌂</span>
            <span class="match-date">${escapeHtml(formatDate(match.date))} · ${escapeHtml(match.time)}</span>
          </div>
          <div class="match-content">
            <p class="match-city">${escapeHtml(match.city)} · ${escapeHtml(match.stadium)}</p>
            <div class="teams"><div><strong>${escapeHtml(match.home)}</strong><span>Hjemmelag</span></div><span class="versus">VS</span><div class="away-team"><strong>${escapeHtml(match.away)}</strong><span>Bortelag</span></div></div>
            <button class="button ${checkedIn ? "button-secondary" : "button-primary"} button-full" data-checkin="${escapeHtml(match.id)}" type="button" ${checkedIn ? "disabled" : ""}>${checkedIn ? "✓ Besøk registrert" : filter === "past" ? "Registrer besøk" : "Jeg var her / sjekk inn"}</button>
          </div>
        </article>`;
      }).join("");
  }

  function renderHistory() {
    const sorted = [...visits].sort((a, b) => b.date.localeCompare(a.date));
    visitCount.textContent = `${sorted.length} ${sorted.length === 1 ? "besøk" : "besøk"}`;
    if (!sorted.length) {
      historyList.innerHTML = '<div class="empty-state history-empty"><span>✦</span><h3>Eventyret starter her</h3><p>Registrer et stadionbesøk fra kampoversikten, så dukker det opp her.</p></div>';
      return;
    }
    historyList.innerHTML = sorted.map(visit => {
      const match = matches.find(m => m.id === visit.matchId);
      return `<article class="history-item">
        <div class="history-icon" aria-hidden="true">✓</div>
        <div class="history-details"><strong>${escapeHtml(match.home)} – ${escapeHtml(match.away)}</strong><span>${escapeHtml(match.stadium)}, ${escapeHtml(match.city)} · ${escapeHtml(formatDate(visit.date))}</span>${visit.note ? `<p>${escapeHtml(visit.note)}</p>` : ""}</div>
        <button class="remove-visit" type="button" data-remove="${escapeHtml(visit.id)}" aria-label="Slett besøk for ${escapeHtml(match.home)} mot ${escapeHtml(match.away)}">Slett</button>
      </article>`;
    }).join("");
  }

  function render() {
    renderMatches();
    renderHistory();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  function openCheckin(matchId) {
    selectedMatch = matches.find(m => m.id === matchId);
    if (!selectedMatch) return;
    if (visits.some(v => v.matchId === matchId)) {
      showToast("Denne kampen er allerede registrert i historikken din.");
      return;
    }
    matchLabel.textContent = `${selectedMatch.home} – ${selectedMatch.away} · ${selectedMatch.stadium}`;
    dateInput.value = selectedMatch.date < today() ? selectedMatch.date : today();
    dateInput.max = today();
    noteInput.value = "";
    error.textContent = "";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else showToast("Denne nettleseren støtter ikke dialogvinduet.");
  }

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-checkin]");
    if (button && !button.disabled) openCheckin(button.dataset.checkin);
  });

  historyList.addEventListener("click", event => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    const visit = visits.find(v => v.id === button.dataset.remove);
    if (!visit) return;
    visits = visits.filter(v => v.id !== visit.id);
    if (saveVisits()) {
      render();
      showToast("Besøket ble fjernet fra historikken.");
    }
  });

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderMatches();
    });
  });

  document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!selectedMatch) return;
    const date = dateInput.value;
    if (!date || date > today()) {
      error.textContent = "Velg en gyldig besøksdato som ikke er i fremtiden.";
      return;
    }
    if (visits.some(v => v.matchId === selectedMatch.id)) {
      error.textContent = "Denne kampen finnes allerede i historikken.";
      return;
    }
    const visit = {
      id: `visit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      matchId: selectedMatch.id,
      date,
      note: noteInput.value.trim().slice(0, 240)
    };
    visits = [...visits, visit];
    if (saveVisits()) {
      dialog.close();
      render();
      showToast("Stadionbesøket er registrert!");
      document.querySelector("#historikk").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      visits = visits.filter(v => v.id !== visit.id);
    }
  });

  render();
})();