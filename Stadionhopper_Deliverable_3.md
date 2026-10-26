# Deliverable 3 – Increment Review and Working Prototype

Stadionhopper  
IBE205 – Høgskolen i Molde

Skrevet av:

Line Lyngsnes Johansen

Ine Botterli

Inger Videm

# 1. Innledning

## 1.1 Formål og utgangspunkt

I denne leveransen har vi gått fra planlegging av Stadionhopper til utvikling og utprøving av en prototype. Formålet har vært å undersøke hvordan vi kan omsette produktvisjonen til en fungerende løsning, samtidig som vi får erfaring med smidig utvikling, testing, versjonskontroll og kontinuerlig integrasjon (CI).

I Deliverable 1 utarbeidet vi produktvisjon, målgruppe og en første prioritering av funksjoner. I Deliverable 2 arbeidet vi videre med brukerundersøkelse, produktbacklog, domenemodell, arkitektur, wireframes og planlegging av utviklingsarbeidet. Deliverable 3 bygger videre på dette og handler i større grad om hva vi faktisk har utviklet, hvordan vi har testet løsningen, og hva vi har lært underveis.

Et viktig mål har vært å utvikle en prototype som kan demonstrere sentrale funksjoner i Stadionhopper. Etter hvert som vi har testet løsningen og fått tilbakemeldinger fra brukere, har vi også fått større oppmerksomhet på hvordan løsningen oppleves og brukes. Parallelt har vi arbeidet med å etablere en utviklingsprosess der endringer kan spores, testes og integreres gjennom GitHub.

## 1.2 Sprintmål og avgrensning

Oppgaveteksten legger vekt på utvikling av en fungerende prototype, automatiserte tester og etablering av en enkel CI/CD-prosess gjennom GitHub. Innlogging, brukerprofiler, stadioninnsjekking og sosial feed trekkes frem som aktuelle funksjoner, men hovedvekten ligger også på å få erfaring med utviklingsprosessen og samarbeidet i teamet.

Vi tok utgangspunkt i prioriteringene fra Deliverable 2 og organiserte utviklingsarbeidet gjennom oppgaver og milepæler i GitHub. Vi satte opp fire milepæler: en testbar prototype innen 20. oktober, tilbakemeldinger fra brukertesting innen 22. oktober, revidert kode og ferdigstilt rapport innen 27. oktober og innlevering 28. oktober. Dette ga oss en plan for når ulike deler av arbeidet skulle være gjennomført.

Etter hvert som prototypen tok form, ble det tydelig at vi måtte prioritere mellom å utvikle ny funksjonalitet og å forbedre det som allerede var laget. Etter tilbakemelding fra faglærer fikk vi også større oppmerksomhet på å demonstrere en sammenhengende brukerreise. Arbeidet med kalendervisningen og tilbakemeldingene fra brukertestene har vært en del av denne videreutviklingen. 

# 2. Prototypen og utviklingsarbeidet

## 2.1 Prioriteringer fra tidligere leveranser

I den første brukerundersøkelsen svarte 19 personer. Ni av disse vurderte det å finne kommende kamper som den viktigste funksjonen. Dette bidro til at kampoversikten ble prioritert som en sentral del av MVP-en. Produktvisjonen handler om å senke terskelen for å oppdage og delta på lokale fotballkamper. Det er derfor viktig at brukeren enkelt kan finne relevante kamper og informasjon om hvor og når de spilles.

I de tidligere leveransene prioriterte vi også profil, registrering av kampbesøk og enkelte sosiale funksjoner. Under utviklingsarbeidet har vi måttet vurdere disse prioriteringene opp mot tilgjengelig tid, tekniske utfordringer og hva som er mest nyttig å demonstrere og teste på dette stadiet.

## 2.2 Prototypens funksjonalitet og brukerreise

