# Deliverable 4 – DORA-analyse og sluttrefleksjon

## 1. Innledning og avgrensning

Stadionhopper er en digital plattform som skal gjøre det enklere å oppdage og delta på lokale fotballkamper. Målet er å senke terskelen for å oppsøke lokalfotballen og på sikt bidra til økt engasjement og fellesskap rundt lokale klubber og stadioner. Prosjektet har i første omgang hatt fokus på lavere divisjoner i Møre og Romsdal. Gjennom prosjektet har vi arbeidet med produktutvikling fra idé og behovskartlegging til utvikling, testing og evaluering av en nettbasert prototype. Arbeidet har vært gjennomført av tre aktive gruppemedlemmer, med begrenset tid og flere parallelle studieforpliktelser. Dette har påvirket både arbeidsform, prioriteringer og hvor omfattende løsningen har blitt.

I denne siste leveransen evaluerer vi produktet og utviklingsprosessen. Vi gjennomfører en DORA-analyse for å undersøke hvordan vi har arbeidet med programvareleveranser, og reflekterer over erfaringene med Scrum, samarbeid, testing og CI/CD. Avslutningsvis vurderer vi hvordan Stadionhopper kan videreutvikles til en mer fullstendig løsning. DORA-analysen tar utgangspunkt i utviklingsaktiviteten som er dokumentert gjennom GitHub. Vi skiller mellom kodeendringer, automatiserte kontroller og faktiske publiseringer av demonstrasjonsversjonen, ettersom disse ikke nødvendigvis representerer det samme.

*** Avklar hvilken tidsperiode DORA-analysen skal dekke, og om dere analyserer hele utviklingsperioden eller en avgrenset del av den.

## 2. Produktet og oppnådde resultater

### 2.1 Funksjonalitet i den leverte løsningen

Vi har utviklet en nettbasert prototype av Stadionhopper med HTML, CSS og JavaScript i frontend og Node.js i backend. Den publiserte demonstrasjonsversjonen er tilgjengelig gjennom GitHub Pages og benytter fiktive data og lokal nettleserlagring. En sentral brukerreise vi har laget er å finne en kommende fotballkamp, se informasjon om kampen og stadionet, og registrere et kampbesøk. Prototypen inneholder blant annet kampoversikt med kalendervisning, kampdetaljer, stadioninformasjon, innlogging med testkontoer, brukerprofil og innsjekkinger. Vi har også arbeidet med sosiale funksjoner, som å lage arrangement og bringe folk sammen og dele fotballinteressen.
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

Backend er utviklet for blant annet autentisering, brukerøkter, kampdata og innsjekkinger. Denne er imidlertid ikke koblet til demonstrasjonsversjonen som er publisert gjennom GitHub Pages. Den publiserte løsningen kan derfor demonstrere flere av brukerreisene, men har ikke felles datalagring mellom ulike brukere og nettlesere. Dette er en viktig begrensning ved prototypen. Selv om flere funksjoner kan testes i demonstrasjonen, betyr det ikke at de er ferdig utviklet for en løsning med reelle brukere.

*** Oppdater funksjonaliteten med eventuelle endringer etter Deliverable 3. Kontroller særlig hvilke funksjoner som er implementert, hvilke som er testet, og hvilke som fortsatt bare er planlagt. +det vi har endret i sprint4!

### 2.2 Brukerbehov og prioriteringer

I starten av prosjektet definerte vi en MVP med innlogging og brukerprofil, stadionoversikt, kommende kamper, innsjekkinger og personlig historikk. Mer omfattende sosiale funksjoner ble prioritert lavere for å sikre at vi kunne konsentrere oss om de viktigste brukerbehovene for å få laget en fungerende applikasjon. Vi gjennomførte en brukerundersøkelse med 19 respondenter. Her svarte 9 at det å finne kommende kamper var den viktigste funksjonen. Dette støttet prioriteringen av kampoversikten som en sentral del av løsningen.

Senere gjennomførte vi brukertesting, der vi mottok syv svar. Tilbakemeldingene viste at brukerne i hovedsak klarte å navigere i løsningen, men også at enkelte deler kunne bli tydeligere. Vi fikk blant annet innspill om navigasjon, fargebruk, begreper, kalendervisning og presentasjon av kamptidspunkter. Disse tilbakemeldingene bidro til at vi prioriterte forbedringer av eksisterende funksjonalitet fremfor å legge til stadig flere funksjoner. Gjennom arbeidet har vi erfart at en funksjon ikke nødvendigvis gir brukerverdi bare fordi den er teknisk implementert. Den må også være forståelig, tilgjengelig og nyttig for dem som skal bruke løsningen.

*** Vurder hvor godt den leverte prototypen oppfyller den opprinnelige MVP-en. Hva fungerer etter hensikten, hva er delvis ferdig, og hva mangler?

## 3. Arkitektur og tekniske valg

### 3.1 Systemarkitektur

Stadionhopper er utviklet med en frontend basert på HTML, CSS og JavaScript og en backend basert på Node.js. Arkitekturen skiller mellom brukergrensesnittet og håndteringen av data og applikasjonslogikk. I planleggingen av prosjektet valgte vi en enkel, filbasert løsning med JSON-filer for datalagring. Dette gjorde det mulig å arbeide med sentrale deler av systemet uten å etablere en full database fra starten. Domenemodellen omfatter blant annet brukere, klubber, stadioner, kamper, innsjekkinger, innlegg og arrangementer. Disse representerer sentrale deler av funksjonaliteten som Stadionhopper skal kunne tilby. Demonstrasjonsversjonen er publisert gjennom GitHub Pages. Siden GitHub Pages benyttes til statisk publisering, kjører ikke Node.js-backenden som en del av denne løsningen. I stedet brukes lokal nettleserlagring og fiktive data for å demonstrere funksjonaliteten.

*** Sett inn en enkel arkitekturfigur som viser frontend, backend, datalagring og GitHub Pages. Marker tydelig hvilke deler som inngår i den publiserte demonstrasjonen.

### 3.2 Vurdering av tekniske valg

