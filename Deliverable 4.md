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

I den siste sprinten har vi gjort flere mindre forbedringer av prototypen. Vi har videreutviklet det visuelle designet, lagt inn flere eksempelkamper slik at kalenderfunksjonen blir enklere å demonstrere, og lagt til en knapp for å registrere nye kamper. Endringene har hatt som mål å gjøre løsningen mer oversiktlig og gi et bedre grunnlag for å demonstrere de sentrale brukerreisene.

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

I den siste sprinten har vi videreført den etablerte arbeidsflyten med branches og pull requests, både for forbedringer av prototypen og for arbeidet med sluttrapporten. Rapporten er skrevet og redigert i GitHub, slik at gruppemedlemmene kan gjennomgå endringer og gi tilbakemeldinger før de integreres i `main`. Dette har gjort det mulig å bruke den samme samarbeidsstrukturen for dokumentasjon som for utvikling av programvaren.

### 4.2 Testing og kvalitetssikring

Vi har benyttet både automatiserte tester og manuell brukertesting for å kvalitetssikre løsningen. De automatiserte testene har blant annet kontrollert autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekkinger. Testene har vært kjørt gjennom GitHub Actions som en del av CI-prosessen. Et konkret eksempel på nytten av dette oppstod under arbeidet med kalenderfunksjonaliteten. Etter en kodeendring viste GitHub Actions at to av 41 tester feilet. Feilene ble undersøkt og rettet, og etter en ny commit bestod alle testene før endringene ble integrert i `main`. ***fjerne eksempelet?

Dette viste oss hvordan automatiserte tester kan bidra til å oppdage feil tidlig i utviklingsprosessen.

Samtidig har brukertestingen gitt en annen type innsikt. De automatiserte testene undersøker om funksjoner oppfører seg som forventet, mens brukertestingen har vist hvordan personer utenfor utviklingsgruppen opplever løsningen. Vi har derfor erfart at teknisk testing og brukertesting utfyller hverandre. En løsning kan fungere teknisk uten at den nødvendigvis er enkel å forstå eller bruke.

### 4.3 CI/CD og publisering

Vi har etablert en CI-prosess gjennom GitHub Actions, der JavaScript-syntaks og automatiserte tester kontrolleres ved pull requests og endringer i `main`. Vi har også benyttet GitHub Pages til å publisere demonstrasjonsversjonen. Publiseringen skjer gjennom en separat workflow og er ikke direkte avhengig av at alle CI-kontrollene er bestått. Dette innebærer at en vellykket publisering ikke nødvendigvis dokumenterer at alle tester har bestått. Vi har dermed fått erfaring med både kontinuerlig integrasjon og automatisert publisering, men har ikke etablert en fullstendig leveranseprosess der beståtte tester er et krav før produksjonssetting.

Gjennom prosjektet har vi også erfart at pull requests og automatiserte tester ikke erstatter behovet for kodegjennomgang. Vi har i hovedsak kontrollert beskrivelser og testresultater, og i mindre grad gjennomført systematiske gjennomganger av selve koden.

*** Kontroller om denne beskrivelsen fortsatt stemmer etter siste sprint. Oppdater eventuelle endringer i testoppsett, workflows eller publiseringsrutiner.

## 5. DORA-analyse

### 5.1 Avgrensning, datagrunnlag og hovedresultater

Vi bruker DORA til å undersøke leveransehastighet og stabilitet i prosjektet. Produksjonsreferansen er den publiserte GitHub Pages-prototypen som testbrukerne har tilgang til, ikke en fullstendig driftssatt backend. Oppgaveteksten etterspør fire målinger, inkludert Mean Time to Restore. Vi behandler gjenoppretting av feilutløsende leveranser gjennom det mer avgrensede Failed Deployment Recovery Time og vurderer i tillegg Deployment Rework Rate, slik #142 legger opp til.

