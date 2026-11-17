"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { FloralCorner } from "@/components/ornaments/FloralCorner";
import { BotanicalCorner } from "@/components/ornaments/botanical-line";
import { Monogram } from "@/components/ornaments/Monogram";
import { Photo } from "@/components/ui/Photo";
import { formatParts } from "@/lib/datetime";
import { luxe } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: luxe } },
};

/**
 * Opening: a dark oxblood "title card". Line-art botanicals draw themselves in the corner,
 * one rich bloom cluster rests opposite, and on opening the whole card lifts away like a curtain.
 */
export function Cover({ onOpen }: { onOpen: () => void }) {
  const { data, copy, guestName, locale } = useInvitation();
  const { bride, groom } = data.couple;
  const date = formatParts(data.weddingDate, locale, data.events[0]?.timeZone ?? "UTC");
  const monthIndex = String(new Date(data.weddingDate).getUTCMonth() + 1).padStart(2, "0");

  return (
    <motion.div
      className="surface surface-oxblood fixed inset-0 z-[90] overflow-hidden text-paper"
      role="dialog"
      aria-modal="true"
      aria-label={`${bride.nickname} & ${groom.nickname}`}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1.4, ease: luxe, delay: 0.4 }}
    >
      {/* a dark, grainy still behind everything */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05 }}
        transition={{ duration: 2.6, ease: luxe }}
      >
        <Photo asset={data.images.cover} sizes="100vw" priority className="opacity-35 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/60 to-deep/95" />
      </motion.div>

      {/* thin frame */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-gold/40 sm:inset-6"
        initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: luxe }}
      />

      {/* botanicals: line-art top-left draws in; one rich cluster rests bottom-right */}
      <BotanicalCorner trigger="mount" delay={0.7} bg="transparent" className="pointer-events-none absolute -left-4 -top-4 w-[62vw] max-w-[340px] text-gold-light/80 sm:max-w-[420px]" />
      <motion.div
        className="pointer-events-none absolute -bottom-3 -right-3 w-[46vw] max-w-[340px] -scale-100 sm:max-w-[430px]"
        initial={{ opacity: 0, x: 30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: luxe, delay: 0.5 }}
      >
        <FloralCorner className="h-auto w-full origin-top-left motion-safe:animate-sway" />
      </motion.div>

      {/* content */}
      <motion.div
        className="absolute inset-0 z-10 overflow-y-auto overscroll-contain"
        exit={{ opacity: 0, y: -24, transition: { duration: 0.55, ease: "easeIn" } }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center px-8 py-16 text-center"
        >
          <motion.p variants={item} className="flex items-center gap-3 text-[0.66rem] font-normal uppercase tracking-[0.42em] text-gold-light">
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
            {copy.cover.kicker}
            <span aria-hidden="true" className="h-px w-7 bg-current opacity-60" />
          </motion.p>

          <motion.div variants={item} className="mt-6">
            <Monogram monogram={data.couple.monogram} className="w-24 text-gold-light sm:w-28" />
          </motion.div>

          <motion.h1 variants={item} className="mt-7 font-display font-normal leading-[0.92] tracking-[-0.015em] text-paper [font-variation-settings:'opsz'_30]">
            <span className="block text-[3.9rem] sm:text-7xl">{bride.nickname}</span>
            <span className="block py-1 text-2xl italic text-rose sm:text-3xl">&amp;</span>
            <span className="block text-[3.9rem] italic sm:text-7xl">{groom.nickname}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 font-display text-xl tracking-[0.28em] text-paper/90">
            {date.day}<span className="px-2 text-gold">·</span>{monthIndex}<span className="px-2 text-gold">·</span>{date.year}
          </motion.p>

          <motion.div variants={item} className="mt-8 w-full max-w-xs border-t border-gold/35 pt-6">
            <p className="text-[0.64rem] font-normal uppercase tracking-[0.4em] text-gold-light">{copy.cover.dear}</p>
            <motion.p
              key={guestName || "fallback"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-2 break-words font-display text-[1.7rem] font-normal italic leading-tight text-paper sm:text-3xl"
            >
              {guestName || copy.cover.guestFallback}
            </motion.p>
          </motion.div>

          <motion.div variants={item} className="mt-9">
            <button
              type="button"
              onClick={onOpen}
              className="group flex min-h-14 items-center gap-5 border border-paper/80 px-7 text-[0.74rem] font-normal uppercase tracking-[0.3em] text-paper transition-colors duration-500 hover:bg-paper hover:text-primary"
            >
              {copy.cover.open}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.4} aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
