# Deliverable 4

## Disposisjon – DORA-analyse og sluttrefleksjon

**Ramme:** Maksimalt 10 sider. Forslaget under gir omtrent 9 sider, med litt plass til figurer og tabeller. Video og lysbilder leveres separat.

**Gjennomgående grep:** Knytt konkrete erfaringer og dokumenterte data til tolkning og forbedringsforslag. Skill tydelig mellom det dere har gjennomført, det dere kan anslå, og det dere ville gjort videre.

## 1. Innledning og avgrensning (ca. ½ side)

- Stadionhoppers formål, målgruppe og prosjektets rammer: tre studenter, begrenset tid og flere parallelle fag.
- Rapportens formål: vurdere produktet og leveranseprosessen. Avgrens hvilken periode og hvilken publisert løsning DORA-analysen gjelder.

## 2. Produktet og oppnådde resultater

### 2.1 Gjennomførte brukerreiser

Statusgjennomgangen i [issue #141](https://github.com/Inetiger/Stadionhopper/issues/141) tok utgangspunkt i den publiserte GitHub Pages-demoen. Inger gjennomførte manuelle tester på PC, først fra et privat nettleservindu, og kontrollerte den grunnleggende kalenderreisen på mobil. Testresultatene bygger på hennes rapporterte observasjoner, ikke bare på at funksjonene er implementert.

| Brukerreise eller kontroll | Observert resultat |
| --- | --- |
| Utforske uten innlogging | Appen åpnes, og kamper kan finnes i kalenderen. |
| Kalender og kampdetaljer | Månedsbytte mellom november og desember fungerer. Kampdetaljene viser riktig dato, klokkeslett og stadion. |
| Mobilvisning | Finne kamp, åpne detaljer og gå tilbake fungerer med samme resultat som på PC. Innholdet holder seg innenfor skjermbredden. |
| Innlogging og brukerbytte | Gyldig testkonto kan logge inn. Feil innloggingsopplysninger avvises med en forståelig melding. Alex sine innsjekkinger vises ikke på Sams profil. |
| Registrere kamp | Nye kamper beholdes i den aktuelle nettleseren og vises riktig. Nye klubbnavn og spillesteder utenfor forslagene kan også brukes. |
| Obligatoriske felt | Ufullstendig skjema stoppes; fokus flyttes til feltet som mangler, med veiledning om hva som må fylles ut. |
| Duplikatkamp | Samme lag og tidspunkt gir beskjed om at kampen finnes allerede; ingen ekstra kamp opprettes. |
| Innsjekking | Innsjekkingen vises i historikken. Knappen deaktiveres etter første trykk og hindrer gjentatt innsending i samme skjermbilde. |
| Sosial feed | Innsjekkingen vises én gang med riktig bruker og kamp. |

Ingen blokkerende feil ble rapportert i disse testene. Dette gir grunnlag for å beskrive de undersøkte brukerreisene som fungerende innenfor demoens rammer, men er ikke en fullstendig kompatibilitets-, sikkerhets- eller brukervennlighetstest. Alle kontrollene er heller ikke gjentatt på både PC og mobil. Nettleserversjon, operativsystem og eksakt publisert commit ble ikke registrert, noe som begrenser etterprøvbarheten. Ved senere testing bør disse opplysningene registreres sammen med forventet og faktisk resultat.

### 2.2 Avtalte avgrensninger

Gruppa har avklart at prototypen først og fremst skal være tilgjengelig og testbar. Lokal nettleserlagring er derfor akseptert for denne leveransen. En innledende mistanke om manglende lagring ble avklart da den registrerte kampen fortsatt lå i opprinnelig nettleser. Et annet gruppemedlem så ikke kampen i sin nettleser. Innsjekkingene fulgte heller ikke med til en ny separat privatøkt.

Kamper og innsjekkinger deles dermed ikke mellom brukere eller enheter, og data kan gå tapt når privatøkten avsluttes eller nettleserdata slettes. Dette gjør det mulig å teste registrering og innsjekking individuelt, men ikke en sammenhengende sosial brukerreise der én bruker publiserer en kamp og en annen finner den på en annen enhet. Felles, varig lagring må på plass før en slik bruk kan prøves realistisk.

Gruppa har også akseptert kartplassholderen, statiske arrangementer og manglende liveoppdatering av kamper som avgrensninger i sluttversjonen. Disse beskrives derfor ikke som ferdige funksjoner. Gjennomgangen skiller slik mellom det som er testet og fungerer, og det som bevisst er utsatt. Et annet gruppemedlem skal kvalitetssikre resultatene og avgrensningene gjennom pull requesten før statusgjennomgangen regnes som ferdig.

## 3. Arkitektur og tekniske valg (ca. 1 side)

- Enkel arkitekturfigur: frontend, eventuell backend, datalagring og publisering. Forklar skillet mellom Pages-demo og en løsning med backend.
- Begrunn valg og kompromisser: enkelhet, testbarhet, midlertidig lagring, sikkerhet og hva som må endres for reell drift.

## 4. Arbeidsprosess, testing og CI/CD (ca. 1 side)

- Arbeidsflyten fra issue til branch, pull request, automatiserte kontroller, gjennomgang og publisering. Forklar hva CI og publiseringen faktisk gjør.
- Manuell funksjonstesting, automatiserte tester og PR-gjennomgang: hva de dekker, og hva de ikke dokumenterer om brukervennlighet og feil i drift.

## 5. DORA-analyse

### 5.1 Avgrensning og datagrunnlag

Vi undersøker leveranser av den publiserte GitHub Pages-prototypen. Denne er prosjektets tilgjengelige testmiljø og brukes som produksjonsreferanse i analysen. Målingene gjelder derfor ikke en fullstendig driftssatt Node.js-backend, deling mellom brukernes nettlesere eller verdien brukerne får av produktet.

Hos oss har merge til `main` vært veien til publisering: endringer integreres etter pull request, og Pages publiserer fra hovedbranchen. I praktisk arbeid har vi derfor omtalt dette som å levere. Måleteknisk er merge likevel ikke identisk med deployment. Vi teller en publisering først når Pages faktisk har levert versjonen. En merge kan vente på publisering, og en kjøring kan bli avbrutt eller erstattet av en nyere. CI-kjøringer og commits telles ikke som publiseringer.

Øyeblikksbildet dekker **22. september 2026 kl. 09:30:51 UTC til 10. november 2026 kl. 09:17:11 UTC, eksklusiv slutt**: omtrent 48,99 døgn. Det strekker seg fra første dokumenterte publisering til siste publisering ved uttrekket, ikke til prosjektets fremtidige slutt. Planlegging og utvikling før første publisering inngår ikke i perioden.

Vi har kombinert det historiske uttrekket i PR #154 med nyere deployment-hendelser fra branchen `dora-data`, deploy-jobber i GitHub Actions og commit-historikken fra `main`. Historiske tall er beregnet på nytt, og nyere publiseringer er lagt til uten doble run-ID-er. Datagrunnlaget og beregningsskriptet følger denne rapportendringen:

- [Øyeblikksbilde med publiseringer og commit-graf](metrics/dora/analysis-2026-11-10.json)
- [Skript for å gjenskape resultatene](scripts/summarize-dora-analysis.js)

### 5.2 Resultater for de fem målingene

Oppgaveteksten bruker de klassiske fire målene. I tråd med #142 vurderer vi også Deployment Rework Rate og bruker Failed Deployment Recovery Time for gjenoppretting etter en feilutløsende leveranse.

| Måling | Resultat i uttrekket | Beregning og begrensning |
| --- | --- | --- |
| Deployment Frequency | **90 dokumenterte publiseringer; 12,86 per uke** | Antall observerte publiseringer delt på periodens lengde i uker. Inkluderer dokumentasjons- og konfigurasjonsendringer som faktisk ble publisert. |
| Change Lead Time | **Median 5 minutter og 56,5 sekunder; 230 commits** | Fra committer-tidspunkt til første observerte publisering som inneholder commiten. Måler ikke hele brukerhistoriens gjennomløpstid. |
| Failed Deployment Recovery Time | **Ikke beregnbar med tilstrekkelig sikkerhet** | Krever dokumentert feilutløsende leveranse, start på påvirkning og bekreftet gjenoppretting. |
| Change Fail Rate | **Ikke beregnbar med tilstrekkelig sikkerhet** | Antall publiseringer som krever umiddelbar korrigering, delt på relevante publiseringer. Hendelsene er ikke systematisk klassifisert. |
| Deployment Rework Rate | **Ikke beregnbar med tilstrekkelig sikkerhet** | Antall uplanlagte publiseringer for å håndtere produksjonshendelser, delt på relevante publiseringer. Formålet med slike leveranser er ikke tilstrekkelig registrert. |

Manglende hendelsesdata betyr ikke 0 % feil eller 0 minutter gjenoppretting. Det betyr at vi ikke har et pålitelig grunnlag for disse beregningene.

### 5.3 Publiseringsfrekvens og ledetid gjennom prosjektet

Det historiske materialet frem til 9. november kl. 12:21:49 UTC inneholder **83 publiseringer**, tilsvarende **12,07 per uke**, og median ledetid **6 minutter og 16,5 sekunder** for **218 commits**. Det nyere uttrekket tilfører sju dokumenterte publiseringer og tolv kvalifiserende commits. To publiseringer ligger i overgangsperioden da DORA-logging til `main` utløste ekstra Pages-aktivitet; én av dem publiserte en automatisk logger-commit. De fem øvrige fulgte etter rettingen som flyttet loggingen til `dora-data`. Derfor viser vi både historisk og utvidet resultat, fremfor å tolke økningen som større produktivitet.

Publiseringer dedupliseres etter Actions run-ID. Slutten på steget «Deploy to GitHub Pages» brukes som leveringstidspunkt, med deploy-jobbens slutt som reserve. Nye statuslinjer for samme deployment er ikke nye leveranser. En av de nyere workflowene er samlet markert som kansellert, men har både en vellykket deploy-jobb og en vellykket deployment-status. Den er derfor inkludert som en faktisk publisering. Historisk uttrekk valgte derimot vellykkede workflow-kjøringer; eventuelle tilsvarende tilfeller blant eldre kansellerte kjøringer kan være utelatt. De 90 er dermed dokumenterte observasjoner, ikke en garanti for at all historisk publiseringsaktivitet er fanget opp.

Ledetiden kobles til commit-grafen, ikke bare til siste merge. Merge-commits, automatiske logger-commits og commits som allerede inngikk i første observerte publisering, utelates fra ledetidsutvalget. Alle nødvendige forfedre finnes i dette materialet. Formelen er publiseringstidspunkt minus committer-tidspunkt, og medianen beregnes over de kvalifiserende commitene.

Den korte medianen viser at mange registrerte endringer har kommet raskt ut på testsiden. Den sier lite om tid brukt før første commit, venting mellom frontend og backend eller samlet arbeid med en funksjon. Arbeid som committes sent i utviklingen kan ha kort målt ledetid selv om oppgaven tok lang tid. Dokumentasjonsendringer, KI-støttet arbeid og korte endringer påvirker også utvalget. Vi bruker derfor tallene som utgangspunkt for refleksjon over egen leveranseprosess, ikke som en rangering av gruppemedlemmer eller bevis på moden produksjonsdrift.

### 5.4 Feil, gjenoppretting og omarbeiding

Tester og gjennomgang i pull requests skal avdekke feil før merge. Dette er forebyggende kvalitetssikring. En test som feiler i en PR, blir rettet og aldri publiseres, er ikke en produksjonsfeil i DORA-analysen. Beståtte tester viser samtidig bare at de undersøkte egenskapene består; de dokumenterer ikke at alle brukerreiser fungerer etter publisering.

En vellykket Pages-publisering kan inneholde en feil som først oppdages manuelt. Dersom en ny versjon for eksempel gjør at en innlogget bruker ikke kan registrere kamp, og dette krever en rask feilretting, kan hendelsen inngå i analysen. Vi må da kjenne den berørte publiseringen, påvirkningens start, rettingspubliseringen og tidspunktet da brukerreisen igjen er bekreftet fungerende. Change Fail Rate knyttes til den opprinnelige leveransen, mens Deployment Rework Rate knyttes til den uplanlagte korrigerende leveransen.

Et ønske fra brukertesting om bedre navn eller navigasjon er ikke automatisk en slik hendelse. Det må skilles mellom en feil som svekker avtalt funksjonalitet og krever korrigering, og ordinær læring eller videreutvikling av produktet. Testene i #141 viste dessuten at manglende deling mellom nettlesere er en akseptert prototypebegrensning. Dette skal ikke registreres som en ny feilutløsende deployment.

Statusene `error` og `failure` i Actions eller deployment-loggen er heller ikke alene tilstrekkelige: de må undersøkes for faktisk påvirkning og behov for gjenoppretting. Tid fra et vilkårlig bug-issue opprettes til det lukkes, måler saksbehandlingstid, ikke nødvendigvis gjenoppretting. Vi har ikke registrert disse sammenhengene konsekvent nok til å rekonstruere de tre hendelsesbaserte målene. Eventuelle senere estimater må merkes tydelig og begrunnes hendelse for hendelse.

### 5.5 Tolkning og videre forbedring

Analysen gir best dekning av leveransehastighet, mens stabilitet er svakere dokumentert. En kort studentperiode, få brukere og begrenset testing kan gjøre feil mindre synlige. Det gamle CI-verktøyets release-/bugfix-klassifisering brukes derfor ikke som erstatning for faktiske produksjonshendelser. Deploy-loggen er en hendelsesliste, ikke et ferdig dashboard; filen på `main` er eldre historikk, mens videre logging skjer på `dora-data`.

Vi ville bygget videre på eksisterende issues og PR-er. Når en relevant feil oppdages i bruk, registreres berørt publisering, påvirkning, tidspunkt og koblet rettings-PR i samme issue, gjerne med den eksisterende Production incident-malen. Rettelsen testes før merge og bekreftes etter publisering. Hvis starttidspunktet er ukjent, registreres oppdagelsestidspunktet som en uttrykkelig avgrenset tilnærming. Det trengs ingen parallell feilrapport for hver måling.

Et felles dashboard kan beregne publiseringsfrekvens og ledetid automatisk og vise hendelsesbaserte mål med datamangler. GitHub Projects kan supplere med arbeidsstatus og venting, men er ikke nødvendig for selve registreringen eller beregningen. Løsningen bør inngå i gruppas løpende prioritering og retrospektiv, sammen med brukerinnspill. Slik blir målingene et grunnlag for forbedring av flyt og kvalitet, fremfor et vedlegg som først leses ved innlevering.

## 6. Retrospektiv: læring om samarbeid og forbedring (ca. 1 side)

- Konkrete erfaringer: frontend og backend ventet på hverandre; avklaring i Scrum og tett samarbeid fikk arbeidet videre. AI-genererte issues trengte egen vurdering og tydeligere avhengigheter.
- Hva dere ville endret: mindre leveranser gjennom hele løsningen, tydeligere issues og hyppigere avklaringer. Knytt tiltakene til mindre venting, raskere tilbakemelding og mer felles forståelse.

## 7. Videre utvikling: Version 2 og systematisk måling (ca. 1 side)

### 7.1 Produkt og teknisk modning

- Prioriter ut fra brukerbehov og hypoteser: enklere navigasjon, brukerregistrerte kamper og eventuell oppdatering under kamp. Beskriv hva som må testes før videre investering.
- Realistiske steg for varig lagring, sikkerhet, pålitelig drift og skalering; forklar hvilke ressurser og arkitekturendringer det krever.

### 7.2 Måling og forbedring i arbeidsflyten

- Registrer feil oppdaget i bruk med en enkel issue-mal: påvirkning, tidspunkt, berørt publisering og koblet PR. Bekreft løsningen etter publisering; skill driftshendelser fra forbedringsønsker.
- Automatiser publiseringsdata og lag et felles dashboard, eventuelt med GitHub Projects for arbeidsstatus. Kombiner leveranse- og stabilitetsmål med brukerinnspill; bruk oversikten i felles prioritering og retrospektiv.

## 8. Avslutning (ca. ½ side)

- Hva dere med rimelig sikkerhet kan konkludere om produktet, leveranseevnen og læringen – og hva dataene ikke gir grunnlag for.
- De viktigste neste tiltakene og sammenhengen mellom tekniske praksiser, samarbeid, kvalitet og verdi for brukerne.