De tekniske valgene har vært preget av prosjektets omfang og tilgjengelige ressurser. En enkel frontend og filbasert datalagring har gjort det mulig å komme raskt i gang med utviklingen og teste sentrale brukerreiser. Samtidig har arbeidet vist at det er forskjell på en prototype og en løsning som kan brukes i ordinær drift. Den publiserte demonstrasjonen har begrensninger knyttet til felles datalagring, reell autentisering og samhandling mellom brukere.

Vi har også erfart at tekniske avhengigheter kan påvirke fremdriften. Under utviklingen oppstod det utfordringer fordi frontend- og backend-arbeidet var avhengig av hverandre, samtidig som ansvarsfordelingen og rekkefølgen på enkelte oppgaver ikke var tilstrekkelig avklart. Dette ble fulgt opp gjennom felles diskusjoner og tydeligere oppgavefordeling. Erfaringen viste oss at arkitektur og arbeidsorganisering henger tett sammen. Selv en forholdsvis enkel løsning krever at teamet har en felles forståelse av hvordan komponentene skal fungere sammen.

Dersom Stadionhopper skulle videreutvikles, ville vi måtte vurdere både datalagring, sikkerhet, autentisering og hvordan applikasjonen skal publiseres og driftes.

*** Diskuter om dere ville valgt den samme arkitekturen dersom dere skulle startet prosjektet på nytt. Begrunn eventuelle endringer.

## 4. Arbeidsprosess, testing og CI/CD

### 4.1 Arbeidsflyt og versjonskontroll

Vi har brukt Scrum som utgangspunkt for organiseringen av utviklingsarbeidet, med ukentlige møter, prioritering av oppgaver og jevnlig oppfølging av fremdriften. GitHub har vært brukt til versjonskontroll, oppgavehåndtering og samarbeid. Arbeidsoppgavene har vært organisert gjennom Issues, og kodeendringer har i hovedsak blitt utviklet i egne branches før de ble integrert i `main` gjennom pull requests.

I starten hadde vi en tydelig fordeling av roller og arbeidsoppgaver. Dette ga oss struktur, men førte også til at enkelte oppgaver ble avhengige av at andre først fullførte sitt arbeid. Vi erfarte samtidig at noen Issues var for omfattende eller hadde uklare avhengigheter, noe som gjorde det vanskeligere å planlegge og gjennomføre arbeidet effektivt. Etter hvert begynte vi å dele opp oppgavene i mindre deler og samarbeide mer på tvers av de opprinnelige ansvarsområdene. Dette ga oss større fleksibilitet og gjorde det enklere å bidra der det var behov. Vi fikk også erfaring med at KI-genererte Issues måtte gjennomgås kritisk og tilpasses det faktiske utviklingsarbeidet.

### 4.2 Testing og kvalitetssikring

Vi har benyttet både automatiserte tester og manuell brukertesting for å kvalitetssikre løsningen. De automatiserte testene har blant annet kontrollert autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekkinger. Testene har vært kjørt gjennom GitHub Actions som en del av CI-prosessen. Et konkret eksempel på nytten av dette oppstod under arbeidet med kalenderfunksjonaliteten. Etter en kodeendring viste GitHub Actions at to av 41 tester feilet. Feilene ble undersøkt og rettet, og etter en ny commit bestod alle testene før endringene ble integrert i `main`. ***fjerne eksempelet?

Dette viste oss hvordan automatiserte tester kan bidra til å oppdage feil tidlig i utviklingsprosessen.

Samtidig har brukertestingen gitt en annen type innsikt. De automatiserte testene undersøker om funksjoner oppfører seg som forventet, mens brukertestingen har vist hvordan personer utenfor utviklingsgruppen opplever løsningen. Vi har derfor erfart at teknisk testing og brukertesting utfyller hverandre. En løsning kan fungere teknisk uten at den nødvendigvis er enkel å forstå eller bruke.

### 4.3 CI/CD og publisering

Vi har etablert en CI-prosess gjennom GitHub Actions, der JavaScript-syntaks og automatiserte tester kontrolleres ved pull requests og endringer i `main`. Vi har også benyttet GitHub Pages til å publisere demonstrasjonsversjonen. Publiseringen skjer gjennom en separat workflow og er ikke direkte avhengig av at alle CI-kontrollene er bestått. Dette innebærer at en vellykket publisering ikke nødvendigvis dokumenterer at alle tester har bestått. Vi har dermed fått erfaring med både kontinuerlig integrasjon og automatisert publisering, men har ikke etablert en fullstendig leveranseprosess der beståtte tester er et krav før produksjonssetting.

Gjennom prosjektet har vi også erfart at pull requests og automatiserte tester ikke erstatter behovet for kodegjennomgang. Vi har i hovedsak kontrollert beskrivelser og testresultater, og i mindre grad gjennomført systematiske gjennomganger av selve koden.

*** Kontroller om denne beskrivelsen fortsatt stemmer etter siste sprint. Oppdater eventuelle endringer i testoppsett, workflows eller publiseringsrutiner.

## 5. DORA-analyse

### 5.1 Avgrensning og datagrunnlag

Vi undersøker leveranser av den publiserte GitHub Pages-prototypen. Denne er prosjektets tilgjengelige testmiljø og brukes som produksjonsreferanse i analysen. Målingene gjelder derfor ikke en fullstendig driftssatt Node.js-backend, deling mellom brukernes nettlesere eller verdien brukerne får av produktet.
DORA (DevOps Research and Assessment) brukes til å evaluere programvareleveranser gjennom målinger av hastighet og stabilitet. De fire målingene vi undersøker er Deployment Frequency, Lead Time for Changes, Change Failure Rate og Mean Time to Restore. Formålet med analysen er å undersøke hvordan utviklings- og leveranseprosessen vår har fungert, og hvilke forbedringer vi kan ta med oss videre. Datagrunnlaget hentes fra GitHub, der vi har dokumentasjon på commits, pull requests, GitHub Actions og publiseringer gjennom GitHub Pages. Eventuelle feilregistreringer i Issues kan også bidra til analysen.

