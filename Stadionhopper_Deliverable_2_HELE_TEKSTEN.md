Stadionhopper

Deliverable 2

Architecture

Av:

Ine

Inger

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

Som del av det videre arbeidet med Stadionhopper har vi hatt i kontakt
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
stadionbesøk, kan være en slik merverdi. Den tekniske usikkerheten
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
stadionbesøk var mindre entydig.

## 2.3 Viktigste funn og konsekvenser for MVP-en

Tilbakemeldingene fra fotballkretsen og brukerundersøkelsen peker samlet
mot at det å gjøre lokale kamper enklere å oppdage er en relevant del av
Stadionhopper. Samtidig finnes mye av kampinformasjonen allerede på
fotball.no. Stadionhopper bør derfor tilby mer enn en tradisjonell
kampoversikt. Kart og informasjon om stadioner, kombinert med
kampinformasjon og muligheten til å registrere egne stadionbesøk, kan
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
som lag, dato, tidspunkt og stadion. Det skal også være mulig å
registrere besøkte kamper og stadioner og få en personlig historikk over
disse.

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
vurderes senere dersom utviklingskapasiteten tillater det

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

- Stadioner skal vis es på et kart.

- Brukeren skal kunne velge et stadion.

- Stadionet skal vise navn og plassering.

- Brukeren skal kunne se relevante kamper knyttet til stadionet.

Registrere kamp- og stadionbesøk

User story: Som registrert bruker ønsker jeg å registrere en kamp jeg
har vært på, slik at jeg kan samle mine kamp- og stadionbesøk.

**Acceptance criteria:**

- Brukeren må være innlogget for å registrere et besøk.

- Brukeren skal kunne registrere en kamp som besøkt.

- Registreringen skal lagres på brukerens profil.

- Stadionet som er knyttet til kampen skal inngå i brukerens
  besøkshistorikk.

Se personlig historikk

User story: Som registrert bruker ønsker jeg å se mine tidligere kamp-
og stadionbesøk, slik at jeg får en samlet oversikt over opplevelsene
mine.

**Acceptance criteria:**

- Brukeren skal kunne se sine registrerte kampbesøk.

- Historikken skal vise hvilken kamp og hvilket stadion som ble besøkt.

- Historikken skal være knyttet til den innloggede brukeren.

Innlogging og brukerprofil

User story: Som bruker ønsker jeg å kunne opprette en bruker og logge
inn, slik at jeg kan registrere og lagre mine kamp- og stadionbesøk.

**Acceptance criteria:**

- Brukeren skal kunne opprette en bruker.

- Brukeren skal kunne logge inn og ut.

- Registrerte besøk skal knyttes til riktig bruker.

- Brukeren skal kunne åpne sin egen profil og se sin personlige
  historikk.

# 4. Domenemodell

## 4.1 Sentrale entiteter

Med utgangspunkt i den prioriterte produktbackloggen og funksjonene i
MVP-en har vi identifisert fem sentrale entiteter i Stadionhopper:
bruker, kamp, stadion, lag/klubb og besøk. Bruker representerer en
person med profil i Stadionhopper, som skal kunne logge inn, registrere
kampbesøk og se sin personlige historikk. Kamp inneholder grunnleggende
informasjon som dato, tidspunkt, hvilke lag som spiller og hvilken
stadion kampen spilles på. Stadion representerer stedet kampen spilles
og inneholder blant annet navn og plassering, mens lag/klubb
representerer lagene som deltar i kampene.

Besøk representerer koblingen mellom en bruker og en kamp brukeren har
vært på. Når et besøk registreres, kan det inngå i brukerens personlige
historikk over kamper og stadioner. Stadionen knyttes til besøket
gjennom kampen. Disse fem entitetene danner dermed grunnlaget for de
sentrale funksjonene som er prioritert i MVP-en.

## 4.2 Relasjoner mellom entitetene