Vi har utviklet en nettbasert prototype av Stadionhopper med utgangspunkt i produktbackloggen og wireframes fra Deliverable 2. Prototypen er bygget med HTML, CSS og JavaScript i frontend og Node.js i backend. Utviklingsarbeidet har foregått gradvis, med ulike funksjoner fordelt på oppgaver i GitHub. Kampoversikten har fått en sentral plass i prototypen. Brukeren kan se kamper i en kalendervisning og velge en kamp for å få mer informasjon om blant annet lag, tidspunkt og stadion. Dette gir en enkel brukerreise fra å oppdage en kamp til å finne informasjon som kan være relevant for å dra på den. Vi har også arbeidet med å skille mellom tidligere og kommende kamper, slik at kalenderen blir lettere å orientere seg i.

Gjennom brukerundersøkelser og tilbakemeldinger fra faglærer ble vi mer oppmerksomme på betydningen av en sammenhengende brukerreise. Vi så at det ikke nødvendigvis er nok å utvikle flere funksjoner dersom det er uklart hvordan brukeren skal navigere mellom dem. Dette har ført til at vi har prioritert forbedringer i navigasjon, presentasjon av kampinformasjon og visuell utforming. Prototypen har dermed ikke bare vært et resultat av utviklingsarbeidet, men også et utgangspunkt for å undersøke hvordan løsningen fungerer for brukerne. Tilbakemeldingene har gitt oss grunnlag for å justere prioriteringene og vurdere hvilke forbedringer som bør gjennomføres videre. Dette kommer vi nærmere tilbake til i kapittelet om testing.

## 2.3 Backend og øvrige funksjoner

I tillegg til kampoversikten har vi arbeidet med funksjoner for innlogging, brukerprofiler, registrering av kampbesøk og sosial feed. Prosjektet inneholder backend-kode for blant annet autentisering, brukerøkter, håndtering av kampdata, innsjekkinger og sosiale innlegg. Disse funksjonene er viktige for den videre utviklingen av Stadionhopper, men det er nødvendig å skille mellom funksjonalitet som er implementert i koden, og funksjonalitet som faktisk kan demonstreres og brukes.

Vi har publisert en demonstrasjonsversjon gjennom GitHub Pages, slik at andre kan prøve deler av prototypen uten å installere eller kjøre prosjektet lokalt. GitHub Pages støtter imidlertid ikke kjøring av Node.js-backend, og demonstrasjonen benytter derfor eksempeldata. Dette innebærer at brukerne kan utforske blant annet kampoversikten og deler av brukergrensesnittet, mens funksjoner som krever innlogging og lagring av brukerdata, må testes lokalt. Denne begrensningen har også betydning for brukertestingen, ettersom testpersonene ikke har hatt tilgang til all funksjonaliteten som finnes i prosjektet.

*** Bekreft gjennom lokal testing hvilke funksjoner som fungerer fra start til slutt, særlig innlogging, profil, innsjekking og sosial feed.

*** Beskriv eventuelle tekniske utfordringer knyttet til backend og hvordan gruppa håndterte dem.

## 2.4 Utvikling og prioritering gjennom GitHub

Vi har brukt GitHub Issues til å dele utviklingsarbeidet inn i mindre oppgaver knyttet til blant annet datamodell, frontend, backend, innlogging, kampoversikt, innsjekking og testing. Oppgavene har gjort det enklere å fordele ansvar og følge fremdriften, samtidig som vi har kunnet justere prioriteringene underveis. Kodeendringer har blitt utført i egne branches og håndtert gjennom pull requests, slik at vi kan knytte arbeidet til konkrete oppgaver og følge hvilke endringer som er gjort.

Brukertestingen har ført til flere nye forbedringsoppgaver i GitHub. Et eksempel er Issue #121, som handler om å forenkle kampinformasjonen. På bakgrunn av tilbakemeldingene har vi blant annet fjernet sekunder fra klokkeslett og arbeidet med å gjøre det lettere å skille mellom tidligere og kommende kamper i kalenderen. Endringene ble gjort i en egen branch og sendt til gjennomgang gjennom en pull request. Dette er et eksempel på hvordan vi har brukt tilbakemeldinger til å justere utviklingsarbeidet, samtidig som GitHub har gjort det mulig å teste endringene før de eventuelt integreres i hovedversjonen.