Måleperioden er **22. september 2026 kl. 11.30.51 til 10. november 2026 kl. 10.17.11 norsk tid, eksklusiv slutt** (09:30:51 UTC og 09:17:11 UTC). Perioden på omtrent 48,99 døgn går fra første dokumenterte publisering til siste publisering ved uttrekket. Arbeid før første publisering og senere endringer inngår ikke. Resultatene er et fast øyeblikksbilde, ikke en løpende total.

Vi har kombinert historisk uttrekk fra PR #154, nyere deployment-hendelser på `dora-data`, deploy-jobber i GitHub Actions og commit-grafen fra `main`. Beregningene kan gjenskapes med `node scripts/summarize-dora-analysis.js metrics/dora/analysis-2026-11-10.json`. [Datagrunnlaget](metrics/dora/analysis-2026-11-10.json) inneholder publiseringsreferanser, commit-graf og et separat CI-uttrekk; [skriptet](scripts/summarize-dora-analysis.js) beregner publiseringsfrekvens og ledetid.

| DORA-måling | Resultat | Datagrunnlag og usikkerhet |
| --- | --- | --- |
| Deployment Frequency | **90 dokumenterte publiseringer; 12,86 per uke** | Pages/Actions og deployment-hendelser. Inkluderer dokumentasjon og konfigurasjon; eldre historikk kan være ufullstendig. |
| Change Lead Time / Lead Time for Changes | **Median 5 min 56,5 sek; 230 commits** | Commit-graf og første observerte publisering. Arbeid før commit er utelatt; enkelte endringer ventet flere dager. |
| Change Fail Rate / Change Failure Rate | **Ikke pålitelig beregnbar** | Enkelte publiserte feil kan identifiseres, men det finnes ikke en fullstendig klassifisering av leveranser som krevde umiddelbar korrigering. |
| Failed Deployment Recovery Time | **Ingen sikker samlet verdi. To rekonstruerte intervaller: 36 min 11 sek og 37 min 32 sek** | Fra relevant publisering til rettingspublisering, uten samtidig bekreftelse på gjenoppretting. Intervallene er eksempler, ikke et beregnet gjennomsnitt eller en median. |
| Deployment Rework Rate | **Ikke pålitelig beregnbar** | Rettings-PR-er og tilbakeføringer finnes, men er ikke konsekvent merket som uplanlagte leveranser som følge av produksjonshendelser. |

### 5.2 Publiseringsfrekvens

Hos oss har merge til `main` vært veien til publisering, men merge er ikke selve målepunktet. En deployment telles når Pages faktisk har publisert versjonen. En CI-kjøring, commit eller opprettet PR er ikke en deployment. Publiseringene dedupliseres etter Actions run-ID. Slutten på steget «Deploy to GitHub Pages» brukes som tidspunkt, med deploy-jobbens slutt som reserve.

Frekvensen er 90 publiseringer delt på periodens lengde i uker. Aktiviteten var ujevnt fordelt: Det er registrert publiseringer på 12 UTC-datoer, og 32 av de 90 kom 20. oktober. Gjennomsnittet betyr derfor ikke at vi leverte jevnt hver dag. Innleveringsfrister og andre studieforpliktelser er relevant kontekst, men tallene alene forklarer ikke årsakene til variasjonen.

Historisk uttrekk frem til 9. november kl. 12:21:49 UTC ga 83 publiseringer og 12,07 per uke. Det nyere materialet tilfører sju publiseringer. To ligger i overgangsperioden da DORA-logging på `main` utløste ekstra Pages-aktivitet; én publiserte en automatisk logger-commit. PR #153 flyttet loggingen til `dora-data`. Fem av de nyere publiseringene fulgte etter rettingen. Økningen er derfor ikke et rent uttrykk for flere produktforbedringer.

En nyere workflow er samlet markert som kansellert, men har vellykket deploy-jobb og deployment-status og er inkludert. Det historiske uttrekket valgte vellykkede workflow-kjøringer; tilsvarende eldre tilfeller kan være utelatt. De 90 er dokumenterte observasjoner, ikke en garanti for komplett historikk. Publiseringsfrekvensen inkluderer dessuten dokumentasjonsendringer og sier ikke hvor mange nye funksjoner brukerne fikk.