Entitetene i domenemodellen er knyttet sammen gjennom funksjonene i
Stadionhopper. En bruker kan registrere flere besøk, mens hvert besøk
tilhører én bruker og én kamp. En kamp spilles på en stadion, mens en
stadion kan være knyttet til flere kamper. Hver kamp har et hjemme- og
bortelag, og samme lag/klubb kan delta i flere kamper.

Denne strukturen gjør at informasjon ikke trenger å lagres flere steder.
Når en bruker registrerer et kampbesøk, kan informasjon om stadion og
lag hentes gjennom den aktuelle kampen. Relasjonene legger dermed
grunnlaget for at brukeren kan finne kamper og stadioner, registrere
besøk og få en historikk over tidligere kamp- og stadionbesøk.

## 4.3 Domenemodell

Domenemodellen nedenfor visualiserer de sentrale entitetene i
Stadionhopper og relasjonene mellom dem. Modellen er avgrenset til
funksjonene som er prioritert i MVP-en.

BRUKER

/ \\

/ \\

INNSJEKKING INNLEGG

\|

\|

KAMP

/ \| \\

/ \| \\

KLUBB STADION KLUBB

hjemmelag \| bortelag

\|

ARRANGEMENT

*Figur 1: Domenemodell for Stadionhopper.*

# 5. Systemarkitektur

## 5.1 Overordnet arkitektur

Stadionhopper planlegges i første omgang som en nettbasert løsning med
en enkel arkitektur som støtter funksjonene som er prioritert i MVP-en.
Målet er å utvikle en løsning som senere kan videreutvikles til en
app.Løsningen må kunne håndtere brukerinnlogging, kamp- og
stadioninformasjon, registrering av kampbesøk og personlig historikk.
Arkitekturen bør samtidig være fleksibel slik at funksjonalitet kan
utvikles og endres gjennom prosjektet.

Systemet deles overordnet inn i brukergrensesnitt, backend og database.
Brukergrensesnittet håndterer det brukeren møter i løsningen, som
kampoversikt, stadionkart, registrering av besøk og brukerprofil.
Backend håndterer logikken og kommunikasjonen mellom brukergrensesnittet
og dataene som lagres. Databasen skal lagre informasjon knyttet til
blant annet brukere, kamper, stadioner, lag og registrerte besøk.

Arkitekturen er valgt for å holde den første løsningen enkel og
oversiktlig. En tydelig inndeling mellom brukergrensesnitt, backend og
database gjør det mulig å skille mellom presentasjon, logikk og
datalagring. Dette kan gjøre det enklere å utvikle og endre de ulike
delene av løsningen underveis uten at hele systemet må endres samtidig.

> \[Sett inn arkitekturdiagram\]

*Figur X: Overordnet systemarkitektur for Stadionhopper.*

## 5.2 Frontend, backend og database

Frontend skal utgjøre brukergrensesnittet i Stadionhopper og gi brukeren
tilgang til funksjonene i MVP-en. Her skal brukeren blant annet kunne
finne kommende kamper og stadioner, registrere kampbesøk, logge inn og
se sin personlige historikk.

Backend skal håndtere logikken mellom brukergrensesnittet og dataene som
brukes i løsningen. Dette innebærer blant annet behandling av
brukerdata, kampinformasjon og registrerte besøk. Databasen skal lagre
informasjon om brukere, kamper, stadioner, lag og besøk i tråd med
domenemodellen.

Vi planlegger å bruke HTML og CSS til frontend og JavaScript til
backend. Firebase skal brukes som database. Valgene er gjort med
utgangspunkt i hva gruppen vurderer som gjennomførbart innenfor
prosjektperioden og den kompetansen som finnes i teamet. Vi har valgt å
starte med en nettbasert løsning fremfor å utvikle en egen app, fordi
dette vurderes som enklere å gjennomføre i første utviklingsfase.
Løsningen kan senere videreutvikles dersom prosjektets fremdrift og
kapasitet tillater det.

## 5.3 Eksterne data og integrasjoner

En viktig teknisk avhengighet er tilgangen til kampdata. Dialogen med
Nordmøre og Romsdal Fotballkrets viste at kampinformasjon finnes på
fotball.no, men at tilgang til oppdaterte data ikke nødvendigvis er
enkel. Gruppen må derfor undersøke videre hvordan kampdata kan gjøres
tilgjengelig i løsningen.

