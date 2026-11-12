# Deliverable 4 – DORA-analyse og sluttrefleksjon

## 1. Innledning og avgrensning

Stadionhopper er en digital plattform som skal gjøre det enklere å oppdage og delta på lokale fotballkamper. Målet er å senke terskelen for å oppsøke lokalfotballen og på sikt bidra til økt engasjement og fellesskap rundt lokale klubber og stadioner. Prosjektet har i første omgang hatt fokus på lavere divisjoner i Møre og Romsdal. Arbeidet har vært gjennomført av tre aktive gruppemedlemmer, med begrenset tid og flere parallelle studieforpliktelser. 

I denne fjerde og siste leveransen evaluerer vi produktet og utviklingsprosessen. Vi gjennomfører en DORA-analyse for å undersøke hvordan vi har arbeidet med programvareleveranser, og reflekterer over erfaringene med Scrum, samarbeid, testing og CI/CD. Avslutningsvis vurderer vi hvordan Stadionhopper kan videreutvikles til en mer fullstendig løsning.

## 2. Produktet og oppnådde resultater

### 2.1 Den leverte prototypen

Den publiserte demonstrasjonsversjonen er tilgjengelig gjennom GitHub Pages og benytter eksempeldata og lokal nettleserlagring. En sentral brukerreise er å finne en kommende fotballkamp, se informasjon om kampen og stadionet, og registrere et kampbesøk. Denne reisen kan anses som relativt vanlig og forventet, og man finner det i apper som StikkUt!. Vi har i denne siste leveransen jobbet med få til en brukerreise vi er nysgjerrige på om er interessant. En bruker vet om at to klubber skal spille kamp, men finner den ikke i kampoversikten og legger den inn selv. Denne brukerreisen går det nå an å teste med prototypen. Prototypen inneholder i tillegg til nevnte funksjoner (kampoversikt med kalendervisning, kampdetaljer, stadioninformasjon og innsjekking) også funksjonene innlogging med testkontoer, brukerprofil og arrangementer som er statiske eksempelvisninger. I den siste sprinten har vi også videreutviklet det visuelle designet og lagt inn flere eksempelkamper. Brukere kan nå registrere kamper med eksisterende eller nye klubbnavn og spillesteder.

### 2.2 Gjennomførte brukerreiser

