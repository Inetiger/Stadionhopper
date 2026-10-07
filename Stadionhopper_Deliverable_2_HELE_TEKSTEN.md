Stadionhopper

Deliverable 2

Architecture

Av:

Ine Nybø Botterli

Inger Videm

Line Lyngsnes Johansen

Høgskolen i Molde

# 1. Innledning og status siden Deliverable 1

Stadionhopper er en digital plattform som skal gjøre det enklere å
oppdage og delta på lokale fotballkamper. I Deliverable 1 utviklet
gruppa en produktvisjon, identifiserte målgruppe og interessenter og
utarbeidet en første MVP og prioritert produktbacklog. Dette ga et
utgangspunkt for det videre arbeidet med prosjektet.

Etter første innlevering har gruppen arbeidet videre med å undersøke
antakelsene som lå til grunn for produktet. Det er gjennomført en
brukerundersøkelse og innhentet tilbakemelding fra Nordmøre og Romsdal
Fotballkrets. Denne innsikten brukes til å vurdere og justere tidligere
prioriteringer.

I Deliverable 2 flyttes fokuset videre mot planlegging av løsningen. Med
utgangspunkt i den oppdaterte produktbackloggen arbeider gruppen med
domenemodell, systemarkitektur, wireframes og sprintplanlegging, samt
Git-workflow og CI/CD-strategi. Målet er å etablere et grunnlag for det
videre arbeidet med Stadionhopper, samtidig som løsningen og
prioriteringene fortsatt kan endres etter hvert som gruppa får ny
kunnskap.

# 2. Innsikt fra interessenter og brukere

Etter første innlevering ønsket vi å undersøke noen av antakelsene som
lå til grunn for produktvisjonen og MVP-en. Det ble derfor tatt kontakt
med Nordmøre og Romsdal Fotballkrets og en gjort brukerundersøkelse
blant potensielle brukere.

## 2.1 Dialog med Nordmøre og Romsdal Fotballkrets

Som del av det videre arbeidet med Stadionhopper har vi hatt kontakt
med Rune fra Nordmøre og Romsdal Fotballkrets. Han bekreftet at
kampinformasjon allerede er tilgjengelig gjennom fotball.no, men påpekte
at det ikke nødvendigvis er enkelt å hente ut oppdaterte data,
eksempelvis fortløpende skåringsoppdateringer. Han trakk også frem at
kart over stadioner allerede finnes, men at det er muligheter for å
tilby mer informasjon om de enkelte stadionene. Han stiller også
spørsmål rundt om det kan være variasjoner i hva den enkelte bruker vil
ha i en app avhengig av alder.

Tilbakemeldingen viser at Stadionhopper bør tilby noe utover
informasjonen som allerede finnes. Mer informasjon om stadionene,
kombinert med kampinformasjon og muligheten til å registrere egne
stadioninnsjekk, kan være en slik merverdi. Den tekniske usikkerheten
knyttet til tilgang på kampdata bør undersøkes videre.

## 2.2 Brukerundersøkelse

For å få mer kunnskap om potensielle brukeres behov og interesser ble
det gjennomført en digital brukerundersøkelse. Undersøkelsen omfattet
blant annet fotballinteresse, hvor ofte respondentene besøker lokale
fotballkamper, hva som hindrer eller motiverer dem til å gå oftere på
kamp, og hvilke funksjoner de ville vært mest interessert i i
Stadionhopper. Totalt svarte 19 personer på undersøkelsen.

Utvalget er begrenset, og resultatene kan derfor ikke generaliseres til
hele målgruppen. Undersøkelsen brukes i stedet som en tidlig indikasjon
på potensielle brukeres behov og prioriteringer, og som grunnlag for
videre utvikling og testing av Stadionhopper.

Et tydelig funn er betydningen av å kunne finne lokale kamper. Flere
respondenter oppga at bedre oversikt over kommende kamper kunne motivere
dem til å gå på flere lokale fotballkamper. Flere oppga også at de ikke
vet når eller hvor kampene spilles. Da respondentene måtte velge én
funksjon som den viktigste, valgte 9 av 19 «Finne kommende kamper».

Undersøkelsen viser også at fotballinteresse ikke nødvendigvis fører til
hyppige besøk på lokale kamper. Flere respondenter med høy
fotballinteresse oppga at de sjelden besøker lokale fotballkamper. Dette
samsvarer med målgruppen fra første innlevering, hvor vi særlig rettet
oss mot personer som er interessert i fotball, men som i liten grad
oppsøker lokale kamper.

Svarene knyttet til sosiale funksjoner og konkurranse var mer varierte.
Flere oppga at venner eller familie kunne motivere dem til å gå på kamp,
mens interessen for funksjoner knyttet til blant annet konkurranse og
stadioninnsjekk var mindre entydig.

## 2.3 Viktigste funn og konsekvenser for MVP-en