I Deliverable 3 benyttet vi et automatisert verktøy for å hente data fra GitHub-historikken. Verktøyet rapporterte blant annet 55 releases, 2 feature releases og 6 bugfix releases. Samtidig inneholdt `release.yaml` bare én registrert release, datert 27. oktober 2026. Disse tallene var ikke umiddelbart sammenfallende. Vi kan derfor ikke uten videre bruke dem som grunnlag for DORA-analysen. Det er nødvendig å kontrollere hva verktøyet faktisk har telt, og skille mellom commits, pull requests, releases og faktiske deployeringer. Vi må også skille mellom feil som oppdages under utvikling og testing, og feil som oppstår etter at en ny versjon er publisert.

*** Beskriv nøyaktig hvordan dere har hentet ut data, hvilken periode som undersøkes, og hvilke definisjoner dere bruker for de fire målingene.

*** Sett inn en samlet tabell med måltall, resultat, datakilde og usikkerhet.

| DORA-måling | Resultat | Datagrunnlag | Usikkerhet |
|---|---|---|---|
| Deployment Frequency | *** | GitHub Pages / Actions | *** |
| Lead Time for Changes | *** | Commits, PR og deployeringer | *** |
| Change Failure Rate | *** | Deployeringer og dokumenterte feil | *** |
| Mean Time to Restore | *** | Dokumenterte driftshendelser | *** |

Hos oss har merge til `main` vært veien til publisering: endringer integreres etter pull request, og Pages publiserer fra hovedbranchen. I praktisk arbeid har vi derfor omtalt dette som å levere. Måleteknisk er merge likevel ikke identisk med deployment. Vi teller en publisering først når Pages faktisk har levert versjonen. En merge kan vente på publisering, og en kjøring kan bli avbrutt eller erstattet av en nyere. CI-kjøringer og commits telles ikke som publiseringer.

Øyeblikksbildet dekker **22. september 2026 kl. 09:30:51 UTC til 10. november 2026 kl. 09:17:11 UTC, eksklusiv slutt**: omtrent 48,99 døgn. Det strekker seg fra første dokumenterte publisering til siste publisering ved uttrekket, ikke til prosjektets fremtidige slutt. Planlegging og utvikling før første publisering inngår ikke i perioden.
Deployment Frequency måler hvor ofte en ny versjon av programvaren blir publisert. Målingen kan gi innsikt i hvor hyppig teamet leverer endringer til brukerne. For Stadionhopper er det relevant å undersøke antall vellykkede publiseringer gjennom GitHub Pages i den valgte perioden. Det er viktig å skille mellom kodeendringer og faktiske publiseringer. En commit eller pull request innebærer ikke nødvendigvis at en ny versjon er publisert. Vi må derfor ta utgangspunkt i publiseringshistorikken og undersøke hvilke workflows som faktisk har resultert i en vellykket deployering.

*** Legg inn antall vellykkede publiseringer og beregnet frekvens, for eksempel antall publiseringer per uke.

*** Beskriv om publiseringene har vært jevnt fordelt, eller om aktiviteten har variert gjennom prosjektperioden.

Publiseringsfrekvensen må tolkes i lys av at Stadionhopper er et studentprosjekt. Arbeidsmengden har variert som følge av andre studieforpliktelser og innleveringsfrister. En ujevn publiseringsfrekvens vil derfor ikke nødvendigvis bety at utviklingsprosessen har vært ineffektiv. Samtidig sier ikke hyppige publiseringer alene noe om kvaliteten eller brukerverdien til endringene. Målingen må derfor vurderes sammen med de øvrige DORA-målingene og resultatene fra brukertestingen.

Vi har kombinert det historiske uttrekket i PR #154 med nyere deployment-hendelser fra branchen `dora-data`, deploy-jobber i GitHub Actions og commit-historikken fra `main`. Historiske tall er beregnet på nytt, og nyere publiseringer er lagt til uten doble run-ID-er. Datagrunnlaget og beregningsskriptet følger denne rapportendringen:

- [Øyeblikksbilde med publiseringer og commit-graf](metrics/dora/analysis-2026-11-10.json)
- [Skript for å gjenskape resultatene](scripts/summarize-dora-analysis.js)

### 5.2 Resultater for de fem målingene

Oppgaveteksten bruker de klassiske fire målene. I tråd med #142 vurderer vi også Deployment Rework Rate og bruker Failed Deployment Recovery Time for gjenoppretting etter en feilutløsende leveranse.
Lead Time for Changes måler tiden fra en kodeendring blir gjort til den er publisert. Målingen kan gi innsikt i hvor raskt teamet klarer å få endringer gjennom utviklings- og leveranseprosessen.

I vårt prosjekt har vi i hovedsak arbeidet med egne branches og pull requests før endringer ble integrert i `main`. GitHub-historikken gir dermed mulighet til å undersøke tidspunktet for kodeendringer, integrasjon og publisering.

For å beregne ledetiden må vi definere et tydelig start- og sluttidspunkt. En mulig fremgangsmåte er å måle tiden fra første relevante commit til den første vellykkede publiseringen som inneholder endringen.

*** Beskriv beregningsmetoden dere faktisk bruker. Legg inn resultat, gjerne median og variasjon dersom datagrunnlaget tillater det.

Gjennom prosjektet har vi erfart at avhengigheter mellom oppgaver kan påvirke fremdriften. Et eksempel er utfordringene knyttet til koordinering mellom frontend og backend. Vi har også erfart at store eller uklare Issues kan føre til at arbeid blir liggende før det ferdigstilles.

Disse erfaringene kan bidra til å forklare mulige forsinkelser, men vi kan ikke konkludere med at de har påvirket den målte ledetiden uten å undersøke datagrunnlaget nærmere.

*** Diskuter hva som har påvirket ledetiden i prosjektet. Har venting på avklaringer, gjennomgang eller integrasjon vært viktigere enn selve publiseringen?

Det er også viktig å skille Lead Time for Changes fra tiden det tar å utvikle en hel brukerhistorie. DORA-målingen tar utgangspunkt i kodeendringer og publisering, ikke nødvendigvis all tiden som brukes på planlegging, design og diskusjoner.

### 5.4 Change Failure Rate – andel feilslåtte publiseringer

