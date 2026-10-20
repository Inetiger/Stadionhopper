# Stadionhopper

https://inetiger.github.io/Stadionhopper/
A small prototype with a static HTML/CSS/JavaScript frontend and a Node.js HTTP API.

## Requirements

- Node.js 18 or newer.
- Git, if you are cloning the repository.
- No third-party Node packages are required for the current API or test suite.

## Run locally

1. Clone the repository and enter its directory.
2. Start the API server:

   ```sh
   node server.js
   ```

3. The API listens on `http://localhost:3000` by default. Set `PORT` to use another port, for example `PORT=4000 node server.js`.
4. Open `http://localhost:3000/` in a browser. The server supplies HTML, CSS, JavaScript and API from the same address. Opening `index.html` directly or using GitHub Pages does not supply the Node API.

### Test kampoversikten (#54)

For representative, fictional match data, start the server with the existing fixtures (Git Bash):

```sh
STADIONHOPPER_DB_DIR=test/fixtures node server.js
```

Open `http://localhost:3000/`. Choose “Utforsk kamper uten innlogging”, open a match and check its teams, time and stadium. Return to the list and test the other match. Test narrow and wide screens. Dates are displayed in the browser's local timezone; fixture dates include UTC (`Z`). Past matches move to “Tidligere” automatically.

With `node server.js` and the unchanged placeholder database, an empty list is expected. Stop the server after loading the page and press “Last kamper på nytt” to test the error message. Profile/feed examples remain outside #54; check-in storage is still disabled.

