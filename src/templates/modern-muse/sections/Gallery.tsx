"use client";

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Photo } from "@/components/ui/Photo";
import { GALLERY_LAYOUT, pad2, type GalleryTile } from "../config";
import { Lightbox } from "../Lightbox";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

/** Photos the layout table does not mention still appear: four-up, plain, after the designed spread. */
function withOverflow(count: number): GalleryTile[] {
  const known = GALLERY_LAYOUT.filter((t) => t.i < count);
  const used = new Set(known.map((t) => t.i));
  const extra: GalleryTile[] = [];
  for (let i = 0; i < count; i++) {
    if (!used.has(i)) extra.push({ i, span: "col-span-1 lg:col-span-3", aspect: "aspect-[4/5]" });
  }
  return [...known, ...extra];
}

/**
 * Curated gallery: mixed aspect ratios on an offset grid so no two neighbours align, hover
 * captions on desktop, and a lightbox with swipe. Photos open in the order of the data file,
 * not the visual order, so the numbering stays stable when the layout is re-arranged.
 */
export function Gallery() {
  const { data, copy } = useInvitation();
  const { m, no } = useMuse();
  const [open, setOpen] = useState<number | null>(null);
  const onChange = useCallback((i: number | null) => setOpen(i), []);
  const tiles = withOverflow(data.gallery.length);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="muse-grain muse-grain-dark relative overflow-hidden bg-espresso text-ivory">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("gallery")} label={m.gallery.label} tone="light" />
        <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2 id="gallery-title" className="font-display text-[clamp(3.6rem,11vw,10rem)] font-light italic leading-[0.88] tracking-[-0.035em]">
            <MaskLine>{m.gallery.title}</MaskLine>
          </h2>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-taupe">{m.gallery.plates(data.gallery.length)}</p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          {tiles.map((tile) => {
            const img = data.gallery[tile.i];
            return (
              <li key={img.src} className={`${tile.span} ${tile.offset ?? ""}`}>
                <ImageReveal className={`relative ${tile.aspect} bg-ivory/5`}>
                  <button
                    type="button"
                    onClick={() => setOpen(tile.i)}
                    aria-label={`${copy.gallery.open} ${pad2(tile.i + 1)}: ${img.alt}`}
                    className="group relative block h-full w-full cursor-zoom-in overflow-hidden"
                  >
                    <span className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
                      <Photo asset={img} sizes="(min-width: 1024px) 45vw, 50vw" />
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 via-45% to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span aria-hidden="true" className="absolute left-3 top-3 bg-espresso px-2 py-1 text-[0.62rem] font-bold tracking-[0.2em]">
                      {pad2(tile.i + 1)}
                    </span>
                    <span aria-hidden="true" className="absolute inset-x-3 bottom-3 hidden translate-y-3 items-end justify-between gap-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
                      <span className="text-xs font-medium leading-snug">{img.alt}</span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center bg-terracotta">
                        <Plus className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </span>
                  </button>
                </ImageReveal>
              </li>
            );
          })}
        </ul>
      </div>
      <Lightbox images={data.gallery} index={open} onChange={onChange} />
    </section>
  );
}
