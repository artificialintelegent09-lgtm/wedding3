"use client";

import { useCallback, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { Divider } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe, GALLERY_LAYOUT, ROMAN, SHAPES, type GalleryTile } from "../config";
import { Lightbox } from "../Lightbox";
import { Framed, Rise, SectionLabel } from "../ui";

/** Photos the layout table does not mention still appear: plain frames, after the designed spread. */
function withOverflow(count: number): GalleryTile[] {
  const known = GALLERY_LAYOUT.filter((t) => t.i < count);
  const used = new Set(known.map((t) => t.i));
  const extra: GalleryTile[] = [];
  for (let i = 0; i < count; i++) {
    if (!used.has(i)) extra.push({ i, shape: "rect", span: "col-span-1 lg:col-span-4", aspect: "aspect-[4/5]" });
  }
  return [...known, ...extra];
}

/**
 * A curated collection of fine-art prints. Each photograph is cut to a silhouette from the garden
 * (doorway arch, petal, moon gate, leaf) and hung at its own height, with a small botanical caption.
 * Photos open in the order of the data file, not the visual order, so numbering stays stable.
 */
export function Gallery() {
  const { data, copy, locale } = useInvitation();
  const { b, no } = useBotanical();
  const [open, setOpen] = useState<number | null>(null);
  const onChange = useCallback((i: number | null) => setOpen(i), []);
  const tiles = withOverflow(data.gallery.length);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bot-paper bot-paper-dark bot-ink-light relative overflow-hidden bg-forest text-linen">
      <div className="relative mx-auto max-w-[80rem] px-5 py-24 sm:px-10 lg:py-36">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel no={no("gallery")} tone="light">
              {b.gallery.label}
            </SectionLabel>
            <h2 id="gallery-title" className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-light italic leading-[0.94] tracking-[-0.02em]">
              <Rise>{b.gallery.title}</Rise>
            </h2>
          </div>
          <div className="lg:pb-3">
            <Divider className="h-9 w-48 lg:ml-auto" />
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sage lg:text-right">{b.gallery.count(data.gallery.length)}</p>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:mt-24 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
          {tiles.map((tile, n) => {
            const img = data.gallery[tile.i];
            const caption = describe(img, locale);
            return (
              <li key={img.src} className={`${tile.span} ${tile.offset ?? ""}`}>
                <Reveal y={40} delay={(n % 2) * 0.08}>
                  <figure className="group text-sage">
                    <div className="relative">
                      <Framed
                        asset={img}
                        alt={caption}
                        shape={tile.shape}
                        sizes="(min-width: 1024px) 45vw, 50vw"
                        className={`${tile.aspect} w-full`}
                        photoClass="transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                      />
                      <button
                        type="button"
                        onClick={() => setOpen(tile.i)}
                        aria-label={`${copy.gallery.open} ${ROMAN[tile.i] ?? tile.i + 1}: ${caption}`}
                        className={`absolute inset-0 z-10 cursor-zoom-in ${SHAPES[tile.shape]}`}
                      />
                    </div>
                    <figcaption className="mt-5 flex items-baseline gap-3 text-linen/85">
                      <span className="shrink-0 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-sage">
                        {b.gallery.plate} {ROMAN[tile.i] ?? tile.i + 1}
                      </span>
                      <span aria-hidden="true" className="h-px w-6 shrink-0 translate-y-[-0.25em] bg-sage/50" />
                      <span className="font-display text-[1.05rem] italic leading-snug">{caption}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
      <Lightbox images={data.gallery} index={open} onChange={onChange} />
    </section>
  );
}