Statusgjennomgangen i [issue #141](https://github.com/Inetiger/Stadionhopper/issues/141) tok utgangspunkt i den publiserte GitHub Pages-demoen. Det ble gjennomført manuelle tester på PC, først fra et privat nettleservindu, og den grunnleggende kalenderreisen ble også kontrollert på mobil.

| Brukerreise eller kontroll | Observert resultat |
| --- | --- |
| Utforske uten innlogging | Appen åpnes, og kamper kan finnes i kalenderen. |
| Kalender og kampdetaljer | Månedsbytte mellom november og desember fungerer. Kampdetaljene viser riktig dato, klokkeslett og stadion. |
| Mobilvisning | Finne kamp, åpne detaljer og gå tilbake fungerer med samme resultat som på PC. Innholdet holder seg innenfor skjermbredden. |
| Innlogging og brukerbytte | Gyldig testkonto kan logge inn. Feil innloggingsopplysninger avvises med en forståelig melding. Innsjekkinger fra én testbruker vises ikke på en annen brukers profil. |
| Registrere kamp | Nye kamper beholdes i den aktuelle nettleseren og vises riktig. Nye klubbnavn og spillesteder utenfor forslagene kan også brukes. |
| Obligatoriske felt | Ufullstendig skjema stoppes, og brukeren får veiledning om hva som må fylles ut. |
| Duplikatkamp | Samme lag og tidspunkt gir beskjed om at kampen allerede finnes, og ingen ekstra kamp opprettes. |
| Innsjekking | Innsjekkingen vises i historikken. Knappen deaktiveres etter første trykk og hindrer gjentatt innsending i samme skjermbilde. |
| Sosial feed | Innsjekkingen vises én gang med riktig bruker og kamp. |

Alle funksjonene fungerte der de ble testet, med de begrensningene som er beskrevet.

### 2.3 Brukerbehov og prioriteringer

I starten av prosjektet definerte vi en MVP med innlogging og brukerprofil, stadionoversikt, kommende kamper, innsjekkinger og personlig historikk. Mer omfattende sosiale funksjoner ble prioritert lavere for å konsentrere arbeidet om det vi tenkte var de viktigste brukerbehovene og å utvikle en fungerende prototype. Vi gjennomførte en spørreundersøkelse med 19 respondenter, der 9 svarte at det å finne kommende kamper var den viktigste funksjonen. Vi implementerte derfor en listevisning av kommende kamper. Senere gjennomførte vi brukertesting, der vi mottok syv svar. Tilbakemeldingene viste at brukerne i hovedsak klarte å navigere i løsningen, men også at enkelte deler kunne bli tydeligere. Vi fikk blant annet innspill om navigasjon, fargebruk, begreper, og presentasjon av kamptidspunkter. Disse tilbakemeldingene bidro til at vi prioriterte forbedringer av eksisterende funksjonalitet fremfor å legge til stadig flere funksjoner. Vi byttet for eksempel ut listevisning av kamper med en kalendervisning.

### 2.4 Avgrensninger i den leverte løsningen

For å ha fokus på å teste funksjoner vi lurer på om er nyttige har gruppen blitt enige om å legge vekt på en tilgjengelig og testbar løsning, fremfor en løsning som kunne blitt tatt i bruk allerede nå. Vi har derfor valgt å benytte oss av lokal nettleserlagring for å teste funksjoner, fremfor å ha en løsning på database nå. Kamper og innsjekkinger deles dermed ikke mellom brukere eller enheter, og data kan gå tapt når privatøkten avsluttes eller nettleserdata slettes. Dette gjør det mulig å teste registrering og innsjekking individuelt, men ikke en sammenhengende sosial brukerreise der én bruker publiserer en kamp og en annen finner den på en annen enhet. Vi tror det er viktigere å få bekreftet av vi jobber med rett funksjoner før vi invester mer tid i backend og database. Backend er derimot utviklet for blant annet autentisering, brukerøkter, kampdata og innsjekkinger, men er ikke koblet til demonstrasjonsversjonen som er publisert gjennom GitHub Pages. Gruppa har også akseptert kartplassholderen, statiske arrangementer og manglende liveoppdatering av kamper som avgrensninger i sluttversjonen. Disse beskrives derfor ikke som ferdige funksjoner. Prototypen demonstrerer flere av de planlagte brukerreisene, men felles datalagring og videre teknisk utvikling er nødvendig før løsningen kan tas i bruk av reelle brukere.

## 3. Arkitektur og tekniske valg

Stadionhopper er utviklet med en frontend basert på HTML, CSS og JavaScript og en backend basert på Node.js. Arkitekturen skiller mellom brukergrensesnittet og håndteringen av data og applikasjonslogikk. I planleggingen av prosjektet valgte vi en enkel, filbasert løsning med JSON-filer for datalagring. Dette gjorde det mulig å arbeide med sentrale deler av systemet uten å etablere en full database fra starten. Det viste seg derimot at det ikke var mulig å lagre inputen fra brukere med denne løsningen. Derfor er den midlertidige løsningen er publisering via GitHub Pages, som leser eksempeldata fra en statisk JSON-fil og lagrer brukerregistrerte data i nettleseren. Node.js-backenden kan kjøres separat, men kjører ikke på Pages. 

Domenemodellen omfatter blant annet brukere, klubber, stadioner, kamper, innsjekkinger, innlegg og arrangementer.


## 4. Arbeidsprosess, testing og CI/CD

### 4.1 Arbeidsflyt og versjonskontroll

Gjennom hele prosjektet har Agile metoder vært grunnlaget for hvordan vi har hatt som mål å jobbe. Dette har vært en læringsprosess og vi har endret arbeidsmetode etter hvert som vi har gjort oss erfaringer underveis. Det som har vært med fra start til slutt er vårt ukentlige møte, inspirert av scrum. Vi har gått fra å jobbe delvis i Teams med word, til å gjøre alt skrivearbeid i Github slik at vi også har versjonskontroll på skrivearbeidet. Når vi begynte i Github ble vi enige om arbeidsflyten issue → branch → PR → gjennomgang → merge. I starten var issuesene brukt for å tydeliggjøre hvem som jobbet med hva, vi skrev og opprettet issues selv, dette tok en del tid, og en tydelig definition of done ble ikke implementert i første omgang. Etter dette prøvde vi å lage issues ved hjelp av KI, vi fikk da issues som blandet ulike roller, var vanskelig å forstå, og hadde mye mer tekst enn noen av oss var interesserte i å lese. Vi justerte litt tilbake og ønsket å dele opp i mindre frister. Denne gangen prøvde vi å ta over mer av kontrollen selv, samtidig knytte issuene til milepæler, prøvde å vise avhengighet med labels og implementere automatisk testing. Milepælene delte opp arbeidet i mindre frister, men vi fikk utfordringer med at avhengighetene KI definerte ikke stemte helt med det praktiske arbeidet. Denne gangen har vi skrelt det tilbake til enklere issues, og heller lagt mer vekt på jevn kommunikasjon på Teams, inkludert at gruppemedlemmer har hatt en åpen Teams-samtale for små avklaringer underveis. Vi merker at det nærmer seg eksamen, men alle prøver å være tilgjengelige, svare hverandre raskt og jobbe så mye med oppgaven vi rekker. 

### 4.2 Testing og kvalitetssikring

Det ble laget automatiske tester til forrige innlevering. Disse dekker funksjoner og utvalgte brukerreiser. Testene kjører i et lukket miljø og er ikke en garanti for at det virker, vi har oppdaget feil underveis. Manuell testing på ulike enheter er derfor fortsatt viktig, også når de automatiske testene i CI-pipelinen passerer. Når vi har utviklet nye funksjoner med hjelp av KI, har vi også utvidet og tilpasset testene, blant annet for registrering av kamper fra kalenderen. Testen dekker følgende områder:

| Område | Hva testene konkret kontrollerer |
|---|---|
| **Innlogging og utlogging** | Riktig brukernavn og passord gir innlogging. Feil eller manglende opplysninger avvises. Innlogging oppretter en sesjon, og utlogging gjør den ugyldig. |
| **Tilgang til brukerdata** | Profil og historikk krever gyldig sesjon. En bruker kan ikke få en annens historikk ved å sende inn et annet brukernavn. Utløpte sesjoner avvises. |
| **Kamper og kalender** | Kamper hentes og sorteres etter dato, kobles til riktige klubber og stadioner og vises på valgt kalenderdag. Valg av kamp åpner riktige detaljer. |
| **Registrering av nye kamper** | Gyldige kamper lagres. Eksisterende klubber gjenbrukes, og nye klubber og spillesteder opprettes. Manglende opplysninger, ugyldige datoer og duplikater avvises. Samtidige registreringer testes for tap av data. |
| **Registrering fra kalenderen** | Valgt dato følger med til skjemaet. Datoen beholdes hvis brukeren må logge inn først. Et allerede valgt klokkeslett beholdes ved bytte av dag. |
| **Innsjekking** | Brukeren kan velge kamp, bekrefte innsjekking og få besøket lagret og vist i historikken. Samme innsjekking kan ikke registreres to ganger. |
| **Bytte mellom brukere** | Forrige brukers profil og historikk fjernes når en annen logger inn. Innsjekkingene holdes adskilt. |
| **Sosial feed** | Innlegg vises med forfatter og tidspunkt, med nyeste først. Tomme eller ugyldige innlegg håndteres. Innhold som ligner HTML, behandles som tekst. |
| **Feilhåndtering i grensesnittet** | Nettverksfeil, tomme svar og ugyldige data gir statusmeldinger. Ved mislykket lagring beholdes utfylte opplysninger, og brukeren kan prøve igjen. Dobbeltklikk skal ikke sende samme registrering flere ganger. |
| **GitHub Pages-versjonen** | Eksempeldata lastes fra den statiske filen. Testinnlogging, lokal innsjekking, historikk og feed kontrolleres. Nye kamper beholdes ved simulert ny innlasting med samme nettleserlagring. Hvis lagring ikke virker, skal appen ikke melde at kampen er lagret. |
| **Filer og testdata** | Serveren leverer HTML, CSS og JavaScript. Utvalgte interne filer er utilgjengelige via serveren. Eksempeldata inneholder nødvendige felter og gyldige datoer. |

Vi har etablert en CI-prosess gjennom GitHub Actions, der JavaScript-syntaks og automatiserte tester kontrolleres ved pull requests og endringer i `main`. Vi har også benyttet GitHub Pages til å publisere demonstrasjonsversjonen. Publiseringen skjer gjennom en separat workflow og er ikke direkte avhengig av at alle CI-kontrollene er bestått. Dette innebærer at en vellykket publisering ikke nødvendigvis dokumenterer at alle tester har bestått. Gjennom prosjektet har vi også erfart at pull requests og automatiserte tester ikke erstatter behovet for kodegjennomgang. Vi har i hovedsak kontrollert beskrivelser og testresultater, og i mindre grad gjennomført systematiske gjennomganger av selve koden.

Manuell testing har også vist seg nødvendig f.eks når det gjelder lagring av brukerdata. Vi planla først å lagre brukerdata i JSON-filer gjennom en Node.js-backend. De automatiske testene kontrollerer at denne lagringen fungerer når backenden kjører. Utfordringen oppstod ved publisering på GitHub Pages, som bare leverer statiske filer og ikke kjører Node.js-backenden. Den publiserte prototypen kunne derfor ikke bruke den planlagte løsningen til å lagre nye brukerdata. Vi valgte nettleserlagring som en midlertidig løsning for å gjøre brukerreisene testbare. Dataene beholdes i den aktuelle nettleseren, men deles ikke mellom brukere på ulike enheter.

Testene har og avdekket feil som har blitt rettet før publisering. Et konkret eksempel på nytten av dette oppstod under arbeidet med kalenderfunksjonaliteten. Etter en kodeendring viste GitHub Actions at to av 41 tester feilet. Feilene ble undersøkt og rettet, og ved en senere kjøring bestod alle testene. 

Sist, men ikke minst har brukertesting vært verdifullt. Det hjelper oss både å få svar på om funksjonene vi utvikler har en verdi for brukeren, men også å oppdage feil. Personer som ikke har jobbet med utviklingen vil sannsynligvis misforstå hvordan det er meningen at man skal navigere og bruke funksjonene, og dermed prøve løsninger som ikke er planlagt fra utviklernes side. De kan og gi beskjed hvis man har fjernet eller endret på funksjoner som var brukt på en måte utviklerne ikke har forutsett. For å få en robust løsning vil brukertesting være nødvendig, både når det gjelder funksjoner man tester, og for å oppdage feil.

## 5. DORA-analyse

### 5.1 Avgrensning, datagrunnlag og hovedresultater

Vi bruker DORA til å undersøke leveransehastighet og stabilitet i prosjektet. Produksjonsreferansen er den publiserte GitHub Pages-prototypen som testbrukerne har tilgang til, ikke en fullstendig driftssatt backend. Måleperioden for disse tallene er 22. september 2026 til 10. november 2026. Perioden på omtrent 49 døgn går fra første dokumenterte publisering til siste publisering ved uttrekket. Arbeid før første publisering og senere endringer inngår ikke. Resultatene er et fast øyeblikksbilde, ikke en løpende total.

Vi har kombinert gjennomgang av historiske issues, commits og merges med nyere deployment-hendelser på `dora-data` (atuomatiske DORA målinger), deploy-jobber i GitHub Actions og commit-grafen fra `main`. Beregningene kan gjenskapes med `node scripts/summarize-dora-analysis.js metrics/dora/analysis-2026-11-10.json`. [Datagrunnlaget](metrics/dora/analysis-2026-11-10.json) inneholder publiseringsreferanser, commit-graf og et separat CI-uttrekk; [skriptet](scripts/summarize-dora-analysis.js) beregner publiseringsfrekvens og ledetid.

| DORA-måling | Resultat | Datagrunnlag og usikkerhet |
| --- | --- | --- |
| Deployment Frequency | **90 dokumenterte publiseringer; 12,86 per uke** | Pages/Actions og deployment-hendelser. Inkluderer dokumentasjon og konfigurasjon; eldre historikk kan være ufullstendig. |
| Change Lead Time / Lead Time for Changes | **Median 5 min 56,5 sek; 230 commits** | Commit-graf og første observerte publisering. Arbeid før commit er utelatt; enkelte endringer ventet flere dager. |
| Change Fail Rate / Change Failure Rate | **Ikke pålitelig beregnbar** | Enkelte publiserte feil kan identifiseres, men det finnes ikke en fullstendig klassifisering av leveranser som krevde umiddelbar korrigering. |
| Failed Deployment Recovery Time | **Ingen sikker samlet verdi. To rekonstruerte intervaller: 36 min 11 sek og 37 min 32 sek** | Fra relevant publisering til rettingspublisering, uten samtidig bekreftelse på gjenoppretting. Intervallene er eksempler, ikke et beregnet gjennomsnitt eller en median. |
| Deployment Rework Rate | **Ikke pålitelig beregnbar** | Rettings-PR-er og tilbakeføringer finnes, men er ikke konsekvent merket som uplanlagte leveranser som følge av produksjonshendelser. |

### 5.2 Publiseringsfrekvens

Hos oss har merge til `main` vært veien til publisering, men merge er ikke selve målepunktet. En deployment telles når Pages faktisk har publisert versjonen. En CI-kjøring, commit eller opprettet PR er ikke en deployment. Publiseringene dedupliseres etter Actions run-ID. Slutten på steget «Deploy to GitHub Pages» brukes som tidspunkt, med deploy-jobbens slutt som reserve. Frekvensen er 90 publiseringer delt på periodens lengde i uker. Aktiviteten var ujevnt fordelt: Det er registrert publiseringer på 12 UTC-datoer, og 32 av de 90 kom 20. oktober. Gjennomsnittet betyr derfor ikke at vi leverte jevnt hver dag. Innleveringsfrister og andre studieforpliktelser er relevant kontekst, men tallene alene forklarer ikke årsakene til variasjonen.

Historisk uttrekk frem til 9. november kl. 12:21:49 UTC ga 83 publiseringer og 12,07 per uke. Det nyere materialet tilfører sju publiseringer. To ligger i overgangsperioden da DORA-logging på `main` utløste ekstra Pages-aktivitet; én publiserte en automatisk logger-commit. PR #153 flyttet loggingen til `dora-data`. Fem av de nyere publiseringene fulgte etter rettingen. Økningen er derfor ikke et rent uttrykk for flere produktforbedringer. En nyere workflow er samlet markert som kansellert, men har vellykket deploy-jobb og deployment-status og er inkludert. Det historiske uttrekket valgte vellykkede workflow-kjøringer; tilsvarende eldre tilfeller kan være utelatt. De 90 er dokumenterte observasjoner, ikke en garanti for komplett historikk. Publiseringsfrekvensen inkluderer dessuten dokumentasjonsendringer og sier ikke hvor mange nye funksjoner brukerne fikk.

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

De to intervallene gjelder 20. oktober og bruker tidspunkt fra Pages-publiseringer. Vi mangler samtidig bekreftelse på når brukerreisene fungerte igjen etter publisering. De er derfor rekonstruerte anslag på et rettingsforløp, ikke verifiserte gjenopprettingstider. Issue-lukking er heller ikke en sikker sluttmarkør: #121 ble lukket 9. november, mens den tilhørende rettingen ble merget 26. oktober. Sen lukking kan derfor skyldes administrativ opprydding.

Testinvitasjonen som ble delt i Teams 19.–21. oktober, opplyste at innlogging ikke var tilgjengelig. Dette støtter at manglende innlogging i den versjonen var en kommunisert avgrensning. Brukerinnspill om navn, navigasjon og kalender viser læring og videreutvikling, men er ikke automatisk hendelsesdrevet rework. Den senere, uklare omtalen av tilgang uten å trykke «Utforsk» kan ikke klassifiseres sikkert og holdes utenfor beregningene.

Uttrekket gir ikke en fullstendig hendelsesoversikt, sikre påvirkningstidspunkter eller konsekvent registrering av uplanlagte rettinger. Derfor oppgir vi ingen samlet feilprosent, rework-prosent eller gjenopprettingstid. En prosent basert bare på gjenfunne feil ville kunne undervurdere omfanget. Manglende data må ikke presenteres som null feil. Totalt sett er gruppas erfaring at vi burde ha implementert en måte å systematisk hente ut denne informasjonen. Arbeidet med å lese i issues, PR-er og Teams-chatter er tidkrevende og gir mye rom for feil. Vi har funnet eksempler på feil som hindret bruk av appen, men registreringen er ikke tilstrekkelig til å beregne en samlet DORA-feilrate.

### 5.5 CI som supplerende kvalitetsinformasjon

Et separat uttrekk omfatter **140 PR-utløste CI-kjøringer**, opprettet fra 19. oktober til 10. november, med siste kjøring opprettet kl. 10.27.54 norsk tid. Dette er litt senere enn publiseringsuttrekket: 101 kjøringer var vellykkede, 37 feilet i «Run automated tests» og to i release-beregningen. Samlet CI-feilandel er **39/140, omtrent 27,9 %**.

Dette er siste resultat per run-ID, ikke alle omkjøringsforsøk, antall unike kodefeil eller antall PR-er. Vi har kontrollert feilet steg, men ikke klassifisert alle underliggende årsaker. Kalenderarbeidet 22. oktober har en [feilet kjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39776893877) og en [senere vellykket kjøring](https://github.com/Inetiger/Stadionhopper/actions/runs/39777058000), som viser at kontrollene ga tilbakemelding under PR-arbeidet. Det dokumenterer ikke alene at alle feil ble stoppet før publisering.

En PR-test som feiler, rettes og aldri publiseres, inngår ikke i Change Fail Rate. Omvendt kan en vellykket publisering inneholde feil som testene ikke dekker. Heller ikke `error` i deployment-loggen beviser brukerrettet feil: Et publiseringsforsøk kan feile mens forrige versjon fortsatt fungerer.

### 5.6 Samlet vurdering og mer systematisk måling

Analysen dokumenterer hyppige prototypepubliseringer og kort median ledetid, men gir svakere kunnskap om stabilitet. Automatisk registrering gjør CI-problemer lettere å finne enn feil meldt i Teams eller fritekst i issues. En liten brukergruppe og ufullstendig registrering kan gjøre feil mindre synlige. Vi kan derfor ikke konkludere at rask levering innebar høy kvalitet eller stor brukerverdi. Brukertestingen utfyller leveransemålene med innsikt i forståelighet og behov. Det eldre verktøyets release-/bugfix-klassifisering kan ikke erstatte denne analysen. Ulike totaler i `data.yaml` og `release.yaml` beskriver ikke nødvendigvis samme utvalg og er ikke dokumentasjon på produksjonshendelser. Vi bruker Pages-hendelser til levering og beskriver stabilitet gjennom etterprøvbare eksempler og uttrykkelig manglende målegrunnlag. Tallene brukes til felles læring, ikke rangering av enkeltpersoner eller klassifisering mot modne driftsteam.

Behovet for mer systematisk måling følger særlig av manglende kobling mellom feil og publiseringer. Punkt 7.2 beskriver hvordan vi ville registrert hendelser, automatisert beregningene og brukt resultatene i forbedringsarbeidet.

## 6. Retrospektiv: læring om samarbeid og forbedring

I starten fordelte vi oppgaver ut fra faste roller, noe som ga struktur, men også skapte avhengigheter og ventetid. I en Scrum-avklaring oppdaget vi at frontend ventet på backend, mens backend ventet på et frontend-utkast. Vi avklarte oppgavene, delte dem i issues og kom videre samme dag. Etter hvert samarbeidet vi mer på tvers av ansvarsområdene, og alle bidro også med programmering. Vi opplevde at dette ga bedre flyt, større fleksibilitet og en bedre felles forståelse av løsningen.

I ettertid ser vi at vi med fordel kunne organisert oppgavene etter et tydeligere pull-prinsipp, der gruppemedlemmene hentet nye oppgaver fra en prioritert backlog etter hvert som de hadde kapasitet, fremfor at alle oppgaver ble fordelt på forhånd. Et Kanban-board kunne vært nyttig for å synliggjøre hvilke oppgaver som var klare, under arbeid eller ferdigstilt, og hvor det eventuelt oppstod flaskehalser. Vi erfarte også at enkelte Issues var for omfattende eller hadde uklare avhengigheter, og at KI-genererte oppgaveforslag måtte gjennomgås og tilpasses før de kunne brukes. En mer konsekvent oppdeling i mindre, håndterbare oppgaver ville gjort det enklere å samarbeide fleksibelt og ferdigstille arbeid fortløpende.

Et annet viktig læringspunkt er hvordan vi prioriterte utviklingsarbeidet. Selv om vi hadde definert sentrale brukerreiser og en MVP, ser vi i ettertid at vi kunne brukt brukerreisene mer aktivt som et felles utgangspunkt for planlegging og prioritering. Vi arbeidet tidvis med flere funksjoner parallelt, fremfor å konsentrere oss om å ferdigstille én sammenhengende brukerreise av gangen. Med et tydeligere felles mål kunne vi trolig kommet tidligere frem til en enkel, men testbar prototype. Dette ville gitt oss mulighet til å involvere brukere tidligere og gjennomføre flere runder med testing og forbedring. Vi gjennomførte brukertesting og benyttet tilbakemeldingene til å videreutvikle løsningen, men kunne i større grad testet endringene fortløpende, for eksempel etter mindre feilrettinger eller forbedringer av funksjonalitet. Vi kunne også satt av mer tid til egen praktisk testing av hele brukerreisen, fremfor hovedsakelig å kontrollere enkeltfunksjoner.

## 7. Videre utvikling: Version 2 og systematisk måling

### 7.1 Produkt og teknisk videreutvikling

Dersom Stadionhopper skulle videreutvikles, ville vi først prioritert å ferdigstille kjernefunksjonene i MVP-en og gjøre løsningen klar for testing i en større gruppe av brukere. Vi ville fortsatt arbeidet med den sentrale brukerreisen fra å finne en kamp til å registrere et besøk. Samtidig ville vi lagt større vekt på hyppig brukertesting, der mindre forbedringer testes fortløpende.

En annen viktig prioritering ville vært å videreutvikle den tekniske løsningen. Prototypen inneholder fortsatt hardkodede elementer, og den publiserte versjonen mangler en tilkoblet backend med felles datalagring. For å gjøre Stadionhopper tilgjengelig for reelle brukere ville vi derfor hatt behov for en publisert backend med felles, varig lagring, slik at brukerkontoer, kamper, stadioner og registrerte besøk kunne lagres og deles mellom brukere. Dette ville også krevd videre arbeid med autentisering, tilgangskontroll, sikkerhet og behandling av personopplysninger.

Et særtrekk ved Stadionhopper er at vi har valgt en løsning der brukerne selv kan bidra med kampinformasjon, fremfor å basere oss på et eksternt API. Dette gir fleksibilitet fordi plattformen ikke er begrenset til kampene og divisjonene som finnes i en bestemt datakilde. På sikt kan det åpne for at løsningen også brukes innen barne- og ungdomsfotball, i andre geografiske områder eller i andre idretter. Samtidig innebærer denne løsningen utfordringer knyttet til datakvalitet, duplikater og feilaktig informasjon. Det ville derfor vært nødvendig å utvikle gode rutiner for registrering, kontroll og eventuell moderering av brukerinnhold.

Etablering og drift av database, serverløsning og nødvendig sikkerhet ville medført kostnader, i tillegg til arbeidet med utvikling, testing og vedlikehold. I første omgang ville vi prioritert å utvikle en stabil og brukervennlig versjon som kunne prøves ut av en mindre gruppe brukere. Målet ville vært å undersøke om løsningen faktisk skaper verdi og om brukerne ønsker å fortsette å benytte den. Dersom vi kunne dokumentert interesse og nytte gjennom praktisk bruk, ville dette gitt et bedre utgangspunkt for å involvere lokale klubber, fotballkretsen eller andre potensielle samarbeidspartnere i videre utvikling. På lengre sikt kunne vi også vurdert sosiale funksjoner som å følge andre brukere og planlegge kampbesøk sammen, men først etter at de grunnleggende funksjonene fungerer godt.

### 7.2 Systematisk måling og forbedring

Dersom Stadionhopper skulle videreutvikles, ville vi etablert en mer systematisk kobling mellom commits, pull requests og faktiske publiseringer for å beregne publiseringsfrekvens og ledetid automatisk. Vi ville også etablert tydeligere rutiner for registrering og oppfølging av feil som oppstår etter publisering. Den eksisterende Issue-malen for produksjonshendelser kunne blitt brukt mer konsekvent til å dokumentere hvilken versjon som er berørt, hvordan feilen påvirker brukerne, når den ble oppdaget, hvilken retting som ble gjennomført, og når funksjonaliteten ble bekreftet gjenopprettet. Dette ville gitt et bedre grunnlag for Change Fail Rate, gjenopprettingstid og Deployment Rework Rate. Sistnevnte krever også at vi markerer hvilke publiseringer som var uplanlagte rettinger etter en produksjonshendelse. Der tidspunktet for når en feil oppstod er ukjent, måtte dette markeres tydelig fremfor å anta at oppdagelsestidspunktet er det samme.

I tillegg ville vi forbedret CI/CD-prosessen ved å kreve beståtte automatiserte tester før publisering og kontrollere sentrale brukerreiser etter at endringene er publisert. På lengre sikt kunne automatisert overvåking og regelmessige tester av viktige brukerreiser gjort det enklere å oppdage feil og dokumentere når funksjonaliteten er gjenopprettet. Et felles dashboard kunne samlet DORA-målingene og vist både resultater, måleperioder og eventuelle mangler i datagrunnlaget. Vi ville også etablert felles definisjoner og tydelig ansvar for registrering og oppfølging av hendelser. Resultatene burde gjennomgås jevnlig i teamets retrospektiver og brukes til å identifisere flaskehalser og vurdere effekten av forbedringstiltak, ikke til å sammenligne enkeltpersoners arbeidsinnsats. Sammen med brukertilbakemeldinger og informasjon om faktisk bruk av løsningen ville dette gitt et bedre grunnlag for å vurdere både utviklingsprosessen og verdien vi skaper for brukerne.

## 8. Avslutning

Vi har utviklet en demonstrasjonsversjon som viser sentrale brukerreiser, blant annet å finne kommende fotballkamper og registrere kampbesøk. DORA-analysen viste 90 dokumenterte publiseringer og en median ledetid på 5 minutter og 56,5 sekunder fra commit til publisering. Dette viser at mange endringer ble publisert raskt, men målingene sier ikke hvor lang tid selve utviklingsarbeidet tok. Vi mangler også tilstrekkelige data til å beregne feilrate og gjenopprettingstid på en pålitelig måte.

Den viktigste lærdommen er likevel knyttet til hvordan vi har organisert arbeidet. Vi erfarte at en tydelig rollefordeling ga struktur, men også kunne skape avhengigheter og ventetid. Etter hvert fikk vi bedre flyt gjennom mer fleksibelt samarbeid og mindre oppgaver. Dersom vi skulle startet prosjektet på nytt, ville vi prioritert en sammenhengende brukerreise tidligere, gjennomført hyppigere testing og lagt større vekt på felles prioriteringer fremfor individuell oppgavefordeling.
