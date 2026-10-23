# Deliverable 3 – Increment Review and Working Prototype

Stadionhopper  
IBE205 – Høgskolen i Molde

# 1. Innledning

## 1.1 Formål og utgangspunkt

I denne leveransen har vi gått fra planlegging av Stadionhopper til utvikling og utprøving av en prototype. Formålet har vært å undersøke hvordan vi kan omsette produktvisjonen til en konkret brukeropplevelse, samtidig som vi får erfaring med smidig utvikling, testing, versjonskontroll og kontinuerlig integrasjon (CI).

I Deliverable 1 utarbeidet vi produktvisjon, målgruppe og en første prioritering av funksjoner. I Deliverable 2 arbeidet vi videre med brukerundersøkelse, produktbacklog, domenemodell, arkitektur, wireframes og planlegging av utviklingsarbeidet. Deliverable 3 bygger videre på dette og handler i større grad om hva vi faktisk har utviklet, hvordan vi har testet løsningen, og hva vi har lært underveis.

Et viktig mål har vært å få en prototype som kan brukes til å demonstrere og evaluere en brukerreise. Samtidig har vi arbeidet med å etablere en utviklingsprosess der endringer kan spores, testes og integreres gjennom GitHub.

## 1.2 Sprintmål og avgrensning

Oppgaveteksten trekker frem innlogging, brukerprofiler, stadioninnsjekking og sosial feed som aktuelle funksjoner. Den legger også vekt på automatiserte tester, en fungerende CI-pipeline og dokumentasjon av teamets arbeidsprosess.

Vi har arbeidet med flere av disse funksjonene, men det har blitt tydelig at det er forskjell på å ha implementert kode og å ha en funksjon som kan demonstreres for brukere.

Etter tilbakemelding fra faglærer har vi også rettet mer oppmerksomhet mot brukerreisen og muligheten til å utforske ulike måter å presentere kampinformasjon på. En kalendervisning har derfor blitt en viktig del av prototypen.

*** Sett inn sprintens vedtatte mål, tidsperiode og eventuelle endringer i målene underveis.

# 2. Prototypen og utviklingsarbeidet

## 2.1 Prioriteringer fra tidligere leveranser

I den første brukerundersøkelsen svarte 19 personer. Ni av disse vurderte det å finne kommende kamper som den viktigste funksjonen. Dette bidro til at kampoversikten ble prioritert som en sentral del av MVP-en.

Produktvisjonen handler om å senke terskelen for å oppdage og delta på lokale fotballkamper. Det er derfor viktig at brukeren enkelt kan finne relevante kamper og informasjon om hvor og når de spilles.

I de tidligere leveransene prioriterte vi også profil, registrering av kampbesøk og enkelte sosiale funksjoner. Under utviklingsarbeidet har vi måttet vurdere disse prioriteringene opp mot tilgjengelig tid, tekniske utfordringer og hva som er mest nyttig å demonstrere og teste på dette stadiet.

## 2.2 Prototypens funksjonalitet og brukerreise

Prototypen inneholder blant annet en kampoversikt, kampdetaljer, kalendervisning og navigasjon til andre deler av løsningen. Den publiserte demonstrasjonen er tilgjengelig gjennom GitHub Pages:

https://inetiger.github.io/Stadionhopper/

En sentral brukerreise er at en person åpner Stadionhopper, finner en aktuell kamp i kalenderen og går videre til kampdetaljene for å se hvilke lag som spiller, tidspunkt og stadion.

Kalendervisningen er et alternativ til en tradisjonell liste over kamper. Den gir brukeren mulighet til å se kampene fordelt på datoer og lettere få oversikt over perioder med flere eller færre kamper. Dette er relevant for produktvisjonen fordi brukeren skal kunne oppdage lokale fotballkamper uten å måtte lete etter informasjon hos hver enkelt klubb.

Kalenderen ble videreutviklet under sprinten, og kampene vises nå direkte i en månedskalender. Brukeren kan velge datoer og åpne detaljer om enkeltkamper.

Det er også påbegynt forbedringer som skal gjøre det lettere å skille tidligere kamper fra kommende kamper. Tidligere kamper er planlagt markert med en dus rødfarge, mens kommende kamper beholder grønn markering. Dette arbeidet ligger foreløpig i en egen Git-branch og må testes og gjennomgås før det eventuelt integreres i hovedgrenen.

