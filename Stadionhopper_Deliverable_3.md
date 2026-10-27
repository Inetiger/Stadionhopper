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

I de tidligere leveransene prioriterte vi også brukerprofiler, registrering av kampbesøk og enkelte sosiale funksjoner. Under utviklingsarbeidet har vi måttet vurdere disse prioriteringene opp mot tilgjengelig tid, tekniske utfordringer og hva som har vært mest nyttig å demonstrere og teste på dette stadiet.

## 2.2 Prototypens funksjonalitet og brukerreise

Vi har utviklet en nettbasert prototype av Stadionhopper med utgangspunkt i produktbackloggen og wireframes fra Deliverable 2. Prototypen er bygget med HTML, CSS og JavaScript i frontend og Node.js i backend. Kampoversikten har fått en sentral plass i løsningen. Brukeren kan se kamper i en kalendervisning og velge en kamp for å få mer informasjon om blant annet lag, tidspunkt og stadion. Dette gir en enkel brukerreise fra å oppdage en kamp til å finne informasjon som kan være relevant for å dra på den. Vi har også arbeidet med å gjøre det lettere å skille mellom tidligere og kommende kamper.

Gjennom tilbakemeldinger fra faglærer og brukertesting ble vi mer oppmerksomme på betydningen av en sammenhengende brukerreise. Vi erfarte at det ikke nødvendigvis er tilstrekkelig å utvikle flere funksjoner dersom det er uklart hvordan brukeren skal navigere mellom dem. Derfor har vi begynt å prioritere forbedringer i navigasjon, presentasjon av kampinformasjon og visuell utforming. Prototypen har dermed også fungert som et utgangspunkt for å undersøke hvordan brukerne opplever løsningen, og hvilke forbedringer som bør prioriteres videre.

## 2.3 Backend og øvrige funksjoner

I tillegg til kampoversikten har vi utviklet kode for innlogging, brukerprofiler, registrering av kampbesøk og sosiale funksjoner. Backend håndterer blant annet autentisering, brukerøkter, kampdata og innsjekkinger. Vi har også utviklet automatiserte integrasjonstester som kontrollerer samspillet mellom frontend og backend. Blant annet testes innlogging og utlogging, samt en innsjekkingsprosess der et kampbesøk lagres i en JSON-fil og vises i brukerens profilhistorikk. Dette viser at sentrale deler av funksjonaliteten kan testes i et eget testmiljø, selv om de foreløpig ikke er tilgjengelige i den publiserte demonstrasjonen.

Vi har publisert en demonstrasjonsversjon gjennom GitHub Pages, slik at andre kan utforske prototypen uten å kjøre prosjektet lokalt. Her kan brukerne navigere mellom sidene og se kampinformasjon og annet innhold som allerede er lagt inn. GitHub Pages støtter imidlertid ikke kjøring av Node.js-backend, og den publiserte løsningen har derfor ikke en fungerende mekanisme for å lagre nye brukeropplysninger. Nettleseren kan heller ikke uten videre skrive endringer tilbake til filene i GitHub-repositoriet. Dette innebærer at funksjoner som innlogging og registrering av kampbesøk ikke kan brukes fullt ut i den publiserte demonstrasjonen. Vi har valgt å arbeide videre med denne tekniske begrensningen i neste sprint.

## 2.4 Utvikling og prioritering gjennom GitHub

Vi har brukt GitHub Issues til å organisere og fordele utviklingsarbeidet knyttet til blant annet datamodell, frontend, backend, innlogging, kampoversikt, innsjekking og testing. Gjennom sprinten har vi arbeidet med kodeendringer i egne branches og brukt pull requests for å integrere endringene i `main`. Automatiserte tester har vært en del av denne arbeidsprosessen og bidratt til å kontrollere at endringene fungerer før de integreres i hovedversjonen.

