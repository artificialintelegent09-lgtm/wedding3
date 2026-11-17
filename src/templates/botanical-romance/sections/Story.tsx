"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { lt } from "@/lib/i18n";
import type { StoryMoment } from "@/types/invitation";
import { Divider } from "../art/compositions";
import { StageArt } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe, ROMAN, STORY_FRAMES } from "../config";
import { Framed, Rise, SectionLabel } from "../ui";

type Stage = 0 | 1 | 2 | 3;

/** Spreads however many milestones the couple provides across Seed → Growing → Blooming → Forever. */
const stageOf = (i: number, n: number): Stage => (n <= 1 ? 0 : (Math.min(3, Math.round((i * 3) / (n - 1))) as Stage));

/** The photograph grows with the plant: a small seed-sized round, a larger oval, then two full arches. */
const PHOTO_SIZE: Record<Stage, string> = {
  0: "w-44 aspect-square sm:w-56",
  1: "w-56 aspect-[4/5] sm:w-72",
  2: "w-60 aspect-[3/4] sm:w-80",
  3: "w-64 aspect-[3/4] sm:w-[22rem]",
};

function Milestone({ moment, index, count }: { moment: StoryMoment; index: number; count: number }) {
  const { locale } = useInvitation();
  const { b } = useBotanical();
  const stage = stageOf(index, count);
  const flip = index % 2 === 1;
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const forever = stage === 3;

  return (
    <li ref={ref} className="relative grid grid-cols-[5.25rem_1fr] gap-x-3 lg:grid-cols-[1fr_11rem_1fr] lg:gap-x-0">
      {/* medallion: the plant at this stage, sitting on the rail */}
      <div className="relative z-10 col-start-1 row-span-2 row-start-1 lg:col-start-2 lg:row-span-1">
        <div
          aria-hidden="true"
          className={`mx-auto grid h-[4.75rem] w-[4.75rem] place-items-center rounded-full bg-[#faf8f1] p-1.5 ring-4 ring-linen transition-shadow duration-1000 lg:h-36 lg:w-36 lg:p-3 ${
            reached ? "shadow-[0_0_0_1px_var(--bot-moss),0_16px_36px_-16px_rgba(38,61,50,0.5)]" : "shadow-[0_0_0_1px_rgba(120,134,106,0.35)]"
          }`}
        >
          <StageArt stage={stage} className="h-full w-full" delay={0.15} />
        </div>
      </div>

      {/* words */}
      <div className={`col-start-2 row-start-1 pb-8 lg:flex lg:flex-col lg:justify-center lg:pb-0 ${flip ? "lg:col-start-3 lg:pl-14" : "lg:col-start-1 lg:pr-14 lg:text-right"}`}>
        <Reveal y={36}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-moss-deep">
            {b.story.stage} {ROMAN[stage]} · {b.story.stages[stage]}
          </p>
          <p className="mt-3 font-display text-xl italic text-blush-deep">{lt(moment.date, locale)}</p>
          <h3 className={`mt-1 font-display font-normal leading-[1.02] tracking-[-0.01em] ${forever ? "text-[clamp(2.5rem,7vw,4.4rem)]" : "text-[clamp(2.2rem,5.6vw,3.4rem)]"}`}>
            {lt(moment.title, locale)}
          </h3>
          <p className={`mt-4 max-w-md text-[1.02rem] leading-[1.85] text-forest/85 ${flip ? "" : "lg:ml-auto"}`}>{lt(moment.body, locale)}</p>
        </Reveal>
      </div>

      {/* photograph */}
      {moment.image && (
        <div className={`col-start-2 row-start-2 pb-16 text-moss-deep lg:row-start-1 lg:flex lg:items-center lg:pb-0 ${flip ? "lg:col-start-1 lg:justify-end lg:pr-14" : "lg:col-start-3 lg:justify-start lg:pl-14"}`}>
          <Framed
            asset={moment.image}
            alt={describe(moment.image, locale)}
            shape={STORY_FRAMES[stage]}
            sizes="(min-width: 1024px) 24rem, 75vw"
            className={PHOTO_SIZE[stage]}
            from={flip ? "left" : "right"}
          />
        </div>
      )}
      {!moment.image && <div className="row-start-2 pb-8 lg:hidden" />}
    </li>
  );
}

/**
 * The Blooming Love Story. The milestones from the couple's data are laid along one living stem that grows
 * as the reader scrolls. At each milestone the plant has reached the next stage: seed, growing, blooming,
 * forever: and the photograph beside it grows too. Nothing here is invented: dates, titles and words are
 * exactly the couple's own.
 */
export function Story() {
  const { data } = useInvitation();
  const { b, no } = useBotanical();
  const story = data.story ?? [];
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const grown = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  return (
    <section id="story" aria-labelledby="story-title" className="bot-paper relative overflow-hidden bg-linen text-forest">
      <div className="relative mx-auto max-w-[76rem] px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel no={no("story")} align="center">
            {b.story.label}
          </SectionLabel>
          <h2 id="story-title" className="mt-5 font-display text-[clamp(3rem,9vw,6.6rem)] font-light italic leading-[0.95] tracking-[-0.02em]">
            <Rise>{b.story.title}</Rise>
          </h2>
          <Divider className="mx-auto mt-6 h-9 w-56" />
          <p className="mx-auto mt-6 max-w-lg font-display text-xl italic leading-snug text-forest/80 sm:text-2xl">{b.story.intro}</p>
        </div>

        <ol ref={list} className="relative mt-20 space-y-4 lg:mt-28 lg:space-y-24">
          {/* the stem: a faint track, and the living line that grows along it */}
          <span aria-hidden="true" className="absolute bottom-0 left-[2.625rem] top-0 w-px -translate-x-1/2 bg-moss/25 lg:left-1/2" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : grown }}
            className="absolute bottom-0 left-[2.625rem] top-0 w-[2px] origin-top -translate-x-1/2 bg-moss lg:left-1/2"
          />
          {story.map((moment, i) => (
            <Milestone key={`${lt(moment.title, "id")}-${i}`} moment={moment} index={i} count={story.length} />
          ))}
        </ol>
      </div>
    </section>
  );
}