*** Bekreft hvilke kalenderforbedringer som er testet og slått sammen med main før innlevering.

## 2.3 Backend og øvrige funksjoner

Prosjektet benytter HTML, CSS og JavaScript i frontend, mens backend er bygget med Node.js. Repositoriet inneholder blant annet kode for innlogging, brukerøkter, profilinformasjon, kampdata, innsjekkinger og sosiale innlegg.

Det er viktig å skille mellom funksjonaliteten som kan kjøres lokalt, og det som er tilgjengelig i den publiserte demonstrasjonen. GitHub Pages publiserer statiske filer og kjører ikke prosjektets Node.js-backend. Den publiserte versjonen benytter derfor demonstrasjonsdata, og innlogging og lagring er ikke tilgjengelig på samme måte som ved lokal kjøring.

Dette innebærer at vi kan demonstrere deler av brukergrensesnittet gjennom en offentlig lenke, mens enkelte funksjoner krever et lokalt oppsett.

*** Bekreft gjennom en lokal demonstrasjon hvilke funksjoner som faktisk fungerer fra start til slutt, særlig innlogging, profil, innsjekking og sosial feed.

*** Beskriv eventuelle tekniske problemer som oppstod, og hvordan gruppa håndterte dem.

## 2.4 Utvikling og prioritering gjennom GitHub

Vi har brukt GitHub Issues til å dele arbeidet inn i mindre og mer håndterbare oppgaver. Disse omfatter blant annet datamodell, frontend, backend, innlogging, kampoversikt, innsjekking, testing og CI.

Oppgavene er registrert med egne Issue-numre, og flere kodeendringer er gjennomført gjennom branches og pull requests. Dette gjør det mulig å følge utviklingen fra en planlagt oppgave til en konkret endring i koden.

Brukertestingen har også ført til nye forbedringsoppgaver. Et eksempel er Issue #121, som handler om å forenkle kampinformasjon og fjerne unødvendige detaljer. Oppgaven bygger på tilbakemeldinger om blant annet klokkeslett med sekunder, behovet for tydeligere skille mellom kommende og tidligere kamper og en oppdateringsknapp som enkelte brukere opplevde som forvirrende.

Vi har valgt å gjøre dette arbeidet i en egen branch, slik at endringene kan gjennomgås og testes før de eventuelt slås sammen med main.

Dette viser hvordan tilbakemeldinger kan omsettes til konkrete utviklingsoppgaver, samtidig som versjonskontrollen bidrar til å redusere risikoen for å påvirke den eksisterende løsningen.

# 3. Testing og kvalitetssikring

## 3.1 Teststrategi

I utviklingen av Stadionhopper har vi kombinert automatiserte tester med brukertesting på faktiske personer. Disse testformene undersøker ulike sider av produktet og utfyller hverandre.

Automatiserte tester kan avdekke tekniske feil og bidra til at endringer ikke ødelegger eksisterende funksjonalitet. De kan derimot ikke alene fortelle oss om brukerne forstår navigasjonen, finner frem eller opplever løsningen som nyttig.

Gjennom faget har vi lært at hyppig testing og tilbakemeldinger er sentralt i smidig utvikling. Vi ønsket derfor å involvere personer utenfor prosjektgruppen i testingen av prototypen. Når vi selv bruker løsningen, kjenner vi både strukturen og hensikten bak funksjonene. Det kan gjøre det vanskelig å oppdage forhold som er uklare for andre.

Ved å la testpersonene utføre konkrete oppgaver uten veiledning kunne vi undersøke om grensesnittet var forståelig. Brukertestingen ble dermed ikke bare en kontroll av produktet, men også en måte å samle informasjon til videre prioritering og utvikling.

## 3.2 Automatiserte tester

Repositoriet inneholder automatiserte tester for deler av backend. Ifølge prosjektets dokumentasjon omfatter disse blant annet autentisering, brukerøkter, tilgangskontroll og innsjekking.

Testene kan kjøres med kommandoen:

`node --test test/*.test.js`

GitHub Issues #58, #59 og #60 omhandler etablering av testverktøy og automatiserte tester. Disse oppgavene er registrert som lukket.

Automatiserte tester er viktige fordi de kan kjøres gjentatte ganger etter endringer i koden. Dette bidrar til å oppdage regresjoner, altså at funksjonalitet som tidligere fungerte, slutter å fungere etter en endring.