Vi har også opprettet nye Issues og justert prioriteringene etter hvert som prototypen har blitt utviklet og testet. Brukertestingen førte blant annet til forbedringsoppgaver knyttet til navigasjon, design og kampinformasjon. I Issue #121 fjernet vi sekunder fra klokkeslett og endret bakgrunnsfargen for tidligere kamper i kalenderen. Disse endringene ble, i likhet med mange andre endringer gjennom sprinten, gjennomført i en egen branch, kontrollert gjennom automatiserte tester og integrert i `main` gjennom en pull request. Dette er ett eksempel på hvordan vi har brukt GitHub og testing som en del av det løpende utviklingsarbeidet.

# 3. Testing og kvalitetssikring

## 3.1 Teststrategi

I utviklingen av Stadionhopper har vi kombinert automatiserte tester med brukertesting for å undersøke både teknisk funksjonalitet og brukervennlighet. De automatiserte testene kontrollerer om bestemte deler av løsningen fungerer som forventet, og kan bidra til å oppdage feil etter kodeendringer. Brukertestingen har derimot gitt oss innsikt i hvordan personer utenfor prosjektgruppen opplever prototypen, og om de finner informasjonen de trenger.

Vi ønsket å involvere brukere som ikke kjente løsningen fra før, fordi vi som utviklere allerede visste hvordan den var bygget opp. Ved å la testpersonene utføre konkrete oppgaver uten veiledning, kunne vi undersøke om navigasjonen og funksjonene var forståelige. Tilbakemeldingene har deretter blitt brukt som grunnlag for forbedringer og videre prioriteringer.

## 3.2 Automatiserte tester

Prosjektet inneholder automatiserte tester for både frontend og backend. Testene omfatter blant annet autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekking. De kan kjøres med kommandoen `node --test test/*.test.js` og er knyttet til CI-prosessen gjennom GitHub Actions.

Vi har blant annet utviklet integrasjonstester som kontrollerer samspillet mellom frontend og backend. En test gjennomfører innlogging med en testbruker, kontrollerer at det opprettes en gyldig brukerøkt, og undersøker deretter om brukerøkten avsluttes ved utlogging. En annen test kontrollerer innsjekkingsprosessen fra valg av kamp i kalenderen til registrering av besøket. Her undersøkes det om besøket lagres i en JSON-fil og vises i brukerens profilhistorikk.

Under arbeidet med Issue #121 opplevde vi nytten av automatisert testing da to av 41 tester feilet etter en endring i kalenderen. Etter at koden ble justert, ble testene kjørt på nytt, og alle 41 bestod. Endringene ble deretter integrert i `main`. Vi har brukt de automatiserte testene til å kontrollere kodeendringer før de integreres i hovedversjonen, og feil som har blitt oppdaget, har blitt rettet underveis. Dette har bidratt til at vi har kunnet videreutvikle prototypen samtidig som vi kontrollerer at eksisterende funksjonalitet fortsatt fungerer.

## 3.3 Gjennomføring av brukertest

Vi inviterte åtte personer til å teste den publiserte prototypen og fikk syv svar. Testpersonene fikk konkrete oppgaver som blant annet gikk ut på å finne en kamp, finne et arrangement, lokalisere kartfunksjonen og finne hvor de ville logget ut. De ble også bedt om å vurdere hvor enkelt det var å navigere og komme med forslag til forbedringer. Testingen ble gjennomført uten at vi forklarte hvor de ulike funksjonene lå, slik at vi kunne undersøke om brukerne fant frem på egen hånd.

Brukertestingen var begrenset til funksjonene som var tilgjengelige gjennom GitHub Pages. Den publiserte demonstrasjonen gjør det mulig å navigere og se eksisterende informasjon, men ikke lagre nye brukeropplysninger. Oppgaven om utlogging undersøkte derfor bare om testpersonene fant riktig sted i grensesnittet, ikke om selve utloggingsfunksjonen virket. Testgruppen var liten og bestod av personer vi selv inviterte. Resultatene kan derfor ikke regnes som representative for hele målgruppen, men ga oss likevel nyttig innsikt i hvordan prototypen ble oppfattet.

## 3.4 Resultater fra brukertestingen

Flere av testpersonene opplevde løsningen som enkel å forstå og navigere i, og de fant i stor grad frem til oppgavene de skulle løse. En av testpersonene fremhevet det enkle grensesnittet som positivt, fordi løsninger med mange valg kan oppleves som slitsomme. Samtidig fikk vi flere konkrete forslag til forbedringer, særlig knyttet til design, navigasjon og presentasjon av kampinformasjon.