Den første versjonen av Stadionhopper bør ikke være avhengig av
sanntidsdata. Dette reduserer den tekniske kompleksiteten og gjør det
mulig å utvikle og teste de sentrale funksjonene selv om en automatisk
integrasjon mot eksterne kampdata ikke er tilgjengelig. Valg av løsning
for kampdata må vurderes ut fra hva som er teknisk gjennomførbart
innenfor prosjektets rammer.

## 5.4 Tekniske valg

GitHub brukes som felles plattform for versjonskontroll,
oppgavefordeling og samarbeid i prosjektet. Arbeidet organiseres gjennom
mindre issues, og utviklingsoppgaver gjennomføres i egne branches før
ferdige endringer flettes inn i main. Den nærmere arbeidsflyten
beskrives i kapittel 8.

Ved valg av teknologi ønsker gruppen å unngå unødvendig kompleksitet og
prioritere løsninger som er gjennomførbare innenfor prosjektperioden.
Teknologien skal først og fremst støtte funksjonene i MVP-en og gjøre
det mulig å utvikle og teste løsningen stegvis.

# 6. Wireframes og brukerflyt

Wireframes brukes for å visualisere hvordan de viktigste funksjonene i
Stadionhopper kan presenteres for brukeren før det eventuelt brukes tid
på utvikling. De tar utgangspunkt i funksjonene som er prioritert i
MVP-en og user stories beskrevet tidligere i oppgaven.

## 6.1 Wireframes

Wireframene viser et enkelt forslag til hvordan de sentrale delene av
den nettbaserte løsningen kan bygges opp. I første omgang fokuserer vi
på kampoversikt, kart og stadioninformasjon, registrering av kampbesøk
og brukerens profil og besøkshistorikk. Dette samsvarer med funksjonene
som er prioritert som Must have i produktbackloggen.

Wireframene er ikke ment som et ferdig visuelt design, men som et
verktøy for å konkretisere ideene og undersøke om brukerflyten er
forståelig. De kan derfor endres på bakgrunn av diskusjoner i teamet og
tilbakemeldinger fra potensielle brukere.

> \[Sett inn wireframes her\]

*Figur X: Wireframes for sentrale deler av Stadionhopper.*

## 6.2 Brukerflyt og designvalg

Den viktigste brukerreisen tar utgangspunkt i behovet for å gjøre det
enklere å finne lokale fotballkamper. Brukeren skal kunne finne en
kommende kamp, se informasjon om kampen og stadionet den spilles på, og
senere registrere kampen som besøkt. Det registrerte besøket skal
deretter være tilgjengelig i brukerens personlige historikk.

En sentral brukerreise kan dermed beskrives slik:

Finne kommende kamp → se kampinformasjon → se stadion → registrere besøk
→ se besøket i personlig historikk

Denne brukerreisen knytter sammen flere av de sentrale user stories som
er definert for MVP-en.

Utformingen av wireframene tar utgangspunkt i innsikten fra
brukerundersøkelsen og prioriteringene i produktbackloggen.
Undersøkelsen viste særlig behov for å gjøre det enkelt å finne kommende
lokale kamper. Derfor bør kampoversikten ha en sentral plass i
løsningen, og brukeren bør enkelt kunne gå videre fra en kamp til
informasjon om hvor den spilles.

Wireframene støtter samtidig den delen av konseptet som skiller
Stadionhopper fra en vanlig kampoversikt. Muligheten til å registrere
besøkte kamper og senere se disse i en personlig historikk skal derfor
være lett tilgjengelig. Mer omfattende sosiale funksjoner og
konkurranseelementer får mindre plass i denne fasen, i tråd med
prioriteringen av MVP-en.

Designet holdes i første omgang enkelt. Formålet er å teste om
funksjonene og brukerflyten er forståelige, fremfor å bruke mye tid på
detaljer i det visuelle uttrykket før løsningen er testet på brukere.

