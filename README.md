# Stadionhopper

Stadionhopper gjør det enklere å oppdage fotballkamper, utforske stadioner og få oversikt over arrangementer.

## Åpne Stadionhopper

[Åpne den publiserte Stadionhopper-demoen](https://inetiger.github.io/Stadionhopper/?demo=1&v=20261110-2)

Lenken åpner GitHub Pages-demoen fra `main`, ikke en eldre forhåndsvisning fra en branch. Nye endringer vises etter at de er merget og Pages-publiseringen er ferdig. Hvis du fortsatt ser den gamle utformingen, bruk **Ctrl + Shift + R** (Windows) eller **Cmd + Shift + R** (Mac) for å laste siden på nytt uten gammel nettleserkopi.

Du trenger ikke å laste ned eller installere noe.

## Om demoen

Den publiserte demoen bruker bare fiktive testdata. Du kan logge inn med en av testkontoene under og prøve profil, stadioninnsjekking og sosial feed.

| Brukernavn | Passord |
| --- | --- |
| `alex` | `stadion123` |
| `sam` | `stadion123` |
| `maria` | `stadion123` |

Innsjekkinger lagres i `localStorage` i nettleseren du bruker, og vises i profilen og feeden for denne nettleseren. Data deles ikke automatisk med andre brukeres nettlesere. Testkontoene og passordene er offentlige og skal aldri brukes til ekte kontoer eller sensitive data.

### Eksempelkamper i kalenderen

Demoen inneholder **12 nye, fiktive eksempelkamper fra 11. november til 6. desember 2026**, i tillegg til de tidligere kampene. Dette er testdata, ikke klubbenes faktiske terminliste. Bruk månedspilene for å se desember. Datoene er faste og må oppdateres ved senere testperioder.

Eksempeldataene ligger i `demo/data.json` og brukes også når en ny lokal pilot opprettes. En eksisterende `.pilot-data/` oppdateres ikke automatisk, slik at innlagte pilotdata blir bevart. Bruk en ny datamappe via `STADIONHOPPER_DB_DIR` hvis dere trenger en separat, fersk pilot.

## Skriftlig sluttleveranse

[Disposisjon for DORA-analyse og sluttrefleksjon](docs/Stadionhopper_DORA_disposisjon.md) inneholder overskrifter, stikkord og forslag til sidefordeling innenfor oppgavens grense på 10 sider.

## Brukere legger inn kamper

Velg **Kamper → Legg til en kamp**, logg inn med en testkonto og oppgi hjemme- og bortelag, dato/klokkeslett og spillested. Du kan velge eksisterende navn som forslag eller skrive inn nye lag og baner, også utenfor de opprinnelige klubbene. Bruk gjerne by/sted i banenavnet og aldersklasse i lagnavnet. Tidspunktet tolkes i nettleserens tidssone, som vises ved feltet, og lagres i UTC.

Kampen vises på riktig dato i kalenderen og merkes **brukerregistrert – ikke bekreftet av klubb**. Samme lagoppsett og tidspunkt avvises som duplikat. Nye lag og spillesteder opprettes sammen med kampen i backend. Det kreves ikke et eksternt kamp-API.

### Test en pilot med felles lagring

Med Node.js 18 eller nyere:

```sh
npm run start:pilot
```

Åpne http://127.0.0.1:3000. Dette starter eksisterende Node-backend med fiktive testkontoer og et separat datasett i `.pilot-data/`. Eksisterende pilotdata overskrives ikke ved omstart. Opprett en kamp som `alex`, og åpne samme server i en annen nettleser som `sam`. Last kalenderen på nytt: begge skal se kampen. Den kan også åpnes og brukes til innsjekking.

På GitHub Pages lagres nye kamper bare i den aktuelle nettleseren. Denne begrensningen opplyses i skjemaet og etter lagring. For å prøve Pages-varianten lokalt kan du åpne http://127.0.0.1:3000/?demo=1. Lokal demo er en test av brukerflyten og deler ikke nye kamper mellom enheter.

Du kan også teste uten Node-backend fra prosjektmappen, hvis Python er installert:

```sh
python -m http.server 8000
```

Åpne http://localhost:8000/?demo=1. Bruk de offentlige testkontoene over. Nye kamper og klubbnavn lagres i nettleseren, også etter omlasting. Bruk samme adresse og nettleser for å se dem igjen.

### Hva må på plass for en delt, offentlig pilot?

- Publiser Node-backend og frontend på samme HTTPS-adresse med en varig, skrivbar datamappe. GitHub Pages alene kan ikke kjøre denne backenden.
- Kjør én Node-prosess for denne filbaserte piloten. Kampregistrering serialiseres i prosessen og lagres atomisk i `Community.json`; flere prosesser eller instanser trenger en felles database med transaksjoner.
- Avtal hvem som følger opp feilinnmeldte kamper og duplikater, og hvordan testbrukerne kan melde fra. Denne første versjonen har ikke redigering, sletting, bekreftelse fra andre brukere eller moderering.
- Offentlige testkontoer passer kun for kontrollert testing. Før åpen bruk må dere avklare reelle kontoer, misbruksbegrensning, personvern og backup.

Live-scoring er ikke en del av denne endringen. Frontend henter oppdatert kampliste ved oppstart og med «Last kampene på nytt», ikke i sanntid.

## Tester

```sh
npm test
```
