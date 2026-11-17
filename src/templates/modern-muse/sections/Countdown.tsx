"use client";

import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { formatLongDate } from "@/lib/datetime";
import { useNowSeconds } from "@/lib/use-now";
import { dotDate } from "../config";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="border-l border-ivory/25 pl-4 sm:pl-6">
      <p
        className="font-display text-[clamp(4.2rem,15vw,12.5rem)] font-light leading-[0.85] tracking-[-0.04em] tabular-nums"
        aria-hidden={value === null}
      >
        {value === null ? "––" : String(value).padStart(2, "0")}
      </p>
      <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-taupe sm:text-xs">{label}</p>
    </div>
  );
}

/** Oversized numerals on espresso: the one section that is almost entirely type. */
export function Countdown() {
  const { data, copy, locale } = useInvitation();
  const { m, no } = useMuse();
  const now = useNowSeconds();
  const tz = data.events[0]?.timeZone ?? "UTC";
  const remaining = now === null ? null : Math.max(0, Math.floor(new Date(data.weddingDate).getTime() / 1000) - now);

  const d = remaining === null ? null : Math.floor(remaining / 86400);
  const h = remaining === null ? null : Math.floor((remaining % 86400) / 3600);
  const min = remaining === null ? null : Math.floor((remaining % 3600) / 60);
  const s = remaining === null ? null : remaining % 60;

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="muse-grain muse-grain-dark relative overflow-hidden bg-espresso text-ivory">
      <span
        aria-hidden="true"
        className="muse-outline pointer-events-none absolute -left-[2vw] top-8 select-none font-display text-[clamp(9rem,34vw,30rem)] font-light leading-none text-ivory/10"
      >
        {dotDate(data.weddingDate, tz, locale).slice(0, 5)}
      </span>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("countdown")} label={m.countdown.label} tone="light" />
        <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2 id="countdown-title" className="font-display text-[clamp(2.4rem,5.6vw,5rem)] font-light italic leading-[1]">
            <MaskLine>{m.countdown.title}</MaskLine>
          </h2>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.26em] text-terracotta-soft">
            {formatLongDate(data.weddingDate, locale, tz)}
          </p>
        </div>

        <Reveal y={30} className="mt-14 lg:mt-24">
          {remaining === 0 ? (
            <p role="status" className="font-display text-[clamp(2.6rem,8vw,6rem)] font-light italic">
              {copy.events.started}
            </p>
          ) : (
            <div role="timer" aria-label={copy.events.countdownLabel} className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-4 sm:gap-x-6">
              <Unit value={d} label={copy.events.days} />
              <Unit value={h} label={copy.events.hours} />
              <Unit value={min} label={copy.events.minutes} />
              <Unit value={s} label={copy.events.seconds} />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