Flere ønsket mer farger og et tydeligere fotballpreg. Det ble blant annet foreslått å bruke hjemmelagets klubbfarger for å skille mellom kamper, samt mykere kanter og tydeligere visuelle skiller. Andre tilbakemeldinger handlet om begrepsbruk og navigasjon. En testperson opplevde forskjellen mellom «Sosial» og «Treff» som uklar, mens en annen stilte spørsmål ved betydningen av «Mine innsjekkinger». Navigasjonsmenyen nederst ble også beskrevet som lite intuitiv.

Når det gjaldt kampinformasjon, ble det påpekt at klokkeslett ikke trenger å vises med sekunder. Det kom også spørsmål om behovet for knappen «Last kampene på nytt» og om tidligere kamper burde vises. En testperson ønsket dessuten at kampene skulle presenteres i en kalender. Tilbakemeldingene viste oss at funksjoner kan være tilgjengelige uten at brukerne nødvendigvis forstår hensikten med dem.

## 3.5 Fra tilbakemeldinger til forbedringer

Etter brukertestingen dokumenterte vi resultatene i GitHub Issue #62 og fulgte opp prioriteringene gjennom Issue #63. Tilbakemeldingene dannet grunnlag for forbedringsoppgaver knyttet til navigasjon og begrepsbruk (#118), visuell utforming (#119) og kampinformasjon (#121). På denne måten kunne vi følge opp brukernes innspill gjennom den samme arbeidsprosessen som øvrige utviklingsoppgaver.

Et konkret eksempel er Issue #121, der vi fjernet unødvendige sekunder fra klokkeslett og ga tidligere kamper en annen bakgrunnsfarge i kalenderen, slik at de lettere kunne skilles fra kommende kamper. Endringene ble utført i en egen branch, kontrollert gjennom automatiserte tester og integrert i `main` gjennom en pull request. Ikke alle forbedringsforslagene fra brukertestingen er gjennomført, og flere av dem vil derfor bli fulgt opp i det videre utviklingsarbeidet.

# 4. GitHub, samarbeid og kontinuerlig integrasjon

## 4.1 Versjonskontroll og samarbeid

I Deliverable 2 planla vi å bruke GitHub Issues, branches, pull requests og kodegjennomgang som en del av utviklingsprosessen. Gjennom denne sprinten har vi tatt verktøyene i bruk for å organisere og følge opp arbeidet. GitHub Issues har blitt brukt til å beskrive oppgaver, fordele ansvar og dokumentere fremdrift. Vi har også opprettet nye Issues og justert eksisterende oppgaver etter hvert som behovene har endret seg.

Utviklingsarbeidet har i stor grad foregått i egne branches, og vi har brukt pull requests for å integrere endringer i `main`. Dette har gjort det mulig å arbeide parallelt med ulike deler av prototypen uten å endre hovedversjonen direkte. Pull requests og commit-historikken har samtidig gitt oss oversikt over hvilke endringer som er gjennomført, og gjort det lettere å følge arbeidet i ettertid. De automatiserte testene har vært en viktig del av denne prosessen, ettersom de har gitt oss mulighet til å kontrollere endringer før de integreres i hovedversjonen.

Vi har gjennomgått endringene i pull requests før de ble integrert i `main`, hovedsakelig ved å se på beskrivelsene av hva som var endret og kontrollere resultatene fra de automatiserte testene. Vi har i stor grad støttet oss på testene fremfor å gjennomgå all kode i detalj. Denne arbeidsformen har gitt oss en viss kontroll med endringene, men vi ser også at en grundigere kodegjennomgang kunne bidratt til bedre felles forståelse av løsningen. Vi har dessuten erfart at tydelige oppgavebeskrivelser og avklarte avhengigheter er viktige når flere arbeider med frontend og backend samtidig. Disse erfaringene tar vi med oss videre i arbeidet med å forbedre samarbeidet.

## 4.2 Kontinuerlig integrasjon (CI)