# 3. Testing og kvalitetssikring

## 3.1 Teststrategi

I utviklingen av Stadionhopper har vi kombinert automatiserte tester med brukertesting. Disse testformene undersøker ulike sider av løsningen og utfyller hverandre. Automatiserte tester kan avdekke tekniske feil og bidra til at endringer ikke ødelegger eksisterende funksjonalitet. De kan derimot ikke alene fortelle oss om brukerne forstår navigasjonen, finner informasjonen de trenger, eller opplever løsningen som nyttig.

Hyppig testing og tilbakemeldinger er sentralt i smidig utvikling, og vi ønsket derfor å involvere personer utenfor prosjektgruppen. Når vi selv bruker prototypen, kjenner vi både strukturen og hensikten bak funksjonene, noe som kan gjøre det vanskelig å oppdage uklarheter. Ved å la testpersonene utføre konkrete oppgaver uten veiledning, kunne vi undersøke hvordan de orienterte seg i løsningen. Tilbakemeldingene skulle også brukes som grunnlag for videre prioritering og utvikling.

## 3.2 Automatiserte tester

Prosjektet inneholder automatiserte tester for både backend og deler av frontend. Testene omfatter blant annet autentisering, brukerøkter, tilgangskontroll, innsjekking og visning av kampinformasjon. De kan kjøres med kommandoen `node --test test/*.test.js`, og er også knyttet til prosjektets CI-prosess gjennom GitHub Actions.

Automatiserte tester gjør det mulig å kontrollere funksjonaliteten gjentatte ganger etter kodeendringer og kan bidra til å oppdage regresjoner, altså at noe som tidligere fungerte, slutter å fungere. Under arbeidet med Issue #121 opplevde vi dette i praksis da to av testene feilet etter en endring i kalenderen. Etter at koden ble justert, ble testene kjørt på nytt, og alle 41 bestod. Dette viste oss hvordan automatiserte tester kan bidra til å oppdage problemer før endringer integreres i hovedversjonen.

*** Bekreft testresultatet og dokumenter eventuelt med skjermbilde fra GitHub Actions.

## 3.3 Gjennomføring av brukertest

Vi inviterte åtte personer til å teste den publiserte prototypen, der vi fikk syv svar. Testpersonene fikk konkrete oppgaver som blant annet gikk ut på å finne en kamp, finne et arrangement, lokalisere kartfunksjonen og finne hvor de ville logget ut. De ble også bedt om å vurdere hvor enkelt det var å navigere og komme med forslag til forbedringer. Testingen ble gjennomført uten at vi forklarte hvor de ulike funksjonene lå. Hensikten var i all hovedsak å undersøke om brukerne kunne finne frem på egen hånd. Siden den publiserte demonstrasjonen ikke har fungerende innlogging, kunne oppgaven om utlogging bare undersøke om testpersonene fant riktig sted i grensesnittet. Den kunne ikke bekrefte at selve utloggingsfunksjonen virket.

Testgruppen var begrenset og bestod av personer vi selv inviterte. Resultatene kan derfor ikke betraktes som representative for hele målgruppen. De gir likevel nyttig innsikt i hvordan personer utenfor utviklingsgruppen opplever prototypen, så vi har valgt å bruke det videre i utviklingsarbeidet.

## 3.4 Resultater fra brukertestingen

Tilbakemeldingene viste at flere av testpersonene opplevde løsningen som enkel å forstå og navigere i. De fant i stor grad frem til oppgavene de skulle løse. En av testpersonene trakk spesielt frem at det enkle grensesnittet var en styrke, fordi løsninger med mange valg kan oppleves som slitsomme. Samtidig kom det flere konkrete forslag til forbedringer.