Samtidig er det ikke tilstrekkelig at testene eksisterer. Vi må også kontrollere at de faktisk kjøres, hvilke deler av løsningen de dekker, og om resultatene blir fulgt opp.

*** Sett inn dokumenterte resultater fra en testkjøring: dato, antall tester, antall beståtte og eventuelle feil.

*** Beskriv minst ett konkret eksempel på hva en automatisert test kontrollerer, og hvorfor dette er relevant for kvaliteten.

## 3.3 Gjennomføring av brukertest

Vi inviterte åtte personer til å teste den publiserte prototypen. Da denne delen av rapporten ble oppdatert, hadde vi mottatt syv svar.

Testpersonene fikk konkrete oppgaver som blant annet gikk ut på å finne en kamp, finne et arrangement, lokalisere kartfunksjonen og finne hvor de ville logget ut. De ble også bedt om å vurdere hvor enkelt det var å navigere og komme med forslag til forbedringer.

Testingen ble gjennomført uten at vi forklarte hvor de ulike funksjonene lå. Hensikten var å undersøke om brukerne kunne finne frem på egen hånd.

Siden den publiserte demonstrasjonen ikke har fungerende innlogging, kunne oppgaven om utlogging bare undersøke om testpersonene fant riktig sted i grensesnittet. Den kunne ikke bekrefte at selve utloggingsfunksjonen virket.

Testgruppen var begrenset og bestod av personer vi selv inviterte. Resultatene kan derfor ikke betraktes som representative for hele målgruppen. De gir likevel nyttig innsikt i hvordan personer utenfor utviklingsgruppen opplever prototypen.

*** Oppdater antall svar dersom den siste testpersonen svarer før innlevering.

## 3.4 Resultater fra brukertestingen

Tilbakemeldingene viste at flere av testpersonene opplevde løsningen som enkel å forstå og navigere i. De fant i stor grad frem til oppgavene de skulle løse. En av testpersonene trakk spesielt frem at det enkle grensesnittet var en styrke, fordi løsninger med mange valg kan oppleves som slitsomme.

Samtidig kom det flere konkrete forslag til forbedringer.

Et gjennomgående funn var ønsket om mer farger og et tydeligere fotballpreg. Flere mente at farger ville gjøre løsningen mer attraktiv. Ett forslag var å bruke hjemmelagets klubbfarger for å gjøre det lettere å kjenne igjen og skille mellom kamper. Det ble også foreslått mykere kanter og tydeligere visuelle skiller mellom feltene.

Andre tilbakemeldinger handlet om navigasjon og begrepsbruk. En testperson opplevde det som uklart hva som skilte «Sosial» fra «Treff», mens en annen stilte spørsmål ved betydningen av «Mine innsjekkinger». Navigasjonsmenyen nederst ble også beskrevet som lite intuitiv.

Når det gjaldt kampinformasjon, ble det påpekt at klokkeslett ikke trenger å vises med sekunder. En testperson stilte spørsmål ved behovet for knappen «Last kampene på nytt», mens en annen ønsket at kampene skulle presenteres i en kalender. Det ble også stilt spørsmål ved behovet for å vise tidligere kamper.

Disse tilbakemeldingene er nyttige fordi de viser at en funksjon kan være teknisk tilgjengelig uten at brukeren nødvendigvis forstår hensikten med den.

## 3.5 Fra tilbakemeldinger til forbedringer

Etter brukertestingen ble funnene dokumentert i GitHub Issue #62. Videre prioritering ble knyttet til Issue #63, som handler om å vurdere tilbakemeldingene og opprette konkrete forbedringsoppgaver.

Dette har bidratt til at brukertestingen inngår i utviklingsprosessen fremfor å bli en isolert aktivitet.

Issue #121 er et eksempel på hvordan funnene er fulgt opp. Her har vi startet arbeidet med å forenkle kampinformasjon, blant annet ved å fjerne unødvendige sekunder fra datovisningen og gjøre det lettere å skille tidligere og kommende kamper i kalenderen.

Ikke alle forslagene fra brukertestingen er gjennomført. Noen krever videre diskusjon i gruppa, blant annet om navigasjon, fargebruk og hvilke funksjoner som skal prioriteres. Vi må også vurdere om forbedringene støtter produktvisjonen, og om de er realistiske innenfor prosjektets rammer.

