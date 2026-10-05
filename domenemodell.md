# Domenemodell – Stadionhopper

Domenemodellen beskriver sentrale konsepter i Stadionhopper og relasjonene mellom dem.

## Entiteter

### Bruker
Representerer en bruker av Stadionhopper.

- brukerID
- navn
- epost

### Stadion
Representerer et stadion der fotballkamper og arrangementer kan foregå.

- stadionID
- navn
- plassering

### Klubb
Representerer en fotballklubb som kan delta i kamper.

- klubbID
- navn

### Kamp
Representerer en fotballkamp mellom to klubber.

- kampID
- dato
- tidspunkt

### Innsjekking
Representerer at en bruker registrerer at vedkommende har besøkt en kamp.

- innsjekkingID
- tidspunkt

### Innlegg
Representerer innhold som publiseres av en bruker.

- innleggID
- innhold
- tidspunkt

### Arrangement
Representerer et arrangement som foregår på et stadion og som kan være knyttet til en kamp.

- arrangementID
- navn
- dato
- tidspunkt

## Relasjoner

- En bruker kan foreta flere innsjekkinger.
- Hver innsjekking tilhører én bruker.
- En innsjekking gjelder én kamp.
- En kamp kan ha flere innsjekkinger.
- En kamp spilles på ett stadion.
- Et stadion kan ha flere kamper.
- En kamp har én klubb som hjemmelag og én klubb som bortelag.
- En klubb kan delta i flere kamper.
- En bruker kan opprette flere innlegg.
- Hvert innlegg opprettes av én bruker.
- Et stadion kan ha flere arrangementer.
- Hvert arrangement foregår på ett stadion.
- Et arrangement kan være knyttet til en kamp.
