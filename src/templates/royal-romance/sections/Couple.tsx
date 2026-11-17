"use client";

import { AtSign } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { BotanicalCorner } from "@/components/ornaments/botanical-line";
import { Rule } from "@/components/ornaments/Rule";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { lt } from "@/lib/i18n";
import type { Person } from "@/types/invitation";

function Details({ person, label, align }: { person: Person; label: string; align: "left" | "right" }) {
  const { locale } = useInvitation();
  const right = align === "right";
  return (
    <Reveal className={`mt-8 ${right ? "text-right" : "text-left"}`}>
      <p className="text-[0.68rem] font-normal uppercase tracking-[0.36em] text-gold-deep">{label}</p>
      <h3 className="mt-2 font-display text-[3.6rem] font-normal italic leading-[0.95] tracking-[-0.02em] text-primary sm:text-7xl">
        {person.nickname}
      </h3>
      <p className="mt-3 font-display text-base font-normal uppercase tracking-[0.2em] text-ink/80 sm:text-lg">
        {person.fullName}
      </p>
      <Rule align="left" className={`mt-5 text-gold ${right ? "ml-auto" : ""}`} />
      <p className="mt-5 text-[0.66rem] font-normal uppercase tracking-[0.3em] text-muted">{lt(person.childOf, locale)}</p>
      <p className="mt-2 font-display text-lg font-normal leading-snug text-ink">
        {person.fatherName}
        <span className="mx-2 italic text-rose-deep">&amp;</span>
        <br className="sm:hidden" />
        {person.motherName}
      </p>
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm tracking-wide text-primary underline decoration-gold underline-offset-4 transition-opacity hover:opacity-70"
        >
          <AtSign className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          {person.instagram}
        </a>
      )}
    </Reveal>
  );
}

/**
 * Two portraits, deliberately unalike: the bride in a tall arch on the left, the groom in a
 * squared frame stepped down on the right. A hairline and a ghosted ampersand tie them together.
 */
export function Couple() {
  const { data, copy } = useInvitation();
  const { bride, groom } = data.couple;
  return (
    <section id="couple" className="surface surface-aged relative overflow-hidden px-6 py-24 sm:py-36">
      <BotanicalCorner bg="var(--tpl-paper-2)" className="pointer-events-none absolute -right-6 -top-6 w-44 -scale-x-100 text-gold/70 sm:w-64" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.couple.eyebrow} title={copy.couple.title} index="01" align="left" />

        {/* ghosted ampersand behind the portraits */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 select-none font-display text-[22rem] italic leading-none text-primary/[0.04] sm:text-[34rem]"
        >
          &amp;
        </span>

        <div className="relative mt-16 grid gap-20 lg:grid-cols-12 lg:gap-x-8">
          {/* bride: arch, left */}
          <article className="lg:col-span-5">
            <div className="relative mr-auto w-[82%] lg:w-full">
              <div aria-hidden="true" className="absolute left-3 top-3 h-full w-full rounded-t-[999px] border border-gold/70" />
              <ImageReveal from="bottom" className="relative aspect-[4/5] rounded-t-[999px]">
                <Photo asset={bride.photo} sizes="(min-width: 1024px) 40vw, 82vw" />
              </ImageReveal>
            </div>
            <Details person={bride} label={copy.couple.brideLabel} align="left" />
          </article>

          {/* groom: squared frame, right, stepped down */}
          <article className="lg:col-span-5 lg:col-start-8 lg:mt-48">
            <div className="relative ml-auto w-[74%] lg:w-full">
              <div aria-hidden="true" className="absolute -left-3 top-3 h-full w-full border border-gold/70" />
              <ImageReveal from="bottom" className="relative aspect-[3/4]">
                <Photo asset={groom.photo} sizes="(min-width: 1024px) 40vw, 74vw" />
              </ImageReveal>
            </div>
            <Details person={groom} label={copy.couple.groomLabel} align="right" />
          </article>
        </div>
      </div>
    </section>
  );
}
