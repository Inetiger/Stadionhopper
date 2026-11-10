# Deliverable 4 – DORA-analyse og sluttrefleksjon

## 1. Innledning og avgrensning

Stadionhopper er en digital plattform som skal gjøre det enklere å oppdage og delta på lokale fotballkamper. Målet er å senke terskelen for å oppsøke lokalfotballen og på sikt bidra til økt engasjement og fellesskap rundt lokale klubber og stadioner. Prosjektet har i første omgang hatt fokus på lavere divisjoner i Møre og Romsdal. Gjennom prosjektet har vi arbeidet med produktutvikling fra idé og behovskartlegging til utvikling, testing og evaluering av en nettbasert prototype. Arbeidet har vært gjennomført av tre aktive gruppemedlemmer, med begrenset tid og flere parallelle studieforpliktelser. Dette har påvirket både arbeidsform, prioriteringer og hvor omfattende løsningen har blitt.

I denne siste leveransen evaluerer vi produktet og utviklingsprosessen. Vi gjennomfører en DORA-analyse for å undersøke hvordan vi har arbeidet med programvareleveranser, og reflekterer over erfaringene med Scrum, samarbeid, testing og CI/CD. Avslutningsvis vurderer vi hvordan Stadionhopper kan videreutvikles til en mer fullstendig løsning. DORA-analysen tar utgangspunkt i utviklingsaktiviteten som er dokumentert gjennom GitHub. Vi skiller mellom kodeendringer, automatiserte kontroller og faktiske publiseringer av demonstrasjonsversjonen, ettersom disse ikke nødvendigvis representerer det samme.

*** Avklar hvilken tidsperiode DORA-analysen skal dekke, og om dere analyserer hele utviklingsperioden eller en avgrenset del av den.

## 2. Produktet og oppnådde resultater

### 2.1 Funksjonalitet i den leverte løsningen

Vi har utviklet en nettbasert prototype av Stadionhopper med HTML, CSS og JavaScript i frontend og Node.js i backend. Den publiserte demonstrasjonsversjonen er tilgjengelig gjennom GitHub Pages og benytter fiktive data og lokal nettleserlagring.

En sentral brukerreise vi har laget er å finne en kommende fotballkamp, se informasjon om kampen og stadionet, og registrere et kampbesøk. Prototypen inneholder blant annet kampoversikt med kalendervisning, kampdetaljer, stadioninformasjon, innlogging med testkontoer, brukerprofil og innsjekkinger. Vi har også arbeidet med sosiale funksjoner, som å lage arrangement og bringe folk sammen og dele fotballinteressen.

Backend er utviklet for blant annet autentisering, brukerøkter, kampdata og innsjekkinger. Denne er imidlertid ikke koblet til demonstrasjonsversjonen som er publisert gjennom GitHub Pages. Den publiserte løsningen kan derfor demonstrere flere av brukerreisene, men har ikke felles datalagring mellom ulike brukere og nettlesere. Dette er en viktig begrensning ved prototypen. Selv om flere funksjoner kan testes i demonstrasjonen, betyr det ikke at de er ferdig utviklet for en løsning med reelle brukere.

*** Oppdater funksjonaliteten med eventuelle endringer etter Deliverable 3. Kontroller særlig hvilke funksjoner som er implementert, hvilke som er testet, og hvilke som fortsatt bare er planlagt. +det vi har endret i sprint4!

### 2.2 Brukerbehov og prioriteringer

I starten av prosjektet definerte vi en MVP med innlogging og brukerprofil, stadionoversikt, kommende kamper, innsjekkinger og personlig historikk. Mer omfattende sosiale funksjoner ble prioritert lavere for å sikre at vi kunne konsentrere oss om de viktigste brukerbehovene.

Vi gjennomførte en brukerundersøkelse med 19 respondenter. Her svarte 9 at det å finne kommende kamper var den viktigste funksjonen. Dette støttet prioriteringen av kampoversikten som en sentral del av løsningen.

Senere gjennomførte vi brukertesting, der vi mottok syv svar. Tilbakemeldingene viste at brukerne i hovedsak klarte å navigere i løsningen, men også at enkelte deler kunne bli tydeligere. Vi fikk blant annet innspill om navigasjon, fargebruk, begreper, kalendervisning og presentasjon av kamptidspunkter.