Change Failure Rate måler andelen deployeringer som fører til feil i den publiserte løsningen og krever korrigerende tiltak.

Gjennom utviklingen har vi oppdaget feil ved hjelp av automatiserte tester. Et eksempel er kalenderfunksjonaliteten, der to tester feilet før kodeendringene ble integrert i `main`.

Dette er imidlertid ikke en feilslått produksjonsdeployering. Feilene ble oppdaget før publisering og viser derfor at testene fungerte som en kontroll i utviklingsprosessen.

Tilsvarende kan vi ikke bruke antallet bugfix releases fra den tidligere automatiserte analysen direkte som grunnlag for Change Failure Rate. Disse tallene dokumenterer ikke nødvendigvis at feilene oppstod som følge av publiseringer.

For å beregne målingen må vi undersøke hvilke deployeringer som eventuelt førte til feil i den publiserte løsningen, og om feilene krevde retting, tilbakerulling eller en ny publisering.

*** Undersøk om dere har dokumenterte tilfeller av dette. Legg inn antall feilslåtte publiseringer og beregnet prosentandel dersom datagrunnlaget er tilstrekkelig.

Dersom vi ikke finner dokumenterte hendelser, betyr ikke dette nødvendigvis at ingen feil har oppstått. Det kan også skyldes at feil ikke har blitt registrert systematisk, eller at demonstrasjonsversjonen har hatt begrenset bruk.

Vi må derfor være forsiktige med å tolke manglende feilregistreringer som dokumentasjon på høy stabilitet.

| Måling | Resultat i uttrekket | Beregning og begrensning |
| --- | --- | --- |
| Deployment Frequency | **90 dokumenterte publiseringer; 12,86 per uke** | Antall observerte publiseringer delt på periodens lengde i uker. Inkluderer dokumentasjons- og konfigurasjonsendringer som faktisk ble publisert. |
| Change Lead Time | **Median 5 minutter og 56,5 sekunder; 230 commits** | Fra committer-tidspunkt til første observerte publisering som inneholder commiten. Måler ikke hele brukerhistoriens gjennomløpstid. |
| Failed Deployment Recovery Time | **Ikke beregnbar med tilstrekkelig sikkerhet** | Krever dokumentert feilutløsende leveranse, start på påvirkning og bekreftet gjenoppretting. |
| Change Fail Rate | **Ikke beregnbar med tilstrekkelig sikkerhet** | Antall publiseringer som krever umiddelbar korrigering, delt på relevante publiseringer. Hendelsene er ikke systematisk klassifisert. |
| Deployment Rework Rate | **Ikke beregnbar med tilstrekkelig sikkerhet** | Antall uplanlagte publiseringer for å håndtere produksjonshendelser, delt på relevante publiseringer. Formålet med slike leveranser er ikke tilstrekkelig registrert. |

Manglende hendelsesdata betyr ikke 0 % feil eller 0 minutter gjenoppretting. Det betyr at vi ikke har et pålitelig grunnlag for disse beregningene.
Mean Time to Restore (MTTR) måler hvor lang tid det tar å gjenopprette en tjeneste etter en feil.

For Stadionhopper vil dette innebære å undersøke om det har oppstått hendelser der den publiserte demonstrasjonsversjonen har vært utilgjengelig eller sentral funksjonalitet har sluttet å virke.

Dersom slike hendelser har oppstått, må vi undersøke når feilen startet eller ble oppdaget, når den ble rettet, og når løsningen igjen fungerte som forventet.

Vi har dokumentert feil som ble oppdaget gjennom automatiserte tester, men disse kan ikke uten videre brukes til å beregne MTTR. Tiden det tar å rette en feil under utvikling er ikke nødvendigvis det samme som tiden det tar å gjenopprette en tjeneste etter en driftshendelse.

*** Undersøk om dere har dokumenterte hendelser som kan brukes til å beregne MTTR. Dersom slike hendelser finnes, legg inn beregningene og forklar eventuelle usikkerheter.

*** Hvis dere ikke har tilstrekkelige data, forklar hvorfor MTTR ikke kan beregnes på en pålitelig måte.

I en løsning med aktive brukere ville vi hatt behov for bedre rutiner for registrering og oppfølging av slike hendelser. Dette ville gjort det mulig å undersøke både hvor raskt feil blir oppdaget, og hvor lang tid det tar før tjenesten fungerer igjen.

### 5.3 Publiseringsfrekvens og ledetid gjennom prosjektet

Det historiske materialet frem til 9. november kl. 12:21:49 UTC inneholder **83 publiseringer**, tilsvarende **12,07 per uke**, og median ledetid **6 minutter og 16,5 sekunder** for **218 commits**. Det nyere uttrekket tilfører sju dokumenterte publiseringer og tolv kvalifiserende commits. To publiseringer ligger i overgangsperioden da DORA-logging til `main` utløste ekstra Pages-aktivitet; én av dem publiserte en automatisk logger-commit. De fem øvrige fulgte etter rettingen som flyttet loggingen til `dora-data`. Derfor viser vi både historisk og utvidet resultat, fremfor å tolke økningen som større produktivitet.

Publiseringer dedupliseres etter Actions run-ID. Slutten på steget «Deploy to GitHub Pages» brukes som leveringstidspunkt, med deploy-jobbens slutt som reserve. Nye statuslinjer for samme deployment er ikke nye leveranser. En av de nyere workflowene er samlet markert som kansellert, men har både en vellykket deploy-jobb og en vellykket deployment-status. Den er derfor inkludert som en faktisk publisering. Historisk uttrekk valgte derimot vellykkede workflow-kjøringer; eventuelle tilsvarende tilfeller blant eldre kansellerte kjøringer kan være utelatt. De 90 er dermed dokumenterte observasjoner, ikke en garanti for at all historisk publiseringsaktivitet er fanget opp.

Ledetiden kobles til commit-grafen, ikke bare til siste merge. Merge-commits, automatiske logger-commits og commits som allerede inngikk i første observerte publisering, utelates fra ledetidsutvalget. Alle nødvendige forfedre finnes i dette materialet. Formelen er publiseringstidspunkt minus committer-tidspunkt, og medianen beregnes over de kvalifiserende commitene.

