// Generates seamless, loopable ambient background tracks for the meditation
// app, entirely procedurally (no samples, no copyrighted material).
// Run with: node scripts/generate-ambient-audio.js
const fs = require("fs");
const path = require("path");

const SAMPLE_RATE = 44100;
const OUT_DIR = path.join(__dirname, "..", "assets", "audio");

function writeWavStereo(filePath, left, right, sampleRate) {
  const numFrames = left.length;
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample * 2; // stereo
  const dataSize = numFrames * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(2, 22); // channels
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * blockAlign, 28); // byte rate
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    const l = Math.max(-1, Math.min(1, left[i]));
    const r = Math.max(-1, Math.min(1, right[i]));
    buffer.writeInt16LE(Math.round(l * 32767), offset);
    buffer.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }
  fs.writeFileSync(filePath, buffer);
}

// Leaky-integrator "brown"/"pink"-ish colored noise generator.
function coloredNoise(n, leak, seed) {
  let rng = seed;
  const rand = () => {
    // simple deterministic PRNG (mulberry32) for reproducibility
    rng |= 0;
    rng = (rng + 0x6d2b79f5) | 0;
    let t = Math.imul(rng ^ (rng >>> 15), 1 | rng);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = new Float32Array(n);
  let acc = 0;
  let maxAbs = 1e-6;
  for (let i = 0; i < n; i++) {
    const white = rand() * 2 - 1;
    acc = acc * leak + white * (1 - leak);
    out[i] = acc;
    if (Math.abs(acc) > maxAbs) maxAbs = Math.abs(acc);
  }
  for (let i = 0; i < n; i++) out[i] /= maxAbs;
  return out;
}

// Makes any signal array loop seamlessly by crossfading the tail of an
// over-generated buffer into the head, so index N-1 flows into index 0.
function makeLoopable(raw, n, xfade) {
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = raw[i];
  for (let i = 0; i < xfade; i++) {
    const t = i / xfade;
    out[i] = raw[i] * t + raw[n + i] * (1 - t);
  }
  return out;
}

function generateTrack({
  name,
  duration,
  freqs,
  noiseLevel,
  noiseLeak,
  lfoFreq,
  lfoDepth,
  lfoBase,
  detuneHz,
  seed,
}) {
  const n = Math.round(duration * SAMPLE_RATE);
  const xfade = Math.round(2 * SAMPLE_RATE); // 2s crossfade for the loop seam
  const total = n + xfade;

  const rawL = new Float32Array(total);
  const rawR = new Float32Array(total);

  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    const lfo = lfoBase + lfoDepth * Math.sin(2 * Math.PI * lfoFreq * t);
    let sampleL = 0;
    let sampleR = 0;
    for (const f of freqs) {
      sampleL += Math.sin(2 * Math.PI * (f - detuneHz / 2) * t);
      sampleR += Math.sin(2 * Math.PI * (f + detuneHz / 2) * t);
    }
    sampleL = (sampleL / freqs.length) * lfo;
    sampleR = (sampleR / freqs.length) * lfo;
    rawL[i] = sampleL;
    rawR[i] = sampleR;
  }

  const noiseL = coloredNoise(total, noiseLeak, seed);
  const noiseR = coloredNoise(total, noiseLeak, seed + 1);
  for (let i = 0; i < total; i++) {
    rawL[i] = rawL[i] * (1 - noiseLevel) + noiseL[i] * noiseLevel;
    rawR[i] = rawR[i] * (1 - noiseLevel) + noiseR[i] * noiseLevel;
  }

  const loopedL = makeLoopable(rawL, n, xfade);
  const loopedR = makeLoopable(rawR, n, xfade);

  // Gentle overall headroom so the tone mix never clips.
  for (let i = 0; i < n; i++) {
    loopedL[i] *= 0.55;
    loopedR[i] *= 0.55;
  }

  const outPath = path.join(OUT_DIR, `${name}.wav`);
  writeWavStereo(outPath, loopedL, loopedR, SAMPLE_RATE);
  console.log(`wrote ${outPath} (${duration}s loop)`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

// Sonno (Sleep): very low, slow-breathing pad, heavy soft brown noise bed.
generateTrack({
  name: "ambient-sonno",
  duration: 40,
  freqs: [110, 130.8, 164.8], // A2, C3, E3
  noiseLevel: 0.35,
  noiseLeak: 0.995,
  lfoFreq: 0.125, // 8s swell
  lfoDepth: 0.18,
  lfoBase: 0.82,
  detuneHz: 0.6,
  seed: 1,
});

// Focus: steadier, slightly brighter drone with light air/noise texture.
generateTrack({
  name: "ambient-focus",
  duration: 40,
  freqs: [174.6, 220, 261.6], // F3, A3, C4
  noiseLevel: 0.18,
  noiseLeak: 0.97,
  lfoFreq: 0.05, // 20s slow swell, mostly steady
  lfoDepth: 0.08,
  lfoBase: 0.92,
  detuneHz: 1.2,
  seed: 7,
});

// Ansia (Anxiety): warm chord modulated on a slow-breath pace (10s cycle).
generateTrack({
  name: "ambient-ansia",
  duration: 40,
  freqs: [130.8, 164.8, 196], // C3, E3, G3
  noiseLevel: 0.28,
  noiseLeak: 0.99,
  lfoFreq: 0.1, // 10s breathing-paced swell
  lfoDepth: 0.22,
  lfoBase: 0.8,
  detuneHz: 0.8,
  seed: 42,
});
