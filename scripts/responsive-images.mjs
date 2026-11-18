/**
 * Builds the responsive variants of every photo in public/images/<set>/ (there is no image optimizer on a static
 * site, so the variants are made ahead of time and committed).
 *
 *   npm run images:responsive
 *
 * For each master `<name>.webp|jpg|png` it writes `<name>.w<width>.webp` at 640, 1080 and 1440 px (only widths
 * clearly smaller than the master: never upscaled), then records which widths exist in src/lib/image-variants.json.
 * src/lib/image-loader.ts reads that file, and next/image turns it into a real srcset: phones download the small
 * file; when no variant is wide enough the master itself is served.
 *
 * Masters are never modified or deleted, and previously generated variants are rebuilt from them, so the
 * script can be re-run safely after adding or replacing a photo.
 */
import sharp from "sharp";
import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { join, parse, relative, sep } from "node:path";

const ROOT = "public/images";
const TIERS = [640, 1080, 1440];
const QUALITY = 74;
const MASTER = /\.(webp|jpe?g|png)$/i;
const VARIANT = /\.w\d+\.webp$/i;
// Link-preview image: must stay a JPEG at a fixed path, and is not used through next/image.
const SKIP = new Set(["og.jpg"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const manifest = {};
let before = 0;
let after = 0;

for await (const file of walk(ROOT)) {
  const { dir, name, base } = parse(file);
  if (!MASTER.test(base) || VARIANT.test(base) || SKIP.has(base)) continue;

  const master = sharp(file);
  const { width } = await master.metadata();
  // Skip tiers that would barely differ from the master: it is served when no variant is wide enough.
  const widths = TIERS.filter((w) => w <= width * 0.95);

  const key = "/" + relative("public", file).split(sep).join("/");
  manifest[key] = widths;
  before += (await stat(file)).size;

  for (const w of widths) {
    const out = join(dir, `${name}.w${w}.webp`);
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(out);
    const size = (await stat(out)).size;
    after += size;
    console.log(`${out.split(sep).join("/")}  ${(size / 1024).toFixed(0)} KB`);
  }
}

await mkdir("src/lib", { recursive: true });
await writeFile("src/lib/image-variants.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} photos, masters ${(before / 1024).toFixed(0)} KB, variants ${(after / 1024).toFixed(0)} KB`);
