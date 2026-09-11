# Serena

Serena è un'app di meditazione per Android, pensata per essere pulita, essenziale e diretta al punto. Niente account, niente abbonamenti, niente distrazioni: si apre l'app, si sceglie un obiettivo e in pochi secondi si è dentro una sessione guidata.

Tre obiettivi, tre pannelli:

- **Sonno** — rilassarsi e lasciarsi cullare verso il sonno
- **Focus** — schiarire la mente e ritrovare concentrazione
- **Ansia** — ritrovare calma e sicurezza, un respiro alla volta

Ogni sessione dura al massimo 5 minuti ed è composta da una voce guida in italiano (sintetizzata sul dispositivo) e un sottofondo ambientale generato proceduralmente, distinto per ciascun obiettivo.

## Caratteristiche

- Interfaccia minimale, un colore/atmosfera dedicata per ciascun obiettivo
- Voce guida generata via text-to-speech di sistema, nessun file audio da scaricare
- Sottofondo ambientale royalty-free, generato via script (nessun campione esterno)
- Controllo separato del volume di voce e musica, direttamente nel pannello di sessione
- Sessioni sempre entro i 5 minuti, con animazione di respirazione e progresso a schermo

## Stack tecnico

- [Expo](https://expo.dev) / React Native (TypeScript)
- `expo-speech` per la sintesi vocale
- `expo-audio` per il sottofondo in loop
- `@react-navigation` per la navigazione tra schermate
- `@react-native-async-storage/async-storage` per persistere le preferenze di volume

## Struttura del progetto

```
App.tsx                     entry point, provider globali
src/
  audio/                     hook di sessione (voce + musica) e sorgenti audio
  components/                UI riutilizzabile (orb di respirazione, slider, card)
  content/                   script delle meditazioni (testo in italiano)
  navigation/                stack di navigazione
  screens/                   Home e Player
  settings/                  stato/persistenza dei volumi
  theme/                     palette e stili condivisi
assets/audio/                tracce ambient (.m4a), generate da scripts/
scripts/                     generatori riproducibili di audio ambient e icone
docs/roadmap.md              percorso verso una versione pronta per la pubblicazione
```

## Per iniziare

Prerequisiti: Node.js, l'app **Expo Go** installata sul telefono Android (stesso Wi-Fi del computer).

```bash
npm install
npm start
```

Scansiona il QR code mostrato nel terminale con Expo Go. Le modifiche al codice si riflettono a caldo (Fast Refresh).

> Nota: l'icona dell'app che vedi in Expo Go è quella di Expo Go stesso — l'icona personalizzata di Serena è visibile solo in una build nativa reale (vedi roadmap, sezione Distribuzione).

### Script utili

- `npm run android` / `npm run ios` / `npm run web` — avvia il dev server per la piattaforma indicata
- `node scripts/generate-ambient-audio.js` — rigenera le tracce ambient in `assets/audio/`
- `bash scripts/generate-app-icons.sh` — rigenera le icone app da `scripts/icon-src/*.svg`

## Roadmap

Questo repository è un prototipo funzionante, non ancora pronto per la pubblicazione sul Play Store. Il percorso per arrivarci è tracciato in [docs/roadmap.md](docs/roadmap.md).

## Licenza

Vedi [LICENSE](LICENSE). Il file attuale è quello di default del template Expo usato per avviare il progetto: va rivisto prima di qualsiasi pubblicazione (vedi roadmap).