Disse tilbakemeldingene bidro til at vi prioriterte forbedringer av eksisterende funksjonalitet fremfor å legge til stadig flere funksjoner.

Gjennom arbeidet har vi erfart at en funksjon ikke nødvendigvis gir brukerverdi bare fordi den er teknisk implementert. Den må også være forståelig, tilgjengelig og nyttig for dem som skal bruke løsningen.

*** Vurder hvor godt den leverte prototypen oppfyller den opprinnelige MVP-en. Hva fungerer etter hensikten, hva er delvis ferdig, og hva mangler?

## 3. Arkitektur og tekniske valg

### 3.1 Systemarkitektur

Stadionhopper er utviklet med en frontend basert på HTML, CSS og JavaScript og en backend basert på Node.js. Arkitekturen skiller mellom brukergrensesnittet og håndteringen av data og applikasjonslogikk.

I planleggingen av prosjektet valgte vi en enkel, filbasert løsning med JSON-filer for datalagring. Dette gjorde det mulig å arbeide med sentrale deler av systemet uten å etablere en full database fra starten.

Domenemodellen omfatter blant annet brukere, klubber, stadioner, kamper, innsjekkinger, innlegg og arrangementer. Disse representerer sentrale deler av funksjonaliteten som Stadionhopper skal kunne tilby.

Demonstrasjonsversjonen er publisert gjennom GitHub Pages. Siden GitHub Pages benyttes til statisk publisering, kjører ikke Node.js-backenden som en del av denne løsningen. I stedet brukes lokal nettleserlagring og fiktive data for å demonstrere funksjonaliteten.

*** Sett inn en enkel arkitekturfigur som viser frontend, backend, datalagring og GitHub Pages. Marker tydelig hvilke deler som inngår i den publiserte demonstrasjonen.

### 3.2 Vurdering av tekniske valg

De tekniske valgene har vært preget av prosjektets omfang og tilgjengelige ressurser. En enkel frontend og filbasert datalagring har gjort det mulig å komme raskt i gang med utviklingen og teste sentrale brukerreiser.

Samtidig har arbeidet vist at det er forskjell på en prototype og en løsning som kan brukes i ordinær drift. Den publiserte demonstrasjonen har begrensninger knyttet til felles datalagring, reell autentisering og samhandling mellom brukere.

Vi har også erfart at tekniske avhengigheter kan påvirke fremdriften. Under utviklingen oppstod det utfordringer fordi frontend- og backend-arbeidet var avhengig av hverandre, samtidig som ansvarsfordelingen og rekkefølgen på enkelte oppgaver ikke var tilstrekkelig avklart.

Dette ble fulgt opp gjennom felles diskusjoner og tydeligere oppgavefordeling. Erfaringen viste oss at arkitektur og arbeidsorganisering henger tett sammen. Selv en forholdsvis enkel løsning krever at teamet har en felles forståelse av hvordan komponentene skal fungere sammen.

Dersom Stadionhopper skulle videreutvikles, ville vi måtte vurdere både datalagring, sikkerhet, autentisering og hvordan applikasjonen skal publiseres og driftes.

*** Diskuter om dere ville valgt den samme arkitekturen dersom dere skulle startet prosjektet på nytt. Begrunn eventuelle endringer.

## 4. Arbeidsprosess, testing og CI/CD

### 4.1 Arbeidsflyt og versjonskontroll

Vi har brukt Scrum som utgangspunkt for organiseringen av utviklingsarbeidet, med ukentlige møter, prioritering av oppgaver og jevnlig oppfølging av fremdriften.

GitHub har vært brukt til versjonskontroll, oppgavehåndtering og samarbeid. Arbeidsoppgavene har vært organisert gjennom Issues, og kodeendringer har i hovedsak blitt utviklet i egne branches før de ble integrert i `main` gjennom pull requests.

Gjennom prosjektet har vi erfart at en tydelig oppgavestruktur er viktig for å opprettholde fremdrift. I starten var enkelte Issues for omfattende eller hadde uklare avhengigheter. Dette gjorde det vanskeligere å vite hvilke oppgaver som kunne løses uavhengig av hverandre.

