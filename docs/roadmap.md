# Roadmap

Serena oggi è un prototipo a 3 sessioni singole. L'obiettivo di lungo periodo è un'app di meditazione completa, sul modello di **Petit BamBou** (Meditazione / Percorsi / Suoni / Io) e **Meditopia** (percorsi personalizzati, check-in umore, libreria di suoni tematici, promemoria).

Il percorso è diviso in MVP successivi, ciascuno una versione dell'app realmente installabile che aggiunge un pezzo concreto di prodotto sopra il precedente. Ordine per priorità di prodotto, non per comodità tecnica: prima i contenuti che fanno tornare le persone ad aprire l'app, poi la solidità tecnica e la pubblicazione.

## MVP 0 — Prototipo (stato attuale)

- [x] 3 categorie (Sonno, Focus, Ansia), una sessione ciascuna, max 5 minuti
- [x] Voce guida via TTS di sistema, sottofondo ambientale procedurale
- [x] UI essenziale, animazione di respirazione, slider volume voce/musica

## MVP 1 — Percorsi

Il pezzo mancante più importante. Oggi ogni categoria è una sessione isolata; in Petit BamBou/Meditopia il contenuto è organizzato in **percorsi**: sequenze di sessioni su più giorni, attorno a un tema, che si sbloccano una alla volta.

- [ ] Modello dati "percorso": titolo, obiettivo (Sonno/Focus/Ansia), elenco ordinato di giorni, ciascuno con il proprio script
- [ ] Un primo percorso per categoria (es. "7 notti per dormire meglio", "5 giorni per allenare il focus", "10 giorni per calmare l'ansia")
- [ ] Avanzamento persistito localmente: quale giorno ha raggiunto l'utente, giorno successivo sbloccato solo dopo aver completato il precedente
- [ ] Schermata "Percorso": elenco dei giorni con stato (fatto / oggi / bloccato)

## MVP 2 — Suoni indipendenti

In Petit BamBou i suoni sono una sezione a sé, usabile senza una sessione guidata: si sceglie un suono, si imposta un timer, si ascolta.

- [ ] Sezione "Suoni" separata dai percorsi: le tracce ambient esistenti (e altre da aggiungere) riproducibili da sole, con timer
- [ ] Più varianti di suono per obiettivo (es. pioggia, oceano, foresta — oggi abbiamo solo il drone procedurale per categoria)

## MVP 3 — Sessioni rapide e varietà

Non tutti vogliono seguire un percorso: serve anche l'uso "al volo".

- [ ] Sessioni singole brevi fuori dai percorsi (stile "Quick Now" di Meditopia), per chi ha 3 minuti e non vuole impegnarsi in un percorso
- [ ] Più durate a scelta per sessione
- [ ] Più script per evitare ripetizione a chi usa l'app spesso

## MVP 4 — Personalizzazione e check-in

- [ ] Onboarding con poche domande su obiettivo principale ed esperienza pregressa, per suggerire il primo percorso
- [ ] Check-in giornaliero rapido ("come ti senti oggi?"), stile Meditopia, usato per suggerire cosa fare
- [ ] Consigli personalizzati ("continua il tuo percorso" / "prova questo" in base a umore e cronologia)

## MVP 5 — Sezione "Io": continuità e abitudine

- [ ] Cronologia sessioni completate e streak giornaliero
- [ ] Minuti totali di pratica, percorsi completati
- [ ] Promemoria personalizzabili (notifica locale, opt-in) per meditare/dormire

## MVP 6 — Solidità tecnica e pubblicazione

Qui entra tutto quello rimandato finora: non serve per validare il prodotto, ma è bloccante per farlo usare a qualcuno fuori da un test locale.

- [ ] Audio in background: la sessione continua a schermo bloccato/app in background, con controlli su notifica/lock screen
- [ ] Gestione delle interruzioni (telefonata in arrivo, altre app audio)
- [ ] Build reale via EAS (profili preview/production), test su dispositivo vero
- [ ] Privacy policy pubblica e LICENSE reale (quella attuale è il default del template Expo)
- [ ] Disclaimer per la categoria Ansia (non sostituisce assistenza professionale)
- [ ] Pubblicazione in test chiuso su Play Console

## MVP 7 — Crescita

- [ ] Voce guida di qualità superiore (voce cloud neurale o registrazioni professionali) al posto del solo TTS di sistema
- [ ] Supporto iOS (il codice è già cross-platform via Expo)
- [ ] Localizzazione: almeno inglese
- [ ] Test automatici, CI, crash reporting, analytics minimali
- [ ] Modello di monetizzazione (percorsi/suoni premium in abbonamento), senza pubblicità invasiva

---

Ispirazione diretta: struttura a 4 sezioni di **Petit BamBou** (Meditazione, Percorsi, Suoni, Io) e personalizzazione/check-in di **Meditopia**. Le priorità tra MVP possono cambiare, ma i Percorsi (MVP 1) restano il pezzo da costruire per primo: è la differenza tra "3 audio" e "un'app che si torna ad aprire".