## 6.3 Plan for brukertesting og tilbakemeldinger

Brukerundersøkelsen som ble gjennomført etter Deliverable 1 har gitt
gruppen et bedre grunnlag for å prioritere funksjonene i Stadionhopper.
Neste steg er å undersøke hvordan potensielle brukere oppfatter selve
løsningen.

Wireframene kan brukes i en enkel brukertest hvor deltakerne får
konkrete oppgaver, for eksempel å finne en kommende lokal kamp, finne ut
hvor kampen spilles og registrere et kampbesøk. Vi ønsker særlig å
undersøke om brukerne forstår hvordan de skal navigere mellom
kampoversikt, stadioninformasjon, registrering av besøk og personlig
historikk.

Tilbakemeldingene fra testingen skal diskuteres i teamet og brukes som
grunnlag for eventuelle endringer i wireframes, user stories og
produktbacklog. Dersom det utvikles en fungerende prototype senere i
prosjektet, kan de samme brukerreisene testes på nytt. På denne måten
kan løsningen utvikles stegvis gjennom testing, tilbakemeldinger og
justeringer fremfor at alle løsninger fastsettes på forhånd.

# 7. Sprintplan

Sprintplanen bygger videre på planen fra Deliverable 1, men er justert
på bakgrunn av innsikten vi har fått gjennom brukerundersøkelsen,
dialogen med Nordmøre og Romsdal Fotballkrets og det videre arbeidet med
produktbackloggen. Vi ser på arbeidet fram mot hver innlevering som en
overordnet sprint, samtidig som vi deler arbeidet opp i mindre oppgaver
som kan ferdigstilles fortløpende for å unngå at store deler av arbeidet
blir liggende til slutten av perioden.

## 7.1 Sprintmål og sprint backlog

Målet for sprinten er å etablere et teknisk og visuelt grunnlag for den
videre utviklingen av Stadionhopper. Vi skal konkretisere hvordan den
nettbaserte løsningen skal bygges opp og forberede utviklingen av de
viktigste funksjonene i MVP-en.

Sprint backlog tar utgangspunkt i den prioriterte produktbackloggen og
de sentrale user stories. Vi prioriterer først funksjonene som er
definert som Must have, særlig kampoversikt, stadioninformasjon,
brukerinnlogging, registrering av kamp- og stadionbesøk og personlig
historikk.

Arbeidet organiseres gjennom issues i GitHub. Issues prioriteres etter
Must, Should, Could og Won't, slik at det er tydelig hvilke oppgaver som
er viktigst å gjennomføre først. Vi arbeider med relativt små issues
fremfor store oppgaver for å gjøre arbeidet mer oversiktlig og redusere
risikoen for at store mengder arbeid må ferdigstilles og flettes sammen
samtidig.

## 7.2 Arbeidsform og arbeidsfordeling

Vi ønsker å bruke et pull-prinsipp i arbeidsfordelingen. Det innebærer
at vi selv plukker tilgjengelige issues fremfor at alle oppgaver
fordeles på forhånd. Samtidig må vi følge med på arbeidsmengden slik at
arbeidet blir rimelig fordelt mellom oss.

Når en utviklingsoppgave påbegynnes, arbeides det i en egen branch
knyttet til oppgaven. Når arbeidet er ferdig, flettes endringene inn i
main og issue lukkes. På denne måten gjør vi det enklere å følge
fremdriften og redusere omfanget av hver enkelt merge. Git-workflowen
beskrives nærmere i kapittel 8.

Vi bruker ikke en fast estimering med for eksempel story points på
nåværende tidspunkt. Kapasiteten vurderes i stedet ut fra tiden vi har
tilgjengelig og hvor mange prioriterte issues vi rekker å ferdigstille.
Dersom vi ikke rekker alle oppgavene, skal Must-oppgavene prioriteres
foran Should og Could.

## 7.3 Ferdigstilling og oppfølging

Hva som kreves for at en oppgave skal regnes som ferdig, beskrives i den
enkelte issue. Dette gjør det mulig å tilpasse kriteriene til oppgaven
som skal gjennomføres, samtidig som det skal være tydelig hva som
forventes før en issue kan lukkes.