Etter hvert arbeidet vi med å dele opp oppgavene og tydeliggjøre ansvaret. Vi fikk også erfaring med at KI-genererte Issues måtte gjennomgås kritisk og tilpasses det faktiske utviklingsarbeidet.

### 4.2 Testing og kvalitetssikring

Vi har benyttet både automatiserte tester og manuell brukertesting for å kvalitetssikre løsningen.

De automatiserte testene har blant annet kontrollert autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekkinger. Testene har vært kjørt gjennom GitHub Actions som en del av CI-prosessen.

Et konkret eksempel på nytten av dette oppstod under arbeidet med kalenderfunksjonaliteten. Etter en kodeendring viste GitHub Actions at to av 41 tester feilet. Feilene ble undersøkt og rettet, og etter en ny commit bestod alle testene før endringene ble integrert i `main`.

Dette viste oss hvordan automatiserte tester kan bidra til å oppdage feil tidlig i utviklingsprosessen.

Samtidig har brukertestingen gitt en annen type innsikt. De automatiserte testene undersøker om funksjoner oppfører seg som forventet, mens brukertestingen har vist hvordan personer utenfor utviklingsgruppen opplever løsningen.

Vi har derfor erfart at teknisk testing og brukertesting utfyller hverandre. En løsning kan fungere teknisk uten at den nødvendigvis er enkel å forstå eller bruke.

### 4.3 CI/CD og publisering

Vi har etablert en CI-prosess gjennom GitHub Actions, der JavaScript-syntaks og automatiserte tester kontrolleres ved pull requests og endringer i `main`.

Vi har også benyttet GitHub Pages til å publisere demonstrasjonsversjonen. Publiseringen skjer gjennom en separat workflow og er ikke direkte avhengig av at alle CI-kontrollene er bestått.

Dette innebærer at en vellykket publisering ikke nødvendigvis dokumenterer at alle tester har bestått. Vi har dermed fått erfaring med både kontinuerlig integrasjon og automatisert publisering, men har ikke etablert en fullstendig leveranseprosess der beståtte tester er et krav før produksjonssetting.

Gjennom prosjektet har vi også erfart at pull requests og automatiserte tester ikke erstatter behovet for kodegjennomgang. Vi har i hovedsak kontrollert beskrivelser og testresultater, og i mindre grad gjennomført systematiske gjennomganger av selve koden.

*** Kontroller om denne beskrivelsen fortsatt stemmer etter siste sprint. Oppdater eventuelle endringer i testoppsett, workflows eller publiseringsrutiner.

## 5. DORA-analyse

### 5.1 Datagrunnlag og målemetode

DORA (DevOps Research and Assessment) brukes til å evaluere programvareleveranser gjennom målinger av hastighet og stabilitet. De fire målingene vi undersøker er Deployment Frequency, Lead Time for Changes, Change Failure Rate og Mean Time to Restore.

Formålet med analysen er å undersøke hvordan utviklings- og leveranseprosessen vår har fungert, og hvilke forbedringer vi kan ta med oss videre.

Datagrunnlaget hentes fra GitHub, der vi har dokumentasjon på commits, pull requests, GitHub Actions og publiseringer gjennom GitHub Pages. Eventuelle feilregistreringer i Issues kan også bidra til analysen.

I Deliverable 3 benyttet vi et automatisert verktøy for å hente data fra GitHub-historikken. Verktøyet rapporterte blant annet 55 releases, 2 feature releases og 6 bugfix releases. Samtidig inneholdt `release.yaml` bare én registrert release, datert 27. oktober 2026.

Disse tallene var ikke umiddelbart sammenfallende. Vi kan derfor ikke uten videre bruke dem som grunnlag for DORA-analysen. Det er nødvendig å kontrollere hva verktøyet faktisk har telt, og skille mellom commits, pull requests, releases og faktiske deployeringer.

Vi må også skille mellom feil som oppdages under utvikling og testing, og feil som oppstår etter at en ny versjon er publisert.

