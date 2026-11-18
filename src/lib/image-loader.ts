import variants from "./image-variants.json";

/** Widths of the generated variants per photo: written by `npm run images:responsive`. */
const widthsBySrc = variants as Record<string, number[]>;

/**
 * Image loader for the static export (there is no optimizer server). next/image asks for a width; this answers
 * with the smallest pre-generated variant that is at least that wide, or the master photo when none is.
 * Photos that are not in the manifest (new files, external URLs) are served unchanged.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const available = widthsBySrc[src];
  const fit = available?.find((w) => w >= width);
  return fit === undefined ? src : src.replace(/\.[^./]+$/, `.w${fit}.webp`);
}
