# Stadionhopper

https://inetiger.github.io/Stadionhopper/

Stadionhopper er en prototype med HTML/CSS/JavaScript-frontend og et Node.js HTTP-API. API-et bruker bare innebygde Node-moduler.

## Krav

- Node.js 18 eller nyere.
- Ingen tredjeparts Node-pakker kreves.

## Start lokalt med fiktive testdata

Fra Git Bash i prosjektmappen:

```sh
STADIONHOPPER_DB_DIR=test/fixtures node server.js
```

Åpne deretter http://localhost:3000/. Testkontoer:

| Brukernavn | Passord |
|---|---|
| `Testbruker` | `hopper123` |
| `Testbruker2` | `hopper456` |

Dette er offentlig dokumenterte, hardkodede testlegitimasjoner for en lokal prototype. Ikke bruk ekte kontoer, passord eller personopplysninger. Innsjekkinger lagres i `test/fixtures/Check_ins.json`; tilbakestill filen etter manuell testing hvis du vil beholde et rent testdatasett.

Alternativt kan serveren startes med standarddatabasen via `node server.js`, men den inneholder plassholdere og forventes ikke å ha gyldige testkontoer eller kampdata.

## API

Offentlige lesbare data:

- `GET /api/matches` — kamper med klubb- og stadiondetaljer.
- `GET /api/matches/:match_id` — én kamp.
- `GET /api/posts` — gyldige innlegg med forfatternavn.

Autentisering og økt:

- `POST /api/login` med JSON `{"username":"Testbruker","password":"hopper123"}` — oppretter økt og returnerer profil.
- `GET /api/session` — returnerer innlogget testprofil.
- `POST /api/logout` — invaliderer økten og sletter økt-cookie.
- `GET /api/profile` — returnerer profil fra serverens økt.
- `GET /api/check-ins` — returnerer innsjekkingshistorikken til innlogget bruker.
- `POST /api/check-ins` med JSON `{"match_id":1}` — lagrer innsjekking for brukeren i serverøkten.

Profil- og innsjekkingsendepunktene krever en gyldig økt. Klientparametere som `username` ignoreres som identitetsbevis. Uautentiserte forespørsler får `401`; ukjent kamp gir `404`, ugyldig kamp-ID gir `400`, og duplikatinnsjekking gir `409`.

## Tester

Kjør hele testsettet:

```sh
node --test test/*.test.js
```

Testene bruker midlertidige datakataloger, bortsett fra de eksplisitte fixture-filene som brukes ved manuell kjøring. De dekker blant annet login, feil passord, økt-cookie, utlogging, utløpte økter, beskyttede endepunkter, innsjekking og at brukere ikke får hverandres historikk.

## Sikkerhetsavgrensning — viktig

Dette er kun autentisering for en lokal prototype:

- Brukernavn og passord er hardkodet i `auth.js` og er synlige for alle som har tilgang til kildekoden.
- Passordene er ikke ment for ekte kontoer og er ikke lagret som sikre passordhash-er.
- Økter lagres i minnet og blir borte ved serveromstart; de deles ikke mellom flere serverprosesser.
- Økt-cookie bruker `HttpOnly` og `SameSite=Lax`; `Secure` settes ved direkte HTTPS-tilkobling.
- Det er ikke gjennomført full sikkerhetsherding, rate limiting eller produksjonsmessig CSRF-/proxy-konfigurasjon.

Ikke eksponer denne prototypen som en tjeneste for virkelige brukere. Før produksjonsbruk må autentisering byttes til en gjennomgått løsning med sikker passordlagring, konfigurerte hemmeligheter, vedvarende økter, HTTPS, rate limiting, CSRF-beskyttelse, overvåking og sikkerhetsgjennomgang.

## GitHub Pages-demo

GitHub Pages kjører bare statiske filer og kan ikke kjøre Node.js-API-et. Den publiserte demoen bruker derfor fiktive statiske data og støtter ikke reell innlogging eller lagring. Test innlogging, profil, historikk og innsjekking lokalt med kommandoen ovenfor.

## Datamodell

Se [DATA_MODEL.md](DATA_MODEL.md) for datamodellen. API-et leser JSON-tabellene under `Database/` som standard og bruker `STADIONHOPPER_DB_DIR` for å velge en alternativ katalog.