Den korte medianen viser at mange registrerte endringer har kommet raskt ut på testsiden. Den sier lite om tid brukt før første commit, venting mellom frontend og backend eller samlet arbeid med en funksjon. Arbeid som committes sent i utviklingen kan ha kort målt ledetid selv om oppgaven tok lang tid. Dokumentasjonsendringer, KI-støttet arbeid og korte endringer påvirker også utvalget. Vi bruker derfor tallene som utgangspunkt for refleksjon over egen leveranseprosess, ikke som en rangering av gruppemedlemmer eller bevis på moden produksjonsdrift.

### 5.4 Feil, gjenoppretting og omarbeiding

Tester og gjennomgang i pull requests skal avdekke feil før merge. Dette er forebyggende kvalitetssikring. En test som feiler i en PR, blir rettet og aldri publiseres, er ikke en produksjonsfeil i DORA-analysen. Beståtte tester viser samtidig bare at de undersøkte egenskapene består; de dokumenterer ikke at alle brukerreiser fungerer etter publisering.

Som et supplerende prosessmål undersøkte vi CI-kjøringer utløst av opprettelse eller oppdatering av pull requests. Uttrekket omfatter 140 kjøringer opprettet fra 19. oktober til 10. november 2026, med siste kjøring opprettet kl. 09:27:54 UTC. Dette uttrekket er litt nyere enn publiseringsuttrekket i punkt 5.1.

| Siste registrerte resultat per CI-kjøring | Antall |
| --- | ---: |
| Vellykket | 101 |
| Feil i steget «Run automated tests» | 37 |
| Feil i beregningen av release-målinger | 2 |
| Totalt | 140 |

39 av 140 kjøringer, omtrent 27,9 %, endte med feil. Dette er en CI-feilandel, ikke DORAs Change Fail Rate. Flere kjøringer kan gjelde samme PR og samme underliggende problem. Ved omkjøring viser uttrekket siste resultat per run-ID; tidligere forsøk er ikke telt separat. Vi har kontrollert hvilket steg som feilet, men ikke klassifisert alle årsakene inne i teststeget. Tallene dokumenterer dermed ikke 37 forskjellige applikasjonsfeil eller at 39 feilaktige versjoner ble publisert.

Resultatene viser at automatiserte kontroller har avdekket problemer under PR-arbeidet. Kalenderarbeidet 22. oktober inneholder for eksempel en [feilet testkjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39776893877) og en [senere vellykket kjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39777058000). Det støtter refleksjonen om tidlige tilbakemeldinger og mulighet til å rette før integrasjon, men dokumenterer ikke alene at alle feil ble stoppet før publisering. Feilene i release-verktøyet viser også at røde pipeline-kjøringer kan skyldes måleoppsettet fremfor selve appen.

En vellykket Pages-publisering kan inneholde en feil som først oppdages manuelt. Dersom en ny versjon for eksempel gjør at en innlogget bruker ikke kan registrere kamp, og dette krever en rask feilretting, kan hendelsen inngå i analysen. Vi må da kjenne den berørte publiseringen, påvirkningens start, rettingspubliseringen og tidspunktet da brukerreisen igjen er bekreftet fungerende. Change Fail Rate knyttes til den opprinnelige leveransen, mens Deployment Rework Rate knyttes til den uplanlagte korrigerende leveransen.

Et ønske fra brukertesting om bedre navn eller navigasjon er ikke automatisk en slik hendelse. Det må skilles mellom en feil som svekker avtalt funksjonalitet og krever korrigering, og ordinær læring eller videreutvikling av produktet. Testene i #141 viste dessuten at manglende deling mellom nettlesere er en akseptert prototypebegrensning. Dette skal ikke registreres som en ny feilutløsende deployment.

Statusene `error` og `failure` i Actions eller deployment-loggen er heller ikke alene tilstrekkelige: de må undersøkes for faktisk påvirkning og behov for gjenoppretting. Tid fra et vilkårlig bug-issue opprettes til det lukkes, måler saksbehandlingstid, ikke nødvendigvis gjenoppretting. Vi har ikke registrert disse sammenhengene konsekvent nok til å rekonstruere de tre hendelsesbaserte målene. Eventuelle senere estimater må merkes tydelig og begrunnes hendelse for hendelse.

Feil oppdaget ved faktisk bruk eller manuell testing er ikke systematisk merket og koblet til publiseringer i vår historikk. En etterfølgende kartlegging krever derfor manuell gjennomgang av issues, beskrivelser, kommentarer og relevante PR-er. Vi må i hvert tilfelle vurdere om saken gjaldt en publisert feil, et forbedringsønske eller en kjent begrensning, og forsøke å finne berørt og korrigerende leveranse. Tidspunktene kan fortsatt være ukjente selv om vi finner riktig issue. CI-dataene er derfor langt lettere å hente ut enn praktiske feil i bruk. Denne skjevheten i registreringen gjør at vi vet mer om automatiserte kontroller enn om den faktiske stabiliteten brukerne opplevde; den gir ikke grunnlag for å anta at feil utenfor testene ikke forekom.

### 5.5 Kritisk refleksjon over målingene

Målingene gir et skjevt, men nyttig bilde av arbeidet: Vi kan dokumentere leveransehastighet bedre enn stabilitet. Det skyldes blant annet at GitHub automatisk registrerer commits, CI og publiseringer, mens feil oppdaget i bruk i større grad ble diskutert i fritekst i issues og Teams. Manglende tall for feilrate, gjenoppretting og hendelsesdrevet omarbeiding er derfor først og fremst en begrensning ved registreringen. De er ikke dokumentasjon på at slike problemer ikke oppstod.

Medianen på 5 minutter og 56,5 sekunder må også tolkes sammen med variasjonen. Av 230 commits hadde 25 ledetid under ett minutt, 154 fra ett minutt til og med én time og 51 over én time. Blant de siste hadde 16 ledetid på minst ett døgn. Medianen er dermed forenlig med at enkelte endringer ventet i flere dager. Korte observasjoner omfatter også dokumentasjon og filendringer som raskt ble publisert. Vi kan ikke utlede en effekt av KI fra disse tallene: Arbeid før commit er ikke med, og sen committing kan gi kort målt ledetid uavhengig av hvor lang tid oppgaven tok.