Tilbakemeldingene fra fotballkretsen og brukerundersøkelsen peker samlet
mot at det å gjøre lokale kamper enklere å oppdage er en relevant del av
Stadionhopper. Samtidig finnes mye av kampinformasjonen allerede på
fotball.no. Stadionhopper bør derfor tilby mer enn en tradisjonell
kampoversikt. Kart og informasjon om stadioner, kombinert med
kampinformasjon og muligheten til å registrere egne stadioninnsjekk, kan
være en slik merverdi.

Resultatene gir ikke grunnlag for en omfattende endring av MVP-en fra
første innlevering, men bidrar til å tydeliggjøre prioriteringene.
Muligheten til å finne kommende lokale kamper og se hvor de spilles
beholdes som en sentral del av løsningen. Personlig registrering av
besøkte kamper og stadioner beholdes også, mens mer omfattende sosiale
funksjoner og konkurranseelementer fortsatt prioriteres lengre ned på
listen.

Dialogen med fotballkretsen har i tillegg synliggjort en teknisk
avhengighet knyttet til tilgang på kampdata. Dette må undersøkes videre
i arbeidet med systemarkitekturen. Den første versjonen av Stadionhopper
bør derfor ikke være avhengig av sanntidsdata for å kunne utvikles og
testes.

# 3. Oppdatert produktbacklog og prioriteringer

## 3.1 Prioritert backlog

På bakgrunn av innsikten fra brukerundersøkelsen og dialogen med
Nordmøre og Romsdal Fotballkrets er produktbackloggen revurdert.
Hovedtrekkene i MVP-en fra Deliverable 1 beholdes, men prioriteringene
er tydeliggjort. Produktbackloggen prioriteres fortsatt etter
MoSCoW-metoden.

### Must have

I den første versjonen skal Stadionhopper ha enkel innlogging og
brukerprofil, oversikt over kommende lokale kamper og kart over lokale
stadioner. Brukeren skal kunne se grunnleggende informasjon om kampene,
som lag, dato, tidspunkt og stadion. Det skal også være mulig å registrere 
innsjekkinger og få en personlig historikk over registrerte kamper og stadioner.

Disse funksjonene utgjør kjernen i MVP-en. Brukerundersøkelsen styrker
særlig prioriteringen av oversikten over kommende lokale kamper, mens
registrering og historikk skal bidra til at Stadionhopper tilbyr noe mer
enn en vanlig kampoversikt.

### Should have

Mulighet til å filtrere kamper etter dato og område prioriteres som
Should have. Det samme gjelder mer informasjon om de enkelte stadionene.
Disse funksjonene kan gjøre det enklere å finne relevante kamper og gi
merverdi sammenlignet med eksisterende løsninger, men er ikke nødvendige
for å teste kjernefunksjonene i MVP-en.

### Could have

Funksjoner som å finne og følge andre brukere, digitale merker og
milepæler samt konkurranser og topplister prioriteres som Could have.
Brukerundersøkelsen viser interesse for enkelte av disse funksjonene,
men svarene er mer varierte enn for kampoversikten. De kan derfor
vurderes senere dersom utviklingskapasiteten tillater det.

### Won't have i første versjon

Mer omfattende sosial funksjonalitet, som meldinger og sosial feed, tas
ikke med i første versjon. Sanntidsresultater prioriteres heller ikke.
Dette bidrar til å begrense omfanget av MVP-en, samtidig som dialogen
med fotballkretsen har vist at tilgang til sanntidsdata kan være teknisk
utfordrende.

## 3.2 User stories og acceptance criteria

På bakgrunn av den oppdaterte prioriteringen er det utarbeidet user
stories og acceptance criteria for de sentrale funksjonene i MVP-en.

Finne kommende lokale kamper

User story: Som en fotballinteressert bruker ønsker jeg å se kommende
lokale fotballkamper, slik at jeg enkelt kan finne en kamp jeg kan dra
på.

**Acceptance criteria:**

- Brukeren skal kunne se en oversikt over kommende kamper.

- Hver kamp skal vise lag, dato og tidspunkt.

- Hver kamp skal være knyttet til et stadion.

- Brukeren skal kunne åpne en kamp for å se mer informasjon.

Finne stadion

User story: Som bruker ønsker jeg å se lokale stadioner på et kart, slik
at jeg kan finne ut hvor kampene spilles.

**Acceptance criteria:**

- Stadioner skal vises på et kart.

- Brukeren skal kunne velge et stadion.

- Stadionet skal vise navn og plassering.

- Brukeren skal kunne se relevante kamper knyttet til stadionet.

Registrere kamp- og stadioninnsjekk

User story: Som registrert bruker ønsker jeg å registrere en kamp jeg
har vært på, slik at jeg kan samle mine kamp- og stadioninnsjekk.

**Acceptance criteria:**

- Brukeren må være innlogget for å registrere et innsjekk.