*** Sett inn endelig oversikt over hvilke forbedringer som ble prioritert, hvilke som ble gjennomført, og hvilke som ble utsatt.

*** Dokumenter eventuell ny brukertest eller kontroll etter at endringene er integrert.

# 4. GitHub, samarbeid og kontinuerlig integrasjon

## 4.1 Versjonskontroll og samarbeid

I Deliverable 2 planla vi å bruke GitHub Issues, branches, pull requests og kodegjennomgang som en del av arbeidsprosessen. I denne sprinten har GitHub vært et sentralt verktøy for å organisere og følge opp utviklingen.

Issues har gjort det mulig å beskrive konkrete oppgaver og knytte dem til utviklingsarbeidet. Ved å opprette egne branches kan vi arbeide med endringer uten å påvirke hovedgrenen direkte.

Når en endring er klar, kan den gjennomgås gjennom en pull request før den slås sammen med main. GitHub gir samtidig en historikk over commits, endringer og hvem som har utført dem.

Dette er særlig nyttig i et gruppeprosjekt der flere arbeider med ulike deler av løsningen. Det gjør det lettere å følge fremdriften og redusere risikoen for at endringer kommer i konflikt med hverandre.

Et konkret eksempel er arbeidet med Issue #121, der forbedringer av kampinformasjonen er lagt i en egen branch. Dette gjør det mulig å arbeide med endringene uten å påvirke den publiserte hovedversjonen før de er vurdert og

*** Beskriv hvordan gruppa faktisk har gjennomført pull requests og kodegjennomgang. Har alle endringer blitt gjennomgått av et annet gruppemedlem? Hvis ikke, hvorfor?

## 4.2 Kontinuerlig integrasjon (CI)

Kontinuerlig integrasjon innebærer at kodeendringer integreres og kontrolleres jevnlig. Hensikten er å oppdage problemer tidlig, fremfor å samle opp mange endringer som først testes mot slutten av utviklingsarbeidet.

I Stadionhopper har vi arbeidet med å etablere CI gjennom GitHub Actions. Issue #61 om konfigurering av GitHub Actions er registrert som lukket, og repositoriet inneholder workflow-filer under .github/workflows.

Dette gir et grunnlag for å automatisere kontroller når det gjøres endringer i prosjektet. For å vurdere om CI-prosessen fungerer etter hensikten, må vi undersøke hvilke hendelser som utløser kjøringene, hvilke tester som gjennomføres, og hvordan eventuelle feil blir håndtert.

*** Sett inn hvilke hendelser som utløser GitHub Actions, for eksempel push eller pull request, basert på faktisk workflow.

*** Sett inn resultat fra en eller flere konkrete Actions-kjøringer, inkludert dato, status og hvilke tester som ble kjørt.

*** Beskriv om gruppa har opplevd en mislykket CI-kjøring, og hvordan denne eventuelt ble fulgt opp.

## 4.3 DORA og måling av utviklingsprosessen

I tillegg til å kontrollere om testene fungerer, kan vi bruke DORA-målinger til å vurdere hvordan utviklingsprosessen fungerer over tid. DORA knytter programvareleveranse til både hastighet og stabilitet.

Fire sentrale målinger er:

Deployment frequency: Hvor ofte endringer blir publisert eller levert.

Lead time for changes: Hvor lang tid det tar fra en kodeendring blir gjort til den er levert.

Change failure rate: Hvor stor andel leveranser som fører til feil som krever utbedring.

Failed deployment recovery time: Hvor lang tid det tar å gjenopprette en fungerende løsning etter en mislykket leveranse.

For vårt prosjekt er det viktig å definere hva vi regner som en leveranse. En commit, en merge til main og en oppdatering av GitHub Pages er ikke nødvendigvis det samme. Vi må derfor være konsekvente dersom vi skal bruke historikken til å beregne eller diskutere målingene.

GitHub gir tilgang til commit-historikk, pull requests og Actions-kjøringer, som kan brukes som grunnlag for deler av analysen. Samtidig er prosjektet lite og har pågått over en begrenset periode. Det betyr at målingene må tolkes med forsiktighet.

DORA er relevant fordi målet ikke bare er å levere endringer raskt, men også å kunne gjøre det på en stabil og forutsigbar måte.

