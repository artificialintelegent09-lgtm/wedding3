"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Photo } from "@/components/ui/Photo";
import { BaseSpray, CornerSpray } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe, gatePhoto } from "../config";
import { buttonClass, Meta } from "../ui";

const soft = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: soft } },
  out: { opacity: 0, y: -14, transition: { duration: 0.5, ease: soft } },
};

/**
 * The Secret Garden Entrance. A doorway arch in a wall of foliage frames the garden at dusk; the
 * couple's names stand beneath it. Opening the invitation walks the guest through the arch: the
 * photograph swells past the viewer and the paper falls away.
 */
export function Gate() {
  const { data, locale, guestName, opened } = useInvitation();
  const { b, open } = useBotanical();
  const { bride, groom } = data.couple;
  const photo = gatePhoto(data);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${bride.nickname} & ${groom.nickname}`}
      // Once opened, the gate is only scenery while it fades out: it must stop intercepting
      // pointer and scroll events immediately (its inner overflow-y-auto/overscroll-contain
      // scroller would otherwise swallow wheel and touch scrolling for as long as it exists).
      className={`bot-paper fixed inset-0 z-[90] overflow-hidden bg-linen text-forest ${opened ? "pointer-events-none" : ""}`}
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.7, ease: soft } }}
    >
      <div className="absolute inset-0 overflow-y-auto overscroll-contain">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          exit="out"
          className="relative mx-auto flex min-h-full max-w-5xl flex-col items-center px-5 pb-8 pt-16 text-center sm:pt-20"
        >
          <motion.div variants={item}>
            <Meta className="text-moss-deep">{b.gate.kicker}</Meta>
          </motion.div>

          {/* The doorway: arch, outline, foliage, photograph. */}
          <motion.div
            variants={item}
            exit={{ scale: 2.1, opacity: 0, transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] } }}
            className="relative mt-5 aspect-[3/4] h-[min(42svh,30rem)] sm:mt-7 lg:h-[min(54svh,34rem)]"
          >
            <span aria-hidden="true" className="absolute -inset-2 rounded-t-[999px] border border-moss/60" />
            <span aria-hidden="true" className="absolute -inset-4 rounded-t-[999px] border border-moss/30" />
            <div className="relative h-full w-full overflow-hidden rounded-t-[999px] bg-sage/40">
              <Photo asset={photo} alt={describe(photo, locale)} sizes="(min-width: 1024px) 30vw, 70vw" priority className="bot-photo" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-forest/10" />
            </div>
            <CornerSpray trigger="mount" delay={0.5} className="pointer-events-none absolute -left-[4.5rem] -top-8 h-44 w-44 sm:-left-24 sm:h-56 sm:w-56" />
            <CornerSpray trigger="mount" delay={0.7} className="pointer-events-none absolute -right-[4.5rem] -top-8 h-44 w-44 -scale-x-100 sm:-right-24 sm:h-56 sm:w-56" />
            <BaseSpray trigger="mount" delay={0.9} className="pointer-events-none absolute -bottom-3 -left-[5.5rem] h-28 w-52 sm:-left-32 sm:h-36 sm:w-64" />
            <BaseSpray trigger="mount" delay={1.1} className="pointer-events-none absolute -bottom-3 -right-[5.5rem] h-28 w-52 -scale-x-100 sm:-right-32 sm:h-36 sm:w-64" />
          </motion.div>

          <motion.h2
            variants={item}
            aria-hidden="true"
            className="mt-8 font-display text-[clamp(3.6rem,17vw,6rem)] font-light leading-[0.88] tracking-[-0.02em] sm:mt-10 lg:text-[clamp(4.5rem,8vw,7rem)]"
          >
            {bride.nickname}
            <span className="block italic text-moss-deep lg:inline"> <span className="not-italic text-blush-deep">&amp;</span> {groom.nickname}</span>
          </motion.h2>

          <motion.p variants={item} className="mt-3 max-w-xs font-display text-lg italic leading-snug text-forest/75 sm:text-xl">
            {b.gate.hint}
          </motion.p>

          <motion.div variants={item} className="mt-5 w-full max-w-xs border-t border-forest/20 pt-4">
            <Meta className="text-moss-deep">{b.gate.preparedFor}</Meta>
            <motion.p
              key={guestName || "fallback"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: soft }}
              className="mt-1.5 break-words font-display text-[clamp(1.7rem,6vw,2.3rem)] font-medium italic leading-tight"
            >
              {guestName || b.gate.guestFallback}
            </motion.p>
          </motion.div>

          <motion.div variants={item} className="mt-6 w-full max-w-xs">
            <button type="button" onClick={open} className={`${buttonClass} w-full`}>
              {b.gate.open}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
