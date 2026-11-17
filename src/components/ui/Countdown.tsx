"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useInvitation } from "@/components/InvitationContext";
import { useNowSeconds } from "@/lib/use-now";

function Unit({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "––" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center px-1 first:pl-0 last:pr-0">
      <div className="relative flex h-14 items-center overflow-hidden sm:h-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-[2.3rem] font-normal tabular-nums leading-none tracking-[-0.03em] text-paper sm:text-7xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.58rem] font-normal uppercase tracking-[0.3em] text-gold-light sm:text-xs">{label}</span>
    </div>
  );
}

/** Four numerals divided by hairlines: reads at a glance on a phone. */
export function Countdown({ target }: { target: string }) {
  const { copy } = useInvitation();
  const now = useNowSeconds();

  const remaining = now === null ? null : Math.max(0, Math.floor(new Date(target).getTime() / 1000) - now);

  if (remaining === 0) {
    return (
      <p className="text-center font-display text-3xl italic text-gold-light" role="status">
        {copy.events.started}
      </p>
    );
  }

  const d = remaining === null ? null : Math.floor(remaining / 86400);
  const h = remaining === null ? null : Math.floor((remaining % 86400) / 3600);
  const m = remaining === null ? null : Math.floor((remaining % 3600) / 60);
  const s = remaining === null ? null : remaining % 60;

  return (
    <div role="timer" aria-label={copy.events.countdownLabel} className="mx-auto grid max-w-md grid-cols-4 divide-x divide-gold/30 sm:max-w-2xl">
      <Unit value={d} label={copy.events.days} />
      <Unit value={h} label={copy.events.hours} />
      <Unit value={m} label={copy.events.minutes} />
      <Unit value={s} label={copy.events.seconds} />
    </div>
  );
}
