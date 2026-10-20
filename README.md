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
