"use client";

import { ArrowUpRight } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { mapsEmbedUrl } from "@/lib/calendar";
import { lt } from "@/lib/i18n";
import type { WeddingEvent } from "@/types/invitation";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

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
 * Venue and Google Maps. A desaturated map set in an ivory mat, with a hard terracotta offset
 * shadow. The venue name is the headline; halls and address are caption-sized.
 */
export function Venue() {
  const { data, copy, locale } = useInvitation();
  const { m, no } = useMuse();
  const groups = groupByLocation(data.events);

  return (
    <section id="venue" aria-labelledby="venue-title" className="muse-grain muse-grain-dark relative overflow-hidden bg-olive-deep text-ivory">
      <span
        aria-hidden="true"
        className="muse-outline pointer-events-none absolute -bottom-[0.18em] right-[-1vw] select-none font-display text-[clamp(8rem,26vw,24rem)] font-light italic leading-none text-ivory/[0.12]"
      >
        {groups[0]?.[0].venue.city}
      </span>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("venue")} label={m.venue.label} tone="light" />
        <h2 id="venue-title" className="sr-only">
          {m.venue.title}
        </h2>

        <div className="mt-10 space-y-24 lg:mt-16 lg:space-y-36">
          {groups.map((events, gi) => {
            const venue = events[0].venue;
            const title = venue.placeName ?? venue.name;
            return (
              <div key={venue.mapsQuery} className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-12">
                <Reveal className={`lg:col-span-7 ${gi % 2 ? "lg:order-2 lg:col-start-6" : ""}`} y={40}>
                  <div className="bg-ivory p-2 shadow-[10px_10px_0_0_var(--color-terracotta)] sm:p-3 sm:shadow-[16px_16px_0_0_var(--color-terracotta)]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-2 sm:aspect-[4/3]">
                      <iframe
                        title={`${copy.location.mapTitle}: ${title}`}
                        src={mapsEmbedUrl(venue.mapsQuery)}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.85)_sepia(0.2)_contrast(0.95)]"
                      />
                    </div>
                  </div>
                </Reveal>

                <div className={`lg:col-span-5 ${gi % 2 ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <h3 className="font-display text-[clamp(2.8rem,6vw,5.2rem)] font-light italic leading-[0.95] tracking-[-0.02em]">
                    <MaskLine>{title}</MaskLine>
                  </h3>
                  <dl className="mt-8 divide-y divide-ivory/25 border-y border-ivory/25">
                    <div className="py-4">
                      <dt className="text-[0.64rem] font-bold uppercase tracking-[0.28em] text-taupe">{m.venue.address}</dt>
                      <dd className="mt-1.5 text-[1.02rem] leading-relaxed">{venue.address}</dd>
                    </div>
                    <div className="py-4">
                      <dt className="text-[0.64rem] font-bold uppercase tracking-[0.28em] text-taupe">{m.venue.halls}</dt>
                      <dd>
                        <ul className="mt-2 space-y-1.5">
                          {events.map((e) => (
                            <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                              <span className="font-display text-xl italic">{lt(e.title, locale)}</span>
                              <span className="text-sm font-semibold">{e.venue.name}</span>
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
                    className="group mt-8 inline-flex min-h-14 items-center gap-4 bg-ivory px-6 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-espresso transition-colors duration-300 hover:bg-terracotta hover:text-ivory"
                  >
                    {copy.location.openMaps}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
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
