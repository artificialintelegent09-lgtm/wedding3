"use client";

import { ArrowUpRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { AddToCalendar } from "@/components/ui/AddToCalendar";
import { formatLongDate } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import type { WeddingEvent } from "@/types/invitation";
import { clock, pad2 } from "../config";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

function Programme({ event, index, flip }: { event: WeddingEvent; index: number; flip: boolean }) {
  const { copy, locale } = useInvitation();
  const { m } = useMuse();
  const dark = flip; // the second event is set as a terracotta block
  const end = clock(event.endsAt, event.timeZone);

  return (
    <Reveal
      y={50}
      className={
        dark
          ? "relative bg-terracotta px-5 py-12 text-ivory sm:px-10 lg:ml-[10vw] lg:-mr-10 lg:px-14 lg:py-20"
          : "relative border-t-2 border-espresso pt-8 text-espresso lg:pt-12"
      }
    >
      <article aria-labelledby={`event-${event.id}`} className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
          <p className={`text-[0.68rem] font-bold uppercase tracking-[0.3em] ${dark ? "text-ivory/85" : "text-terracotta"}`}>
            {pad2(index + 1)} — {m.events.when}
          </p>
          <p
            className={`mt-3 font-display text-[clamp(5.4rem,19vw,16rem)] font-light leading-[0.78] tracking-[-0.05em] tabular-nums ${flip ? "lg:text-right" : ""}`}
          >
            <span className="sr-only">
              {clock(event.startsAt, event.timeZone)} – {end} {event.timezoneLabel}
            </span>
            <span aria-hidden="true">{clock(event.startsAt, event.timeZone)}</span>
          </p>
          <p
            aria-hidden="true"
            className={`mt-4 text-[0.72rem] font-bold uppercase tracking-[0.26em] ${flip ? "lg:text-right" : ""} ${dark ? "text-ivory/85" : "text-espresso/70"}`}
          >
            → {end} {event.timezoneLabel}
          </p>
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
          <h3 id={`event-${event.id}`} className="font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium italic leading-[0.98]">
            {lt(event.title, locale)}
          </h3>
          <dl className={`mt-7 divide-y text-[0.95rem] leading-relaxed ${dark ? "divide-ivory/30" : "divide-espresso/20"}`}>
            <div className="py-3">
              <dt className={`text-[0.64rem] font-bold uppercase tracking-[0.28em] ${dark ? "text-ivory/80" : "text-espresso/65"}`}>{m.events.when}</dt>
              <dd className="mt-1 font-semibold">{formatLongDate(event.startsAt, locale, event.timeZone)}</dd>
            </div>
            <div className="py-3">
              <dt className={`text-[0.64rem] font-bold uppercase tracking-[0.28em] ${dark ? "text-ivory/80" : "text-espresso/65"}`}>{m.events.where}</dt>
              <dd className="mt-1 font-semibold">{event.venue.name}</dd>
              <dd className={dark ? "text-ivory/85" : "text-espresso/75"}>
                {event.venue.placeName && event.venue.placeName !== event.venue.name ? `${event.venue.placeName}, ` : ""}
                {event.venue.address}
              </dd>
            </div>
            {event.dressCode && (
              <div className="py-3">
                <dt className={`text-[0.64rem] font-bold uppercase tracking-[0.28em] ${dark ? "text-ivory/80" : "text-espresso/65"}`}>{copy.events.dressCode}</dt>
                <dd className="mt-1 font-semibold">{lt(event.dressCode, locale)}</dd>
              </div>
            )}
            {event.note && (
              <div className="py-3">
                <dd className={`font-display text-xl italic ${dark ? "text-ivory" : "text-espresso/85"}`}>{lt(event.note, locale)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={event.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-12 items-center gap-3 px-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] transition-colors duration-300 ${
                dark ? "bg-ivory text-espresso hover:bg-espresso hover:text-ivory" : "bg-espresso text-ivory hover:bg-terracotta"
              }`}
            >
              {copy.events.viewMap}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
            </a>
            <AddToCalendar event={event} tone={dark ? "light" : "dark"} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Akad and reception as two printed programme entries: time first, then the details. */
export function Events() {
  const { data } = useInvitation();
  const { m, no } = useMuse();

  return (
    <section id="events" aria-labelledby="events-title" className="muse-grain relative overflow-hidden bg-ivory text-espresso">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("events")} label={m.events.label} />
        <h2 id="events-title" className="mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,7.5rem)] font-light italic leading-[0.92] tracking-[-0.03em]">
          <MaskLine>{m.events.title}</MaskLine>
        </h2>

        <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-28">
          {data.events.map((event, i) => (
            <Programme key={event.id} event={event} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
