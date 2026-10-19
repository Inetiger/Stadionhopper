# Stadionhopper

Prototype for å finne kamper og holde oversikt over stadionbesøk.

## Kjør lokalt

Krever Node.js 20 eller nyere. Ingen eksterne pakker er nødvendige.

```bash
npm start
```

Åpne http://localhost:3000.

Kjør automatiske tester med `npm test`.

## JSON-datalagring

Serveren leser og skriver de eksisterende filene i `Database/`:

- `Matches.json`, `Clubs.json`, `Stadiums.json`: kampoversikt og detaljer
- `Check_ins.json`: oppretting, visning og sletting av innsjekkinger
- `Posts.json` og `Users.json`: lesing av feed og forfatternavn
- `Events.json`: beholdes for videre event-funksjonalitet

De eksisterende filene i `Database/` er beholdt som domenemaler. De inneholder foreløpig `None` og trailing commas, slik det er beskrevet i Deliverable 2. Serveren normaliserer disse verdiene ved lesing. Automatiske tester bruker egne, isolerte testdata i midlertidige mapper; ingen syntetiske kamper er lagt inn i prosjektets databasefiler.

## API

- `GET /api/health`
- `GET /api/matches`
- `GET /api/matches/:match_id`
- `GET /api/check-ins`
- `POST /api/check-ins` med JSON `{ "match_id": 1, "checked_in_at": "2026-10-01T12:00:00.000Z" }`
- `DELETE /api/check-ins/:check_in_id`
- `GET /api/posts`
- `GET /api/stadiums` (forberedt på koordinater når datamodellen inneholder dem)

## Begrensninger som må løses før produksjon

Dette er en lokal prototype, ikke en produksjonsbackend. Innlogging og økter er ikke implementert. Nye innsjekkinger får derfor `user_id: null`; serveren stoler ikke på en bruker-ID sendt fra nettleseren. Feed-endepunktet er kun for lesing; oppretting av innlegg er ikke aktivert fordi aktiv bruker ikke kan verifiseres uten autentisering.

Den eksisterende `Matches.json`-malen har foreløpig `club_id` i stedet for separate `home_club_id` og `away_club_id`, og `Stadiums.json`-malen har ikke koordinater. API-et er forberedt på separate hjemme-/bortelag og koordinater dersom datamodellen utvides etter avtale. Dette er backend-forberedelse, ikke en ferdig brukerflate. Statisk GitHub Pages kan ikke kjøre Node-serveren eller skrive til JSON-filer; serveren må kjøres lokalt eller deployes på en Node-kompatibel vert.