*** Beskriv nøyaktig hvordan dere har hentet ut data, hvilken periode som undersøkes, og hvilke definisjoner dere bruker for de fire målingene.

*** Sett inn en samlet tabell med måltall, resultat, datakilde og usikkerhet.

| DORA-måling | Resultat | Datagrunnlag | Usikkerhet |
|---|---|---|---|
| Deployment Frequency | *** | GitHub Pages / Actions | *** |
| Lead Time for Changes | *** | Commits, PR og deployeringer | *** |
| Change Failure Rate | *** | Deployeringer og dokumenterte feil | *** |
| Mean Time to Restore | *** | Dokumenterte driftshendelser | *** |

### 5.2 Deployment Frequency – publiseringsfrekvens

Deployment Frequency måler hvor ofte en ny versjon av programvaren blir publisert. Målingen kan gi innsikt i hvor hyppig teamet leverer endringer til brukerne.

For Stadionhopper er det relevant å undersøke antall vellykkede publiseringer gjennom GitHub Pages i den valgte perioden.

Det er viktig å skille mellom kodeendringer og faktiske publiseringer. En commit eller pull request innebærer ikke nødvendigvis at en ny versjon er publisert. Vi må derfor ta utgangspunkt i publiseringshistorikken og undersøke hvilke workflows som faktisk har resultert i en vellykket deployering.

*** Legg inn antall vellykkede publiseringer og beregnet frekvens, for eksempel antall publiseringer per uke.

*** Beskriv om publiseringene har vært jevnt fordelt, eller om aktiviteten har variert gjennom prosjektperioden.

Publiseringsfrekvensen må tolkes i lys av at Stadionhopper er et studentprosjekt. Arbeidsmengden har variert som følge av andre studieforpliktelser og innleveringsfrister. En ujevn publiseringsfrekvens vil derfor ikke nødvendigvis bety at utviklingsprosessen har vært ineffektiv.

Samtidig sier ikke hyppige publiseringer alene noe om kvaliteten eller brukerverdien til endringene. Målingen må derfor vurderes sammen med de øvrige DORA-målingene og resultatene fra brukertestingen.

### 5.3 Lead Time for Changes – ledetid for endringer

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

### 5.5 Mean Time to Restore – tid til gjenoppretting

Mean Time to Restore (MTTR) måler hvor lang tid det tar å gjenopprette en tjeneste etter en feil.

For Stadionhopper vil dette innebære å undersøke om det har oppstått hendelser der den publiserte demonstrasjonsversjonen har vært utilgjengelig eller sentral funksjonalitet har sluttet å virke.

Dersom slike hendelser har oppstått, må vi undersøke når feilen startet eller ble oppdaget, når den ble rettet, og når løsningen igjen fungerte som forventet.

Vi har dokumentert feil som ble oppdaget gjennom automatiserte tester, men disse kan ikke uten videre brukes til å beregne MTTR. Tiden det tar å rette en feil under utvikling er ikke nødvendigvis det samme som tiden det tar å gjenopprette en tjeneste etter en driftshendelse.

*** Undersøk om dere har dokumenterte hendelser som kan brukes til å beregne MTTR. Dersom slike hendelser finnes, legg inn beregningene og forklar eventuelle usikkerheter.

*** Hvis dere ikke har tilstrekkelige data, forklar hvorfor MTTR ikke kan beregnes på en pålitelig måte.

I en løsning med aktive brukere ville vi hatt behov for bedre rutiner for registrering og oppfølging av slike hendelser. Dette ville gjort det mulig å undersøke både hvor raskt feil blir oppdaget, og hvor lang tid det tar før tjenesten fungerer igjen.

### 5.6 Samlet tolkning og begrensninger

DORA-målingene må vurderes i lys av prosjektets rammer. Stadionhopper er utviklet av en liten studentgruppe over en begrenset periode, og demonstrasjonsversjonen er ikke en fullstendig produksjonsløsning med aktive brukere og systematisk driftsovervåking.

Dette påvirker særlig muligheten til å måle Change Failure Rate og Mean Time to Restore. Dersom feil etter publisering ikke er registrert systematisk, vil det være vanskelig å beregne disse målingene på en pålitelig måte.

