"use client";

import { AtSign } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { lt } from "@/lib/i18n";
import type { Person } from "@/types/invitation";
import { BaseSpray, Sprig } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe, type Shape } from "../config";
import { Framed, Rise, SectionLabel } from "../ui";

/** One person as a herbarium sheet: a pressed portrait, a sprig, and a typed specimen label with their family. */
function Plate({ person, index, label, shape, className = "" }: { person: Person; index: number; label: string; shape: Shape; className?: string }) {
  const { locale } = useInvitation();
  const { b } = useBotanical();
  const tilt = index % 2 === 0 ? "sm:-rotate-[0.6deg]" : "sm:rotate-[0.6deg]";

  return (
    <article className={`relative bg-[#faf8f1] p-5 shadow-[0_30px_60px_-34px_rgba(38,61,50,0.55)] ring-1 ring-forest/10 sm:p-8 ${tilt} ${className}`}>
      <span aria-hidden="true" className="bot-tape absolute -top-3 left-6 h-6 w-20 -rotate-6 opacity-90" />
      <span aria-hidden="true" className="bot-tape absolute -top-3 right-6 h-6 w-20 rotate-6 opacity-90" />

      <div className="relative mx-auto w-[86%] max-w-sm text-moss-deep">
        <Framed
          asset={person.photo}
          alt={describe(person.photo, locale)}
          shape={shape}
          sizes="(min-width: 1024px) 28vw, 80vw"
          className="aspect-[4/5] w-full"
        />
        <Sprig flip={index % 2 === 0} className="pointer-events-none absolute -bottom-6 -right-10 h-44 w-14 sm:-right-14 sm:h-52 sm:w-16" delay={0.3} />
      </div>

      <div className="mt-8 border border-forest/25 p-5 text-forest sm:p-6">
        <p className="flex items-baseline justify-between gap-4 text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">
          <span>{label}</span>
          <span className="font-display text-base font-medium normal-case italic tracking-normal">
            {b.couple.plate} {String(index + 1).padStart(2, "0")}
          </span>
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.5rem)] font-medium leading-[1.05]">{person.fullName}</h3>

        <div className="mt-5 border-t border-forest/20 pt-4">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-moss-deep">{lt(person.childOf, locale)}</p>
          <p className="mt-2 text-[1.02rem] leading-relaxed">
            {person.fatherName}
            <span className="px-2 font-display text-lg italic text-blush-deep">{b.couple.and}</span>
            {person.motherName}
          </p>
        </div>

        {person.instagram && (
          <a
            href={`https://instagram.com/${person.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${b.couple.follow}: ${person.instagram}`}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-[0.78rem] font-semibold tracking-[0.1em] underline decoration-blush decoration-2 underline-offset-[6px] transition-colors hover:text-moss-deep"
          >
            <AtSign className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            {person.instagram}
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Bride, groom and both families. Two herbarium sheets, deliberately out of step: the second sits lower,
 * and a large pale ampersand grows between them.
 */
export function Couple() {
  const { data, copy } = useInvitation();
  const { b, no } = useBotanical();
  const { bride, groom } = data.couple;

  return (
    <section id="couple" aria-labelledby="couple-title" className="bot-paper relative overflow-hidden bg-linen text-forest">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 select-none font-display text-[clamp(16rem,52vw,44rem)] font-light italic leading-none text-blush/15"
      >
        &amp;
      </span>
      <BaseSpray className="pointer-events-none absolute -bottom-2 -right-10 h-28 w-52 -scale-x-100 opacity-90 sm:h-44 sm:w-80 lg:right-0" />

      <div className="relative mx-auto max-w-[80rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionLabel no={no("couple")}>{b.couple.label}</SectionLabel>
        <h2 id="couple-title" className="mt-5 font-display text-[clamp(3.2rem,9vw,7.5rem)] font-light italic leading-[0.92] tracking-[-0.02em]">
          <Rise>{b.couple.title}</Rise>
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-x-16">
          <Reveal y={40}>
            <Plate person={bride} index={0} label={copy.couple.brideLabel} shape="oval" />
          </Reveal>
          <Reveal y={60} delay={0.1} className="lg:mt-32">
            <Plate person={groom} index={1} label={copy.couple.groomLabel} shape="arch" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
