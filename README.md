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

Opprett hashed testlegitimasjon før oppstart. Serveren leser bare brukere fra miljøvariabelen `STADIONHOPPER_TEST_USERS`; det finnes ingen innebygde kontoer. Ikke legg passord, hasher eller miljøfiler med legitimasjon i Git. Innsjekkinger lagres i `test/fixtures/Check_ins.json`; tilbakestill filen etter manuell testing hvis du vil beholde et rent testdatasett.

Generer en salt og scrypt-hash interaktivt (passordet leses fra standard input):

```sh
node scripts/hash-password.js
```

Sett deretter `STADIONHOPPER_TEST_USERS` til en JSON-array med feltene `username`, `salt` og `passwordHash` fra verktøyet, og start serveren. Eksempel på struktur (plassholderverdier, ikke gyldige legitimasjoner):

```sh
STADIONHOPPER_TEST_USERS='[{"username":"Testbruker","salt":"<salt-hex>","passwordHash":"<scrypt-hash-hex>"}]' STADIONHOPPER_DB_DIR=test/fixtures node server.js
```

Ikke legg reelle passord eller hash-konfigurasjon i README, kode eller versjonskontroll.

## API

Offentlige lesbare data:

- `GET /api/matches` — kamper med klubb- og stadiondetaljer.
- `GET /api/matches/:match_id` — én kamp.
- `GET /api/posts` — gyldige innlegg med forfatternavn.

Autentisering og økt:

- `POST /api/login` med JSON `{"username":"<brukernavn>","password":"<passord>"}` — oppretter økt og returnerer profil.
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

- Serveren har ingen standardkontoer; testbrukere må konfigureres utenfor repoet via `STADIONHOPPER_TEST_USERS`.
- Passord verifiseres med scrypt og individuell salt. Passordet i testoppsettet bør være et tilfeldig, kun lokalt testpassord.
- Økter lagres i minnet og blir borte ved serveromstart; de deles ikke mellom flere serverprosesser.
- Økt-cookie bruker `HttpOnly` og `SameSite=Lax`; `Secure` settes ved direkte HTTPS-tilkobling.
- Det er ikke gjennomført full sikkerhetsherding, rate limiting eller produksjonsmessig CSRF-/proxy-konfigurasjon.

Ikke eksponer denne prototypen som en tjeneste for virkelige brukere. Før produksjonsbruk må autentisering byttes til en gjennomgått løsning med sikker passordlagring, konfigurerte hemmeligheter, vedvarende økter, HTTPS, rate limiting, CSRF-beskyttelse, overvåking og sikkerhetsgjennomgang.

## GitHub Pages-demo

GitHub Pages kjører bare statiske filer og kan ikke kjøre Node.js-API-et. Den publiserte demoen bruker derfor fiktive statiske data og støtter ikke reell innlogging eller lagring. Test innlogging, profil, historikk og innsjekking lokalt med kommandoen ovenfor.

## Datamodell

Se [DATA_MODEL.md](DATA_MODEL.md) for datamodellen. API-et leser JSON-tabellene under `Database/` som standard og bruker `STADIONHOPPER_DB_DIR` for å velge en alternativ katalog.