En etterfølgende gjennomgang gir likevel konkrete eksempler som belyser feil og omarbeiding:

| Historisk spor | Hva som kan underbygges | Forbehold |
| --- | --- | --- |
| #70 / PR #71 → #77 / PR #78 | Etter publisering av HTML-prototypen måtte manglende JavaScript-referanse, CSS-kobling og HTML-struktur korrigeres. Den historiske HTML-versjonen bekrefter manglende scriptlasting. | En relevant kandidat til feilretting etter publisering. Problemer med knapper var også meldt før merge; hendelsen viser derfor en svakhet i oppfølgingen av testobservasjoner. |
| #54 / PR #91 → #93 / PR #96 | Kampoversikten ble koblet til et API som GitHub Pages ikke kjører. En egen demomodus ble deretter laget for den publiserte testlenken. | Underbygger et integrasjonsproblem mellom lokalt testmiljø og publiseringsmiljø. |
| PR #114 → #115 og PR #113 → #116 | Publiserte endringer ble tilbakeført. | Tilbakeføringene er dokumentert, men vi mangler sikker begrunnelse for å klassifisere dem som hendelsesdrevet rollback. |
| PR #97 og #133–#134 | Testkode etter konfliktløsing og oppsettet for måleverktøyet måtte korrigeres. | Dette er omarbeiding i utviklings-/leveranseprosessen, uten dokumentert brukerrettet driftsfeil. |

For de to første kandidatene er intervallene fra relevant publisering til publisert rettelse henholdsvis **36 minutter og 11 sekunder** og **37 minutter og 32 sekunder** den 20. oktober. Dette er rekonstruerte intervaller, ikke bekreftede gjenopprettingstider: Vi mangler samtidig verifikasjon av når funksjonene fungerte igjen for brukerne. Issue-lukking kan heller ikke erstatte dette tidspunktet. Eksempelvis ble #121 lukket 9. november, mens den tilhørende rettingen ble merget 26. oktober. En lukkedato kan gjelde administrativ opprydding.

Teams-utdraget fra perioden 19.–21. oktober viser at testinvitasjonen uttrykkelig opplyste at innlogging manglet. Dette støtter at manglende innlogging i denne testversjonen var en kommunisert avgrensning. Innspill om uklare navigasjonsbegreper og kalender førte videre til produktforbedringer. Slike endringer kan innebære omarbeiding i vanlig språkbruk, men er ikke automatisk Deployment Rework Rate: Vi må kunne knytte dem til en relevant produksjonshendelse. En senere, upresis omtale av tilgang uten å trykke «Utforsk» kan ikke klassifiseres sikkert og er utelatt fra hendelsesberegninger.

Vi har dermed nok materiale til å drøfte alle fem målingene, men ikke til å beregne sikre verdier for alle. En prosent basert bare på feilene vi tilfeldigvis finner igjen, kan undervurdere feilomfanget. På samme måte kan intervaller basert på publiseringstid gi et mer presist inntrykk enn dokumentasjonen tillater. Eksemplene brukes derfor kvalitativt, og de tre hendelsesbaserte målene beholdes som ukjente. Den korte prosjektperioden, begrensede brukergruppen og ufullstendige hendelseshistorikken gjør også sammenligning med modne driftsteam lite meningsfull.

### 5.6 Videre forbedring av datagrunnlaget

Det gamle CI-verktøyets release-/bugfix-klassifisering brukes ikke som erstatning for faktiske produksjonshendelser. Deploy-loggen er en hendelsesliste, ikke et ferdig dashboard; filen på `main` er eldre historikk, mens videre logging skjer på `dora-data`.

Vi ville bygget videre på eksisterende issues og PR-er. Når en relevant feil oppdages i bruk, registreres berørt publisering, påvirkning, tidspunkt og koblet rettings-PR i samme issue, gjerne med den eksisterende Production incident-malen. Rettelsen testes før merge og bekreftes etter publisering. Hvis starttidspunktet er ukjent, registreres oppdagelsestidspunktet som en uttrykkelig avgrenset tilnærming. Det trengs ingen parallell feilrapport for hver måling.

Et felles dashboard kan beregne publiseringsfrekvens og ledetid automatisk og vise hendelsesbaserte mål med datamangler. GitHub Projects kan supplere med arbeidsstatus og venting, men er ikke nødvendig for selve registreringen eller beregningen. Løsningen bør inngå i gruppas løpende prioritering og retrospektiv, sammen med brukerinnspill. Slik blir målingene et grunnlag for forbedring av flyt og kvalitet, fremfor et vedlegg som først leses ved innlevering.
DORA-målingene må vurderes i lys av prosjektets rammer. Stadionhopper er utviklet av en liten studentgruppe over en begrenset periode, og demonstrasjonsversjonen er ikke en fullstendig produksjonsløsning med aktive brukere og systematisk driftsovervåking.

Dette påvirker særlig muligheten til å måle Change Failure Rate og Mean Time to Restore. Dersom feil etter publisering ikke er registrert systematisk, vil det være vanskelig å beregne disse målingene på en pålitelig måte.

Også Deployment Frequency og Lead Time for Changes må tolkes med forsiktighet. Utviklingsaktiviteten har vært påvirket av innleveringsfrister, andre fag og varierende kapasitet. Dette kan føre til perioder med hyppige endringer og perioder med mindre aktivitet.

DORA-målingene kan likevel være nyttige som grunnlag for refleksjon. De gjør det mulig å undersøke hvordan kodeendringer beveger seg gjennom utviklingsprosessen, og hvor det eventuelt oppstår ventetid eller problemer.

Samtidig må leveransehastighet vurderes sammen med stabilitet og kvalitet. En høy publiseringsfrekvens er ikke nødvendigvis positiv dersom endringene fører til flere feil. Tilsvarende kan en stabil løsning ha begrenset verdi dersom den ikke dekker brukernes behov.