### 5.3 Ledetid og variasjon

For hver kvalifiserende commit beregnes tiden fra committer-tidspunkt til første observerte publisering som inneholder commiten, fulgt gjennom commit-grafen. Merge-commits, automatiske logger-commits og commits som allerede inngikk i første observerte publisering, utelates. Ingen nødvendige commit-forfedre mangler i det innhentede materialet.

Medianen er **5 minutter og 56,5 sekunder**, men variasjonen er betydelig: 25 commits har ledetid under ett minutt, 154 fra ett minutt til og med én time og 51 over én time. Av de siste har 16 minst ett døgn. At enkelte endringer ventet flere dager, er dermed forenlig med en kort median. Det eldre uttrekket ga median 6 minutter og 16,5 sekunder for 218 commits; utvidelsen gir 230 observasjoner.

Målingen beskriver ikke tiden det tok å utvikle en brukerhistorie. Planlegging, programmering og avklaringer før commit er utelatt. Sent registrerte commits og små filendringer kan gi svært kort ledetid. Venting på gjennomgang og integrasjon etter commit kan derimot inngå. Vi har erfart avhengigheter mellom frontend og backend, men har ikke isolert deres bidrag til den målte ledetiden. Vi kan heller ikke utlede en effekt av KI eller sammenligne arbeidsinnsats fra disse tallene.

### 5.4 Feil, gjenoppretting og omarbeiding

Change Fail Rate er andelen relevante publiseringer som krever umiddelbar korrigering. Failed Deployment Recovery Time gjelder tiden til gjenoppretting etter en feilutløsende leveranse. Deployment Rework Rate gjelder andelen uplanlagte publiseringer gjennomført som følge av produksjonshendelser. Den opprinnelige feilutløsende leveransen og den korrigerende leveransen spiller dermed ulike roller i beregningene.

Feil oppdaget i bruk er ikke systematisk merket eller koblet til publiseringer. En manuell gjennomgang av issues, PR-er og enkelte historiske kodeversjoner gir likevel relevante eksempler:

| Spor | Dokumentert forhold og tolkning |
| --- | --- |
| #70 / PR #71 → #77 / PR #78 | Den publiserte HTML-prototypen manglet JavaScript-referanse og måtte korrigeres. Fra relevant publisering til rettingspublisering gikk **36 min 11 sek**. Problemer med knapper var også meldt før merge. |
| #54 / PR #91 → #93 / PR #96 | Kampoversikten brukte et API som Pages ikke kjører. En eksplisitt demomodus rettet publiseringsmiljøets datatilgang. Tilsvarende intervall var **37 min 32 sek**. |
| PR #114 → #115 og #113 → #116 | Publiserte endringer ble tilbakeført, men begrunnelsen er utilstrekkelig til sikker klassifisering som hendelsesdrevet rollback. |
| PR #97 og #133–#134 | Testkode etter konfliktløsing og måleverktøyets oppsett måtte korrigeres. Dette dokumenterer omarbeiding i leveranseprosessen, uten dokumentert brukerrettet driftsfeil. |

De to intervallene gjelder 20. oktober og bruker tidspunkt fra Pages-publiseringer. Vi mangler samtidig bekreftelse på når brukerreisene fungerte igjen. De er derfor rekonstruerte anslag på et rettingsforløp, ikke verifiserte gjenopprettingstider. Issue-lukking er heller ikke en sikker sluttmarkør: #121 ble lukket 9. november, mens den tilhørende rettingen ble merget 26. oktober.

Teams-utdraget fra 19.–21. oktober opplyser uttrykkelig i testinvitasjonen at innlogging manglet. Dette støtter at manglende innlogging i den versjonen var en kommunisert avgrensning. Brukerinnspill om navn, navigasjon og kalender viser læring og videreutvikling, men er ikke automatisk hendelsesdrevet rework. Den senere, uklare omtalen av tilgang uten å trykke «Utforsk» kan ikke klassifiseres sikkert og holdes utenfor beregningene.

