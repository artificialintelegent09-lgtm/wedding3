"use client";

import { useMemo, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryImage } from "@/types/invitation";

type Orientation = "wide" | "tall" | "square";
const orientation = (i: GalleryImage): Orientation => {
  const r = i.width / i.height;
  return r > 1.15 ? "wide" : r < 0.87 ? "tall" : "square";
};

/**
 * Rows are composed from the photos' own proportions: wide frames get a row to themselves
 * (alternating sides), portrait/square frames pair up at unequal widths with the second
 * stepped down, a lone portrait sits off-centre. The rhythm repeats but never tiles evenly.
 */
interface Row {
  kind: "wide" | "single" | "pair";
  items: number[];
  flip: boolean;
}

function composeRows(images: GalleryImage[]): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < images.length; ) {
    const a = images[i];
    const b = images[i + 1];
    const flip = rows.length % 2 === 1;
    if (orientation(a) !== "wide" && b && orientation(b) !== "wide") {
      rows.push({ kind: "pair", items: [i, i + 1], flip });
      i += 2;
    } else {
      rows.push({ kind: orientation(a) === "wide" ? "wide" : "single", items: [i], flip });
      i += 1;
    }
  }
  return rows;
}

function Tile({ image, index, onOpen, offsetFrame }: { image: GalleryImage; index: number; onOpen: (i: number) => void; offsetFrame: boolean }) {
  const { copy } = useInvitation();
  return (
    <figure className="group relative">
      {offsetFrame && <div aria-hidden="true" className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-full w-full border border-gold/45" />}
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`${copy.gallery.open}: ${image.alt}`}
        className="relative block w-full cursor-zoom-in"
      >
        <ImageReveal className="relative">
          <div className="relative w-full" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
            <Photo
              asset={image}
              sizes="(min-width: 1152px) 520px, (min-width: 640px) 45vw, 90vw"
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
            />
          </div>
        </ImageReveal>
      </button>
      <figcaption className="mt-2.5 flex items-center gap-3 font-display text-xs italic text-gold-light/70">
        <span>N° {String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gold/25" />
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const { data, copy } = useInvitation();
  const [active, setActive] = useState<number | null>(null);
  const rows = useMemo(() => composeRows(data.gallery), [data.gallery]);

  return (
    <section id="gallery" className="surface surface-espresso relative overflow-hidden px-5 py-24 text-paper sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.gallery.eyebrow} title={copy.gallery.title} index="04" tone="light" align="left" />

        <div className="mt-16 space-y-12 sm:space-y-20">
          {rows.map((row, r) => {
            const side = row.flip ? "ml-auto" : "";
            if (row.kind === "wide") {
              return (
                <Reveal key={r} y={36} className={`w-full lg:w-[82%] ${side}`}>
                  <Tile image={data.gallery[row.items[0]]} index={row.items[0]} onOpen={setActive} offsetFrame={r % 3 === 0} />
                </Reveal>
              );
            }
            if (row.kind === "single") {
              return (
                <Reveal key={r} y={36} className={`w-[70%] sm:w-[52%] lg:w-[44%] ${side}`}>
                  <Tile image={data.gallery[row.items[0]]} index={row.items[0]} onOpen={setActive} offsetFrame={r % 3 === 1} />
                </Reveal>
              );
            }
            const [a, b] = row.items;
            return (
              <div key={r} className={`flex items-start justify-between gap-4 sm:gap-8 lg:w-full ${row.flip ? "flex-row-reverse lg:ml-auto" : ""}`}>
                <Reveal y={36} className="w-[56%] sm:w-[54%]">
                  <Tile image={data.gallery[a]} index={a} onOpen={setActive} offsetFrame={r % 3 === 2} />
                </Reveal>
                <Reveal y={36} delay={0.12} className="mt-14 w-[38%] sm:mt-24 sm:w-[38%]">
                  <Tile image={data.gallery[b]} index={b} onOpen={setActive} offsetFrame={false} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox images={data.gallery} index={active} onChange={setActive} />
    </section>
  );
}
