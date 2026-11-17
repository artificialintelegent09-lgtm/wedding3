"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { lt } from "@/lib/i18n";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StoryMoment } from "@/types/invitation";

/** Splits "June 2018" into a large year and a small remainder. Falls back to the whole string. */
function splitDate(date: string) {
  const year = date.match(/\b(1[89]\d{2}|20\d{2})\b/)?.[0];
  return year ? { year, rest: date.replace(year, "").trim() } : { year: null, rest: date };
}

/** A tiny ornamental marker on the timeline: a diamond inside a ring. */
function Marker({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border border-gold-deep bg-paper ${className}`}>
      <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
    </span>
  );
}

function Moment({ moment, index }: { moment: StoryMoment; index: number }) {
  const { locale } = useInvitation();
  const flip = index % 2 === 1;
  const { year, rest } = splitDate(lt(moment.date, locale));
  const portrait = index % 2 === 0;

  return (
    <li className="relative pl-10 md:grid md:grid-cols-12 md:gap-8 md:pl-0">
      <Marker className="left-[10px] top-3 md:left-1/2" />

      {moment.image && (
        <div className={`md:col-span-5 md:row-start-1 ${flip ? "md:col-start-8" : "md:col-start-1"}`}>
          <div className="relative">
            <div aria-hidden="true" className={`absolute top-3 h-full w-full border border-gold/60 ${flip ? "-left-3" : "left-3"}`} />
            <ImageReveal from={flip ? "right" : "left"} className={`relative w-full ${portrait ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Photo asset={moment.image} sizes="(min-width: 768px) 40vw, 80vw" />
            </ImageReveal>
          </div>
        </div>
      )}

      <Reveal
        x={flip ? 24 : -24}
        y={0}
        className={`mt-8 md:row-start-1 md:mt-0 md:self-center md:col-span-5 ${flip ? "md:col-start-1 md:text-right" : "md:col-start-8"}`}
      >
        {year && (
          <p className="font-display text-[4.6rem] font-normal italic leading-[0.85] tracking-[-0.03em] text-rose sm:text-8xl">{year}</p>
        )}
        <p className="mt-3 text-[0.68rem] font-normal uppercase tracking-[0.34em] text-gold-deep">{rest}</p>
        <h3 className="mt-3 font-display text-[1.9rem] font-normal leading-tight text-primary sm:text-4xl">{lt(moment.title, locale)}</h3>
        <p className={`mt-4 max-w-md text-[0.98rem] font-light leading-[1.9] text-ink/80 ${flip ? "md:ml-auto" : ""}`}>{lt(moment.body, locale)}</p>
      </Reveal>
    </li>
  );
}

export function Story() {
  const { data, copy } = useInvitation();
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const moments = data.story ?? [];

  return (
    <section id="story" className="surface surface-paper relative overflow-hidden px-6 py-24 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={copy.story.eyebrow} title={copy.story.title} index="05" align="left" />

        <ol ref={listRef} className="relative mt-16 space-y-20 md:space-y-32">
          {/* spine: a faint track, and a thin line that draws as you scroll */}
          <span aria-hidden="true" className="absolute bottom-0 left-[10px] top-0 w-px -translate-x-1/2 bg-primary/15 md:left-1/2" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-[10px] top-0 w-px origin-top -translate-x-1/2 bg-primary md:left-1/2"
            style={{ scaleY: reduce ? 1 : scaleY }}
          />
          {moments.map((m, i) => (
            <Moment key={i} moment={m} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