Også Deployment Frequency og Lead Time for Changes må tolkes med forsiktighet. Utviklingsaktiviteten har vært påvirket av innleveringsfrister, andre fag og varierende kapasitet. Dette kan føre til perioder med hyppige endringer og perioder med mindre aktivitet.

DORA-målingene kan likevel være nyttige som grunnlag for refleksjon. De gjør det mulig å undersøke hvordan kodeendringer beveger seg gjennom utviklingsprosessen, og hvor det eventuelt oppstår ventetid eller problemer.

Samtidig må leveransehastighet vurderes sammen med stabilitet og kvalitet. En høy publiseringsfrekvens er ikke nødvendigvis positiv dersom endringene fører til flere feil. Tilsvarende kan en stabil løsning ha begrenset verdi dersom den ikke dekker brukernes behov.

Brukertestingen gir derfor et viktig supplement til DORA-analysen. Mens DORA undersøker utviklings- og leveranseprosessen, gir brukertestingen innsikt i hvordan løsningen oppleves av potensielle brukere.

*** Legg inn en samlet vurdering av deres faktiske DORA-resultater. Hvilke målinger gir mest nyttig informasjon om prosjektet, og hvilke er mest usikre?

## 6. Retrospektiv: læring om samarbeid og forbedring

Gjennom Stadionhopper-prosjektet har vi fått praktisk erfaring med smidig utvikling og samarbeid i et lite utviklingsteam. Vi har benyttet Scrum som utgangspunkt, men har også måttet tilpasse arbeidsformen til gruppens størrelse, kompetanse og tilgjengelige tid.

En av utfordringene vi møtte var å etablere en oppgavestruktur som fungerte i praksis. I starten opprettet vi flere Issues som senere viste seg å være for omfattende eller ha uklare avhengigheter. Vi erfarte også at KI-genererte forslag kunne være nyttige som utgangspunkt, men at de måtte vurderes og tilpasses av oss før de kunne brukes i utviklingsarbeidet.

En annen utfordring var koordineringen mellom frontend og backend. Enkelte oppgaver var avhengige av at andre deler av løsningen var ferdigstilt, og det oppstod perioder der arbeidet stoppet opp fordi vi manglet nødvendige avklaringer.

Dette ble fulgt opp gjennom felles diskusjoner og tydeligere ansvarsfordeling. Vi erfarte at det var nyttig å arbeide sammen i samme rom, der vi raskt kunne diskutere problemer og finne løsninger.

Ukentlige scrum-møter har bidratt til å opprettholde oversikt over fremdriften, men erfaringene våre viser også at det er viktig å avklare tekniske spørsmål mellom møtene når det er nødvendig.

Gjennom arbeidet har vi blitt mer bevisste på betydningen av å dele opp oppgaver i mindre deler, avklare avhengigheter tidlig og sørge for at alle har en felles forståelse av hva som skal utvikles.

Vi har også erfart at automatiserte tester kan bidra til tryggere integrasjon av kodeendringer. Samtidig har prosjektet vist oss at testing ikke bare handler om å kontrollere at funksjoner virker teknisk. Brukertestingen har gitt oss tilbakemeldinger vi ikke nødvendigvis ville oppdaget gjennom automatiserte tester alene.

Dersom vi skulle gjennomført prosjektet på nytt, ville vi ønsket å etablere en tydeligere arbeidsflyt tidligere. Vi ville også lagt større vekt på mindre, sammenhengende leveranser, der frontend og backend utvikles og testes sammen etter hvert.

Dette kunne gjort det enklere å oppdage avhengigheter og integrasjonsproblemer tidligere, samtidig som vi hadde fått raskere tilbakemeldinger på funksjonaliteten.

*** Diskuter dette i gruppen: Hvilke konkrete endringer i arbeidsformen har hatt størst betydning for fremdriften? Hva ville dere prioritert annerledes dersom dere startet på nytt?

*** Legg gjerne inn én konkret erfaring fra siste sprint som viser hvordan dere har brukt læringen fra tidligere leveranser.

## 7. Videre utvikling: Version 2 og systematisk måling

### 7.1 Produkt og teknisk videreutvikling

