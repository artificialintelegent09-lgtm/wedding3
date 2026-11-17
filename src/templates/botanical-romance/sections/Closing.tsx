"use client";

import { ArrowUp } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { formatLongDate } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import { CornerSpray, Divider, GardenBloom } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe } from "../config";
import { Framed, Rise, SectionLabel } from "../ui";

/**
 * The Botanical Closing. The journey ends where it began, in the garden, now in full bloom: a moon gate
 * frames the last photograph, the couple's thanks are set large, and a bed of flowers opens stem by stem
 * along the bottom of the page. A quiet footer holds the section links and the photo credit.
 */
export function Closing() {
  const { data, locale } = useInvitation();
  const { b, sections, no } = useBotanical();
  const { bride, groom } = data.couple;
  const tz = data.events[0]?.timeZone ?? "UTC";
  const photo = data.images.closing;

  return (
    <section id="closing" aria-labelledby="closing-title" className="relative overflow-hidden bg-forest text-linen">
      <div className="bot-paper bot-paper-dark bot-ink-light relative">
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-24 text-center sm:px-10 lg:pt-32">
          <SectionLabel no={no("closing")} tone="light" align="center">
            {b.closing.label}
          </SectionLabel>

          {/* the moon gate */}
          <Reveal y={30} className="relative mx-auto mt-12 w-[min(68vw,18rem)] text-sage sm:w-[20rem]">
            <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-sage/35" />
            <Framed asset={photo} alt={describe(photo, locale)} shape="round" sizes="320px" className="aspect-square w-full" outline={false} />
            <CornerSpray className="pointer-events-none absolute -left-24 -top-12 h-44 w-44 sm:-left-32 sm:h-56 sm:w-56" />
            <CornerSpray className="pointer-events-none absolute -right-24 -top-12 h-44 w-44 -scale-x-100 sm:-right-32 sm:h-56 sm:w-56" />
          </Reveal>

          <h2 id="closing-title" className="mt-14 font-display text-[clamp(3.6rem,15vw,8.5rem)] font-light leading-[0.88] tracking-[-0.025em]">
            <span className="sr-only">
              {bride.nickname} &amp; {groom.nickname}
            </span>
            <span aria-hidden="true" className="block">
              <Rise>{bride.nickname}</Rise>
              <Rise delay={0.12} className="italic text-blush">
                <span className="mr-[0.06em] text-[0.6em] not-italic text-linen">&amp;</span>
                {groom.nickname}
              </Rise>
            </span>
          </h2>

          <Divider className="mx-auto mt-8 h-9 w-56" />

          <Reveal y={28} className="mt-8">
            <p className="mx-auto max-w-xl font-display text-[clamp(1.4rem,3.4vw,1.9rem)] font-normal italic leading-snug">{lt(data.closing.message, locale)}</p>
            <p className="mt-8 font-display text-2xl italic text-blush">{lt(data.closing.signature, locale)}</p>
            <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage">{formatLongDate(data.weddingDate, locale, tz)}</p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-linen/80">{b.closing.thanks}</p>
          </Reveal>

          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({ block: "start" });
            }}
            className="mt-10 inline-flex min-h-12 items-center gap-3 border border-sage/60 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-linen transition-colors duration-300 hover:bg-linen hover:text-forest"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
            {b.closing.top}
          </a>
        </div>

        {/* the garden in full bloom */}
        <GardenBloom className="relative mt-6 block h-[44vw] max-h-[26rem] min-h-[13rem] w-full" />
      </div>

      <footer className="bg-forest-deep px-5 pb-8 pt-8 text-center sm:px-10">
        <p className="font-display text-3xl italic text-linen">{data.couple.monogram}</p>
        <nav aria-label={b.nav.label} className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-x-1 gap-y-0">
          {sections.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(key)?.scrollIntoView({ block: "start" });
              }}
              className="flex min-h-11 items-center px-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-sage transition-colors hover:text-linen"
            >
              {b.sections[key]}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-xs leading-relaxed text-sage/80">{b.closing.credit}</p>
      </footer>
    </section>
  );
}