- Brukeren skal kunne registrere en kamp som innsjekket.

- Registreringen skal lagres på brukerens profil.

- Stadionet som er knyttet til kampen skal inngå i brukerens
  innsjekking historikk.

Se personlig historikk

User story: Som registrert bruker ønsker jeg å se mine tidligere kamp-
og stadioninnsjekk, slik at jeg får en samlet oversikt over opplevelsene
mine.

**Acceptance criteria:**

- Brukeren skal kunne se sine registrerte kamp innsjekk.

- Historikken skal vise hvilken kamp og hvilket stadion som ble innsjekket.

- Historikken skal være knyttet til den innloggede brukeren.

Innlogging og brukerprofil

User story: Som bruker ønsker jeg å kunne opprette en bruker og logge
inn, slik at jeg kan registrere og lagre mine kamp- og stadioninnsjekk.

**Acceptance criteria:**

- Brukeren skal kunne opprette en bruker.

- Brukeren skal kunne logge inn og ut.

- Registrerte innsjekk skal knyttes til riktig bruker.

- Brukeren skal kunne åpne sin egen profil og se sin personlige
  historikk.

# 4. Domenemodell

## 4.1 Sentrale entiteter

Med utgangspunkt i oppgavens krav, produktbackloggen og funksjonaliteten i 
Stadionhopper har vi identifisert syv sentrale domeneentiteter: Bruker, Stadion, 
Klubb, Kamp, Innsjekking, Innlegg og Arrangement.

**Bruker** representerer en 
registrert bruker med profil og historikk. 

**Stadion** representerer et fysisk 
sted hvor kamper og eventuelt arrangementer finner sted. 

**Klubb** representerer 
en fotballklubb som kan delta i flere kamper. 

**Kamp** representerer en konkret 
fotballkamp mellom to klubber på et bestemt tidspunkt og stadion. 

**Innsjekking** 
representerer at en bruker har registrert at han eller hun var til stede på en 
kamp eller et stadion. Innsjekkingen knyttes til brukeren og kampen og brukes 
blant annet til å bygge opp brukerens personlige historikk over kamper og 
stadioner. 

**Innlegg** representerer sosialt innhold publisert av en bruker. 

**Arrangement** representerer et arrangement knyttet til Stadionhopper, et stadion 
eller en kamp. 

Disse syv entitetene danner grunnlaget for domenemodellen og 
beskriver hvordan brukere, kamper, stadioner, klubber, innsjekkinger, innlegg og 
arrangementer henger sammen i Stadionhopper.

## 4.2 Relasjoner mellom entitetene

Entitetene i domenemodellen er knyttet sammen gjennom funksjonene i
Stadionhopper.

Bruker 1 : 0..* Innsjekking
En bruker kan ha null eller mange innsjekkinger.
En innsjekking tilhører nøyaktig en bruker.

Kamp 1 : 0..* Innsjekking
En kamp kan ha null eller mange innsjekkinger, 
siden flere brukere kan registrere at de har vært 
til stede på samme kamp. Hver innsjekking er 
knyttet til en bestemt kamp og en bestemt bruker.

Stadion 1 : 0..* Kamp
En stadion kan ha mange kamper.
En kamp spilles på en stadion.
Hver kamp er knyttet til to klubber, der den ene er 
hjemmelag og den andre er bortelag.

Klubb (hjemmelag) 1 : 0..* Kamp
En klubb kan delta i null eller mange kamper som hjemmelag.

Klubb (bortelag) 1 : 0..* Kamp
En klubb kan delta i null eller mange kamper som bortelag. 

Bruker 1 : 0..* Innlegg
En bruker kan opprette mange innlegg.
Et innlegg opprettes av en bruker.

Stadion 1 : 0..* Arrangement
En stadion kan ha mange arrangement.
Et arrangement gjelder en stadion.

For å unngå unødvendig duplisering av data lagres informasjon om klubber og 
stadioner som egne entiteter, mens en kamp refererer til hvilke klubber og 
hvilket stadion den er knyttet til. Innsjekkinger refererer til både bruker 
og kamp, slik at brukerens historikk kan bygges opp fra registrerte 
innsjekkinger. Dette gjør domenemodellen enklere og reduserer behovet 
for å lagre den samme informasjonen flere steder.

## 4.3 Domenemodell

Domenemodellen nedenfor visualiserer de sentrale entitetene i
Stadionhopper og relasjonene mellom dem. Modellen er avgrenset til
funksjonene som er prioritert i MVP-en.

```
 +-------------+
 |   Bruker    |----
 +-------------+    |
       |            |
      0..*         0..*
       |            |
       v            v
 +-----------+ +---------+
 | Innsjekk  | | Innlegg |
 +-----------+ +---------+
       |
       | 0..*
       v
 +-------------+
 |     Kamp    |
 +-------------+
    ^         ^
    |         |
 hjemmelag bortelag
    |         |
 +------+ +------+
 |Klubb | |Klubb |
 +------+ +------+
     |
     |
     v
 +----------+
 | Stadion  |
 +----------+
      |
     0..*
      |
      v
 +------------+
 |Arrangement |
 +------------+
 ```

