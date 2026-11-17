"use client";

import { ArrowUp } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { FloralCorner } from "@/components/ornaments/FloralCorner";
import { BotanicalSprig } from "@/components/ornaments/botanical-line";
import { Monogram } from "@/components/ornaments/Monogram";
import { Photo } from "@/components/ui/Photo";
import { formatLongDate } from "@/lib/datetime";
import { lt } from "@/lib/i18n";

/** The last page: full-bleed photograph, the closing words, names large, and a final bloom. */
export function Closing() {
  const { data, copy, locale } = useInvitation();
  const { bride, groom } = data.couple;
  return (
    <section
      id="closing"
      className="surface surface-espresso relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-32 pt-40 text-center text-paper sm:pb-36"
    >
      <Parallax amount={9} className="absolute inset-0 -z-10">
        <Photo asset={data.images.closing} sizes="100vw" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/80 via-45% to-deep/30" aria-hidden="true" />

      {/* one rich bloom cluster rests low-left; one line-drawing rises on the right */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-[40vw] max-w-[300px] -scale-y-100 sm:max-w-[400px]" aria-hidden="true">
        <FloralCorner className="h-auto w-full origin-top-left motion-safe:animate-sway" />
      </div>
      <BotanicalSprig bg="transparent" className="pointer-events-none absolute right-2 top-24 h-64 w-auto rotate-[10deg] text-gold-light/60 sm:right-16 sm:h-[26rem]" />

      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <Monogram monogram={data.couple.monogram} className="mx-auto w-20 text-gold-light" />
          <p className="mt-8 text-[0.66rem] font-normal uppercase tracking-[0.42em] text-gold-light">{lt(data.closing.signature, locale) || copy.closing.kicker}</p>
          <p className="mt-5 font-display text-[1.35rem] font-medium italic leading-[1.6] text-paper/90 sm:text-2xl">{lt(data.closing.message, locale)}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 border-t border-paper/25 pt-10">
          <p className="font-display font-normal leading-[0.9] tracking-[-0.02em] [font-variation-settings:'opsz'_30]">
            <span className="block text-[4.2rem] sm:text-8xl">{bride.nickname}</span>
            <span className="my-1 block text-3xl italic text-rose">&amp;</span>
            <span className="block text-[4.2rem] italic sm:text-8xl">{groom.nickname}</span>
          </p>
          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.4em] text-paper/70">
            {formatLongDate(data.weddingDate, locale, data.events[0]?.timeZone ?? "UTC")}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-12">
          <a
            href="#home"
            className="group inline-flex min-h-11 items-center gap-2 border-b border-paper/50 pb-0.5 text-[0.66rem] uppercase tracking-[0.32em] text-paper/80 transition-colors hover:border-paper hover:text-paper"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.4} aria-hidden="true" />
            {copy.nav.home}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
