# Deliverable 3 – Increment Review and Working Prototype

Stadionhopper
IBE205 – Høgskolen i Molde

# 1. Innledning

## 1.1 Formål og utgangspunkt

I denne leveransen går Stadionhopper fra planlagt løsning til utvikling og utprøving av en fungerende prototype. Formålet er ikke bare å vise funksjoner, men også å dokumentere hvordan vi bruker smidige arbeidsmetoder, automatisert testing og kontinuerlig integrasjon for å utvikle og forbedre løsningen.

I Deliverable 1 definerte vi produktvisjon og MVP. I Deliverable 2 arbeidet vi med brukerinnsikt, arkitektur, domenemodell, wireframes og planer for sprint, Git og CI/CD. Denne rapporten vurderer hva vi faktisk har fått til sammenlignet med disse planene.

## 1.2 Sprintmål og avgrensning

Oppgaveteksten fremhever innlogging, brukerprofiler, stadioninnsjekking og sosial feed, i tillegg til automatiserte tester og en fungerende CI-pipeline. Vi har arbeidet med disse funksjonene, men skiller mellom kode som er implementert lokalt, og funksjonalitet som faktisk kan prøves i den publiserte demonstrasjonen.

*** Sett inn sprintens konkret vedtatte mål og datoer.

# 2. Prototypen og utviklingsarbeidet

## 2.1 Prioriteringer fra tidligere leveranser

I den første brukerundersøkelsen svarte 19 personer. Ni valgte «Finne kommende kamper» som viktigste funksjon. Derfor ble kampoversikten prioritert som inngang til løsningen. Vi beholdt også profil og registrering av kampbesøk som sentrale MVP-funksjoner, mens mer omfattende sosiale funksjoner ble nedprioritert.

I denne sprinten har vi måttet balansere disse produktprioriteringene mot oppgavens krav om innlogging, testing og CI.

## 2.2 Hva prototypen inneholder

Den publiserte GitHub Pages-demoen viser kommende og tidligere kamper med lag, dato, tidspunkt og stadion. Brukeren kan åpne kampdetaljer og navigere til sider for kart, sosial feed, arrangementer og profil.

Kartet er foreløpig en enkel stadionoversikt, ikke et interaktivt kart. Arrangementene og øvrige demodata er fiktive.

GitHub Pages-versjonen er tilgjengelig på https://inetiger.github.io/Stadionhopper/.

## 2.3 Backend, innlogging og innsjekking

Prosjektet har HTML, CSS og JavaScript i frontend og et Node.js-basert HTTP-API. README beskriver endepunkter for kampinformasjon, innlegg, innlogging, økt, profil og innsjekking.

Backend bruker JSON-filer som datagrunnlag og lokal testkonfigurasjon for testbrukere. Passord håndteres med individuelle salt og scrypt-hasher, og økter administreres på serveren.

Innlogging, profil og lagring kan ikke testes i GitHub Pages-demoen, fordi denne bare publiserer statiske filer.

*** Bekreft med en faktisk lokal demonstrasjon hvilke brukerflyter som fungerer fra start til slutt.

## 2.4 Endringer og sporbarhet i GitHub