Et gjennomgående funn var ønsket om mer farger og et tydeligere fotballpreg. Flere mente at farger ville gjøre løsningen mer attraktiv. Ett forslag var å bruke hjemmelagets klubbfarger for å gjøre det lettere å kjenne igjen og skille mellom kamper. Det ble også foreslått mykere kanter og tydeligere visuelle skiller mellom feltene. Andre tilbakemeldinger handlet om navigasjon og begrepsbruk. En testperson opplevde det som uklart hva som skilte «Sosial» fra «Treff», mens en annen stilte spørsmål ved betydningen av «Mine innsjekkinger». Navigasjonsmenyen nederst ble også beskrevet som lite intuitiv.

Når det gjaldt kampinformasjon, ble det påpekt at klokkeslett ikke trenger å vises med sekunder. En testperson stilte spørsmål ved behovet for knappen «Last kampene på nytt», mens en annen ønsket at kampene skulle presenteres i en kalender. Det ble også stilt spørsmål ved behovet for å vise tidligere kamper. Disse tilbakemeldingene er nyttige fordi de viser at en funksjon kan være teknisk tilgjengelig uten at brukeren nødvendigvis forstår hensikten med den.

## 3.5 Fra tilbakemeldinger til forbedringer

Etter brukertestingen ble funnene dokumentert i GitHub Issue #62, mens videre prioritering ble fulgt opp gjennom Issue #63. Tilbakemeldingene dannet grunnlag for konkrete forbedringsoppgaver knyttet til navigasjon og begrepsbruk (#118), visuell utforming (#119) og kampinformasjon (#121). Dette har gjort det mulig å følge opp brukernes innspill gjennom den samme arbeidsprosessen som øvrige utviklingsoppgaver. Brukertestingen har dermed ikke bare gitt oss informasjon om hvordan prototypen oppleves, men også påvirket hvilke oppgaver vi har prioritert videre.

Issue #121 er et eksempel på hvordan vi har fulgt opp tilbakemeldingene. Vi har blant annet fjernet unødvendige sekunder fra klokkeslett og gitt tidligere kamper en annen bakgrunnsfarge i kalenderen, slik at de lettere kan skilles fra kommende kamper. Endringene ble gjort i en egen branch og sendt til gjennomgang gjennom en pull request. Ikke alle forslagene fra brukertestingen er gjennomført, og enkelte krever videre arbeid og diskusjon i gruppa. Vi må derfor fortsette å vurdere hvilke forbedringer som støtter produktvisjonen og gir størst nytte innenfor prosjektets rammer.

*** Oppdater med endelig status for forbedringsoppgavene, inkludert hvilke endringer som ble integrert i main, og hvilke som ble utsatt.

*** Dokumenter eventuell ny kontroll eller brukertest etter at endringene ble integrert.

# 4. GitHub, samarbeid og kontinuerlig integrasjon

## 4.1 Versjonskontroll og samarbeid

I Deliverable 2 planla vi å bruke GitHub Issues, branches, pull requests og kodegjennomgang som en del av arbeidsprosessen. I denne sprinten har vi tatt disse verktøyene i bruk for å organisere og følge opp utviklingen. Gjennom Issues har vi fordelt oppgaver og dokumentert hva som skal gjøres, mens egne branches har gjort det mulig å arbeide med kodeendringer uten å endre hovedversjonen direkte. Pull requests har gitt oss en måte å samle endringene til gjennomgang før de eventuelt integreres i main. Samtidig har commit-historikken gjort det mulig å se hvilke endringer som er gjort, og hvem som har utført dem. Dette har vært nyttig når flere gruppemedlemmer har arbeidet med ulike deler av prototypen.

Et eksempel er arbeidet med Issue #121, der endringer i kampinformasjonen ble gjennomført i en egen branch og sendt inn som en pull request. Vi ba om gjennomgang fra et annet gruppemedlem før endringene skulle integreres i main. Underveis ble endringene også kontrollert av automatiserte tester, som avdekket feil vi måtte rette. Dette viser hvordan vi har brukt GitHub til mer enn oppgavefordeling og lagring av kode. Arbeidsprosessen har også gitt oss mulighet til å kontrollere endringer og oppdage problemer før de påvirker hovedversjonen. Erfaringene med de automatiserte testene beskrives nærmere i kapittel 4.2.