*Figur 1: Domenemodell for Stadionhopper.*

# 5. Systemarkitektur

## 5.1 Overordnet arkitektur

Stadionhopper utvikles som en webbasert løsning med en enkel lagdelt
arkitektur. Løsningen består hovedsakelig av et frontend-lag, et backend-lag
og et datalag. Frontend håndterer brukergrensesnittet og presentasjonen av
informasjon, backend håndterer applikasjonslogikk og kommunikasjon mellom
brukergrensesnittet og dataene, mens datalaget brukes til lagring og henting
av data fra filer.

Arkitekturen er valgt for å være enkel å utvikle og tilstrekkelig for MVP-en.
Samtidig gir oppdelingen mellom brukergrensesnitt, logikk og data et grunnlag
for å videreutvikle løsningen dersom funksjonaliteten i Stadionhopper utvides
senere.

> \(Sett inn arkitekturdiagram\)

*Figur X: Overordnet systemarkitektur for Stadionhopper.*

## 5.2 Frontend, backend og database

**Frontend**
Frontend er ansvarlig for brukergrensesnittet i Stadionhopper. Her presenteres
blant annet kommende kamper, stadioninformasjon, kart, innsjekking og brukerens
personlige historikk. Løsningen utvikles som en webapplikasjon ved hjelp av HTML
og CSS, med JavaScript for interaksjon og funksjonalitet.

**Backend**
Backend håndterer applikasjonslogikken og kommunikasjonen mellom frontend og
datalaget. Den har ansvar for å behandle brukerhandlinger og sørge for at data
om blant annet brukere, kamper og innsjekkinger håndteres på en kontrollert måte.

**Database**
Stadionhopper bruker en filbasert dataløsning. Sentrale data lagres i filer som
backend kan lese fra og skrive til. På denne måten kan applikasjonen hente
eksisterende data fra filene og lagre nye eller oppdaterte data etter behov.
Den konkrete organiseringen og navngivningen av filene bestemmes senere i
utviklingen.

## 5.3 Eksterne data og integrasjoner

Stadionhopper kan ha behov for kampdata fra en ekstern kilde som fotball.no. Dette
representerer en ekstern avhengighet som må vurderes dersom kampdata skal hentes
automatisk inn i løsningen.

For MVP-en ønsker vi ikke å være avhengige av sanntidsdata dersom dette gjør
løsningen mer komplisert eller ustabil. Kampdata kan derfor i første omgang
håndteres på en enklere måte. Dersom løsningen videreutvikles, kan integrasjon
mot en ekstern datakilde vurderes på nytt.

## 5.4 Tekniske valg

Valget av teknologi er basert på hva som er gjennomførbart innenfor
prosjektets rammer og gruppens kompetanse. En webbasert løsning er valgt
fremfor en egen mobilapplikasjon fordi dette gir en enklere første implementasjon
og gjør løsningen tilgjengelig uten at brukeren må installere en app.

HTML og CSS brukes til struktur og visuell utforming, mens JavaScript brukes til
funksjonalitet og interaksjon. Som dataløsning brukes en filbasert tilnærming
der backend leser og skriver data direkte til filer. Dette gjør at gruppen kan
ha kontroll over hvordan data lagres uten å være avhengig av en ekstern
databasetjeneste.

Teknologivalgene gjør det mulig å prioritere utvikling av de viktigste
funksjonene i MVP-en fremfor kompleks teknisk infrastruktur.

# 6. Wireframes og brukerflyt

Oppgaven stiller krav om wireframes for sentrale deler av løsningen. Vi vil 
derfor visualisere seks sentrale brukergrensesnitt: login, kampoversikt, 
innsjekking, profil, sosial feed og arrangementer.

De fire første wireframene er direkte knyttet til funksjonaliteten i MVP-en. 
Sosial feed og arrangementer er tatt med for å vise hvordan løsningen kan 
støtte funksjonalitet utover MVP-en. Dette er relevant fordi domenemodellen 
også inneholder entitetene Innlegg og Arrangement, selv om disse funksjonene 
ikke er prioritert for første versjon.

## 6.1 Wireframes

Wireframene viser et forslag til hvordan de sentrale delene av den nettbaserte 
løsningen kan bygges opp. De er basert på brukerhistoriene, MVP-prioriteringene 
og resultatene fra brukerundersøkelsen.

Wireframene er ikke ment som et ferdig visuelt design, men som et verktøy for 
å konkretisere funksjonene og undersøke om brukerflyten er forståelig. De kan 
derfor endres på bakgrunn av diskusjoner i teamet og tilbakemeldinger fra 
potensielle brukere.

