"use client";

import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Photo } from "@/components/ui/Photo";
import { lt } from "@/lib/i18n";
import { PICKS } from "../config";
import { useMuse } from "../MuseContext";
import { Caption, MaskLine, SectionHead, VerticalMeta } from "../ui";

/**
 * Wedding quote + invitation message. A single oversized italic statement on ivory, a vertical
 * running head, and one photograph set low and to the left against the text: whitespace as a
 * design element.
 */
export function Quote() {
  const { data, locale } = useInvitation();
  const { m, no } = useMuse();
  const photo = data.gallery[PICKS.quote] ?? data.images.cover;

  return (
    <section id="invitation" aria-label={m.sections.invitation} className="muse-grain relative overflow-hidden bg-ivory text-espresso">
      <div className="mx-auto grid max-w-[90rem] grid-cols-12 gap-x-4 px-5 pb-24 pt-24 sm:px-10 lg:gap-x-8 lg:pb-40 lg:pt-40">
        <div className="col-span-12 lg:col-span-1">
          <SectionHead no={no("invitation")} label={m.quote.label} className="lg:hidden" />
          <VerticalMeta className="hidden text-espresso/70 lg:block">
            {no("invitation")} — {m.quote.label}
          </VerticalMeta>
        </div>

        <div className="col-span-12 mt-10 lg:col-span-10 lg:col-start-2 lg:mt-0">
          <span
            aria-hidden="true"
            className="block h-[0.55em] font-display text-[clamp(7rem,22vw,16rem)] font-light leading-none text-terracotta"
          >
            “
          </span>
          <Reveal y={36}>
            <blockquote className="max-w-[34ch] font-display text-[clamp(1.7rem,4.1vw,3.6rem)] font-light italic leading-[1.16] tracking-[-0.01em] [text-wrap:balance] lg:max-w-[36ch]">
              {lt(data.intro.quote, locale)}
            </blockquote>
          </Reveal>
          {data.intro.quoteSource && (
            <p className="mt-8 flex items-center gap-4 text-[0.72rem] font-bold uppercase tracking-[0.28em]">
              <span aria-hidden="true" className="h-px w-12 bg-terracotta" />
              {lt(data.intro.quoteSource, locale)}
            </p>
          )}
        </div>

        <div className="col-span-12 mt-20 grid grid-cols-12 items-end gap-x-4 lg:mt-32 lg:gap-x-8">
          <figure className="col-span-8 sm:col-span-6 lg:col-span-4 lg:col-start-2">
            <ImageReveal from="left" className="relative aspect-[3/4]">
              <Photo asset={photo} sizes="(min-width: 1024px) 30vw, 70vw" />
            </ImageReveal>
            <Caption no="01" className="mt-3 max-w-xs">{photo.alt}</Caption>
          </figure>

          <div className="col-span-12 mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pb-6">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-terracotta">{m.quote.invitation}</p>
            <h2 className="sr-only">{m.sections.invitation}</h2>
            <p className="mt-4 text-[clamp(1.05rem,1.5vw,1.3rem)] font-normal leading-[1.75] text-espresso/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2rem] first-letter:font-medium first-letter:leading-[0.8] first-letter:text-terracotta">
              {lt(data.intro.message, locale)}
            </p>
            <div className="mt-8 overflow-hidden font-display text-[clamp(2.6rem,5vw,4.2rem)] font-light italic leading-[0.95]">
              <MaskLine>{data.couple.bride.nickname}</MaskLine>
              <MaskLine delay={0.12} className="pl-[1.2em] text-terracotta">
                &amp; {data.couple.groom.nickname}
              </MaskLine>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
