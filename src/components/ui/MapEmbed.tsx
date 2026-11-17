import { mapsEmbedUrl } from "@/lib/calendar";

/**
 * Google Maps embed (keyless) mounted like a print in a paper mat: warm, desaturated
 * so the bright default map colours do not fight the palette.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  return (
    <div className="border border-gold/60 bg-paper p-2 shadow-[0_30px_60px_-40px_rgba(36,8,16,0.55)] sm:p-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2 sm:aspect-[4/3]">
        <iframe
          title={title}
          src={mapsEmbedUrl(query)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.5)_saturate(0.65)_contrast(0.96)_brightness(1.02)]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/25" aria-hidden="true" />
      </div>
    </div>
  );
}