De følgende wireframene viser hvordan brukeren kan navigere gjennom de viktigste delene 
av Stadionhopper. Wireframene er basert på brukerhistoriene, MVP-prioriteringene og 
resultatene fra brukerundersøkelsen.

**Login** viser hvordan brukeren logger inn og får tilgang til sin profil.
> \[Sett inn wireframes her\]

**Kampoversikt** viser kommende kamper og gir brukeren mulighet til å finne relevante kamper.
> \[Sett inn wireframes her\]

**Innsjekking** viser hvordan brukeren registrerer at han eller hun har vært til stede på en kamp.
> \[Sett inn wireframes her\]

**Profil** viser brukerens informasjon og personlige historikk over registrerte innsjekkinger.
> \[Sett inn wireframes her\]

**Sosial feed** viser hvordan sosial funksjonalitet kan presenteres dersom dette utvikles senere. 
Funksjonen er ikke prioritert i MVP-en.
> \[Sett inn wireframes her\]

**Arrangementer** viser hvordan arrangementer kan presenteres og knyttes til stadioner eller kamper. 
Også denne funksjonen kan videreutvikles etter MVP-en.
> \[Sett inn wireframes her\]

*Figur X: Wireframes for sentrale deler av Stadionhopper.*

## 6.2 Brukerflyt og designvalg

En sentral brukerreise i Stadionhopper starter med at brukeren åpner kampoversikten 
for å finne en kommende kamp. Brukeren velger en kamp for å se informasjon om 
kampen og hvor den spilles. Deretter kan brukeren se informasjon om stadionet og 
registrere en innsjekking etter å ha vært på kampen. Innsjekkingen blir deretter 
tilgjengelig i brukerens personlige historikk.

Denne brukerreisen viser sammenhengen mellom flere av MVP-funksjonene 
og hvordan funksjonene støtter brukerens hovedbehov: å finne lokale 
fotballkamper, finne riktig stadion og registrere innsjekkinger og se 
hvilke kamper og stadioner brukeren har vært på.

Utformingen av wireframene tar utgangspunkt i innsikten fra
brukerundersøkelsen og prioriteringene i produktbackloggen.
Undersøkelsen viste særlig behov for å gjøre det enkelt å finne kommende
lokale kamper. Derfor bør kampoversikten ha en sentral plass i
løsningen, og brukeren bør enkelt kunne gå videre fra en kamp til
informasjon om hvor den spilles.

Wireframene støtter samtidig den delen av konseptet som skiller
Stadionhopper fra en vanlig kampoversikt. Muligheten til å registrere
innsjekk og senere se disse i en personlig historikk skal derfor
være lett tilgjengelig. Mer omfattende sosiale funksjoner og
konkurranseelementer får mindre plass i denne fasen, i tråd med
prioriteringen av MVP-en.

Designet holdes i første omgang enkelt. Formålet er å teste om
funksjonene og brukerflyten er forståelige, fremfor å bruke mye tid på
detaljer i det visuelle uttrykket før løsningen er testet på brukere.

## 6.3 Plan for brukertesting og tilbakemeldinger

Wireframene skal testes på potensielle brukere for å undersøke om 
de viktigste funksjonene og brukerflyten er forståelige. Testingen 
skal ta utgangspunkt i konkrete oppgaver som å finne en lokal kamp, 
finne ut hvor kampen spilles og registrere en innsjekking.

Under testingen vil vi observere hvordan brukerne navigerer mellom 
kampoversikt, stadioninformasjon, innsjekking og profil/historikk. 
Vi vil også undersøke om brukerne forstår hva de kan gjøre på de ulike 
sidene uten omfattende forklaring.

Tilbakemeldinger fra testingen kan brukes til å justere wireframes, 
brukerhistorier og prioriteringer i produktbackloggen før videre 
utvikling.

Designet er basert på funnene fra brukerundersøkelsen og prioriteringene 
i produktbackloggen. Siden «finne kommende kamper» ble valgt som den 
viktigste funksjonen av flest respondenter, er kampoversikten sentral i 
brukergrensesnittet.

Innsjekking og personlig historikk er også gjort lett tilgjengelig fordi 
disse funksjonene er sentrale for Stadionhoppers hovedidé. Funksjoner 
knyttet til sosial aktivitet og konkurranse er mindre fremtredende i 
MVP-en, siden svarene i undersøkelsen viste større variasjon i interessen 
for disse funksjonene.

Wireframene er derfor utformet med fokus på en enkel brukerreise fra å 
finne en kamp, til å finne stadionet og registrere en innsjekking.

# 7. Sprintplan

Sprintplanen bygger videre på planen fra Deliverable 1, men er justert
på bakgrunn av innsikten vi har fått gjennom brukerundersøkelsen,
dialogen med Nordmøre og Romsdal Fotballkrets og det videre arbeidet med
produktbackloggen. Vi ser på arbeidet fram mot hver innlevering som en
overordnet sprint, samtidig som vi deler arbeidet opp i mindre oppgaver
som kan ferdigstilles fortløpende for å unngå at store deler av arbeidet
blir liggende til slutten av perioden.