*** Undersøk om gruppa kan hente ut faktiske tall for én eller flere DORA-målinger.

*** Forklar hvilke data som er tilgjengelige, hvilke som mangler, og hva målingene eventuelt sier om arbeidsprosessen. Ikke bruk estimater som om de var dokumenterte resultater.

## 4.4 Erfaringer med kvalitetssikring

Arbeidet med GitHub, automatiserte tester og CI har vist at kvalitetssikring ikke bare handler om å teste en ferdig løsning. Det handler også om hvordan endringer blir utviklet, kontrollert og integrert underveis.

Når en oppgave er lukket i GitHub, betyr det at den er markert som ferdig. Det er likevel nødvendig å kontrollere om funksjonaliteten faktisk fungerer, om relevante tester er bestått, og om endringen er integrert i riktig branch.

Dette skillet har vært særlig relevant fordi den publiserte prototypen ikke viser all funksjonaliteten som finnes i prosjektets kode.

*** Sett inn et konkret eksempel på hvordan testing, kodegjennomgang eller CI påvirket en beslutning eller førte til en feilretting.

# 5. Sprint Review

## 5.1 Demonstrasjon av sprintresultatet

Hensikten med Sprint Review er å gjennomgå resultatet av sprinten og vurdere det opp mot sprintmålet og produktbehovene. Vi skal derfor demonstrere det som faktisk fungerer, ikke bare presentere en oversikt over oppgaver som er lukket.

En sentral del av demonstrasjonen er brukerreisen fra kampkalenderen til kampdetaljene. Dette viser hvordan brukeren kan oppdage en lokal fotballkamp og finne informasjon om når og hvor den spilles.

Vi må samtidig vise hvilke deler av løsningen som er tilgjengelige i GitHub Pages-demoen, og hvilke funksjoner som krever lokal kjøring av backend.

*** Beskriv når Sprint Review ble gjennomført, hvem som deltok, og hva som faktisk ble demonstrert.

*** Beskriv hvilke deler av sprintmålet som ble oppnådd, og hvilke som ikke ble oppnådd.

## 5.2 Tilbakemeldinger og oppdatert backlog

Brukertestingen har allerede gitt oss innspill til videreutviklingen av løsningen. Disse er dokumentert og fulgt opp gjennom GitHub Issues.

I Sprint Review skal vi også vurdere om prioriteringene fortsatt støtter produktvisjonen. Det innebærer blant annet å diskutere hvilke forbedringer som vil gjøre brukerreisen enklere, og hvilke funksjoner som kan vente.

Et sentralt spørsmål er om vi bør prioritere videre forbedring av kampkalenderen og navigasjonen fremfor å utvide løsningen med flere funksjoner.

*** Sett inn tilbakemeldinger og beslutninger fra Sprint Review.

*** Oppgi hvilke Issues som ble opprettet, endret eller prioritert etter gjennomgangen.

## 5.3 Avvik fra planen

I Deliverable 2 la vi planer for både teknisk funksjonalitet og arbeidsprosess. Under utviklingen har vi erfart at ikke alle deler av løsningen kan demonstreres på samme måte.

Den publiserte GitHub Pages-versjonen kan brukes til å vise brukergrensesnitt og kampinformasjon, men ikke alle funksjonene som krever backend. Samtidig har arbeidet med kalenderen og tilbakemeldingene fra brukerne påvirket hvilke forbedringer som fremstår som mest relevante.

Dette viser hvorfor sprintplanen må kunne justeres når vi får ny informasjon. I smidig utvikling er det ikke nødvendigvis et mål å gjennomføre alle opprinnelige oppgaver uendret, men å bruke erfaringer og tilbakemeldinger til å ta bedre beslutninger underveis.

*** Sammenlign opprinnelig sprintmål med faktisk resultat. Beskriv konkrete avvik, årsaker og konsekvenser for videre arbeid.

# 6. Sprint Retrospective

## 6.1 Samarbeid og arbeidsprosess

Sprint Retrospective skal brukes til å evaluere hvordan gruppa har arbeidet, og hva vi kan forbedre i neste sprint. Mens Sprint Review handler om produktet og resultatene, handler retrospektivet om arbeidsprosessen og samarbeidet.

Vi har brukt GitHub til å fordele og følge opp oppgaver, og utviklingsarbeidet har omfattet både frontend, backend, testing og brukerundersøkelse.