Uttrekket gir ikke en fullstendig hendelsesoversikt, sikre påvirkningstidspunkter eller konsekvent registrering av uplanlagte rettinger. Derfor oppgir vi ingen samlet feilprosent, rework-prosent eller gjenopprettingstid. En prosent basert bare på gjenfunne feil ville kunne undervurdere omfanget. Manglende data må ikke presenteres som null feil.

### 5.5 CI som supplerende kvalitetsinformasjon

Et separat uttrekk omfatter **140 PR-utløste CI-kjøringer**, opprettet fra 19. oktober til 10. november, med siste kjøring opprettet kl. 10.27.54 norsk tid. Dette er litt senere enn publiseringsuttrekket: 101 kjøringer var vellykkede, 37 feilet i «Run automated tests» og to i release-beregningen. Samlet CI-feilandel er **39/140, omtrent 27,9 %**.

Dette er siste resultat per run-ID, ikke alle omkjøringsforsøk, antall unike kodefeil eller antall PR-er. Vi har kontrollert feilet steg, men ikke klassifisert alle underliggende årsaker. Kalenderarbeidet 22. oktober har en [feilet kjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39776893877) og en [senere vellykket kjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39777058000), som viser at kontrollene ga tilbakemelding under PR-arbeidet. Det dokumenterer ikke alene at alle feil ble stoppet før publisering.

En PR-test som feiler, rettes og aldri publiseres, inngår ikke i Change Fail Rate. Omvendt kan en vellykket publisering inneholde feil som testene ikke dekker. Heller ikke `error` i deployment-loggen beviser brukerrettet feil: Et publiseringsforsøk kan feile mens forrige versjon fortsatt fungerer. Disse skillene hindrer at CI, publisering og faktisk produktkvalitet blandes sammen.

### 5.6 Samlet vurdering og mer systematisk måling

Analysen dokumenterer hyppige prototypepubliseringer og kort median ledetid, men gir svakere kunnskap om stabilitet. Automatisk registrering gjør CI-problemer lettere å finne enn feil meldt i Teams eller fritekst i issues. En liten brukergruppe og ufullstendig registrering kan gjøre feil mindre synlige. Vi kan derfor ikke slutte at rask levering innebar høy kvalitet eller stor brukerverdi. Brukertestingen utfyller leveransemålene med innsikt i forståelighet og behov.

Det eldre verktøyets release-/bugfix-klassifisering kan ikke erstatte denne analysen. Ulike totaler i `data.yaml` og `release.yaml` beskriver ikke nødvendigvis samme utvalg og er ikke dokumentasjon på produksjonshendelser. Vi bruker Pages-hendelser til levering og beskriver stabilitet gjennom etterprøvbare eksempler og uttrykkelig manglende målegrunnlag. Tallene brukes til felles læring, ikke rangering av enkeltpersoner eller klassifisering mot modne driftsteam.

Med mer tid og driftsstøtte ville vi automatisert koblingen mellom commits og publiseringer og lagt hendelsesregistrering inn i eksisterende issues. Den eksisterende Production incident-malen kan samle berørt deployment/SHA, faktisk påvirkning, start og oppdagelse, rettings-PR, korrigerende publisering og bekreftet gjenoppretting. Ukjent starttid må markeres; oppdagelsestid kan bare brukes som en tydelig merket tilnærming. Rettelser testes før merge, og brukerreisen kontrolleres etter publisering. Overvåking og syntetiske tester av sentrale reiser kunne supplert manuelle meldinger og gitt bedre tidspunkt for påvirkning og gjenoppretting.

Et felles dashboard kunne beregnet målene løpende og vist periode, antall observasjoner og datamangler. GitHub Projects kan vise arbeidsstatus, men er ikke nødvendig for å måle DORA. I et større prosjekt ville vi avtalt felles definisjoner, ansvar for hendelsesoppfølging og regelmessig gjennomgang av datakvalitet. Målingene bør brukes i retrospektiv til å velge og evaluere små forbedringer i arbeidsflyten, sammen med brukertilbakemeldinger. Slik kobles tekniske kontroller og leveranser til samarbeid, prioritering og ønsket brukerverdi.

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