## 7.1 Sprintmål og sprint backlog

Målet for sprinten er å etablere det tekniske og visuelle grunnlaget for 
Stadionhopper og gjøre prosjektet klart for videre utvikling av 
MVP-funksjonene. Dette innebærer å ferdigstille sentrale deler av 
domenemodellen, arkitekturen og brukergrensesnittet, samt bryte videre 
utviklingsarbeid ned i konkrete GitHub Issues.

Sprinten skal gi gruppen en felles forståelse av løsningen og gjøre det 
tydelig hvilke oppgaver som må gjennomføres videre for å realisere MVP-en.

Sprint backlog tar utgangspunkt i den prioriterte produktbackloggen og
de sentrale user stories. Vi prioriterer først funksjonene som er
definert som Must have, særlig kampoversikt, stadioninformasjon,
brukerinnlogging, registrering av kamp- og stadioninnsjekk og personlig
historikk.

Arbeidet organiseres gjennom issues i GitHub. Issues prioriteres etter
Must, Should, Could og Won't, slik at det er tydelig hvilke oppgaver som
er viktigst å gjennomføre først. Vi arbeider med relativt små issues
fremfor store oppgaver for å gjøre arbeidet mer oversiktlig og redusere
risikoen for at store mengder arbeid må ferdigstilles og flettes sammen
samtidig.

## 7.2 Arbeidsform og arbeidsfordeling

Arbeidet organiseres gjennom GitHub Issues som beskriver konkrete og 
avgrensede oppgaver. Issues prioriteres etter Must, Should, Could og Won't, 
slik at gruppen til enhver tid vet hvilke oppgaver som er viktigst.

Når et gruppemedlem starter på en oppgave, opprettes en egen branch for denne 
oppgaven. Endringene utvikles og testes i branchen før de merges til main. På 
denne måten holdes arbeid i utvikling adskilt fra hovedversjonen, samtidig som 
det blir enklere å følge opp hvem som arbeider med hva.

Dersom tiden blir knapp, prioriteres Must-oppgavene først, slik at de viktigste 
delene av MVP-en blir ferdigstilt.

## 7.3 Ferdigstilling og oppfølging

Hva som kreves for at en oppgave skal regnes som ferdig, beskrives i den enkelte 
issue. Dette gjør det mulig å tilpasse kriteriene til oppgaven som skal 
gjennomføres, samtidig som det skal være tydelig hva som forventes før en 
issue kan lukkes.

En oppgave regnes som ferdig når oppgaven beskrevet i GitHub Issue er gjennomført, 
løsningen fungerer som forventet og eventuelle feil som er oppdaget er håndtert. 
Endringene skal være lagt i riktig branch og kunne merges til main. Når det er 
relevant, skal et annet gruppemedlem gjennomgå arbeidet før merge. Dokumentasjon 
eller kommentarer oppdateres dersom endringen påvirker hvordan løsningen fungerer.

Fremdriften følges gjennom statusen på issues i GitHub. Ved behov kan 
prioriteringene endres underveis dersom vi får ny kunnskap, møter tekniske 
utfordringer eller ser at kapasiteten er mindre enn forventet. Sprintplanen skal 
dermed fungere som et arbeidsverktøy, samtidig som vi beholder muligheten til å 
justere arbeidet underveis.

# 8. Git-workflow

Vi bruker GitHub til versjonskontroll, oppgaveadministrasjon, samarbeid og kvalitetssikring av dokumentasjon og kode. Hver oppgave kobles til en issue, en arbeidsbranch og en pull request (PR). Dette gjør det mulig å følge hva som skal gjøres, hvilke endringer som er gjort, og hvem som har gjennomgått arbeidet før det inngår i prosjektets felles versjon.

Strategien bygger på små endringer, kortvarige brancher og hyppig sammenfletting. *Accelerate* fremhever kortvarige brancher og hyppig integrering som praksiser for god programvareleveranse (kapittel 4). *Software Engineering at Google* understreker at små, avgrensede endringer gjør gjennomgangen enklere, og at review bidrar til både kvalitetssikring og kunnskapsdeling (kapittel 9). Vi tilpasser disse prinsippene til en studentgruppe som arbeider med flere fag samtidig.

### 8.1 Opprette og velge en oppgave

