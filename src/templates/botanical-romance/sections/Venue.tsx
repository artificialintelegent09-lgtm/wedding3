"use client";

import { ArrowUpRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { mapsEmbedUrl } from "@/lib/calendar";
import { lt } from "@/lib/i18n";
import type { WeddingEvent } from "@/types/invitation";
import { BaseSpray } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { Rise, SectionLabel } from "../ui";

/** Events sharing one map location are shown together: the venue is the subject, the halls are details. */
function groupByLocation(events: WeddingEvent[]): WeddingEvent[][] {
  const groups = new Map<string, WeddingEvent[]>();
  for (const e of events) {
    const key = e.venue.mapsQuery;
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }
  return [...groups.values()];
}

/**
 * Venue and Google Maps. The map is a desaturated print in a linen mat with foliage growing over its
 * corner; the address and the halls are set beside it with one clear action: open in Google Maps.
 */
export function Venue() {
  const { data, copy, locale } = useInvitation();
  const { b, no } = useBotanical();
  const groups = groupByLocation(data.events);

  return (
    <section id="venue" aria-labelledby="venue-title" className="bot-paper bot-paper-dark bot-ink-light relative overflow-hidden bg-forest text-linen">
      <div className="relative mx-auto max-w-[80rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionLabel no={no("venue")} tone="light">
          {b.venue.label}
        </SectionLabel>
        <h2 id="venue-title" className="mt-5 font-display text-[clamp(3rem,8.5vw,6.6rem)] font-light italic leading-[0.94] tracking-[-0.02em]">
          <Rise>{b.venue.title}</Rise>
        </h2>

        <div className="mt-14 space-y-24 lg:mt-20 lg:space-y-32">
          {groups.map((events, gi) => {
            const venue = events[0].venue;
            const title = venue.placeName ?? venue.name;
            return (
              <div key={venue.mapsQuery} className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
                <Reveal className={`relative lg:col-span-7 ${gi % 2 ? "lg:order-2 lg:col-start-6" : ""}`} y={40}>
                  <div className="relative bg-linen p-2.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-4">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-linen-2 sm:aspect-[4/3]">
                      <iframe
                        title={`${copy.location.mapTitle}: ${title}`}
                        src={mapsEmbedUrl(venue.mapsQuery)}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.35)_saturate(0.55)_hue-rotate(40deg)_contrast(0.95)_brightness(1.03)]"
                      />
                      <span aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-forest/20" />
                    </div>
                  </div>
                  <BaseSpray className="pointer-events-none absolute -bottom-3 -right-5 h-24 w-44 -scale-x-100 sm:-right-10 sm:h-36 sm:w-64" />
                </Reveal>

                <div className={`lg:col-span-5 ${gi % 2 ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <h3 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light italic leading-[1]">{title}</h3>
                  <dl className="mt-8 divide-y divide-sage/25 border-y border-sage/25">
                    <div className="py-4">
                      <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-sage">{b.venue.address}</dt>
                      <dd className="mt-1.5 text-[1.02rem] leading-relaxed">{venue.address}</dd>
                    </div>
                    <div className="py-4">
                      <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-sage">{b.venue.halls}</dt>
                      <dd>
                        <ul className="mt-2.5 space-y-2">
                          {events.map((e) => (
                            <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                              <span className="font-display text-xl italic">{lt(e.title, locale)}</span>
                              <span className="text-sm font-medium text-linen/85">{e.venue.name}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex min-h-14 items-center gap-4 bg-linen px-7 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-forest transition-colors duration-300 hover:bg-blush"
                  >
                    {copy.location.openMaps}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