En utviklingsoppgave regnes i utgangspunktet som ferdig når det som er
beskrevet i issue er gjennomført og endringene kan flettes inn i main.
Dersom vi er usikre på en løsning eller endring, kan et annet
gruppemedlem involveres for gjennomgang før arbeidet ferdigstilles.

Fremdriften følges gjennom statusen på issues i GitHub. Ved behov kan
prioriteringene endres underveis dersom vi får ny kunnskap, møter
tekniske utfordringer eller ser at kapasiteten er mindre enn forventet.
Sprintplanen skal dermed fungere som et arbeidsverktøy, samtidig som vi
beholder muligheten til å justere arbeidet underveis.

*(Definition of Done skrives her)*

# 8. Git-workflow

## 8.1 Branching og commits

Vi holder `main` som en stabil gren med godkjent arbeid. For hver issue
oppretter vi én egen branch fra `main` ved å bruke «Create a branch» på
issuen. Branchen navngis `<issuenr>-kort-beskrivelse`, for eksempel
`19-ferdigstille-domenemodell`. Vi holder branchene korte og fletter dem
ofte, slik at endringene er små og enklere å gjennomgå. Commit-meldinger
skal være korte og beskrive endringen tydelig. Vi redigerer bare den delen
av dokumentet som hører til issuen, og laster ikke opp hele filer på nytt
dersom det kan overskrive andres arbeid. Før vi åpner en pull request,
henter vi inn endringer som har kommet til `main` ved å bruke «Update
branch». Vi velger denne arbeidsformen for å isolere arbeid på ulike
oppgaver og redusere risikoen for konflikter og tap av endringer.

## 8.2 Pull requests og code review

Når arbeidet er klart, åpner vi en pull request (PR) fra branchen til
`main` og knytter den til issuen med «Closes #N». Minst ett annet
gruppemedlem må godkjenne PR-en før den flettes inn, og forfatteren merger
ikke sin egen PR. Revieweren kontrollerer at innholdet svarer på
oppgaven, at viktige valg er begrunnet, og at endringer ikke påvirker
andres kapitler. Forfatteren løser eventuelle konflikter før merge, slik
at revieweren kan kontrollere den endelige versjonen. Vi har vurdert å
committe direkte til `main`, men forkaster dette fordi det gir mindre
kvalitetssikring og øker risikoen for å overskrive andres arbeid. Vi
planlegger å beskytte `main` med krav om minst én godkjenning før merge.

## 8.3 Samarbeid i GitHub

Vi oppretter en issue for hvert kapittel eller hver oppgave og prioriterer
dem med Must, Should eller Could. Vi følger pull-prinsippet fra kapittel
7.2: den som har kapasitet, tildeler seg selv en tilgjengelig issue.
Når vi starter på en issue, setter vi etiketten «Doing». For å begrense
samtidig arbeid har hver person maksimalt én issue med «Doing» og kan i
tillegg ha inntil to avtalte issues tildelt som skal tas etterpå. Dette
gir en tydelig WIP-grense uten å hindre planlegging av neste oppgave.
Arbeidet regnes som ferdig når PR-en er godkjent og merget; «Closes #N»
lukker da issuen automatisk. Denne arbeidsformen er planen for neste
fase. Vi bruker ikke mer avansert statusstyring nå, men kan vurdere for
eksempel GitHub Projects senere dersom behovet oppstår.

# 9. CI/CD-strategi

## 9.1 Continuous Integration

*(Skrives i issue #32)*

## 9.2 Testing og automatisering

*(Skrives i issue #33)*

## 9.3 Build og deployment

*(Skrives i issue #34)*

# 10. Risiko, avhengigheter og teknisk gjeld

*(Skrives i issue #35)*

# 11. Videre plan mot fungerende prototype

*(Skrives i issue #36)*

# 12. Refleksjon over arbeidsprosess og læring

*(Skrives i issue #37)*

# 13. Referanser

*(Skrives i issue #38)*

Vedlegg
