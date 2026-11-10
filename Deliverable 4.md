# Deliverable 4

## Disposisjon – DORA-analyse og sluttrefleksjon

**Ramme:** Maksimalt 10 sider. Forslaget under gir omtrent 9 sider, med litt plass til figurer og tabeller. Video og lysbilder leveres separat.

**Gjennomgående grep:** Knytt konkrete erfaringer og dokumenterte data til tolkning og forbedringsforslag. Skill tydelig mellom det dere har gjennomført, det dere kan anslå, og det dere ville gjort videre.

## 1. Innledning og avgrensning (ca. ½ side)

- Stadionhoppers formål, målgruppe og prosjektets rammer: tre studenter, begrenset tid og flere parallelle fag.
- Rapportens formål: vurdere produktet og leveranseprosessen. Avgrens hvilken periode og hvilken publisert løsning DORA-analysen gjelder.

## 2. Produktet og oppnådde resultater (ca. 1 side)

- Hva den leverte versjonen faktisk støtter; demonstrer gjerne én sammenhengende brukerreise, som å finne og registrere en kamp.
- Prioriteringer, brukerinnspill og gjenstående begrensninger. Skill mellom implementert, testet og planlagt funksjonalitet.

## 3. Arkitektur og tekniske valg (ca. 1 side)

- Enkel arkitekturfigur: frontend, eventuell backend, datalagring og publisering. Forklar skillet mellom Pages-demo og en løsning med backend.
- Begrunn valg og kompromisser: enkelhet, testbarhet, midlertidig lagring, sikkerhet og hva som må endres for reell drift.

## 4. Arbeidsprosess, testing og CI/CD (ca. 1 side)

- Arbeidsflyten fra issue til branch, pull request, automatiserte kontroller, gjennomgang og publisering. Forklar hva CI og publiseringen faktisk gjør.
- Manuell funksjonstesting, automatiserte tester og PR-gjennomgang: hva de dekker, og hva de ikke dokumenterer om brukervennlighet og feil i drift.

## 5. DORA-analyse (ca. 3 sider)

### 5.1 Datagrunnlag og målemetode

- GitHub Actions, publiseringshistorikk, commits, pull requests og eventuelle feil-issues. Definer hva som regnes som en vellykket publisering og en relevant feil.
- Oppgi periode, beregningsmåte og manglende registreringer. Bruk en samlet tabell med måltall, resultat, datakilde og usikkerhet.

### 5.2 Deployment Frequency – publiseringsfrekvens

- Antall vellykkede publiseringer per uke i den valgte perioden; skill publisering fra commit, PR og mislykket workflow.
- Tolk hva frekvensen sier om leveranseevne, og hvorfor hyppige publiseringer alene ikke viser brukerverdi eller høy kvalitet.

### 5.3 Lead Time for Changes – ledetid for endringer

- Definer start og slutt, eksempelvis fra commit til vellykket publisering. Vis median og gjerne variasjon dersom datagrunnlaget tillater det.
- Diskuter venting på gjennomgang, integrasjon og publisering. Skill målet fra tiden brukt på hele brukerhistorien, inkludert planlegging.

### 5.4 Change Failure Rate – andel publiseringer som førte til feil

- Undersøk hvilke publiseringer som førte til feil i den publiserte løsningen og krevde korrigering. Feil i PR-tester før publisering er ikke i seg selv slike hendelser.
- Forklar hva manglende hendelsesregistrering gjør det umulig å beregne pålitelig. Ikke presenter manglende data som null feil.

### 5.5 Mean Time to Restore – tid til gjenoppretting

- For dokumenterte hendelser: tidspunkt for feil/start, oppdagelse, retting, publisering og bekreftet gjenoppretting. Oppgi hvilke tidspunkter dere faktisk kjenner.
- Skill gjenoppretting av en feilrammet publisert løsning fra generell behandlingstid for alle feil- og forbedrings-issues.

### 5.6 Samlet tolkning og begrensninger

- Kort prosjektperiode, få hendelser, varierende kapasitet og dokumentasjonsendringer kan påvirke tallene. Unngå bastante årsaksforklaringer og rangering av enkeltpersoner.
- Vurder målene samlet: raskere leveranser må ses i sammenheng med stabilitet. Brukertesting gir i tillegg innsikt i produktverdi og brukervennlighet.

> Oppgaveteksten ber uttrykkelig om fire DORA-måltall. La disse strukturere hovedanalysen. Eventuelle supplerende mål må defineres separat og ikke erstatte de fire.

## 6. Retrospektiv: læring om samarbeid og forbedring (ca. 1 side)

- Konkrete erfaringer: frontend og backend ventet på hverandre; avklaring i Scrum og tett samarbeid fikk arbeidet videre. AI-genererte issues trengte egen vurdering og tydeligere avhengigheter.
- Hva dere ville endret: mindre leveranser gjennom hele løsningen, tydeligere issues og hyppigere avklaringer. Knytt tiltakene til mindre venting, raskere tilbakemelding og mer felles forståelse.

## 7. Videre utvikling: Version 2 og systematisk måling (ca. 1 side)

### 7.1 Produkt og teknisk modning

- Prioriter ut fra brukerbehov og hypoteser: enklere navigasjon, brukerregistrerte kamper og eventuell oppdatering under kamp. Beskriv hva som må testes før videre investering.
- Realistiske steg for varig lagring, sikkerhet, pålitelig drift og skalering; forklar hvilke ressurser og arkitekturendringer det krever.

### 7.2 Måling og forbedring i arbeidsflyten

- Registrer feil oppdaget i bruk med en enkel issue-mal: påvirkning, tidspunkt, berørt publisering og koblet PR. Bekreft løsningen etter publisering; skill driftshendelser fra forbedringsønsker.
- Automatiser publiseringsdata og lag et felles dashboard, eventuelt med GitHub Projects for arbeidsstatus. Kombiner leveranse- og stabilitetsmål med brukerinnspill; bruk oversikten i felles prioritering og retrospektiv.

## 8. Avslutning (ca. ½ side)

- Hva dere med rimelig sikkerhet kan konkludere om produktet, leveranseevnen og læringen – og hva dataene ikke gir grunnlag for.
- De viktigste neste tiltakene og sammenhengen mellom tekniske praksiser, samarbeid, kvalitet og verdi for brukerne.
