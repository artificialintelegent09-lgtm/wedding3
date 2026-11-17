"use client";

import { ArrowUpRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { formatLongDate } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import { useNowSeconds } from "@/lib/use-now";
import type { WeddingEvent } from "@/types/invitation";
import { CornerSpray, Divider } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { clock, pad2 } from "../config";
import { buttonClass, Rise, SectionLabel } from "../ui";

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="px-1 text-center">
      <p className="font-display text-[clamp(2.4rem,11vw,5rem)] font-light leading-none tabular-nums" aria-hidden={value === null}>
        {value === null ? "––" : String(value).padStart(2, "0")}
      </p>
      <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-sage sm:text-[0.68rem]">{label}</p>
    </div>
  );
}

/** Four numerals on a forest label, divided by hairlines. Reads at a glance on a phone. */
function Countdown() {
  const { data, copy } = useInvitation();
  const { b } = useBotanical();
  // `weddingDate` carries an explicit UTC offset (+07:00), so this is one absolute instant: the countdown is
  // identical for a guest in any timezone, and the Asia/Jakarta wall clock is only applied when formatting.
  const now = useNowSeconds();
  const target = Math.floor(new Date(data.weddingDate).getTime() / 1000);
  // After the last event has finished the celebration is over; between the start and that moment it is under way.
  const finish = Math.max(target, ...data.events.map((e) => Math.floor(new Date(e.endsAt).getTime() / 1000)).filter(Number.isFinite));
  const valid = Number.isFinite(target);
  // The remaining time is clamped at zero: it never counts down into negative numbers.
  const remaining = now === null || !valid ? null : Math.max(0, target - now);
  const over = now !== null && valid && now >= finish;

  const d = remaining === null ? null : Math.floor(remaining / 86400);
  const h = remaining === null ? null : Math.floor((remaining % 86400) / 3600);
  const m = remaining === null ? null : Math.floor((remaining % 3600) / 60);
  const s = remaining === null ? null : remaining % 60;

  return (
    <Reveal y={30} className="mx-auto mt-14 max-w-3xl">
      <div className="bot-paper bot-paper-dark relative bg-forest px-3 py-8 text-linen shadow-[0_30px_60px_-34px_rgba(28,45,36,0.7)] sm:px-10 sm:py-10">
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-sage/30 sm:inset-3" />
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-sage">{b.journal.countdown}</p>
        {remaining === 0 ? (
          <p role="status" className="mt-5 text-center font-display text-3xl italic">
            {over ? b.journal.ended : copy.events.started}
          </p>
        ) : (
          <div role="timer" aria-label={copy.events.countdownLabel} className="mt-6 grid grid-cols-4 divide-x divide-sage/30">
            <Unit value={d} label={copy.events.days} />
            <Unit value={h} label={copy.events.hours} />
            <Unit value={m} label={copy.events.minutes} />
            <Unit value={s} label={copy.events.seconds} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

/** One journal page: when, where, what to wear, and the two actions a guest needs. */
function Page({ event, index }: { event: WeddingEvent; index: number }) {
  const { copy, locale } = useInvitation();
  const { b } = useBotanical();
  const end = clock(event.endsAt, event.timeZone);
  const place = event.venue.placeName && event.venue.placeName !== event.venue.name ? `${event.venue.placeName}, ` : "";

  return (
    <article aria-labelledby={`entry-${event.id}`} className="relative p-7 sm:p-12">
      <span aria-hidden="true" className="bot-tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 opacity-90 lg:left-12 lg:translate-x-0" />

      <p className="flex items-baseline gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-moss-deep">
        <span className="font-display text-base font-medium normal-case italic tracking-normal">{pad2(index + 1)}</span>
        {b.journal.entry}
      </p>
      <h3 id={`entry-${event.id}`} className="mt-3 font-display text-[clamp(2.3rem,5vw,3.4rem)] font-medium italic leading-[1.02]">
        {lt(event.title, locale)}
      </h3>

      <p className="mt-6 font-display text-[clamp(4.2rem,13vw,6.4rem)] font-light leading-[0.85] tracking-[-0.03em] tabular-nums">
        <span className="sr-only">
          {clock(event.startsAt, event.timeZone)} – {end} {event.timezoneLabel}
        </span>
        <span aria-hidden="true">{clock(event.startsAt, event.timeZone)}</span>
      </p>
      <p aria-hidden="true" className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-moss-deep">
        → {end} {event.timezoneLabel}
      </p>

      <dl className="mt-8 divide-y divide-forest/15 border-y border-forest/15 text-[0.98rem] leading-relaxed">
        <div className="py-3.5">
          <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">{b.journal.when}</dt>
          <dd className="mt-1 font-medium">{formatLongDate(event.startsAt, locale, event.timeZone)}</dd>
        </div>
        <div className="py-3.5">
          <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">{b.journal.where}</dt>
          <dd className="mt-1 font-medium">{event.venue.name}</dd>
          <dd className="text-forest/80">
            {place}
            {event.venue.address}
          </dd>
        </div>
        {event.dressCode && (
          <div className="py-3.5">
            <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">{copy.events.dressCode}</dt>
            <dd className="mt-1 font-medium">{lt(event.dressCode, locale)}</dd>
          </div>
        )}
      </dl>

      {event.note && <p className="mt-5 font-display text-[1.35rem] italic leading-snug text-blush-deep">{lt(event.note, locale)}</p>}

      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
        <a href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {copy.events.viewMap}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
        </a>
        <AddToCalendar event={event} tone="dark" />
      </div>
    </article>
  );
}

/**
 * The Garden Journal: the day written down. A countdown on top, then the akad and the reception as the
 * two pages of an open journal, each with its time, place, dress code and the actions to get there.
 */
export function Journal() {
  const { data, locale } = useInvitation();
  const { b, no } = useBotanical();
  const tz = data.events[0]?.timeZone ?? "UTC";
  const spread = data.events.length > 1;

  return (
    <section id="journal" aria-labelledby="journal-title" className="bot-paper relative overflow-hidden bg-mist text-forest">
      <CornerSpray className="pointer-events-none absolute -left-16 -top-6 h-52 w-52 opacity-90 sm:-left-8 sm:h-72 sm:w-72" />

      <div className="relative mx-auto max-w-[72rem] px-5 py-24 sm:px-10 lg:py-36">
        <div className="text-center">
          <SectionLabel no={no("journal")} align="center">
            {b.journal.label}
          </SectionLabel>
          <h2 id="journal-title" className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-light italic leading-[0.92] tracking-[-0.02em]">
            <Rise>{b.journal.title}</Rise>
          </h2>
          <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">{formatLongDate(data.weddingDate, locale, tz)}</p>
          <Divider className="mx-auto mt-6 h-9 w-56" />
        </div>

        <Countdown />

        <Reveal y={50} className="relative mx-auto mt-16 max-w-5xl lg:mt-24">
          <div className={`relative bg-[#faf8f1] shadow-[0_40px_80px_-40px_rgba(38,61,50,0.6)] ring-1 ring-forest/10 ${spread ? "lg:grid lg:grid-cols-2" : "mx-auto max-w-xl"}`}>
            {spread && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-forest/[0.09] to-transparent lg:block"
              />
            )}
            {data.events.map((event, i) => (
              <div key={event.id} className={i > 0 ? "border-t border-forest/15 lg:border-t-0" : ""}>
                <Page event={event} index={i} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
