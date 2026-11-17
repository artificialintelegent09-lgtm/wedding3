/**
 * Synthesises the demo ambient loop (public/audio/muse-ambient.wav): a slow, soft Am9 pad.
 * Every frequency is a whole number of cycles per loop, so the file loops without a click.
 * It exists only so the music control can be demonstrated without shipping third-party audio:
 * replace it with your own licensed track via `music.src` in the invitation data.
 *
 *   node scripts/generate-ambient.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";

const RATE = 22050;
const SECONDS = 24;
const N = RATE * SECONDS;

// [cycles per loop, relative volume, tremolo cycles per loop, tremolo phase]
const partials = [
  [2640, 0.9, 1, 0], // A2
  [3955, 0.6, 2, 1.3], // E3
  [5280, 0.7, 1, 2.1], // A3
  [5286, 0.45, 3, 0.4], // A3, detuned for slow beating
  [6279, 0.5, 2, 3.4], // C4
  [7911, 0.45, 1, 4.4], // E4
  [11853, 0.3, 3, 5.2], // B4
  [11859, 0.22, 2, 0.9], // B4, detuned
];

const out = new Int16Array(N);
for (let i = 0; i < N; i++) {
  const t = i / N; // 0..1 across the loop
  let s = 0;
  for (const [cycles, vol, trem, phase] of partials) {
    const env = 0.55 + 0.45 * Math.sin(2 * Math.PI * trem * t + phase);
    s += vol * env * Math.sin(2 * Math.PI * cycles * t);
  }
  out[i] = Math.round((s / partials.length) * 0.9 * 32767);
}

const data = Buffer.from(out.buffer);
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + data.length, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(data.length, 40);

await mkdir("public/audio", { recursive: true });
await writeFile("public/audio/muse-ambient.wav", Buffer.concat([header, data]));
console.log(`public/audio/muse-ambient.wav  ${((header.length + data.length) / 1024 / 1024).toFixed(2)} MB`);