Brukertestingen gir derfor et viktig supplement til DORA-analysen. Mens DORA undersøker utviklings- og leveranseprosessen, gir brukertestingen innsikt i hvordan løsningen oppleves av potensielle brukere.

*** Legg inn en samlet vurdering av deres faktiske DORA-resultater. Hvilke målinger gir mest nyttig informasjon om prosjektet, og hvilke er mest usikre?

## 6. Retrospektiv: læring om samarbeid og forbedring

Gjennom Stadionhopper-prosjektet har vi fått praktisk erfaring med smidig utvikling og samarbeid i et lite utviklingsteam. Vi har brukt Scrum som utgangspunkt for organiseringen av arbeidet, men har underveis erfart at det ikke er tilstrekkelig å følge en bestemt arbeidsmetode dersom vi ikke samtidig legger til rette for god flyt, samarbeid og kontinuerlig forbedring. I starten hadde vi en tydelig fordeling av roller og arbeidsoppgaver, og Issues ble fordelt mellom gruppemedlemmene under scrum-møtene. Dette ga oss struktur og oversikt, men førte også til at enkelte oppgaver ble stående på vent fordi de var avhengige av at andre først fullførte sitt arbeid. Etter hvert begynte vi å samarbeide mer på tvers av de opprinnelige ansvarsområdene, og alle bidro gradvis også med programmering. Dette reduserte avhengighetene mellom oss og ga bedre flyt i utviklingsarbeidet. Samtidig fikk vi større innsikt i hverandres arbeid og en bedre felles forståelse av løsningen.

I ettertid ser vi at vi med fordel kunne organisert oppgavene etter et tydeligere pull-prinsipp, der gruppemedlemmene hentet nye oppgaver fra en prioritert backlog etter hvert som de hadde kapasitet, fremfor at alle oppgaver ble fordelt på forhånd. Et Kanban-board kunne vært nyttig for å synliggjøre hvilke oppgaver som var klare, under arbeid eller ferdigstilt, og hvor det eventuelt oppstod flaskehalser. Vi erfarte også at enkelte Issues var for omfattende eller hadde uklare avhengigheter, og at KI-genererte oppgaveforslag måtte gjennomgås og tilpasses før de kunne brukes. En mer konsekvent oppdeling i mindre, håndterbare oppgaver ville gjort det enklere å samarbeide fleksibelt og ferdigstille arbeid fortløpende. Vi ser også at vi burde hatt en mer systematisk struktur for registrering av utviklings- og leveranseaktiviteten. Dette ville gitt oss et bedre datagrunnlag for DORA-målingene, som i ettertid har vært utfordrende å hente ut fra GitHub Projects og den øvrige prosjekthistorikken. Erfaringen har vist oss at måling og evaluering bør planlegges som en del av arbeidsprosessen, og ikke først når resultatene skal analyseres.

Et annet viktig læringspunkt er hvordan vi prioriterte utviklingsarbeidet. Selv om vi hadde definert sentrale brukerreiser og en MVP, ser vi i ettertid at vi kunne brukt brukerreisene mer aktivt som et felles utgangspunkt for planlegging og prioritering. Vi arbeidet tidvis med flere funksjoner parallelt, fremfor å konsentrere oss om å ferdigstille én sammenhengende brukerreise av gangen. Med et tydeligere felles mål kunne vi trolig kommet tidligere frem til en enkel, men testbar prototype. Dette ville gitt oss mulighet til å involvere brukere tidligere og gjennomføre flere runder med testing og forbedring. Vi gjennomførte brukertesting og benyttet tilbakemeldingene til å videreutvikle løsningen, men kunne i større grad testet endringene fortløpende, for eksempel etter mindre feilrettinger eller forbedringer av funksjonalitet. Vi kunne også satt av mer tid til egen praktisk testing av hele brukerreisen, fremfor hovedsakelig å kontrollere enkeltfunksjoner. Automatiserte tester har vært nyttige for å oppdage tekniske feil, men brukertestingen har vist oss at det også er nødvendig å undersøke om løsningen faktisk er forståelig og nyttig for dem som skal bruke den.

Samlet sett har prosjektet gitt oss en bedre forståelse av hvorfor smidige prinsipper legger vekt på samarbeid, fungerende programvare, hyppige tilbakemeldinger og evnen til å tilpasse seg underveis. Vi ser at vi i perioder ble mer opptatt av å fordele og gjennomføre oppgaver enn av å ferdigstille funksjonalitet som kunne testes og gi brukerverdi. Dette er nettopp en av utfordringene smidige arbeidsmetoder skal bidra til å håndtere. Samtidig har vi gjennom prosjektet justert arbeidsformen etter hvert som vi har oppdaget hva som fungerte mindre godt. Dersom vi skulle startet på nytt, ville vi derfor lagt større vekt på en felles prioritert backlog, fleksibel oppgavefordeling, tydelige brukerreiser og korte utviklings- og tilbakemeldingssløyfer. Den viktigste erfaringen er at smidig utvikling ikke først og fremst handler om hvilke møter eller verktøy man bruker, men om hvordan teamet organiserer arbeidet for å skape verdi, lære og forbedre seg kontinuerlig.

## 7. Videre utvikling: Version 2 og systematisk måling

### 7.1 Produkt og teknisk videreutvikling

Dersom Stadionhopper skulle videreutvikles, ville vi først prioritert å ferdigstille kjernefunksjonene i MVP-en og gjøre løsningen klar for testing med reelle brukere. Brukerundersøkelsen viste at oversikt over kommende kamper var viktig for flere av respondentene, mens brukertestingen avdekket forbedringsmuligheter knyttet til navigasjon, begrepsbruk og presentasjon av informasjon. Vi ville derfor fortsatt arbeidet med den sentrale brukerreisen fra å finne en kamp til å registrere et besøk. Samtidig ville vi lagt større vekt på hyppig brukertesting, der mindre forbedringer testes fortløpende. Dette ville gitt oss et bedre grunnlag for å prioritere videre utvikling ut fra faktiske brukerbehov.

