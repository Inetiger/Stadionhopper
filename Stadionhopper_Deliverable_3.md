# Deliverable 3 – Increment Review and Working Prototype

Stadionhopper  
IBE205 – Høgskolen i Molde

Skrevet av:

Line Lyngsnes Johansen

Ine Nybø Botterli

Inger Videm

# 1. Innledning

## 1.1 Formål og utgangspunkt

I denne leveransen har vi gått fra planlegging av Stadionhopper til utvikling og utprøving av en prototype. Formålet har vært å undersøke hvordan vi kan omsette produktvisjonen til en fungerende løsning, samtidig som vi får erfaring med smidig utvikling, testing, versjonskontroll og kontinuerlig integrasjon (CI).

Deliverable 3 bygger på produktvisjonen fra Deliverable 1 og brukerundersøkelsen, produktbackloggen, arkitekturen og wireframes fra Deliverable 2. Her beskriver vi hva vi har utviklet, hvordan løsningen er testet, og hva vi har lært.

## 1.2 Sprintmål og avgrensning

Oppgaveteksten legger vekt på utvikling av en fungerende prototype, automatiserte tester og etablering av en enkel CI/CD-prosess gjennom GitHub. Innlogging, brukerprofiler, stadioninnsjekking og sosial feed trekkes frem som aktuelle funksjoner, men hovedvekten ligger også på å få erfaring med utviklingsprosessen og samarbeidet i teamet.

Vi tok utgangspunkt i prioriteringene fra Deliverable 2 og organiserte utviklingsarbeidet gjennom oppgaver og milepæler i GitHub. Vi satte opp fire milepæler: en testbar prototype innen 20. oktober, tilbakemeldinger fra brukertesting innen 22. oktober, revidert kode og ferdigstilt rapport innen 27. oktober og innlevering 28. oktober. Dette ga oss en plan for når ulike deler av arbeidet skulle være gjennomført og vi kunne jobbe agilt med litt om gang uten å få for mye på slutten av sprinten. Etter hvert som prototypen tok form, ble det tydelig at vi måtte prioritere mellom å utvikle ny funksjonalitet og å forbedre det som allerede var laget. Etter tilbakemelding fra faglærer fikk vi også større oppmerksomhet på å demonstrere en sammenhengende brukerreise. Arbeidet med kalendervisningen og tilbakemeldingene fra brukertestene har vært en del av denne videreutviklingen. 

# 2. Prototypen og utviklingsarbeidet

## 2.1 Prioriteringer fra tidligere leveranser

I den første brukerundersøkelsen svarte 19 personer. Ni av disse vurderte det å finne kommende kamper som den viktigste funksjonen. Dette bidro til at kampoversikten ble prioritert som en sentral del av MVP-en. Produktvisjonen handler om å senke terskelen for å oppdage og delta på lokale fotballkamper.

Brukerprofiler, kampbesøk og sosiale funksjoner ble vurdert opp mot tilgjengelig tid, tekniske utfordringer og hva vi kunne demonstrere og teste.

## 2.2 Prototypens funksjonalitet og brukerreise

Vi har utviklet en nettbasert prototype av Stadionhopper med utgangspunkt i produktbackloggen og wireframes fra Deliverable 2. Prototypen er bygget med HTML, CSS og JavaScript i frontend og Node.js i backend. Kampoversikten har fått en sentral plass i løsningen. Brukeren kan se kamper i en kalendervisning og velge en kamp for å få mer informasjon om blant annet lag, tidspunkt og stadion. Dette gir en enkel brukerreise fra å oppdage en kamp til å finne informasjon som kan være relevant for å dra på den. Vi har også arbeidet med å gjøre det lettere å skille mellom tidligere og kommende kamper.

Gjennom tilbakemeldinger fra faglærer og brukertesting ble vi mer oppmerksomme på betydningen av en sammenhengende brukerreise. Vi erfarte at det ikke nødvendigvis er tilstrekkelig å utvikle flere funksjoner dersom det er uklart hvordan brukeren skal navigere mellom dem. Derfor har vi begynt å prioritere forbedringer i navigasjon, presentasjon av kampinformasjon og visuell utforming. Prototypen har dermed også fungert som et utgangspunkt for å undersøke hvordan brukerne opplever løsningen, og hvilke forbedringer som bør prioriteres videre.

## 2.3 Backend og øvrige funksjoner

