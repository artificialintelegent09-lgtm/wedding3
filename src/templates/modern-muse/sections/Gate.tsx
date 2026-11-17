"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Music2 } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Photo } from "@/components/ui/Photo";
import { dotDate } from "../config";
import { useMuse } from "../MuseContext";

const ease = [0.76, 0, 0.24, 1] as const;
const soft = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: soft } },
};

/**
 * Opening invitation. A dark title page: a duotone photograph, the couple's names set across its
 * edge, the guest's name and the open button. On opening, the page lifts away like a cover turning.
 */
export function Gate() {
  const { data, locale, guestName } = useInvitation();
  const { m, music, open } = useMuse();
  const { bride, groom } = data.couple;
  const tz = data.events[0]?.timeZone ?? "UTC";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${bride.nickname} & ${groom.nickname}`}
      className="muse-grain muse-grain-dark fixed inset-0 z-[90] overflow-hidden bg-espresso text-ivory"
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease }}
    >
      <div className="absolute inset-0 overflow-y-auto overscroll-contain">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid min-h-full max-w-[90rem] grid-rows-[auto_1fr_auto] px-5 pb-8 pt-20 sm:px-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:pb-12"
        >
          {/* running head */}
          <motion.div variants={item} className="flex items-center justify-between text-[0.66rem] font-bold uppercase tracking-[0.3em] text-taupe lg:col-span-12">
            <span>{m.issue}</span>
            <span aria-hidden="true" className="mx-4 h-px flex-1 bg-taupe/40" />
            <span>
              {m.issueNo} · {dotDate(data.weddingDate, tz, locale)}
            </span>
          </motion.div>

          {/* photograph + names */}
          <div className="relative my-6 flex items-center lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:my-0 lg:justify-end">
            <motion.div
              variants={item}
              className="relative ml-auto aspect-[4/5] w-[68%] max-w-[26rem] overflow-hidden bg-terracotta sm:w-[52%] lg:w-[76%] lg:max-w-none"
            >
              <Photo asset={data.images.cover} sizes="(min-width: 1024px) 40vw, 70vw" priority className="grayscale contrast-125" />
              <span aria-hidden="true" className="absolute inset-0 bg-terracotta mix-blend-multiply" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
            </motion.div>

            <motion.h2
              variants={item}
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 bottom-4 font-display text-[clamp(4.4rem,23vw,7rem)] font-light leading-[0.82] tracking-[-0.03em] sm:bottom-8 sm:text-[8rem] lg:-left-20 lg:bottom-10 lg:text-[clamp(7rem,11vw,11rem)]"
            >
              {bride.nickname}
              <span className="block pl-[0.5em] italic text-terracotta-soft">&amp; {groom.nickname}</span>
            </motion.h2>
          </div>

          {/* guest + actions */}
          <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:pb-4">
            <motion.p variants={item} className="max-w-xs text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.24em] text-ivory/70">
              {m.gate.hint}
            </motion.p>
            <motion.div variants={item} className="mt-5 border-t border-ivory/25 pt-4">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.3em] text-taupe">{m.gate.preparedFor}</p>
              <motion.p
                key={guestName || "fallback"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: soft }}
                className="mt-2 break-words font-display text-[clamp(2rem,8vw,3.2rem)] font-light italic leading-[1.05]"
              >
                {guestName || m.gate.guestFallback}
              </motion.p>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                onClick={() => open(false)}
                className="group flex min-h-14 items-center justify-between gap-8 bg-terracotta px-6 text-[0.74rem] font-bold uppercase tracking-[0.26em] text-ivory transition-colors duration-500 hover:bg-ivory hover:text-espresso sm:min-w-64"
              >
                {m.gate.open}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.8} aria-hidden="true" />
              </button>
              {music.available && (
                <button
                  type="button"
                  onClick={() => open(true)}
                  className="group flex min-h-11 items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ivory/85 underline decoration-taupe/60 underline-offset-[7px] transition-colors hover:text-ivory hover:decoration-ivory"
                >
                  <Music2 className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                  {m.gate.openWithMusic}
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