Arbeidet starter med en issue som beskriver ønsket resultat. Dokumentasjonsoppgaver avgrenses normalt til et kapittel eller delkapittel, mens kodeoppgaver avgrenses til en funksjon, feilretting eller annen konkret endring. Oppgavene prioriteres med Must, Should eller Could. Hver issue skal ha en konkret Definition of Done (DoD). Denne beskriver hva som må være på plass før oppgaven kan godkjennes, og brukes som sjekkliste av både forfatteren og revieweren. Oppgaver skal normalt kunne gjennomføres i én arbeidsøkt. Med arbeidsøkt menes omtrent 2-4 timer, som vi anser som sannsynlig arbeidsmengde når man setter seg ned å jobber men en oppgave som student. Dersom omfanget blir større, deler vi oppgaven i mindre issues med tydelige resultater. Vi følger pull-prinsippet: Den som har kapasitet, tildeler seg selv en tilgjengelig issue og setter etiketten «Doing» når arbeidet starter. Hver person har maksimalt én issue med «Doing» og kan ha inntil to avtalte issues tildelt som neste oppgaver.

### 8.2 Arbeide i en egen branch

`main` inneholder den nyeste gjennomgåtte versjonen av prosjektet. Produktet kan fortsatt være uferdig, men endringene som ligger på `main`, skal være godkjent gjennom arbeidsflyten vår. Når vi starter på en issue, oppretter vi en egen branch fra oppdatert `main` og kobler den til issuen. Branchen navngis `<issuenr>-kort-beskrivelse`, for eksempel `19-ferdigstille-domenemodell`. Vi bruker samme navnemønster for dokumentasjon, funksjoner og feilrettinger. Vi gjør endringene i arbeidsbranchen og lagrer logiske deler av arbeidet som commits. Commit-meldingene skal kort og tydelig beskrive endringen, for eksempel «Legg til relasjoner i domenemodellen». Vi holder branchene kortvarige ved å avgrense oppgavene og sende ferdige endringer til review fortløpende. Dersom oppgaven krever endringer i en del som noen andre arbeider med, avklarer vi dette med vedkommende før vi fortsetter. Vi erstatter ikke filer med eldre kopier som kan fjerne andres endringer. Før vi sender arbeidet til review, kontrollerer vi om `main` har fått nye endringer, og oppdaterer arbeidsbranchen ved behov. Dersom vi oppdager konflikter, tar vi straks kontakt med den andre berørte forfatteren. Vi avklarer sammen hvilke endringer som skal beholdes, før konflikten løses.

### 8.3 Opprette en pull request

Når arbeidet oppfyller issuens DoD, åpner forfatteren en PR fra arbeidsbranchen til `main`. PR-en skal inneholde:

- En kort beskrivelse av hva som er endret og hvorfor.
- Beskrivelse av hvordan resultatet er kontrollert, inkludert relevante tester når oppgaven gjelder kode.
- Eventuelle avhengigheter eller forhold revieweren må være oppmerksom på.

Forfatteren gjennomgår selv endringene før PR-en sendes til review, og kontrollerer at den bare inneholder arbeid som hører til oppgaven. Relevante bilder eller skjermbilder kan legges ved når de gjør resultatet lettere å vurdere.

### 8.4 Gjennomgang og godkjenning

Begge de andre gruppemedlemmene kan gjennomgå PR-en; vi tildeler ikke en bestemt reviewer. Minst ett annet gruppemedlem må godkjenne endringen før den flettes inn i `main`.

Revieweren bruker issuens beskrivelse og DoD som grunnlag og kontrollerer at:

- Resultatet oppfyller oppgaven og alle punktene i DoD.
- Innholdet er forståelig og henger sammen med resten av prosjektet.
- Nødvendige begrunnelser og dokumentasjon er med.
- PR-en ikke inneholder utilsiktede endringer i andres arbeid.
- Relevante kontroller eller tester er gjennomført.

Tilbakemeldinger gis i PR-en slik at vurderinger og avklaringer er tilgjengelige for hele gruppa. Forfatteren følger opp kommentarene og gjør rettelser i samme branch. Ved vesentlige endringer må den oppdaterte versjonen gjennomgås før merge. Uavklarte endringskrav skal være løst før PR-en godkjennes. Vi tar sikte på gjennomgang i løpet av dagen. Dersom en PR blir liggende utover dette, gir forfatteren beskjed i Teams. PR-en venter på godkjenning selv om gjennomgangen blir forsinket.

### 8.5 Merge og avslutning

Et annet gruppemedlem enn forfatteren gjennomfører merge når PR-en er godkjent, nødvendige rettelser er fulgt opp og eventuelle konflikter er løst. Dersom `main` har endret seg under gjennomgangen, kontrollerer vi før merge at endringen fortsatt passer sammen med den nyeste versjonen. Den ferdige arbeidsbranchen slettes deretter. Nye oppgaver får en ny branch fra oppdatert `main`, slik at gamle arbeidsbrancher ikke gjenbrukes. Vi gjør ingen direkte commits til `main`. Alle endringer skal gå gjennom PR og godkjenning fra minst ett annet gruppemedlem. Vi planlegger å beskytte `main` med dette kravet i GitHub. Inntil beskyttelsen er konfigurert, følger gruppa regelen som en felles arbeidsavtale.

