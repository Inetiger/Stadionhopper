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

De opprinnelige databasefilene inneholder foreløpig Python-`None` og komma etter siste felt. Serveren normaliserer disse verdiene ved lesing og skriver standard JSON når en tabell lagres. Tomme skjemarader behandles som tomme datasett.

## API

- `GET /api/health`
- `GET /api/matches`
- `GET /api/matches/:match_id`
- `GET /api/check-ins`
- `POST /api/check-ins` med JSON `{ "match_id": 1, "checked_in_at": "2026-10-01T12:00:00.000Z" }`
- `DELETE /api/check-ins/:check_in_id`
- `GET /api/posts`

## Begrensninger som må løses før produksjon

Dette er en lokal prototype, ikke en produksjonsbackend. Innlogging og økter er ikke implementert. Nye innsjekkinger får derfor `user_id: null`; serveren stoler ikke på en bruker-ID sendt fra nettleseren. Feed-endepunktet er kun for lesing; oppretting av innlegg er ikke aktivert fordi aktiv bruker ikke kan verifiseres uten autentisering.

Datamalen for kampene har foreløpig bare én `club_id` og ingen eksplisitt motstander eller koordinater. UI-et kan derfor ikke vise komplett kampoppgjør eller et kart uten at modellen og JSON-dataene utvides. Statisk GitHub Pages kan ikke kjøre Node-serveren eller skrive til JSON-filer; serveren må kjøres lokalt eller deployes på en Node-kompatibel vert.
