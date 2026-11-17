"use client";

import { motion, type Variants } from "framer-motion";
import { useInvitation } from "@/components/InvitationContext";
import { Parallax, ParallaxLayer } from "@/components/motion/Parallax";
import { BotanicalSprig } from "@/components/ornaments/botanical-line";
import { Monogram } from "@/components/ornaments/Monogram";
import { Photo } from "@/components/ui/Photo";
import { formatParts } from "@/lib/datetime";
import { luxe } from "@/lib/motion";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 1.2 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.3, ease: luxe } },
};

export function Hero() {
  const { data, copy, opened, locale } = useInvitation();
  const { bride, groom } = data.couple;
  const date = formatParts(data.weddingDate, locale, data.events[0]?.timeZone ?? "UTC");
  const month = String(new Date(data.weddingDate).getUTCMonth() + 1).padStart(2, "0");
  const state = opened ? "show" : "hidden";

  return (
    <section
      id="home"
      aria-label={`${bride.nickname} & ${groom.nickname}`}
      className="surface surface-espresso relative min-h-[100svh] overflow-hidden text-paper"
    >
      {/* The photograph: inset from the left to leave a spine for the date; a taller window on desktop. */}
      <motion.div
        className="absolute inset-y-0 left-[15%] right-0 -z-10 lg:bottom-12 lg:left-[34%] lg:right-12 lg:top-12"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: opened ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.8, ease: luxe, delay: 0.7 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: opened ? 1 : 1.2 }}
          transition={{ duration: 3.2, ease: luxe, delay: 0.7 }}
        >
          <Parallax amount={8} className="absolute inset-0">
            <Photo asset={data.images.hero} sizes="(min-width: 1024px) 66vw, 85vw" priority />
          </Parallax>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/40 via-45% to-deep/5" />
      </motion.div>

      {/* spine: monogram, rotated date */}
      <motion.div
        className="absolute left-0 top-0 flex h-full w-[15%] flex-col items-center justify-between py-7 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      >
        <Monogram monogram={data.couple.monogram} ring={false} className="w-9 text-gold-light" />
        <p className="vertical-rl rotate-180 whitespace-nowrap text-[0.62rem] font-normal uppercase tracking-[0.42em] text-paper/70">
          {date.weekday} · {date.day}.{month}.{date.year}
        </p>
        <span className="h-10 w-px bg-gradient-to-b from-gold-light/0 to-gold-light/70 motion-safe:animate-drift" aria-hidden="true" />
      </motion.div>

      {/* a single botanical line-drawing climbing the photo's edge */}
      <ParallaxLayer distance={26} className="pointer-events-none absolute right-2 top-16 h-56 w-auto text-gold-light/70 sm:h-72 lg:right-20 lg:top-24 lg:h-[24rem]">
        <BotanicalSprig bg="transparent" trigger="mount" delay={1.6} className="h-full w-auto rotate-[8deg]" />
      </ParallaxLayer>

      {/* names + date */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={state}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-28 pt-40 lg:w-[62%] lg:justify-center lg:px-0 lg:pb-12 lg:pl-[6%] lg:pt-12"
      >
        <motion.p variants={rise} className="ml-[calc(15%-1.25rem)] flex items-center gap-3 text-[0.66rem] font-normal uppercase tracking-[0.42em] text-gold-light lg:ml-0">
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
          {copy.hero.kicker}
        </motion.p>

        <motion.h1 variants={rise} className="mt-5 font-display font-normal leading-[0.86] tracking-[-0.03em] text-paper [font-variation-settings:'opsz'_30]">
          <span className="block text-[5.2rem] sm:text-[8rem] lg:text-[10.5rem]">{bride.nickname}</span>
          <span className="block pl-[16%] text-[5.2rem] italic sm:text-[8rem] lg:pl-[22%] lg:text-[10.5rem]">
            <span className="mr-2 align-[0.08em] text-[0.4em] not-italic text-rose">&amp;</span>
            {groom.nickname}
          </span>
        </motion.h1>

        <motion.div variants={rise} className="ml-[calc(15%-1.25rem)] mt-9 flex items-end justify-between gap-6 border-t border-paper/25 pt-5 lg:ml-0 lg:max-w-md">
          <div>
            <p className="text-[0.66rem] font-normal uppercase tracking-[0.34em] text-gold-light">{date.weekday}</p>
            <p className="mt-1 font-display text-[1.7rem] font-normal leading-none text-paper sm:text-4xl">
              {date.day} {date.month} <span className="italic text-gold-light">{date.year}</span>
            </p>
          </div>
          <a
            href="#intro"
            aria-label={copy.hero.scroll}
            className="hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.34em] text-paper/70 transition-colors hover:text-paper sm:flex"
          >
            {copy.hero.scroll}
            <span className="h-8 w-px bg-current motion-safe:animate-drift" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