Vi har etablert en CI-prosess gjennom GitHub Actions, der automatiserte tester kjøres i forbindelse med pull requests. Dette gjør det mulig å kontrollere kodeendringer før de integreres i `main`. Oppsettet ble fulgt opp gjennom GitHub Issue #61, og workflow-filene ligger i `.github/workflows`.

Prosjektet har automatiserte tester for både frontend og backend. Testene kontrollerer blant annet autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekking. Ved å kjøre testene automatisk i forbindelse med kodeendringer kan vi oppdage feil som ellers kunne blitt oversett, og kontrollere at eksisterende funksjonalitet fortsatt fungerer.

Et konkret eksempel oppstod under arbeidet med Issue #121, da GitHub Actions viste at to av 41 tester feilet etter en endring i kalendervisningen. Feilene var knyttet til måten en CSS-klasse ble lagt til på, og hvordan dette fungerte med testoppsettet. Etter at koden ble justert og endringen lagret i en ny commit, ble testene kjørt på nytt. Da bestod alle 41 testene, og endringene ble integrert i `main`.

Dette var ett av flere tilfeller der vi brukte automatiserte tester som en del av utviklingsarbeidet. Erfaringen viser hvordan CI kan bidra til å avdekke problemer før endringer blir en del av hovedversjonen. Samtidig har vi lært at beståtte automatiserte tester ikke nødvendigvis betyr at hele løsningen fungerer slik brukerne forventer. Derfor har vi også gjennomført brukertesting, som beskrevet i kapittel 3.

## 4.3 DORA og måling av utviklingsprosessen

I tillegg til automatiserte tester kan vi bruke data fra GitHub til å undersøke hvordan utviklingsprosessen har fungert. DORA er et rammeverk for å måle programvareleveranser, med vekt på både hastighet og stabilitet. Fire sentrale målinger er *deployment frequency* (hvor ofte endringer blir levert), *lead time for changes* (tiden fra en kodeendring til den er levert), *change failure rate* (andelen leveranser som fører til feil) og *failed deployment recovery time* (tiden det tar å gjenopprette en fungerende løsning etter en mislykket leveranse).

GitHub gir oss tilgang til commit-historikk, pull requests og resultater fra GitHub Actions. Disse dataene kan brukes til å undersøke deler av utviklingsprosessen, men det er viktig å skille mellom en commit, en pull request som blir slått sammen med `main`, og en faktisk publisering av prototypen. Dette er ikke nødvendigvis samme hendelse. Siden prosjektet har en begrenset varighet og relativt få leveranser, må eventuelle DORA-målinger også tolkes med forsiktighet. Målet er ikke først og fremst å oppnå bestemte tall, men å bruke tilgjengelig informasjon til å vurdere hvordan vi arbeider, og hvor det kan være behov for forbedringer.

*** Undersøk om vi kan hente ut faktiske tall for én eller flere DORA-målinger fra GitHub. Beskriv hva tallene viser, og hvilke begrensninger de har.

*** Dersom vi ikke har tilstrekkelige data, forklar kort hvilke målinger vi ikke kan beregne på en pålitelig måte, og hvorfor.# 4. GitHub, samarbeid og kontinuerlig integrasjon

# 5. Sprint Review

## 5.1 Gjennomgang av sprintresultatet

I løpet av sprinten har vi utviklet en prototype av Stadionhopper med kampoversikt, kalender og kampdetaljer som sentrale deler av løsningen. Vi har også utviklet funksjonalitet knyttet til innlogging, brukerprofiler, innsjekking og sosiale funksjoner. Den publiserte demonstrasjonen på GitHub Pages gjør det mulig å navigere mellom sidene og finne informasjon om blant annet kamper, tidspunkt, lag og stadioner. Funksjoner som krever backend og lagring av brukerdata, kan foreløpig ikke brukes fullt ut i den publiserte versjonen, selv om flere av dem er implementert og dekket av automatiserte tester.