*** Beskriv hvordan gruppa har praktisert kodegjennomgang i resten av sprinten. Har pull requests blitt gjennomgått av andre gruppemedlemmer før de ble integrert i main? Hvis ikke, beskriv hvordan dette har fungert i praksis.

## 4.2 Kontinuerlig integrasjon (CI)

Kontinuerlig integrasjon (CI) innebærer at kodeendringer kontrolleres jevnlig gjennom automatiserte prosesser, slik at feil kan oppdages tidlig i utviklingen. I Stadionhopper har vi etablert en CI-prosess gjennom GitHub Actions, der automatiserte tester kjøres i forbindelse med pull requests. Dette gjør det mulig å kontrollere endringer før de integreres i hovedgrenen. Oppsettet ble fulgt opp gjennom GitHub Issue #61, og workflow-filene ligger i `.github/workflows`.

Vi fikk erfare nytten av dette blant annet under arbeidet med Issue #121, som handlet om å forbedre visningen av kampinformasjon. Etter at endringene var sendt inn gjennom en pull request, viste GitHub Actions at to av 41 automatiserte tester feilet. Feilene oppstod i tester knyttet til frontend og kalendervisningen. Vi undersøkte koden og endret måten en CSS-klasse ble lagt til på, slik at den også fungerte med testoppsettet. Etter at endringen ble lagret i en ny commit, ble testene kjørt på nytt, og alle 41 bestod. Dette ga oss en konkret erfaring med hvordan CI kan avdekke problemer før kode integreres i hovedversjonen.

Erfaringen viste oss også at en endring som virker liten, kan påvirke andre deler av løsningen eller testmiljøet. Ved å bruke automatiserte kontroller i utviklingsprosessen fikk vi mulighet til å oppdage og rette problemet før endringen ble slått sammen med `main`. CI har dermed ikke bare vært et teknisk oppsett, men også et verktøy for kvalitetssikring og læring underveis i sprinten.

*** Kontroller i workflow-filen om testene også kjøres ved push, og oppdater beskrivelsen dersom dette er tilfelle.

*** Sett eventuelt inn skjermbilde fra GitHub Actions som viser den mislykkede og den vellykkede testkjøringen.

## 4.3 DORA og måling av utviklingsprosessen

I tillegg til automatiserte tester kan vi bruke data fra GitHub til å undersøke hvordan utviklingsprosessen har fungert. DORA er et rammeverk for å måle programvareleveranser, med vekt på både hastighet og stabilitet. Fire sentrale målinger er *deployment frequency* (hvor ofte endringer blir levert), *lead time for changes* (tiden fra en kodeendring til den er levert), *change failure rate* (andelen leveranser som fører til feil) og *failed deployment recovery time* (tiden det tar å gjenopprette en fungerende løsning etter en mislykket leveranse).

GitHub gir oss tilgang til commit-historikk, pull requests og resultater fra GitHub Actions. Disse dataene kan brukes til å undersøke deler av utviklingsprosessen, men det er viktig å skille mellom en commit, en pull request som blir slått sammen med `main`, og en faktisk publisering av prototypen. Dette er ikke nødvendigvis samme hendelse. Siden prosjektet har en begrenset varighet og relativt få leveranser, må eventuelle DORA-målinger også tolkes med forsiktighet. Målet er ikke først og fremst å oppnå bestemte tall, men å bruke tilgjengelig informasjon til å vurdere hvordan vi arbeider, og hvor det kan være behov for forbedringer.

Arbeidet med GitHub og automatiserte tester har samtidig vist oss at det ikke er tilstrekkelig å markere en oppgave som ferdig. Vi må også kontrollere at endringene fungerer, at relevante tester er bestått, og at koden er integrert i riktig versjon av prosjektet. Erfaringen med CI-testene i Issue #121 er et eksempel på dette. Selv om endringen var implementert, måtte vi rette en feil før de automatiserte kontrollene ble godkjent. Dette har gjort oss mer oppmerksomme på forskjellen mellom å skrive kode og å levere en kontrollert endring.

