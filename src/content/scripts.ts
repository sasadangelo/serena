import { CategoryId } from "../theme/theme";

export interface ScriptLine {
  text: string;
  pauseAfterMs: number;
}

export interface MeditationScript {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  lines: ScriptLine[];
}

export const meditationScripts: Record<CategoryId, MeditationScript> = {
  sonno: {
    id: "sonno",
    title: "Sonno",
    subtitle: "Rilassati e lasciati cullare verso il sonno",
    icon: "moon",
    lines: [
      { text: "Benvenuto in questo momento, tutto per te.", pauseAfterMs: 4000 },
      { text: "Chiudi gli occhi, se ti va, e lascia che il corpo si appoggi.", pauseAfterMs: 5000 },
      { text: "Non devi fare nulla. Sei già dove dovevi essere.", pauseAfterMs: 5000 },
      { text: "Fai un respiro lento, dal naso.", pauseAfterMs: 3000 },
      { text: "E lascialo uscire, piano, dalla bocca.", pauseAfterMs: 6000 },
      { text: "Ancora un respiro, senza fretta.", pauseAfterMs: 5000 },
      { text: "Nota il peso del corpo, appoggiato dove ti trovi.", pauseAfterMs: 6000 },
      { text: "Le spalle si abbassano, un poco di più.", pauseAfterMs: 6000 },
      { text: "La fronte si distende, la mascella si allenta.", pauseAfterMs: 6000 },
      { text: "Ogni parte di te può riposare, adesso.", pauseAfterMs: 7000 },
      { text: "I pensieri della giornata possono aspettare fuori dalla porta.", pauseAfterMs: 6000 },
      { text: "Non serve trattenerli, né allontanarli. Passano, come nuvole lente.", pauseAfterMs: 8000 },
      { text: "Il respiro rallenta, naturalmente, un poco a ogni ciclo.", pauseAfterMs: 7000 },
      { text: "Immagina un luogo tranquillo, dove ti senti al sicuro.", pauseAfterMs: 8000 },
      { text: "Puoi restare lì, senza fare nulla.", pauseAfterMs: 7000 },
      { text: "Il corpo è pesante, morbido, calmo.", pauseAfterMs: 7000 },
      { text: "Ogni respiro ti porta un passo più vicino al sonno.", pauseAfterMs: 8000 },
      { text: "Non c'è nulla da risolvere, stanotte.", pauseAfterMs: 7000 },
      { text: "Lascia che il buio ti accolga, dolcemente.", pauseAfterMs: 8000 },
      { text: "Quando sei pronto, lascia semplicemente andare. Buonanotte.", pauseAfterMs: 9000 },
    ],
  },
  focus: {
    id: "focus",
    title: "Focus",
    subtitle: "Schiarisci la mente e ritrova concentrazione",
    icon: "locate",
    lines: [
      { text: "Trova una posizione comoda, con la schiena dritta ma non rigida.", pauseAfterMs: 5000 },
      { text: "Porta l'attenzione al respiro, così com'è, senza cambiarlo.", pauseAfterMs: 5000 },
      { text: "Inspira, contando fino a quattro.", pauseAfterMs: 5000 },
      { text: "Trattieni, per quattro.", pauseAfterMs: 5000 },
      { text: "Espira, per quattro.", pauseAfterMs: 5000 },
      { text: "Fai una piccola pausa, di quattro.", pauseAfterMs: 6000 },
      { text: "Ripeti ancora questo ritmo, al tuo passo.", pauseAfterMs: 9000 },
      { text: "La mente si schiarisce, un pensiero alla volta.", pauseAfterMs: 6000 },
      { text: "Se arriva una distrazione, va bene così.", pauseAfterMs: 5000 },
      { text: "Notala, e torna al respiro, con gentilezza.", pauseAfterMs: 6000 },
      { text: "Immagina la tua attenzione come una luce, che puoi dirigere.", pauseAfterMs: 7000 },
      { text: "Ora punta quella luce su un solo compito, chiaro e semplice.", pauseAfterMs: 7000 },
      { text: "Il corpo è rilassato, la mente è sveglia.", pauseAfterMs: 6000 },
      { text: "Senti la differenza tra tensione e concentrazione.", pauseAfterMs: 6000 },
      { text: "La concentrazione è leggera, non forzata.", pauseAfterMs: 6000 },
      { text: "Porta ancora un respiro pieno, fino in fondo.", pauseAfterMs: 6000 },
      { text: "E uno che libera ciò che non serve.", pauseAfterMs: 6000 },
      { text: "Sei pronto, focalizzato, presente.", pauseAfterMs: 6000 },
      { text: "Quando apri gli occhi, porta questa chiarezza con te.", pauseAfterMs: 7000 },
    ],
  },
  ansia: {
    id: "ansia",
    title: "Ansia",
    subtitle: "Ritrova calma e sicurezza, un respiro alla volta",
    icon: "leaf",
    lines: [
      { text: "Sei in un luogo sicuro, adesso, in questo momento.", pauseAfterMs: 5000 },
      { text: "Appoggia i piedi bene a terra, se puoi.", pauseAfterMs: 5000 },
      { text: "Senti il contatto tra il corpo e ciò che ti sostiene.", pauseAfterMs: 6000 },
      { text: "Facciamo un respiro insieme, lentamente.", pauseAfterMs: 4000 },
      { text: "Inspira dal naso, contando fino a quattro.", pauseAfterMs: 5000 },
      { text: "Trattieni, con calma, per sette.", pauseAfterMs: 8000 },
      { text: "Espira dalla bocca, lasciando andare, per otto.", pauseAfterMs: 9000 },
      { text: "Molto bene. Ancora una volta, senza fretta.", pauseAfterMs: 4000 },
      { text: "Inspira, quattro.", pauseAfterMs: 5000 },
      { text: "Trattieni, sette.", pauseAfterMs: 8000 },
      { text: "Espira, otto, lasciando cadere le spalle.", pauseAfterMs: 9000 },
      { text: "Qualunque cosa tu senta ora, va bene.", pauseAfterMs: 6000 },
      { text: "Non devi combatterla, né controllarla.", pauseAfterMs: 6000 },
      { text: "Puoi solo osservarla, come un'onda che sale e poi scende.", pauseAfterMs: 7000 },
      { text: "Anche questa sensazione passerà, come è già successo prima.", pauseAfterMs: 7000 },
      { text: "Sei al sicuro, il pericolo non è qui, ora.", pauseAfterMs: 7000 },
      { text: "Nomina, in silenzio, cinque cose che puoi percepire intorno a te.", pauseAfterMs: 8000 },
      { text: "Il tuo respiro è un'ancora, sempre disponibile.", pauseAfterMs: 6000 },
      { text: "Torna a lui, ogni volta che ne hai bisogno.", pauseAfterMs: 7000 },
      { text: "Sei più forte di questo momento difficile.", pauseAfterMs: 8000 },
    ],
  },
};

const WORDS_PER_SECOND = 2.1;

export function estimateDurationSec(script: MeditationScript): number {
  const pauseSec = script.lines.reduce((sum, l) => sum + l.pauseAfterMs / 1000, 0);
  const speakSec = script.lines.reduce((sum, l) => {
    const words = l.text.split(/\s+/).filter(Boolean).length;
    return sum + words / WORDS_PER_SECOND;
  }, 0);
  return Math.round(pauseSec + speakSec);
}