Vi gjennomførte en kort felles gjennomgang av prototypen og vurderte resultatet opp mot planene fra Deliverable 2. Vi vurderer at vi har fått på plass en prototype som demonstrerer sentrale deler av konseptet, men at det fortsatt gjenstår utviklingsarbeid før løsningen fungerer som en helhetlig plattform. En del av sprinten har gått med til å etablere arbeidsprosessen og sette oss inn i verktøyene, noe som har begrenset tiden til produktutvikling. Samtidig har vi fått erfaring med GitHub, automatiserte tester og brukertesting, som også har vært viktige deler av sprintmålet.

## 5.2 Tilbakemeldinger og videre prioriteringer

Gjennom brukertestingen fikk vi flere konkrete tilbakemeldinger på prototypen, særlig knyttet til navigasjon, kampinformasjon og visuell utforming. Vi har begynt å følge opp disse gjennom GitHub Issues, blant annet ved å forbedre visningen av kampinformasjon og gjøre det enklere å skille mellom tidligere og kommende kamper. Tilbakemeldingene har vist oss at det ikke nødvendigvis er flere funksjoner som bør prioriteres først, men at de eksisterende funksjonene også må være forståelige og enkle å bruke.

På vårt ukentlige scrum-møte diskuterte vi resultatene så langt og hvordan vi ønsker å arbeide videre. Vi ble enige om å prioritere et mer gjennomarbeidet design og en tydeligere brukerreise. Vi ønsker også å undersøke muligheten for en funksjon som kan gjøre Stadionhopper mer interessant og skille plattformen fra andre løsninger. Blant ideene vi har diskutert, er at brukerne selv kan registrere kamper og eventuelt bidra med oppdateringer av scoringer eller annen kampinformasjon. Dette er foreløpig ikke besluttet, og vi må undersøke nærmere hva som vil gi brukerne størst verdi. Innlogging og videreutvikling av kartvisningen har ikke høyeste prioritet i neste fase.

# 6. Sprint Retrospective

## 6.1 Samarbeid og erfaringer fra sprinten

I denne sprinten har vi brukt GitHub til å organisere utviklingsarbeidet og fordele oppgaver mellom frontend, backend, testing og brukerundersøkelse. Vi opplevde at det tok mye tid å sette oss inn i oppgaven, etablere en plan og opprette Issues. Den opprinnelige oppgaveinndelingen ble utarbeidet med hjelp fra KI, men viste seg ikke alltid å samsvare med hvordan arbeidet faktisk måtte gjennomføres. Enkelte oppgaver blandet frontend og backend, og avhengighetene mellom dem var ikke alltid tydelige. Dette skapte behov for avklaringer underveis. Samtidig ga oppdelingen i mindre oppgaver og milepæler oss bedre oversikt over fremdriften og gjorde arbeidet mer håndterlig. Vi har også erfart at sprintens omfang må tilpasses gruppas tilgjengelige kapasitet. Med tre gruppemedlemmer og andre studieforpliktelser har vi måttet prioritere mellom utvikling, testing og dokumentasjon, og vi har kommet kortere i produktutviklingen enn vi opprinnelig ønsket.