# 9. CI/CD-strategi

## 9.1 Continuous Integration

Vi planlegger å bruke GitHub Actions for Continuous Integration (CI). Formålet
er å automatisk kontrollere endringer før de kan flettes inn i main. Dette
skal redusere risikoen for at feil eller endringer som bryter eksisterende
funksjonalitet blir en del av hovedversjonen av prosjektet.

Når en pull request opprettes eller oppdateres mot main, skal en GitHub
Actions-workflow starte automatisk. Workflowen skal hente prosjektet, sette
opp nødvendig miljø og gjennomføre de automatiske kontrollene som er relevante
for prosjektet. Dette skal blant annet innebære å kontrollere at prosjektet
kan bygges og at automatiserte tester kan kjøres.

CI-workflowen planlegges å bestå av følgende steg:

1. **Checkout av kode:** Workflowen henter den aktuelle branchen og
   prosjektfilene.
2. **Oppsett av miljø:** Nødvendig runtime og eventuelle avhengigheter
   installeres.
3. **Build:** Prosjektet bygges eller kontrolleres for syntaks- og
   kompileringsfeil.
4. **Automatiserte tester:** Relevante automatiserte tester kjøres.
5. **Kvalitetskontroller:** Relevante statiske kontroller gjennomføres,
   eksempelvis linting eller validering av prosjektfiler.
6. **Resultat:** Workflowen rapporterer om kontrollene er bestått eller
   feilet.

En pull request skal ikke regnes som klar for merge dersom de obligatoriske
CI-kontrollene feiler. CI fungerer dermed som en automatisk kvalitetssjekk
før endringer blir en del av main. Den faglige gjennomgangen av en pull
request utføres fortsatt av et annet gruppemedlem i henhold til
Git-workflowen beskrevet i kapittel 8.

CI skal også kjøres når endringer pushes til main, slik at gruppen
kontinuerlig kan kontrollere at hovedversjonen fortsatt fungerer etter
sammenfletting. På denne måten kan feil oppdages tidlig i utviklingsprosessen.

I første omgang holdes CI-oppsettet enkelt fordi Stadionhopper er en
studentbasert MVP med begrenset teknisk kompleksitet. Dersom prosjektet
utvides, kan workflowen videreutvikles med flere tester og strengere
kvalitetskontroller.

## 9.2 Testing og automatisering

Testing skal være en integrert del av utviklingen av Stadionhopper. Målet er
å oppdage feil tidlig og sikre at endringer ikke bryter eksisterende
funksjonalitet. Testingen skal derfor foregå både automatisk gjennom CI og
manuelt gjennom brukertesting og akseptansetesting.

Vi planlegger å bruke tre hovednivåer av automatiserte tester:

* **Enhetstester** skal brukes til å teste mindre deler av applikasjonen
  isolert, for eksempel funksjoner som behandler eller validerer data.
* **Integrasjonstester** skal brukes til å kontrollere at flere deler av
  systemet fungerer sammen. Dette kan for eksempel være kommunikasjonen
  mellom backend og filbasert datalagring.
* **Akseptansetester** skal kontrollere at systemet oppfyller kravene som
  er beskrevet i user stories og acceptance criteria. Disse testene kan
  gjennomføres manuelt i starten, men sentrale scenarier kan automatiseres
  dersom dette er hensiktsmessig.

Automatiserte tester skal kjøres som en del av CI-workflowen. Dersom en test
feiler, skal workflowen markeres som feilet, og feilen skal undersøkes før
pull requesten kan merges. På denne måten blir testing en del av den normale
utviklingsprosessen og ikke noe som gjennomføres først mot slutten av
prosjektet.

I tillegg til automatiserte tester skal vi gjennomføre manuell testing av
brukergrensesnittet. Dette er spesielt viktig for funksjoner som kampoversikt,
kart, innsjekking og brukerprofil, hvor det ikke er tilstrekkelig å kontrollere
at koden fungerer teknisk. Brukertestingen beskrevet i kapittel 6 skal brukes
til å undersøke om brukerne faktisk forstår og klarer å gjennomføre de
viktigste oppgavene.

Testansvaret ligger hos hele gruppen. Den som utvikler en funksjon har ansvar
for å teste den før pull request opprettes, mens revieweren kontrollerer at
relevante tester er gjennomført og at acceptance criteria er oppfylt. Dette
kobles til Definition of Done som beskrives i kapittel 7 og Git-workflowen i
kapittel 8.

Teststrategien skal tilpasses prosjektets størrelse. Vi prioriterer først
tester av kjernefunksjonene i MVP-en, særlig innlogging, kampoversikt,
stadioninformasjon, innsjekking og personlig historikk. Dersom tiden tillater
det, utvides testdekningen til funksjoner med lavere prioritet.

## 9.3 Build og deployment

*(Skrives i issue #34)*

Vedlegg