*** Undersøk om vi kan hente ut faktiske tall for én eller flere DORA-målinger fra GitHub. Beskriv hva tallene viser, og hvilke begrensninger de har.

*** Dersom vi ikke har tilstrekkelige data, forklar kort hvilke målinger vi ikke kan beregne på en pålitelig måte, og hvorfor.

# 5. Sprint Review

## 5.1 Gjennomgang av sprintresultatet

I løpet av sprinten har vi utviklet en prototype av Stadionhopper med kampoversikt, kalender og kampdetaljer som sentrale deler av løsningen. Vi har også arbeidet med innlogging, brukerprofiler, innsjekking og sosiale funksjoner. Den publiserte demonstrasjonen på GitHub Pages gjør det mulig å vise hvordan brukeren kan finne en lokal fotballkamp og få informasjon om blant annet tidspunkt, lag og stadion. Funksjoner som krever backend, må derimot demonstreres gjennom lokal kjøring. Dette skillet har vært viktig når vi har vurdert hva vi faktisk har oppnådd sammenlignet med det vi planla i Deliverable 2.

Gjennom utviklingsarbeidet har prioriteringene også endret seg. Den andre brukerundersøkelsen og tilbakemeldinger fra faglærer har ført til at vi har lagt større vekt på en sammenhengende brukerreise, navigasjon og presentasjon av kampinformasjon. Vi har derfor brukt tid på å forbedre eksisterende funksjoner fremfor bare å legge til nye. Dette har påvirket sprintresultatet og hvilke oppgaver vi har valgt å prioritere.

Vi vurderer den testbare prototypen, gjennomføringen av brukertestingen og erfaringene med utviklingsarbeidet i GitHub som viktige resultater fra sprinten. Samtidig har vi måttet nedprioritere deler av den planlagte funksjonaliteten og kommet kortere i produktutviklingen enn vi opprinnelig ønsket. En del av tiden har gått med til å etablere arbeidsprosessen og sette oss inn i verktøyene. Dette har gitt oss nyttig erfaring, men også redusert tiden vi har hatt til selve utviklingen av prototypen.

*** Sett inn en kort beskrivelse av gjennomført Sprint Review: dato, deltakere, hva som ble demonstrert, og hvilke deler av sprintmålet som ble oppnådd eller ikke oppnådd.

## 5.2 Tilbakemeldinger og videre prioriteringer

Brukertestingen ga oss flere konkrete forbedringsforslag som vi har dokumentert og fulgt opp gjennom GitHub Issues. Blant annet har vi arbeidet videre med kampinformasjon, navigasjon og visuell utforming. Tilbakemeldingene har vist at det ikke nødvendigvis er flere funksjoner som vil gi størst nytte på dette stadiet, men at eksisterende funksjoner også må være forståelige og enkle å bruke.

I det videre arbeidet ønsker vi å prioritere et mer gjennomarbeidet og brukervennlig design, med særlig vekt på en tydeligere brukerreise. Vi har også diskutert muligheten for at brukerne selv kan registrere kamper og eventuelt bidra med oppdateringer av scoringer eller annen kampinformasjon. ette kan redusere behovet for at klubbene selv administrerer all informasjon, samtidig som det kan gjøre løsningen aktuell for flere brukere. Foreløpig er dette ideer som må undersøkes nærmere, og vi har ikke bestemt hvilke funksjoner vi skal utvikle. Innlogging og kartvisning har derfor ikke høyeste prioritet i neste fase.

*** Sett inn hvilke tilbakemeldinger og beslutninger som kom frem under Sprint Review, og hvordan disse påvirket produktbackloggen og prioriteringene videre.

# 6. Sprint Retrospective

## 6.1 Samarbeid og erfaringer fra sprinten