Et konkret eksempel på utfordringer med oppgavefordelingen oppstod da frontend- og backend-arbeidet stoppet opp fordi vi hadde ulike forventninger til hvem som skulle levere hva først. Dette ble oppdaget under et av våre ukentlige scrum-møter, der vi avklarte ansvaret og delte arbeidet opp i tydeligere oppgaver (Issue #70 og #72–74). Etter avklaringen kom vi videre samme dag. Vi har ellers hatt god erfaring med å arbeide sammen i samme rom, der vi raskt kunne diskutere problemer og løsninger, og senere videreføre kommunikasjonen gjennom Teams. Gruppa har også vært åpne om kapasitet og utfordringer, slik at oppgaver kunne overtas av andre ved behov. Denne arbeidsformen har fungert godt, men vi ser samtidig at flere beslutninger burde vært dokumentert i GitHub Issues for å gjøre dem lettere å følge opp i ettertid.

## 6.2 Læringspunkter og forbedringstiltak

En viktig erfaring fra sprinten er at det ble lettere å samarbeide om kvalitetssikring etter hvert som vi fikk en prototype som kunne testes. I starten var det vanskeligere å vurdere hverandres arbeid, mens en fungerende demonstrasjon gjorde det mulig å gi mer konkrete tilbakemeldinger på både funksjonalitet og brukergrensesnitt. Vi har også fått erfaring med branches, pull requests og automatiserte tester, men kompetansen på de ulike delene av utviklingsarbeidet er fortsatt noe ulikt fordelt. Ikke alle har hatt like god innsikt i hva de automatiserte testene kontrollerer. En felles gjennomgang av testene og CI-resultatene vil derfor kunne gjøre flere i gruppa i stand til å delta i kvalitetssikringen og redusere avhengigheten av enkeltpersoner.

Vi tar særlig med oss betydningen av tydeligere oppgavefordeling og realistisk planlegging. Vi erfarte blant annet at enkelte Issues ble for omfattende. I Issue #121 hadde vi samlet flere forbedringer i én oppgave, noe som gjorde det vanskeligere å markere arbeidet som ferdig selv om deler av endringene allerede var testet og integrert i `main`. I det videre arbeidet ønsker vi derfor å dele større oppgaver opp i mindre, mer avgrensede Issues, slik at hver endring lettere kan utvikles, testes og ferdigstilles separat. Vi ønsker også å beholde mindre milepæler og bli flinkere til å dokumentere viktige avklaringer direkte i GitHub. Selv om KI kan hjelpe oss med å utarbeide oppgaver, må vi selv kontrollere at ansvar, rekkefølge og avhengigheter er forståelige. Samtidig vil vi videreføre arbeidsformen med ukentlige scrum-møter, løpende kommunikasjon og bruk av branches og pull requests.

*** Bekreft hvilke konkrete forbedringstiltak gruppa har sluttet seg til i retrospektivet, og hvem som skal følge dem opp.

# 7. Oppsummering og veien videre

## 7.1 Hva vi har lært

Arbeidet med Deliverable 3 har gitt oss erfaring med å gå fra produktvisjon og planlegging til en prototype som kan demonstreres og testes. Vi har utviklet flere sentrale funksjoner og fått erfaring med hvordan GitHub, automatiserte tester og brukertesting kan brukes som en del av en smidig utviklingsprosess.

Brukertestingen har vist oss hvor viktig det er å se løsningen fra brukerens perspektiv. Selv om funksjoner er utviklet og fungerer teknisk, betyr ikke det nødvendigvis at de er enkle å finne eller forstå. Vi har også erfart at det er viktig å skille mellom funksjonalitet som er implementert og testet, og det som faktisk er tilgjengelig i den publiserte prototypen.

Gjennom sprinten har vi fått bedre forståelse for betydningen av tydelig oppgavefordeling, mindre og mer avgrensede oppgaver og jevnlig kommunikasjon. Erfaringene har gitt oss et bedre grunnlag for å planlegge og prioritere det videre utviklingsarbeidet.

## 7.2 Veien videre

På vårt ukentlige scrum-møte diskuterte vi hvordan vi ønsker å videreutvikle Stadionhopper etter Deliverable 3. Vi ble enige om å prioritere et mer gjennomarbeidet design og en tydeligere brukerreise, slik at løsningen blir enklere å navigere i og mer attraktiv å bruke. Dette bygger videre på tilbakemeldingene fra brukertestingen, der flere etterlyste et tydeligere visuelt uttrykk og forbedringer i navigasjonen.

Vi ønsker også å utforske muligheter for å gjøre Stadionhopper mer interessant og skille plattformen fra andre løsninger. En idé er at brukerne selv kan bidra med kampinformasjon, men vi har foreløpig ikke bestemt oss for hvilken funksjon eller hvilket konsept vi vil prioritere. Vi ønsker å undersøke hva som faktisk vil gi brukerne verdi før vi tar en endelig beslutning.

Videre må vi arbeide med begrensningene i den publiserte prototypen, særlig muligheten for å lagre brukerdata. Samtidig ønsker vi å videreføre arbeidsformen med GitHub Issues, branches, pull requests og automatiserte tester, og bruke erfaringene fra denne sprinten til å forbedre planleggingen og samarbeidet.