Backend håndterer autentisering, brukerøkter, kampdata og innsjekkinger. Samspillet mellom frontend og backend testes i et eget testmiljø, blant annet ved at et kampbesøk lagres i en JSON-fil og vises i profilhistorikken.

Vi har publisert en [demonstrasjonsversjon av Stadionhopper](https://inetiger.github.io/Stadionhopper/) som kan brukes direkte i nettleseren. Lenken viser den oppdaterte demoen, ikke den tidligere versjonen som ble brukt i brukertestingen. Her kan brukerne utforske kampoversikten, logge inn med felles testkontoer, se sin egen profil og prøve stadioninnsjekking og sosial feed. Demoen bruker fiktive data og lokal nettleserlagring, og kjører ikke Node.js-backenden. Data deles ikke mellom ulike brukeres nettlesere. Det gjenstår arbeid med felles lagring og sosiale funksjoner.

# 3. Testing og kvalitetssikring

## 3.1 Teststrategi

Vi har kombinert automatiserte tester med brukertesting for å undersøke både teknisk funksjonalitet og brukervennlighet. Automatiserte tester kan oppdage feil etter kodeendringer, mens brukertesting gir innsikt i om personer utenfor prosjektgruppen finner og forstår funksjonene. Vi ønsket å involvere brukere som ikke kjente løsningen fra før, fordi vi som utviklere allerede visste hvordan den var bygget opp.

## 3.2 Automatiserte tester

Prosjektet inneholder automatiserte tester for frontend og backend, blant annet autentisering, brukerøkter, tilgangskontroll, kampinformasjon og innsjekking. De kan kjøres med kommandoen `node --test test/*.test.js` og er knyttet til CI-prosessen gjennom GitHub Actions.

En integrasjonstest gjennomfører innlogging med en testbruker, kontrollerer at det opprettes en gyldig brukerøkt, og at økten avsluttes ved utlogging. En annen kontrollerer innsjekkingsprosessen fra valg av kamp til lagring i en JSON-fil og visning i profilhistorikken. Et eksempel på hvordan testene avdekket problemer, er beskrevet i kapittel 4.2.

## 3.3 Gjennomføring av brukertest

Vi inviterte åtte personer til å teste den publiserte prototypen og fikk syv svar. Testpersonene fikk konkrete oppgaver som blant annet gikk ut på å finne en kamp, finne et arrangement, lokalisere kartfunksjonen og finne hvor de ville logget ut. De ble også bedt om å vurdere hvor enkelt det var å navigere og komme med forslag til forbedringer. Testingen ble gjennomført uten at vi forklarte hvor de ulike funksjonene lå, slik at vi kunne undersøke om brukerne fant frem på egen hånd. Brukertestingen var begrenset til funksjonene som var tilgjengelige gjennom GitHub Pages på testtidspunktet. Denne versjonen gjorde det mulig å navigere og se eksisterende informasjon, men ikke lagre nye brukeropplysninger. Demoen er senere utvidet med testinnlogging og lokal lagring, som beskrevet i kapittel 2.3. Resultatene fra brukertestingen bekrefter derfor ikke funksjonaliteten som ble lagt til etter testen. Oppgaven om utlogging undersøkte derfor bare om testpersonene fant riktig sted i grensesnittet, ikke om selve utloggingsfunksjonen virket. Testgruppen var liten og bestod av personer vi selv inviterte. Resultatene kan derfor ikke regnes som representative for hele målgruppen, men ga oss likevel nyttig innsikt i hvordan prototypen ble oppfattet.

## 3.4 Resultater fra brukertestingen

Flere av testpersonene opplevde løsningen som enkel å forstå og navigere i, og de fant i stor grad frem til oppgavene de skulle løse. En av testpersonene fremhevet det enkle grensesnittet som positivt, fordi løsninger med mange valg kan oppleves som slitsomme. Samtidig fikk vi flere konkrete forslag til forbedringer, særlig knyttet til design, navigasjon og presentasjon av kampinformasjon. Flere ønsket mer farger og et tydeligere fotballpreg. Det ble blant annet foreslått å bruke hjemmelagets klubbfarger for å skille mellom kamper, samt mykere kanter og tydeligere visuelle skiller. Andre tilbakemeldinger handlet om begrepsbruk og navigasjon. En testperson opplevde forskjellen mellom «Sosial» og «Treff» som uklar, mens en annen stilte spørsmål ved betydningen av «Mine innsjekkinger». Navigasjonsmenyen nederst ble også beskrevet som lite intuitiv. Når det gjaldt kampinformasjon, ble det påpekt at klokkeslett ikke trenger å vises med sekunder. Det kom også spørsmål om behovet for knappen «Last kampene på nytt» og om tidligere kamper burde vises. En testperson ønsket dessuten at kampene skulle presenteres i en kalender. Tilbakemeldingene viste oss at funksjoner kan være tilgjengelige uten at brukerne nødvendigvis forstår hensikten med dem.

## 3.5 Fra tilbakemeldinger til forbedringer

Etter brukertestingen dokumenterte vi resultatene i Issue #62 og prioriteringene i #63. Vi opprettet forbedringsoppgaver for navigasjon og begrepsbruk (#118), visuell utforming (#119), kalenderoversikt (#120) og kampinformasjon (#121).

I Issue #121 fjernet vi unødvendige sekunder fra klokkeslett og ga tidligere kamper en annen bakgrunnsfarge, slik at de lettere kunne skilles fra kommende kamper. Ikke alle forbedringsforslagene er gjennomført; de resterende følges opp i videre utvikling.

# 4. GitHub, samarbeid og kontinuerlig integrasjon

## 4.1 Versjonskontroll og samarbeid

GitHub Issues har blitt brukt til å beskrive oppgaver, fordele ansvar og dokumentere fremdrift. Etter brukertestingen opprettet vi nye Issues og justerte prioriteringene. Endringer ble i hovedsak utviklet i egne branches og integrert i `main` gjennom pull requests. Dette gjorde det mulig å arbeide parallelt og følge endringene i ettertid.

Vi har gjennomgått pull requests hovedsakelig ved å lese beskrivelsene og kontrollere resultatene fra automatiserte tester. Vi har i stor grad støttet oss på testene fremfor å gjennomgå all kode i detalj. Denne arbeidsformen har gitt en viss kontroll, men grundigere kodegjennomgang kunne bidratt til bedre felles forståelse av løsningen.

## 4.2 Kontinuerlig integrasjon (CI)

GitHub Actions kontrollerer JavaScript-syntaks og kjører automatiserte tester ved pull requests og push til `main`. Dette gjør det mulig å kontrollere kodeendringer før integrering og hovedversjonen etterpå. Oppsettet ble fulgt opp gjennom Issue #61, og workflow-filen ligger i `.github/workflows/ci.yml`.

I Issue #121 viste GitHub Actions at to av 41 tester feilet etter en endring i kalendervisningen. Feilene var knyttet til måten en CSS-klasse ble lagt til på, og hvordan dette fungerte med testoppsettet. Etter justering og en ny commit bestod alle 41 testene, og endringene ble integrert i `main`. Erfaringen viser hvordan CI kan avdekke problemer før endringer blir del av hovedversjonen.

Demoen publiseres gjennom GitHub Pages. Actions-historikken viser at `pages build and deployment` kjører separat fra CI-workflowen. Publisering bekrefter derfor ikke i seg selv at CI har bestått. Pages leverer frontend, ikke Node.js-backenden. Eksempler på separate kjøringer for samme oppdatering av `main` er [CI](https://github.com/Inetiger/Stadionhopper/actions/runs/40561112627) og [Pages-publisering](https://github.com/Inetiger/Stadionhopper/actions/runs/40561112107).

## 4.3 DORA og måling av utviklingsprosessen

Vi bruker data fra GitHub til å undersøke utviklingsprosessen. DORA vektlegger både hastighet og stabilitet gjennom målinger av leveringsfrekvens, tid fra kodeendring til levering, andel leveranser som fører til feil og tid til gjenoppretting etter en mislykket leveranse. Målet er å bruke dataene til forbedring, ikke først og fremst å oppnå bestemte tall.

## 4.4 Resultater fra DORA-målingene

Vi brukte et automatisert verktøy til å hente målinger fra GitHub-historikken. `data.yaml` rapporterte følgende:

| Måling | Rapportert resultat |
|---|---:|
| Releases | 55 |
| Feature releases | 2 |
| Bugfix releases | 6 |
| Hotfix releases | 0 |
| Releases uten bugs | 55 |
| Gjennomsnittlige features per release | 0,04 |
| Gjennomsnittlige bugs per release | 0,11 |

Tallene må tolkes med forsiktighet. `release.yaml` inneholder bare én release, datert 27. oktober 2026, med 2 features og 6 bugs. Dette samsvarer ikke umiddelbart med totalsummene i `data.yaml`. Klassifiseringen må derfor kvalitetssikres. Seks bugfix releases kan heller ikke uten videre tolkes som seks produksjonsfeil.

Filene alene viser ikke pålitelig hvor ofte prototypen ble publisert, tiden fra kodeendring til levering eller gjenoppretting etter produksjonsfeil. Vi må skille mellom commits, merge til `main`, faktiske publiseringer og feil etter publisering før vi kan beregne dette.

# 5. Sprint Review

## 5.1 Gjennomgang av sprintresultatet

I løpet av sprinten har vi utviklet en nettbasert prototype av Stadionhopper med kampoversikt, kalender og kampdetaljer som sentrale deler av løsningen. Vi har også arbeidet med innlogging, brukerprofiler, stadioninnsjekking og sosiale funksjoner. Den publiserte demonstrasjonen gir brukerne mulighet til å utforske flere av disse funksjonene gjennom felles testkontoer og fiktive eksempeldata. Innsjekkinger lagres foreløpig lokalt i nettleseren og vises i profilhistorikken og feeden der. Feeden inneholder også eksempelinnlegg, men demonstrerer ikke deling av aktivitet mellom ulike brukeres nettlesere. Prototypen demonstrerer dermed flere deler av konseptet, men mangler fortsatt blant annet varig lagring av brukerdata og full funksjonalitet for sosial samhandling.

Vi gjennomførte en kort felles gjennomgang av prototypen og vurderte resultatet opp mot planene fra Deliverable 2. Vi vurderer at vi har fått på plass en prototype som demonstrerer sentrale deler av konseptet, men at det fortsatt gjenstår utviklingsarbeid før løsningen fungerer som en helhetlig plattform. En del av sprinten har gått med til å etablere arbeidsprosessen og sette oss inn i verktøyene, noe som har begrenset tiden til produktutvikling. Samtidig har vi fått erfaring med GitHub, automatiserte tester og brukertesting, som også har vært viktige deler av sprintmålet.

## 5.2 Tilbakemeldinger og videre prioriteringer

På vårt ukentlige scrum-møte diskuterte vi resultatene og videre arbeid. Vi ble enige om å prioritere et mer gjennomarbeidet design og en tydeligere brukerreise. Brukertestingen viste at eksisterende funksjoner må være forståelige, og at flere funksjoner ikke nødvendigvis bør prioriteres først.

Vi ønsker også å undersøke om brukerne selv kan registrere kamper og eventuelt oppdatere scoringer eller annen kampinformasjon. Dette er foreløpig ikke besluttet, og vi må undersøke nærmere hva som vil gi brukerne størst verdi.

# 6. Sprint Retrospective

## 6.1 Samarbeid og erfaringer fra sprinten

I denne sprinten har vi brukt GitHub til å organisere utviklingsarbeidet og fordele oppgaver mellom frontend, backend, testing og brukerundersøkelse. Vi opplevde at det tok mye tid å sette oss inn i oppgaven, etablere en plan og opprette Issues. Den opprinnelige oppgaveinndelingen ble utarbeidet med hjelp fra KI, men viste seg ikke alltid å samsvare med hvordan arbeidet faktisk måtte gjennomføres. Enkelte oppgaver blandet frontend og backend, og avhengighetene mellom dem var ikke alltid tydelige. Dette skapte behov for avklaringer underveis. Samtidig ga oppdelingen i mindre oppgaver og milepæler oss bedre oversikt over fremdriften og gjorde arbeidet mer håndterlig. Vi har også erfart at sprintens omfang må tilpasses gruppas tilgjengelige kapasitet. Med tre gruppemedlemmer og andre studieforpliktelser har vi måttet prioritere mellom utvikling, testing og dokumentasjon, og vi har kommet kortere i produktutviklingen enn vi opprinnelig ønsket.

Et konkret eksempel på utfordringer med oppgavefordelingen oppstod da frontend- og backend-arbeidet stoppet opp fordi vi hadde ulike forventninger til hvem som skulle levere hva først. Dette ble oppdaget under et av våre ukentlige scrum-møter, der vi avklarte ansvaret og delte arbeidet opp i tydeligere oppgaver (Issue #70 og #72–74). Etter avklaringen kom vi videre samme dag. Vi har ellers hatt god erfaring med å arbeide sammen i samme rom, der vi raskt kunne diskutere problemer og løsninger, og senere videreføre kommunikasjonen gjennom Teams. Gruppa har også vært åpne om kapasitet og utfordringer, slik at oppgaver kunne overtas av andre ved behov. Denne arbeidsformen har fungert godt, men vi ser samtidig at flere beslutninger burde vært dokumentert i GitHub Issues for å gjøre dem lettere å følge opp i ettertid.

## 6.2 Læringspunkter og forbedringstiltak

En viktig erfaring fra sprinten er at det ble lettere å samarbeide om kvalitetssikring etter hvert som vi fikk en prototype som kunne testes. I starten var det vanskeligere å vurdere hverandres arbeid, mens en fungerende demonstrasjon gjorde det mulig å gi mer konkrete tilbakemeldinger på både funksjonalitet og brukergrensesnitt. Vi har også fått erfaring med branches, pull requests og automatiserte tester, men kompetansen på de ulike delene av utviklingsarbeidet er fortsatt noe ulikt fordelt. Ikke alle har hatt like god innsikt i hva de automatiserte testene kontrollerer. En felles gjennomgang av testene og CI-resultatene vil derfor kunne gjøre flere i gruppa i stand til å delta i kvalitetssikringen og redusere avhengigheten av enkeltpersoner.

Vi tar særlig med oss betydningen av tydeligere oppgavefordeling og realistisk planlegging. Vi erfarte blant annet at enkelte Issues ble for omfattende. I Issue #121 hadde vi samlet flere forbedringer i én oppgave, noe som gjorde det vanskeligere å markere arbeidet som ferdig selv om deler av endringene allerede var testet og integrert i `main`. I det videre arbeidet ønsker vi derfor å dele større oppgaver opp i mindre, mer avgrensede Issues, slik at hver endring lettere kan utvikles, testes og ferdigstilles separat. Vi ønsker også å beholde mindre milepæler og bli flinkere til å dokumentere viktige avklaringer direkte i GitHub. Selv om KI kan hjelpe oss med å utarbeide oppgaver, må vi selv kontrollere at ansvar, rekkefølge og avhengigheter er forståelige. Samtidig vil vi videreføre arbeidsformen med ukentlige scrum-møter, løpende kommunikasjon og bruk av branches og pull requests.

På bakgrunn av retrospektivet konkretiserer vi forbedringstiltakene slik:

- **Dele opp store oppgaver:** Når en Issue inneholder flere uavhengige endringer, deler vi den opp i mindre Issues med tydelige akseptansekriterier. Den som har ansvar for oppgaven, følger opp at deloppgavene blir opprettet og oppdatert.
- **Avklare ansvar og avhengigheter tidligere:** På de ukentlige scrum-møtene avklarer vi hvem som gjør hva, hva arbeidet avhenger av, og hva som må være ferdig først. Oppsummeringen dokumenteres i relevante GitHub Issues.
- **Gjennomgå tester og CI sammen:** Gruppen setter av tid til å gå gjennom testene og resultatene fra GitHub Actions, slik at flere forstår hva som kontrolleres og kan bidra i kvalitetssikringen.
- **Beholde branches og pull requests:** Endringer utvikles i egne branches og foreslås gjennom pull requests, med en kort beskrivelse av endringen og kontroll av relevante tester før integrering.

Tiltakene følges opp av gruppa i fellesskap. For hver konkret Issue skal ansvarlig person fremgå av oppgaven i GitHub, slik at det er tydelig hvem som driver arbeidet videre. Vi har ikke fordelt alle tiltakene på navngitte personer i denne rapporten; det må avklares i gruppa og dokumenteres i GitHub før oppgavene gjennomføres.

# 7. Oppsummering og veien videre

## 7.1 Hva vi har lært

Arbeidet har gitt oss erfaring med å utvikle og teste en prototype og etablere en smidig arbeidsprosess. Brukertestingen viste at teknisk fungerende funksjoner ikke nødvendigvis er enkle å finne eller forstå. Vi må også skille mellom det som er testet i utviklingsmiljøet og det som er tilgjengelig i demoen. Tydelige avhengigheter, avgrensede oppgaver og jevnlig kommunikasjon har vært viktige for fremdriften.

## 7.2 Veien videre

Vi vil forbedre design og brukerreise ut fra testfunnene, og undersøke verdien av nye funksjoner før vi prioriterer dem. Videre må vi arbeide med felles lagring og begrensningene i den publiserte prototypen. Erfaringene tas med til neste sprint gjennom tiltakene i kapittel 6.2.