Dersom Stadionhopper skulle videreutvikles, ville vi først prioritert å ferdigstille og forbedre kjernefunksjonene i MVP-en.

Brukerundersøkelsen viste at oversikt over kommende kamper var viktig for flere av respondentene. Samtidig viste brukertestingen at det fortsatt var behov for forbedringer i navigasjon, begrepsbruk og presentasjon av informasjon.

En naturlig videreutvikling ville derfor være å gjøre kampoversikten mer oversiktlig og forbedre brukerreisen fra å finne en kamp til å registrere et besøk.

Vi har også tidligere diskutert muligheten for at brukere selv kan registrere kamper og bidra med oppdatert kampinformasjon. Dette kan være interessant dersom automatisk tilgang til kampdata fortsatt er utfordrende. Samtidig ville en slik løsning kreve vurderinger av datakvalitet, moderering og hvordan feilaktig informasjon skal håndteres.

På lengre sikt kunne vi videreutviklet sosiale funksjoner som å følge andre brukere, dele stadionopplevelser og planlegge kampbesøk sammen. Disse funksjonene inngår i den opprinnelige produktvisjonen, men ble prioritert lavere i MVP-en.

Før videre utvikling ville vi ønsket å gjennomføre mer brukertesting og undersøke hvilke funksjoner som faktisk bidrar til at flere oppsøker lokale fotballkamper.

Teknisk ville en viktig forbedring være å etablere en publisert løsning med fungerende backend og felles datalagring. Dette ville gjøre det mulig å håndtere reelle brukerkontoer og lagre data på tvers av enheter.

En videreutviklet løsning ville også kreve større oppmerksomhet på sikkerhet, tilgangskontroll og behandling av personopplysninger. Dersom antallet brukere øker, måtte vi vurdere om den filbaserte dataløsningen fortsatt er hensiktsmessig, eller om en database ville være et bedre alternativ.

Vi ville også ønsket å videreutvikle CI/CD-prosessen slik at automatiserte tester må bestå før en ny versjon publiseres.

På lengre sikt kunne et samarbeid med fotballkretsen og lokale klubber vært aktuelt for å undersøke om løsningen faktisk skaper verdi. En begrenset pilot med reelle brukere kunne gitt bedre grunnlag for videre prioriteringer.

*** Diskuter og prioriter de tre viktigste forbedringene for versjon 2. Begrunn hvorfor akkurat disse bør gjennomføres først.

*** Vurder hvilke ressurser, tekniske endringer og samarbeidspartnere som ville vært nødvendige for videre utvikling.

### 7.2 Systematisk måling og forbedring

DORA-analysen har vist betydningen av å ha et tydelig datagrunnlag for å kunne evaluere leveranseprosessen.

Dersom Stadionhopper skulle videreutvikles til en tjeneste med aktive brukere, ville vi ønsket å etablere mer systematisk registrering av deployeringer og feil.

En mulig løsning ville være å knytte kodeendringer og pull requests til faktiske publiseringer. Dette kunne gjort det enklere å beregne Deployment Frequency og Lead Time for Changes automatisk.

Vi ville også etablert en tydelig prosess for registrering av feil som oppstår etter publisering. En enkel Issue-mal kunne inneholdt informasjon om hvilken versjon feilen gjelder, når den ble oppdaget, hvordan den påvirker brukerne, og hvilke tiltak som ble gjennomført.

Ved å registrere tidspunktet for gjenoppretting kunne vi også fått et bedre grunnlag for å beregne Change Failure Rate og Mean Time to Restore.

Et felles dashboard kunne gjort målingene tilgjengelige for utviklingsteamet og gitt bedre oversikt over utviklingen over tid.

Målingene burde brukes som grunnlag for felles diskusjon og forbedring, ikke som et verktøy for å sammenligne enkeltpersoners arbeidsinnsats. Målet ville vært å identifisere flaskehalser, forbedre kvaliteten og gjøre leveranseprosessen mer forutsigbar.

Vi ville også kombinert DORA-målingene med brukertilbakemeldinger og informasjon om faktisk bruk av løsningen. På denne måten kunne vi vurdert både hvor effektivt vi leverer programvare, og om endringene gir verdi for brukerne.

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