En annen viktig prioritering ville vært å videreutvikle den tekniske løsningen. Prototypen inneholder fortsatt hardkodede elementer, og den publiserte versjonen mangler en tilkoblet backend med felles datalagring. For å gjøre Stadionhopper tilgjengelig for reelle brukere ville vi derfor hatt behov for en fungerende databaseløsning, slik at brukerkontoer, kamper, stadioner og registrerte besøk kunne lagres og deles mellom brukere. Dette ville også krevd videre arbeid med autentisering, tilgangskontroll, sikkerhet og behandling av personopplysninger. I tillegg ville vi videreutviklet CI/CD-prosessen slik at automatiserte tester må bestås før nye versjoner publiseres.

Et særtrekk ved Stadionhopper er at vi har valgt en løsning der brukerne selv kan bidra med kampinformasjon, fremfor å basere oss på et eksternt API. Dette gir fleksibilitet fordi plattformen ikke er begrenset til kampene og divisjonene som finnes i en bestemt datakilde. På sikt kan det åpne for at løsningen også brukes innen barne- og ungdomsfotball, i andre geografiske områder eller i andre idretter. Vi ser også et potensial for at brukere med interesse for flere idretter kan samle aktivitetene sine på én plattform. En slik videreutvikling ville krevd tilpasninger og testing, men den brukerstyrte tilnærmingen gjør det mulig å utforske flere bruksområder uten å være avhengig av tilgang til eksterne kampdata. Samtidig innebærer denne løsningen utfordringer knyttet til datakvalitet, duplikater og feilaktig informasjon. Det ville derfor vært nødvendig å utvikle gode rutiner for registrering, kontroll og eventuell moderering av brukerinnhold.

Videreutvikling ville også krevd mer tid og økonomiske ressurser enn vi har hatt tilgjengelig i dette prosjektet. Etablering og drift av database, serverløsning og nødvendig sikkerhet ville medført kostnader, i tillegg til arbeidet med utvikling, testing og vedlikehold. I første omgang ville vi prioritert å utvikle en stabil og brukervennlig versjon som kunne prøves ut av en mindre gruppe brukere. Målet ville vært å undersøke om løsningen faktisk skaper verdi og om brukerne ønsker å fortsette å benytte den. Dersom vi kunne dokumentert interesse og nytte gjennom praktisk bruk, ville dette gitt et bedre utgangspunkt for å involvere lokale klubber, fotballkretsen eller andre potensielle samarbeidspartnere i videre utvikling. På lengre sikt kunne vi også vurdert sosiale funksjoner som å følge andre brukere og planlegge kampbesøk sammen, men først etter at de grunnleggende funksjonene fungerer godt.

Ved at brukerne selv bidrar med innhold, kan plattformen også utvikle seg i takt med deres interesser og behov. Dette gir mulighet for en mer personlig opplevelse, der brukerne i større grad kan påvirke hvilke kamper, arenaer og idretter som blir representert.

### 7.2 Systematisk måling og forbedring

DORA-analysen har vist betydningen av å ha et tydelig datagrunnlag for å kunne evaluere leveranseprosessen. Dersom Stadionhopper skulle videreutvikles til en tjeneste med aktive brukere, ville vi ønsket å etablere mer systematisk registrering av deployeringer og feil. En mulig løsning ville være å knytte kodeendringer og pull requests til faktiske publiseringer. Dette kunne gjort det enklere å beregne Deployment Frequency og Lead Time for Changes automatisk. Vi ville også etablert en tydelig prosess for registrering av feil som oppstår etter publisering. En enkel Issue-mal kunne inneholdt informasjon om hvilken versjon feilen gjelder, når den ble oppdaget, hvordan den påvirker brukerne, og hvilke tiltak som ble gjennomført. Ved å registrere tidspunktet for gjenoppretting kunne vi også fått et bedre grunnlag for å beregne Change Failure Rate og Mean Time to Restore. Et felles dashboard kunne gjort målingene tilgjengelige for utviklingsteamet og gitt bedre oversikt over utviklingen over tid. Målingene burde brukes som grunnlag for felles diskusjon og forbedring, ikke som et verktøy for å sammenligne enkeltpersoners arbeidsinnsats. Målet ville vært å identifisere flaskehalser, forbedre kvaliteten og gjøre leveranseprosessen mer forutsigbar. Vi ville også kombinert DORA-målingene med brukertilbakemeldinger og informasjon om faktisk bruk av løsningen. På denne måten kunne vi vurdert både hvor effektivt vi leverer programvare, og om endringene gir verdi for brukerne.

## 8. Avslutning

Gjennom Stadionhopper-prosjektet har vi fått erfaring med hele utviklingsprosessen fra idé og behovskartlegging til utvikling, testing og evaluering av en prototype.

Vi har erfart at utvikling av programvare krever mer enn å implementere funksjoner. Brukerundersøkelsen og brukertestingen har vist betydningen av å undersøke behov og tilpasse prioriteringene underveis.

Vi har også fått praktisk erfaring med Scrum, GitHub, versjonskontroll, automatiserte tester og kontinuerlig integrasjon. Samtidig har vi møtt utfordringer knyttet til oppgavefordeling, tekniske avhengigheter og tilgjengelig kapasitet.

Et sentralt læringspunkt er betydningen av å dele arbeidet opp i håndterbare oppgaver, avklare ansvar og sørge for at teamet har en felles forståelse av løsningen som skal utvikles.

DORA-analysen har gitt oss et nytt perspektiv på utviklingsarbeidet. Den viser hvordan leveranseprosessen kan undersøkes gjennom konkrete målinger, men også hvor viktig det er å ha pålitelige data og tydelige definisjoner.

*** Legg inn hovedresultatene fra DORA-analysen og hva dere mener disse sier om utviklingsprosessen.

Prosjektets begrensede varighet og mangel på ordinær produksjonsdrift gjør at vi må være forsiktige med å trekke bastante konklusjoner om leveransehastighet og stabilitet.

Dersom Stadionhopper skulle videreutvikles, ville vi prioritert en mer fullstendig teknisk løsning, videre brukertesting og en mer sammenhengende CI/CD-prosess.

*** Avslutt med en kort felles refleksjon om den viktigste erfaringen dere tar med dere fra prosjektet, og hva dere ville gjort annerledes dersom dere skulle startet på nytt.