I denne sprinten har vi brukt GitHub til å organisere utviklingsarbeidet og fordele oppgaver mellom frontend, backend, testing og brukerundersøkelse. Vi opplevde at det tok mye tid å sette oss inn i oppgaven, etablere en plan og opprette Issues. Den opprinnelige oppgaveinndelingen ble utarbeidet med hjelp fra KI, men viste seg ikke alltid å samsvare med hvordan arbeidet faktisk måtte gjennomføres. Enkelte oppgaver blandet frontend og backend, og avhengighetene mellom dem var ikke alltid tydelige. Dette skapte behov for avklaringer underveis. Samtidig ga oppdelingen i mindre oppgaver og milepæler oss bedre oversikt over fremdriften og gjorde arbeidet mer håndterlig. Vi har også erfart at sprintens omfang må tilpasses gruppas tilgjengelige kapasitet. Med tre gruppemedlemmer og andre studieforpliktelser har vi måttet prioritere mellom utvikling, testing og dokumentasjon, og vi har kommet kortere i produktutviklingen enn vi opprinnelig ønsket.

Et konkret eksempel på utfordringer med oppgavefordelingen oppstod da frontend- og backend-arbeidet stoppet opp fordi vi hadde ulike forventninger til hvem som skulle levere hva først. Dette ble oppdaget under et av våre ukentlige scrum-møter, der vi avklarte ansvaret og delte arbeidet opp i tydeligere oppgaver (Issue #70 og #72–74). Etter avklaringen kom vi videre samme dag. Vi har ellers hatt god erfaring med å arbeide sammen i samme rom, der vi raskt kunne diskutere problemer og løsninger, og senere videreføre kommunikasjonen gjennom Teams. Gruppa har også vært åpne om kapasitet og utfordringer, slik at oppgaver kunne overtas av andre ved behov. Denne arbeidsformen har fungert godt, men vi ser samtidig at flere beslutninger burde vært dokumentert i GitHub Issues for å gjøre dem lettere å følge opp i ettertid.

## 6.2 Læringspunkter og forbedringstiltak

En viktig erfaring fra sprinten er at det ble lettere å samarbeide om kvalitetssikring etter hvert som vi fikk en prototype som kunne testes. I starten var det vanskeligere å vurdere hverandres arbeid, mens en fungerende demonstrasjon gjorde det mulig å gi mer konkrete tilbakemeldinger på både funksjonalitet og brukergrensesnitt. Vi har også fått erfaring med branches, pull requests og automatiserte tester, men kompetansen på de ulike delene av utviklingsarbeidet er fortsatt noe ulikt fordelt. Ikke alle har hatt like god innsikt i hva de automatiserte testene kontrollerer. En felles gjennomgang av testene og CI-resultatene vil derfor kunne gjøre flere i gruppa i stand til å delta i kvalitetssikringen og redusere avhengigheten av enkeltpersoner.

Vi tar særlig med oss betydningen av tydeligere oppgavefordeling og realistisk planlegging. I det videre arbeidet ønsker vi å beholde mindre milepæler, men være mer bevisste på hvordan vi oppretter og avgrenser Issues. Selv om KI kan hjelpe oss med å utarbeide oppgaver, må vi selv kontrollere at ansvar, rekkefølge og avhengigheter er forståelige og hensiktsmessige. Vi ønsker også å bli flinkere til å dokumentere viktige avklaringer direkte i GitHub. Samtidig vil vi videreføre arbeidsformen med ukentlige scrum-møter, løpende kommunikasjon og bruk av branches og pull requests. Erfaringene fra denne sprinten har vist oss at en god arbeidsprosess ikke nødvendigvis er ferdig planlagt fra starten, men må justeres etter hvert som vi får mer erfaring med prosjektet.

*** Bekreft hvilke konkrete forbedringstiltak gruppa har sluttet seg til i retrospektivet, og hvem som skal følge dem opp.

# 7. Oppsummering og veien videre

## 7.1 Hva vi har lært

Arbeidet med Deliverable 3 har gitt oss erfaring med å gå fra produktvisjon og planlegging til en prototype som kan demonstreres og testes.

Vi har fått erfaring med hvordan GitHub kan brukes til å organisere utviklingsarbeidet, hvordan automatiserte tester kan bidra til teknisk kvalitet, og hvordan tilbakemeldinger fra faktiske brukere kan avdekke forbedringsbehov som ikke nødvendigvis kommer frem gjennom teknisk testing.

Kalendervisningen er et eksempel på hvordan produktet kan videreutvikles med utgangspunkt i brukerbehovet for å finne lokale fotballkamper. Brukertestingen har samtidig vist at det er nødvendig å arbeide videre med både visuell utforming og forståelig navigasjon.

Vi har også sett at det er viktig å skille mellom kode som er skrevet, funksjonalitet som er testet, og det som faktisk er tilgjengelig for brukerne.

## 7.2 Veien videre

## 7.2 Veien videre

På vårt ukentlige scrum-møte diskuterte vi før innlevering hvordan vi ønsker å videreutvikle Stadionhopper etter innleveringen av Deliverable 3. Vi ble enige om å prioritere en mer gjennomarbeidet visuell utforming og en tydeligere brukerreise, slik at løsningen blir enklere å navigere i og mer attraktiv å bruke. Dette bygger videre på erfaringene fra brukertestingen, der vi fikk flere tilbakemeldinger om design og navigasjon.

Vi ønsker også å utvikle noe som kan gjøre Stadionhopper mer interessant og skille plattformen fra andre løsninger. Vi har foreløpig ikke bestemt hvilken funksjon eller hvilket konsept dette skal være, men gruppa er enig om at dette er et viktig område å utforske videre. Samtidig ønsker vi å videreføre arbeidsformen med GitHub Issues, branches og pull requests, som vi har fått erfaring med gjennom denne sprinten.Videre arbeid vil blant annet handle om å ferdigstille og kontrollere prioriterte forbedringer fra brukertestingen, vurdere brukerreisen og fortsette utviklingen av prototypen.

## 7.2 Veien videre

På vårt ukentlige scrum-møte diskuterte vi hvordan vi ønsker å videreutvikle Stadionhopper etter innleveringen av Deliverable 3. Vi ble enige om å prioritere et mer gjennomarbeidet design og en tydeligere brukerreise, slik at løsningen blir enklere å navigere i og mer attraktiv å bruke. Dette bygger videre på tilbakemeldingene fra brukertestingen, der flere etterlyste et tydeligere visuelt uttrykk og forbedringer i navigasjonen.

Vi ønsker også å utforske muligheter for å gjøre Stadionhopper mer interessant og skille plattformen fra andre løsninger. En idé er at brukerne selv kan bidra med kampinformasjon, men vi har foreløpig ikke bestemt oss for hvilken funksjon eller hvilket konsept vi vil prioritere. Vi ønsker å undersøke hva som faktisk vil gi brukerne verdi før vi tar en endelig beslutning. Samtidig vil vi videreføre arbeidsformen med GitHub Issues, branches og pull requests, og bruke erfaringene fra denne sprinten til å forbedre planleggingen og samarbeidet videre.

## 7.2 Veien videre

På vårt ukentlige scrum-møte diskuterte vi hvordan vi ønsker å videreutvikle Stadionhopper etter innleveringen av Deliverable 3. Vi ble enige om å prioritere et mer gjennomarbeidet design og en tydeligere brukerreise, slik at løsningen blir enklere å navigere i og mer attraktiv å bruke. Dette bygger videre på tilbakemeldingene fra brukertestingen, der flere etterlyste et tydeligere visuelt uttrykk og forbedringer i navigasjonen.

Vi ønsker også å utforske muligheter for å gjøre Stadionhopper mer interessant og skille plattformen fra andre løsninger. En idé er at brukerne selv kan bidra med kampinformasjon, men vi har foreløpig ikke bestemt oss for hvilken funksjon eller hvilket konsept vi vil prioritere. Vi ønsker å undersøke hva som faktisk vil gi brukerne verdi før vi tar en endelig beslutning. Samtidig vil vi videreføre arbeidsformen med GitHub Issues, branches og pull requests, og bruke erfaringene fra denne sprinten til å forbedre planleggingen og samarbeidet videre.

*** Oppdater avslutningen når sprinten er ferdig, og konkretiser hva gruppa faktisk har besluttet å arbeide videre med. +design