Et viktig tema for retrospektivet er hvordan denne arbeidsformen har fungert i praksis. Vi bør blant annet vurdere om oppgavene har vært tydelig nok avgrenset, om arbeidsfordelingen har vært hensiktsmessig, og om vi har hatt tilstrekkelig kommunikasjon om endringer som påvirker andre deler av løsningen.

*** Beskriv faktisk møtestruktur, arbeidsfordeling og hvordan gruppa har samarbeidet under sprinten.

## 6.2 Hva fungerte godt?

GitHub har gitt oss en felles oversikt over oppgaver og utviklingsarbeid. Brukertestingen har også vært nyttig fordi den ga konkrete innspill som vi ikke nødvendigvis ville oppdaget gjennom egen testing.

Et annet positivt aspekt er at prototypen har blitt konkret nok til at vi kan undersøke hvordan brukere faktisk orienterer seg i løsningen, fremfor bare å diskutere planlagte funksjoner.

*** Fyll inn gruppas egne vurderinger fra retrospektivet. Bruk konkrete eksempler på hva som fungerte godt, og hvorfor.

## 6.3 Utfordringer og læringspunkter

En utfordring i utviklingsarbeidet er at ulike funksjoner kan ha ulik grad av ferdigstillelse. Noe kan være implementert i kode, noe kan være testet lokalt, og noe kan være tilgjengelig i den publiserte demonstrasjonen.

Dette gjør det viktig å kommunisere tydelig hva som faktisk fungerer, og hva som fortsatt gjenstår.

Vi har også erfart at brukernes forståelse av løsningen ikke alltid samsvarer med vår egen. Tilbakemeldingene om navigasjon, begrepsbruk og kampinformasjon viser at funksjoner som virker logiske for utviklerne, ikke nødvendigvis er like tydelige for nye brukere.

*** Beskriv gruppas viktigste utfordringer, eventuelle samarbeidsproblemer og hva dere lærte av dem.

## 6.4 Konkrete forbedringstiltak

Hensikten med retrospektivet er ikke bare å identifisere utfordringer, men å bli enige om konkrete tiltak som kan forbedre neste sprint.

Aktuelle temaer kan være tydeligere avgrensning av Issues, tidligere testing av endringer, mer systematisk gjennomgang av pull requests og bedre koordinering når flere arbeider med funksjoner som påvirker hverandre.

Hvilke tiltak vi velger, må bygge på gruppas faktiske erfaringer og diskusjoner.

*** Sett inn to eller tre konkrete tiltak gruppa har blitt enige om. Beskriv hvem som skal følge dem opp, og hvordan dere skal vurdere om tiltakene fungerer.

# 7. Oppsummering og veien videre

## 7.1 Hva vi har lært

Arbeidet med Deliverable 3 har gitt oss erfaring med å gå fra produktvisjon og planlegging til en prototype som kan demonstreres og testes.

Vi har fått erfaring med hvordan GitHub kan brukes til å organisere utviklingsarbeidet, hvordan automatiserte tester kan bidra til teknisk kvalitet, og hvordan tilbakemeldinger fra faktiske brukere kan avdekke forbedringsbehov som ikke nødvendigvis kommer frem gjennom teknisk testing.

Kalendervisningen er et eksempel på hvordan produktet kan videreutvikles med utgangspunkt i brukerbehovet for å finne lokale fotballkamper. Brukertestingen har samtidig vist at det er nødvendig å arbeide videre med både visuell utforming og forståelig navigasjon.

Vi har også sett at det er viktig å skille mellom kode som er skrevet, funksjonalitet som er testet, og det som faktisk er tilgjengelig for brukerne.

## 7.2 Veien videre

Videre arbeid vil blant annet handle om å ferdigstille og kontrollere prioriterte forbedringer fra brukertestingen, vurdere brukerreisen og fortsette utviklingen av prototypen.

I tillegg må vi dokumentere resultatene fra automatiserte tester og GitHub Actions, undersøke hvilke DORA-målinger vi kan bruke, og gjennomføre Sprint Review og Sprint Retrospective.

Resultatene fra disse aktivitetene skal danne grunnlag for prioriteringene i neste fase av prosjektet.

*** Oppdater avslutningen når sprinten er ferdig, og konkretiser hva gruppa faktisk har besluttet å arbeide videre med.
