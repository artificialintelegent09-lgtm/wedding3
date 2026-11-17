"use client";

import { Clock, Navigation } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/ornaments/Rule";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatTimeRange } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import type { Venue, WeddingEvent } from "@/types/invitation";

/** Events that share a physical place are presented together under one map. */
function groupByVenue(events: WeddingEvent[]) {
  const groups = new Map<string, { venue: Venue; events: WeddingEvent[] }>();
  for (const event of events) {
    const key = event.venue.mapsQuery;
    const group = groups.get(key);
    if (group) group.events.push(event);
    else groups.set(key, { venue: event.venue, events: [event] });
  }
  return [...groups.values()];
}

/**
 * The map is a print in a paper mat; the venue details sit on a card that overlaps its edge,
 * so the information and the place read as one composition.
 */
export function Location() {
  const { data, copy, locale } = useInvitation();
  const groups = groupByVenue(data.events);

  return (
    <section id="location" className="surface surface-paper relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.location.eyebrow} title={copy.location.title} index="03" align="left" />

        <div className="mt-14 space-y-24">
          {groups.map(({ venue, events }) => (
            <div key={venue.mapsQuery} className="relative lg:grid lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
                <MapEmbed query={venue.mapsQuery} title={`${copy.location.mapTitle}: ${venue.name}`} />
              </Reveal>

              <Reveal
                delay={0.1}
                y={40}
                className="relative z-10 -mt-14 ml-3 mr-0 sm:mx-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:m-0 lg:-mr-24"
              >
                <div className="surface surface-paper relative border border-primary/20 p-7 shadow-[0_30px_60px_-35px_rgba(36,8,16,0.6)] sm:p-9">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-gold/40" />
                  <div className="relative">
                    <h3 className="font-display text-[2.2rem] font-normal italic leading-[1.05] tracking-[-0.01em] text-primary sm:text-5xl">
                      {venue.placeName ?? venue.name}
                    </h3>
                    <p className="mt-4 max-w-sm text-[0.95rem] font-light leading-relaxed text-ink/75">{venue.address}</p>

                    <Rule align="left" className="mt-6 text-gold" />

                    <ul className="mt-5 space-y-4">
                      {events.map((e) => (
                        <li key={e.id}>
                          <p className="font-display text-xl text-primary">{lt(e.title, locale)}</p>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 text-[0.8rem] tracking-[0.12em] text-muted">
                            {e.venue.placeName && <span>{e.venue.name}</span>}
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                              {formatTimeRange(e.startsAt, e.endsAt, locale, e.timeZone, e.timezoneLabel)}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={venue.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 flex min-h-14 items-center justify-between gap-4 bg-primary px-6 text-[0.74rem] font-normal uppercase tracking-[0.26em] text-paper transition-colors hover:bg-primary-soft"
                    >
                      <span>{copy.location.openMaps}</span>
                      <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.4} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
