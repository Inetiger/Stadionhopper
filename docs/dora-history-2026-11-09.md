# Historiske DORA-målinger for Stadionhopper

## Resultater

Målepunkt: den publiserte GitHub Pages-prototypen, ikke Node.js-backend eller brukernes lokale nettleserdata.

Periode: **22. september 2026 kl. 09:30:51 UTC til 9. november 2026 kl. 12:21:49 UTC (eksklusiv slutt)**. Dette er 48,12 døgn. Slutten er valgt før den opprinnelige DORA-loggeren ble innført, fordi logging til main deretter utløste ekstra publiseringsaktivitet.

| Måling | Resultat | Grunnlag |
| --- | --- | --- |
| Deployment frequency | **83 vellykkede publiseringer; 12,07 per uke** | Pages-workflow med vellykket deploy-jobb. |
| Change lead time | **Median 6 minutter og 16,5 sekunder** | 218 unike commits, fra committer-tidspunkt til første observerte vellykkede publisering som inneholder commiten. |
| Change failure rate | **Ikke beregnet** | Historiske brukerhendelser er ikke gjennomgått og klassifisert tilstrekkelig. |
| Failed deployment recovery time | **Ikke beregnet** | Krever dokumentert start på påvirkning og tidspunkt for gjenoppretting. |

Publiseringer etter uke (mandag, UTC; første og siste uke er delvise):

| Uke fra | Publiseringer |
| --- | ---: |
| 2026-09-21 | 3 |
| 2026-10-05 | 29 |
| 2026-10-12 | 2 |
| 2026-10-19 | 37 |
| 2026-10-26 | 11 |
| 2026-11-09 | 1 |

## Metode og etterprøvbarhet

Datagrunnlaget ligger i [history-2026-11-09.json](../metrics/dora/history-2026-11-09.json). Hver publisering har run-ID, commit-SHA, tidspunkt og lenke til Actions-kjøringen. Hver lead-time-observasjon har commit, commit-tidspunkt og første observerte publisering.

Kildene er GitHub REST API:
- Actions runs, filtrert på Pages-workflow ID 364095193 og conclusion=success.
- Jobs for hver vellykket kjøring. Slutten på steget «Deploy to GitHub Pages» brukes som publiseringstidspunkt, med deploy-jobbens slutt som reserve.
- Commit-historikken som er tilgjengelig fra main, inkludert foreldre og committer-dato.

Kjøringer er deduplisert etter run-ID. Bare main-kjøringer skal inngå. Kansellerte og mislykkede kjøringer og DORA-/CI-jobber telles ikke som publiseringer. Ulike vellykkede publiseringer av samme SHA er egne leveringshendelser; antallet er ikke et mål på antall funksjoner.

For lead time gjennomgås forfedrene til hver publisert SHA i tidsrekkefølge. En commit får tidspunktet for første publisering der den er tilgjengelig via foreldregrafen. Merge-commits og automatiske «chore(dora): record»-commits utelates. Commits som allerede var med i første observerte publisering, utelates fordi tidligere leveringstid ikke er kjent. Alle nødvendige forfedre fantes i det innhentede materialet. Bruk medianen, ikke bare tiden fra merge til publisering.

Det medfølgende skriptet kan beregne tallene på nytt fra øyeblikksbildet:

```sh
node scripts/summarize-dora-history.js metrics/dora/history-2026-11-09.json
```

## Hva tallene kan og ikke kan fortelle

Dette er målinger av prototypeleveranser, ikke bevis på verdi eller produksjonskvalitet. Publiseringer inkluderer dokumentasjons- og konfigurasjonsendringer dersom Pages faktisk publiserte dem. Lead time inkluderer ikke kravarbeid, tid før første commit eller hele brukerhistoriens gjennomløpstid. Commits etter integrasjon og KI-støttet arbeid kan bidra til den korte medianen. Tallene bør derfor brukes til refleksjon over egen prosess, ikke til å rangere gruppemedlemmer eller klassifisere teamet som «elite».

Datainnsamlingen er et historisk øyeblikksbilde, ikke en løpende oppdatert total. Actions-data kan slettes eller utløpe. Ingen skjult eller slettet historikk kan bekreftes med dette materialet. Oppgi periodens avgrensning ved bruk i rapporten.

Feil funnet i pull requests er forebyggende kvalitetssikring. De inngår ikke i change failure rate. Manglende hendelsesdata er heller ikke dokumentasjon på 0 % feil. Gruppen må gjennomgå faktiske feil etter publisering og koble dem til berørte publiseringer før de to siste målingene kan beregnes.

## Videre registrering

Loggeren i main er nå endret til å skrive på dora-data-branchen. Ikke flytt den tilbake til main: logger-commits kan utløse nye Pages-bygg. Den gamle filen metrics/dora/deployments.jsonl på main er bevart historikk, ikke den oppdaterte kilden.

Ved videre oppfølging brukes data-branchen og Production incident-issueformen. Et arbeidsboard viser oppgavestatus; denne måleoversikten viser leveringsresultater. De dekker ulike behov.
