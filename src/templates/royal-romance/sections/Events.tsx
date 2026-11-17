"use client";

import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { BotanicalSprig } from "@/components/ornaments/botanical-line";
import { Rule } from "@/components/ornaments/Rule";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { Countdown } from "@/components/ui/Countdown";
import { OrnateFrame } from "@/components/ui/OrnateFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatParts, formatTimeRange } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import type { WeddingEvent } from "@/types/invitation";

/** One event as a letterpress-style card: title, big day numeral, time, venue, actions. */
function EventCard({ event, index, total }: { event: WeddingEvent; index: number; total: number }) {
  const { copy, locale } = useInvitation();
  const parts = formatParts(event.startsAt, locale, event.timeZone);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <OrnateFrame
      className="surface surface-paper h-full bg-paper text-ink shadow-[0_40px_70px_-40px_rgba(0,0,0,0.7)]"
      innerClassName="flex h-full flex-col px-8 pb-9 pt-10 text-center sm:px-10 sm:pt-12"
    >
      <p className="font-display text-sm italic tracking-wide text-gold-deep">
        {pad(index + 1)} <span className="px-1 text-gold">/</span> {pad(total)}
      </p>
      <h3 className="mt-3 font-display text-[2.4rem] font-normal italic leading-none tracking-[-0.01em] text-primary sm:text-5xl">
        {lt(event.title, locale)}
      </h3>

      <Rule className="mt-6 text-gold" />

      <div className="mt-7 flex items-center justify-center gap-5">
        <p className="text-right text-[0.66rem] font-normal uppercase leading-relaxed tracking-[0.3em] text-muted">
          {parts.weekday}
        </p>
        <p className="font-display text-[5.5rem] font-normal leading-[0.8] tracking-[-0.04em] text-primary sm:text-[6.5rem]">
          {parts.day}
        </p>
        <p className="text-left text-[0.66rem] font-normal uppercase leading-relaxed tracking-[0.3em] text-muted">
          {parts.month}
          <br />
          {parts.year}
        </p>
      </div>

      <p className="mt-7 inline-flex items-center justify-center gap-2 text-[0.82rem] font-normal tracking-[0.18em] text-ink">
        <Clock className="h-4 w-4 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
        <time dateTime={event.startsAt}>
          {formatTimeRange(event.startsAt, event.endsAt, locale, event.timeZone, event.timezoneLabel)}
        </time>
      </p>

      <div className="mx-auto my-7 h-px w-12 bg-primary/25" aria-hidden="true" />

      <p className="font-display text-2xl font-normal text-primary">{event.venue.name}</p>
      <p className="mx-auto mt-2 max-w-[17rem] text-[0.88rem] font-light leading-relaxed text-muted">{event.venue.address}</p>

      {event.note && <p className="mt-5 font-display text-lg font-medium italic text-ink/80">{lt(event.note, locale)}</p>}
      {event.dressCode && (
        <p className="mt-4 text-[0.66rem] uppercase tracking-[0.26em] text-muted">
          {copy.events.dressCode} <span className="px-1 text-gold">—</span>
          <span className="text-primary"> {lt(event.dressCode, locale)}</span>
        </p>
      )}

      <div className="mt-auto flex flex-col items-center gap-1 pt-8 sm:flex-row sm:justify-center sm:gap-8">
        <a
          href="#location"
          className="inline-flex min-h-11 items-center gap-2 border-b border-primary pb-0.5 text-[0.7rem] font-normal uppercase tracking-[0.24em] text-primary transition-opacity hover:opacity-70"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          {copy.events.viewMap}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
        </a>
        <AddToCalendar event={event} tone="dark" />
      </div>
    </OrnateFrame>
  );
}

export function Events() {
  const { data, copy } = useInvitation();
  return (
    <section id="events" className="surface surface-oxblood relative overflow-hidden px-5 py-24 text-paper sm:py-36">
      <BotanicalSprig bg="var(--tpl-primary)" className="pointer-events-none absolute -right-8 top-4 h-52 w-auto rotate-[14deg] text-gold-light/35 sm:right-10 sm:h-80" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow={copy.events.eyebrow} title={copy.events.title} index="02" tone="light" />

        <Reveal className="mt-14">
          <Countdown target={data.weddingDate} />
          <p className="mt-5 text-center text-[0.66rem] uppercase tracking-[0.34em] text-paper/60">{copy.events.countdownLabel}</p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.12} y={44} className={`h-full ${i % 2 === 1 ? "md:mt-20" : ""}`}>
              <EventCard event={event} index={i} total={data.events.length} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
