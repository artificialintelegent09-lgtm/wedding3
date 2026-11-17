/**
 * Prepares customer photos for a static site (there is no image optimizer at runtime).
 *
 *   npm run images:optimize -- <inputDir> <outputDir> [maxWidth]
 *   npm run images:optimize -- ./originals public/images/amelia-rafael
 *
 * - Resizes to at most `maxWidth` px wide (default 1800), never upscaling.
 * - Applies the EXIF rotation, then strips all metadata (including GPS location).
 * - Writes progressive JPEGs (.jpg) to <outputDir>. Originals are never modified.
 *
 * Remember to point the image paths in your invitation data file at the new files, and copy
 * the printed WIDTHxHEIGHT into each image entry (the gallery uses them for layout).
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { extname, join, parse, resolve } from "node:path";

const [input, output, widthArg] = process.argv.slice(2);
if (!input || !output) {
  console.error("Usage: npm run images:optimize -- <inputDir> <outputDir> [maxWidth]");
  process.exit(1);
}
if (resolve(input) === resolve(output)) {
  console.error("Input and output must be different folders: originals are never overwritten.");
  process.exit(1);
}

const maxWidth = Number(widthArg) || 1800;
const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

await mkdir(output, { recursive: true });

let count = 0;
let before = 0;
let after = 0;

for (const file of await readdir(input)) {
  if (!SUPPORTED.has(extname(file).toLowerCase())) continue;
  const source = join(input, file);
  const target = join(output, `${parse(file).name}.jpg`);

  const info = await sharp(source)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(target);

  const [a, b] = [(await stat(source)).size, (await stat(target)).size];
  before += a;
  after += b;
  count += 1;
  console.log(`${file} → ${parse(target).base}  ${info.width}x${info.height}  ${(a / 1024).toFixed(0)} KB → ${(b / 1024).toFixed(0)} KB`);
}

console.log(`\n${count} image(s): ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);