Frontend techniques: [Fetch API](https://www.w3schools.com/js/js_api_fetch.asp), [DOM nodes](https://www.w3schools.com/js/js_htmldom_nodes.asp), [array sorting](https://www.w3schools.com/js/js_array_sort.asp) and [dates](https://www.w3schools.com/js/js_dates.asp).

## API endpoints

- `GET /api/matches` — lists available matches with club and stadium details.
- `GET /api/matches/:match_id` — returns one match or a 404 response.
- `GET /api/posts` — returns valid posts with author names, newest first.

The server reads the existing files in `Database/`. Those files currently contain placeholder rows and Python-style `None` values/trailing commas; the API normalizes this existing format when reading and does not rewrite the source files. As a result, a clean checkout returns empty match and post lists until valid linked records are added. The posts endpoint also omits empty posts and posts whose `user_id` does not reference an existing user.

## Tests

Run the built-in Node.js test runner:

```sh
node --test test/*.test.js
```

Tests use temporary fixture files and do not modify the real files under `Database/`.

## Configuration and security

- `PORT` optionally configures the API listening port.
- `STADIONHOPPER_DB_DIR` optionally points the API at a directory containing the JSON tables; by default it uses `Database/` in this repository.
- Do not commit passwords, tokens, or other secrets. Authentication and persistent user sessions are not implemented yet.

## Current limitations

The UI still contains illustrative example content. Authentication, user-specific check-ins, profile history, and the social feed frontend/backend integration are not yet complete. Do not treat the example content as production data.

## Test sosial feed (#57)

Start `node server.js` og åpne `http://localhost:3000/`. Velg **Sosial**. Vanlig database inneholder plassholdere, så «Ingen innlegg ennå» er forventet. Feed hentes på nytt hver gang visningen åpnes; knappen kan også brukes for å prøve igjen.

For fiktive eksempelinnlegg og kamper, start fra Git Bash:

```sh
STADIONHOPPER_DB_DIR=test/fixtures node server.js
```

Testdatasettet inneholder to innlegg fra en fiktiv testbruker. Nyeste innlegg skal vises først. Automatiske tester bruker midlertidige data og kjører feed-koden mot det faktiske API-et. Databasefilene for vanlig bruk er ikke endret.

Kontroller forfatter, tidspunkt og tekst på vanlig/smal skjerm. Stopp serveren etter at siden er åpnet, og trykk «Last innlegg på nytt» for å kontrollere feilmeldingen. Publisering, likes og kommentarer er utenfor #57.

## Profilvisning under arbeid (#53)

Den faste Kari-profilen er fjernet. Inntil #52/#73 leverer valgt profil, viser siden at ingen testprofil er valgt. Dette arbeidet fullfører ikke #53 og innfører ikke innlogging eller lagring.

Frontend-funksjonen `visProfil(bruker, innsjekkinger)` kan nå vise bruker og historikk, nyeste innsjekking først. `profilstatus(melding)` tømmer gammel profil/historikk og kan brukes ved lasting, feil eller utlogging. Begge er interne visningsfunksjoner, ikke et avtalt API.

Foreløpig visningsformat, som må bekreftes/tilpasses sammen med #73:
- Bruker: `user_id`, `username` (fra eksisterende datamodell).
- Innsjekking: `user_id`, `match_id`, `checked_in_at` (fra nåværende Check_ins-mal).
- Berikede visningsfelt: `home_club_name`, `away_club_name`, `stadium_name` (samme navn som kamp-API-et).

Funksjonen viser bare rader som matcher valgt `user_id`, og erstatter gammel visning ved brukerbytte. Dette er kun visningslogikk: backend må fortsatt avgrense data før utsending. Ingen beskyttet brukerhistorikk er implementert eller påstått.

Automatiske tester prøver to fiktive brukere, tom historikk, manglende data, tekst med HTML-tegn og tømming ved feil/utlogging. Manuell kontroll av oppsett på smal skjerm og faktisk backend-integrasjon gjenstår.
## GitHub Pages-demo

GitHub Pages kan ikke kjøre Node.js eller servere `/api/matches` og `/api/posts`. På den publiserte adressen bruker frontend derfor `demo/data.json`, med tydelig merking av at innholdet er fiktivt og at innlogging/lagring ikke finnes. Lokalt bruker frontend fortsatt API-et fra `node server.js`.

Demoen støtter kampoversikt, kampdetaljer og lesing av demo-innlegg. Dette er statiske data; endringer lagres ikke. For lokal testing med backend, kjør `STADIONHOPPER_DB_DIR=test/fixtures node server.js` og åpne `http://localhost:3000/`. Ikke åpne `index.html` direkte fra filsystemet.

## Velg testprofil uten autentisering (#52)

Skriv et fiktivt brukernavn (1–40 tegn) og velg **Velg testprofil**. Navnet vises på Profil. **Bytt testprofil** lar deg velge et nytt navn; **Avslutt testprofil** tømmer navnet og gammel historikk. Tomt navn avvises. Passordfeltet er fortsatt deaktivert.

`aktivBruker` finnes bare i JavaScript-minnet i den åpne fanen. Oppdatering av siden nullstiller valget. Ingen localStorage, cookies, backend-kall eller filskriving brukes. `user_id` med prefikset `test:` er en midlertidig frontend-identifikator; den er ikke et bekreftet backend-ID og skal ikke sendes som autorisasjon til API-et.

Dette er avtalt forenkling til en testprofil, ikke autentisering. Historikk og innsjekkingslagring er fortsatt ikke koblet til; ingen beskyttelse mellom virkelige brukere er implementert. Den opprinnelige backend-integrasjonen i #52 er derfor ikke ferdig. #11/#12/#55/#73 må avstemmes av teamet med samme avgrensning før reell integrasjon.

Manuell test på vanlig/smal skjerm: velg navn → Profil → bytt navn → avslutt → prøv tomt navn. Oppdater siden og kontroller at valget forsvinner. Dette virker også på GitHub Pages etter godkjent merge/publisering.

## Innsjekkingsgrensesnitt under arbeid (#56)

Bekreftelsesflyten støtter valgt testprofil/kamp, venting, feil med nytt forsøk og blokkering av doble trykk. Ingen lagring er koblet til: knappen er deaktivert og siden forklarer hvorfor.

`lagreBesok(testprofil, match_id)` er en intern kobling, ikke en avtalt HTTP-kontrakt. #55 må levere et Promise som kun fullføres ved faktisk lagring og avvises ved feil. Frontend-testprofilens ID må avstemmes med backend. Ingen alternativ lokal lagring eller falsk bekreftelse er lagt til.

Faktisk lagring, oppdatert historikk og manuell nettlesertest gjenstår før #56 kan lukkes.


## Prototyp-API for profil og innsjekking (#55 / #73)

Kjør lokalt med testdata:

\`\`\`sh
STADIONHOPPER_DB_DIR=test/fixtures node server.js
\`\`\`

Prototypen har foreløpig **ingen autentisering**. Endepunktene bruker et fiktivt brukernavn for å velge en eksisterende testprofil. Dette er kun for demonstrasjon og isolerte testdata; klienten kan velge brukernavn, så API-et må ikke brukes med ekte persondata eller eksponeres som sikker tilgangskontroll.

- \`GET /api/profile?username=kari\` returnerer profil for en kjent testbruker.
- \`GET /api/check-ins?username=kari\` returnerer historikken nyeste først; tom historikk gir en tom liste.
- \`POST /api/check-ins\` med JSON \`{"username":"kari","match_id":1}\` oppretter innsjekking. Svaret er \`201\`; ukjent bruker/kamp gir \`404\`, ugyldig kamp-ID gir \`400\`, og duplikat gir \`409\`.
- Innsjekkinger lagres i \`Check_ins.json\` i valgt datakatalog. Kampens stadionnavn og klubbnavn hentes fra kampdata, ikke fra klientens input.

GitHub Pages kan ikke kjøre Node.js. For å teste lagring må frontend og API kjøre i et lokalt eller publisert testoppsett. Når autentisering prioriteres, må brukeridentiteten hentes fra en verifisert serverøkt, ikke fra en klientparameter.

## Fortsett valgt besøk etter testprofilvalg (#56)

Uten valgt testprofil: velg kamp → Se besøk → skriv fiktivt brukernavn → Velg testprofil. Du kommer tilbake til bekreftelsen for samme kamp og stadion. Ugyldig navn beholder påbegynt flyt. «Utforsk kamper uten innlogging» avbryter videreføringen; avslutning av testprofil tømmer også kampvalget. Lagringsknappen er fortsatt deaktivert uten #55. Dette fullfører bare profilovergangen beskrevet i Deliverable 2 kapittel 6, ikke faktisk lagring/historikk.
