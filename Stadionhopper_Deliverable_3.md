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
