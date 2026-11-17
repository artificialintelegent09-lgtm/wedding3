"use client";

import { useInvitation } from "@/components/InvitationContext";
import { ExternalFormCard, WhatsAppWishForm } from "@/components/forms/Guestbook";
import { Reveal } from "@/components/motion/Reveal";
import { formatShortDate } from "@/lib/datetime";
import { getWishChannel } from "@/lib/contact";
import type { FeaturedWish } from "@/types/invitation";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

function Letter({ wish, large }: { wish: FeaturedWish; large: boolean }) {
  const { copy, locale } = useInvitation();
  return (
    <Reveal y={36}>
      <figure className="border-t border-ivory/30 pt-6">
        <span aria-hidden="true" className="block h-8 font-display text-6xl font-light leading-none text-terracotta-soft">
          “
        </span>
        <blockquote
          className={`font-display font-light italic leading-[1.22] tracking-[-0.005em] ${
            large ? "text-[clamp(1.9rem,3.2vw,2.8rem)]" : "text-[clamp(1.4rem,2vw,1.8rem)]"
          }`}
        >
          {wish.message}
        </blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.68rem] font-bold uppercase tracking-[0.24em]">
          <span className="text-ivory">{wish.name}</span>
          {wish.date && (
            <time dateTime={wish.date} className="text-taupe">
              {formatShortDate(wish.date, locale)}
            </time>
          )}
          {wish.sample && <span className="border border-taupe/70 px-2 py-0.5 text-[0.6rem] text-taupe">{copy.wishes.sampleTag}</span>}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * Guestbook as "letters to the editor": the ivory composer sheet on one side, a wall of pull-quotes on
 * the other in two staggered columns. Sample messages are always tagged: there is no backend, so nothing
 * shown here pretends to be a live submission.
 */
export function Wishes() {
  const { data, copy } = useInvitation();
  const { m, no } = useMuse();
  const channel = getWishChannel(data);
  const featured = data.wishes?.featured ?? [];
  const hasSample = featured.some((w) => w.sample);
  const left = featured.filter((_, i) => i % 2 === 0);
  const right = featured.filter((_, i) => i % 2 === 1);

  return (
    <section id="wishes" aria-labelledby="wishes-title" className="muse-grain muse-grain-dark relative overflow-hidden bg-espresso text-ivory">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("wishes")} label={m.wishes.label} tone="light" />
        <h2 id="wishes-title" className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,8vw,7.4rem)] font-light italic leading-[0.92] tracking-[-0.03em]">
          <MaskLine>{m.wishes.title}</MaskLine>
        </h2>

        <div className="mt-14 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          {channel && (
            <Reveal className="lg:col-span-5" y={40}>
              <div className="bg-ivory p-6 text-espresso sm:p-10 lg:sticky lg:top-24">
                <h3 className="font-display text-3xl font-medium italic leading-tight">{copy.wishes.cardTitle}</h3>
                <div className="mt-6">{channel.kind === "form" ? <ExternalFormCard url={channel.url} /> : <WhatsAppWishForm number={channel.number} />}</div>
              </div>
            </Reveal>
          )}

          {featured.length > 0 && (
            <div className={channel ? "lg:col-span-7" : "lg:col-span-10 lg:col-start-2"}>
              {hasSample ? (
                <p role="note" className="mb-10 border border-dashed border-taupe/60 px-4 py-3 text-[0.85rem] leading-relaxed text-ivory/85">
                  <span className="mr-2 font-bold uppercase tracking-[0.2em] text-taupe">{copy.wishes.sampleTag}</span>
                  {copy.wishes.sampleNote}
                </p>
              ) : (
                <p className="mb-10 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-taupe">{copy.wishes.featuredNote}</p>
              )}
              <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                <ul className="space-y-10">
                  {left.map((w, i) => (
                    <li key={`${w.name}-${i}`}>
                      <Letter wish={w} large={i === 0} />
                    </li>
                  ))}
                </ul>
                <ul className="space-y-10 md:mt-24">
                  {right.map((w, i) => (
                    <li key={`${w.name}-${i}`}>
                      <Letter wish={w} large={false} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