GitHub Issues viser en oppdeling av arbeidet i mindre oppgaver, blant annet datamodell (#51), innlogging (#52), profilside (#53), kampoversikt (#54), innsjekking (#55–56), sosial feed (#57), tester (#58–60), GitHub Actions (#61) og datatilgang (#72–74).

Flere av disse er lukket, og flere er koblet til pull requests. Dette gir sporbarhet fra planlagt oppgave til kodeendring. At en Issue er lukket, er likevel ikke i seg selv bevis på at funksjonen virker i den publiserte løsningen.

## 2.5 Tekniske og praktiske begrensninger

Den viktigste avgrensningen er skillet mellom en lokalt kjørende backend og en statisk nettbasert demo. Vi kan derfor ikke la eksterne testpersoner prøve reell innlogging eller lagring via lenken.

Vi har dessuten valgt et enkelt grensesnitt for å få en testbar versjon tidlig. Dette gjør det mulig å innhente tilbakemeldinger og forbedre løsningen i nye iterasjoner.

*** Legg inn konkrete tekniske utfordringer fra utviklerne og hvordan de ble løst.

# 3. Testing og kvalitetssikring

## 3.1 Hva og hvorfor vi tester

Vi kombinerer automatiserte funksjonstester med brukertesting. De automatiserte testene skal oppdage feil i systemets oppførsel, mens brukertestingen undersøker om personer forstår navigasjonen og finner det de leter etter.

Slik tester vi både teknisk kvalitet og om løsningen dekker brukerbehov.

3.1 Testing og kvalitetssikring

I utviklingen av Stadionhopper har vi valgt å kombinere automatiserte tester med brukertesting på faktiske personer. Dette er to ulike former for testing som gir oss forskjellig informasjon om produktet.

Gjennom faget har vi lært at hyppig testing og kontinuerlige tilbakemeldinger er sentralt i smidig utvikling. Automatiserte tester kan avdekke tekniske feil og bidra til at endringer i koden ikke ødelegger eksisterende funksjonalitet. De kan derimot ikke alene fortelle oss om brukerne forstår løsningen, finner frem eller opplever funksjonene som nyttige.

Vi ønsket derfor å involvere personer utenfor prosjektgruppen i testingen av prototypen. Ved å gi dem konkrete oppgaver, uten å forklare hvordan de skulle løses, kunne vi undersøke om grensesnittet var intuitivt. Dette ga oss et annet perspektiv enn det vi får når vi selv tester en løsning vi kjenner godt.

Brukertestingen er også en del av vår smidige arbeidsprosess. Tilbakemeldingene gir oss grunnlag for å revurdere prioriteringer og gjøre forbedringer i neste iterasjon. På denne måten tester vi ikke bare om løsningen fungerer teknisk, men også om vi er på vei mot et produkt som dekker brukernes behov.

## 3.2 Automatiserte tester

Repositoriet inneholder blant annet auth.test.js og server.test.js. Ifølge README dekker testene innlogging, feil passord, utlogging, økter, tilgang til beskyttede endepunkter, innsjekking og at en bruker ikke får tilgang til en annens historikk.

Testene kan kjøres med kommandoen node --test test/*.test.js.

Skjermbildene viser at Issues #58, #59 og #60 er lukket.

*** Dokumenter testkjøring med dato, antall tester, beståtte/feilede tester og minst ett eksempel på en feil eller risiko testene fanger opp.

## 3.3 Brukertest av publisert demo

Vi har sendt lenken til åtte personer og bedt dem utføre korte, konkrete oppgaver uten veiledning, blant annet å finne kommende og tidligere kamper, et arrangement som ikke er en kamp og funksjonen for utlogging.

Oppgavene er valgt for å undersøke hvor lett det er å orientere seg i grensesnittet.

Fordi innlogging ikke virker i den publiserte demoen, kan en oppgave om utlogging bare vise hvordan brukeren tolker grensesnittet – ikke om utlogging faktisk fungerer.

## 3.4 Foreløpige funn og neste iterasjon

Fire av åtte inviterte hadde svart da den foreløpige gjennomgangen ble gjort. Flere ønsket mer farger og et tydeligere fotballpreg. Ett forslag var å bruke klubbfarger eller klubbmerker for å skille kampene bedre.

Vi har derfor vurdert en grønn fargepalett, tydeligere kampkort og bedre markering av navigasjonen.

Vi har bevisst utsatt endringene til alle testpersonene har svart, slik at de vurderer samme versjon.

*** Sett inn samlet resultat for åtte svar, funn, prioritering, gjennomførte designendringer og ny kontroll av løsningen.

# 4. GitHub, samarbeid og CI

## 4.1 Arbeidsflyt og versjonskontroll

I Deliverable 2 planla vi å arbeide med Issues, egne branches, pull requests og gjennomgang før sammenslåing i main.

Skjermbildene fra GitHub viser at arbeidet er delt opp i oppgaver, at flere er knyttet til pull requests, og at hovedgrenen har en omfattende commit-historikk.

Dette gjør det lettere å se hvilke endringer som er gjort og hvilke oppgaver de hører til.

*** Undersøk om gruppa faktisk har fulgt den planlagte review-prosessen, og beskriv eventuelle avvik.

## 4.2 Kontinuerlig integrasjon

Oppgave #61, «Konfigurer GitHub Actions for bygg og tester», er lukket. Repositoriet har også en workflow under .github/workflows, og commit-historikken viser arbeid med CI for pull requests.

Dette støtter at en CI-løsning er satt opp. Det er likevel nødvendig å dokumentere hva som utløser workflowen, hvilke kontroller den kjører, og om de siste kjøringene var vellykkede.

*** Sett inn skjermbilde av workflow og konkrete resultater fra Actions-loggen.

## 4.3 Erfaringer med kvalitet og levering

En sentral læring i oppgaven er at automatisering først gir verdi når teamet faktisk bruker resultatene til å oppdage og rette feil.

Issues om feilretting, regresjonstester og beskyttelse av main viser at gruppa har identifisert dette som videre arbeid.

*** Beskriv et konkret tilfelle der en test, CI-kjøring eller kodegjennomgang påvirket en beslutning eller endring.

# 5. Sprint Review

## 5.1 Demonstrasjon og vurdering av sprintmålet

Sprint Review skal vise hva som faktisk fungerer ved slutten av sprinten, ikke bare hvilke oppgaver som er lukket.

Vi kan demonstrere den publiserte kampoversikten, kampdetaljene og navigasjonen, og eventuelt vise lokal innlogging, profil og innsjekking dersom disse fungerer ved gjennomgangen.

Samtidig må vi synliggjøre avgrensningene i GitHub Pages-demoen.

*** Noter hvem som deltok, hva som ble demonstrert, hvilke tilbakemeldinger som kom, og hva som ble godkjent eller prioritert videre.

## 5.2 Oppdatert backlog etter review

Brukertilbakemeldinger og demonstrasjonen skal brukes til å vurdere om prioriteringene fortsatt er riktige.

Designforbedringer er allerede aktuelle, men endelig omfang bestemmes etter at alle brukertestene er mottatt.

*** Legg inn konkrete backlog-endringer med tilhørende Issues og begrunnelse.

## 5.3 Avvik fra planen og gjenstående arbeid

Den publiserte prototypen gir foreløpig ikke tilgang til alle funksjonene som var prioritert i sprinten. Innlogging, brukerprofiler og innsjekking krever lokal kjøring av backend, og kartfunksjonen er ikke ferdigstilt.

Det er derfor viktig å skille mellom det som er implementert, det som er testet, og det som er tilgjengelig for brukerne.

*** Sammenlign sprintens opprinnelige mål med faktisk resultat. Forklar eventuelle avvik, hvorfor de oppstod, og hvordan de påvirker prioriteringene videre.

# 6. Sprint Retrospective

## 6.1 Samarbeid og arbeidsprosess

I retrospektivet skal vi vurdere hvordan vi har arbeidet, ikke bare resultatet av koden.

GitHub har gjort oppgavene synlige, og arbeidet har omfattet både frontend, backend, automatiserte tester og brukerundersøkelse.

*** Beskriv faktisk arbeidsfordeling, møtestruktur og hvordan gruppa håndterte avhengigheter mellom oppgavene.

## 6.2 Hva fungerte, og hva bør forbedres?

Et naturlig diskusjonspunkt er hvordan vi har balansert utvikling av funksjoner mot testing og tilgjengelighet for brukere.

Et annet er om Issues og pull requests har gjort samarbeidet enklere eller mer krevende.

*** Fyll inn gruppas egne vurderinger: hva fungerte, hva var vanskelig, og hvorfor?

## 6.3 Læringspunkter

Utviklingsarbeidet har synliggjort forskjellen mellom å ha implementert funksjonalitet og å gjøre den tilgjengelig for brukere.

Brukertestingen viser også at teknisk funksjonalitet alene ikke er tilstrekkelig. Brukerne må forstå hvordan løsningen fungerer, og oppleve den som relevant og oversiktlig.

*** Suppler med konkrete erfaringer fra gruppas retrospektiv, særlig knyttet til samarbeid, testing og smidig utvikling.

## 6.4 Forbedringer til neste sprint

Resultatene fra Sprint Retrospective skal brukes til å identifisere konkrete tiltak for neste sprint.

*** Beskriv to eller tre forbedringstiltak gruppa har blitt enige om. Forklar hva dere vil gjøre annerledes, hvorfor, og hvordan dere skal følge opp tiltakene.

# 7. Oppsummering og veien videre

## 7.1 Hva vi har lært

Arbeidet har gitt oss erfaring med å omsette produktprioriteringer til en prototype, dele utviklingen opp i mindre oppgaver og kombinere tekniske tester med tilbakemeldinger fra brukere.

Det har også vist at implementert kode, lokalt testbar funksjonalitet og en tilgjengelig nettbasert demonstrasjon ikke nødvendigvis er det samme.

## 7.2 Neste steg

Vi skal ferdigstille brukerundersøkelsen, prioritere forbedringer og gjennomføre en ny designiterasjon.

I tillegg må vi kontrollere automatiserte tester og CI-resultater, dokumentere Sprint Review og Sprint Retrospective og avklare hvilke funksjoner som realistisk kan videreutvikles før Deliverable 4.

*** Oppdater etter faktisk gjennomført arbeid.
