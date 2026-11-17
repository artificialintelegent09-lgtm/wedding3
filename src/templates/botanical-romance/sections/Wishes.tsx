"use client";

import { useInvitation } from "@/components/InvitationContext";
import { ExternalFormCard, WhatsAppWishForm } from "@/components/forms/Guestbook";
import { Reveal } from "@/components/motion/Reveal";
import { getWishChannel } from "@/lib/contact";
import { formatShortDate } from "@/lib/datetime";
import type { FeaturedWish } from "@/types/invitation";
import { Divider } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { Rise, SectionLabel } from "../ui";

/** A wish as a plant marker pushed into the soil: a tag with a punched hole and a handwritten line. */
function Note({ wish }: { wish: FeaturedWish }) {
  const { copy, locale } = useInvitation();
  return (
    <Reveal y={36}>
      <figure className="bot-tag relative bg-mist px-6 pb-7 pt-10">
        <span aria-hidden="true" className="absolute left-1/2 top-3.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-linen-2 shadow-[inset_0_1px_2px_rgba(38,61,50,0.35)]" />
        <blockquote className="font-display text-[1.4rem] font-normal italic leading-[1.4] text-forest">{wish.message}</blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
          <span className="text-forest">{wish.name}</span>
          {wish.date && (
            <time dateTime={wish.date} className="text-moss-deep">
              {formatShortDate(wish.date, locale)}
            </time>
          )}
          {wish.sample && <span className="border border-blush-deep/60 px-2 py-0.5 text-[0.6rem] text-blush-deep">{copy.wishes.sampleTag}</span>}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * The guestbook as garden notes: a card to send your own wishes (external form, or WhatsApp), and the messages the
 * couple chose to feature, staggered like markers along a bed. Sample messages are always tagged: there is no
 * backend, so nothing shown here pretends to be a live submission.
 */
export function Wishes() {
  const { data, copy } = useInvitation();
  const { b, no } = useBotanical();
  const channel = getWishChannel(data);
  const featured = data.wishes?.featured ?? [];
  const hasSample = featured.some((w) => w.sample);
  const left = featured.filter((_, i) => i % 2 === 0);
  const right = featured.filter((_, i) => i % 2 === 1);

  return (
    <section id="wishes" aria-labelledby="wishes-title" className="bot-paper relative overflow-hidden bg-linen text-forest">
      <div className="relative mx-auto max-w-[72rem] px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel no={no("wishes")} align="center">
            {copy.wishes.eyebrow}
          </SectionLabel>
          <h2 id="wishes-title" className="mt-5 font-display text-[clamp(3rem,9vw,6.4rem)] font-light italic leading-[0.95] tracking-[-0.02em]">
            <Rise>{b.wishes.title}</Rise>
          </h2>
          <Divider className="mx-auto mt-6 h-9 w-56" />
        </div>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-12">
          {channel && (
            <Reveal className="lg:col-span-5" y={40}>
              <div className="relative bg-[#faf8f1] p-6 shadow-[0_30px_60px_-34px_rgba(38,61,50,0.55)] ring-1 ring-forest/10 sm:p-9 lg:sticky lg:top-24">
                <span aria-hidden="true" className="bot-tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2" />
                <h3 className="font-display text-3xl font-medium italic leading-tight">{copy.wishes.cardTitle}</h3>
                <div className="mt-6">{channel.kind === "form" ? <ExternalFormCard url={channel.url} /> : <WhatsAppWishForm number={channel.number} />}</div>
              </div>
            </Reveal>
          )}

          {featured.length > 0 && (
            <div className={channel ? "lg:col-span-7" : "lg:col-span-10 lg:col-start-2"}>
              {hasSample ? (
                <p role="note" className="mb-10 border border-dashed border-blush-deep/50 px-4 py-3 text-[0.85rem] leading-relaxed text-forest/85">
                  <span className="mr-2 font-semibold uppercase tracking-[0.2em] text-blush-deep">{copy.wishes.sampleTag}</span>
                  {copy.wishes.sampleNote}
                </p>
              ) : (
                <p className="mb-10 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-moss-deep">{copy.wishes.featuredNote}</p>
              )}
              <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
                <ul className="space-y-8">
                  {left.map((w, i) => (
                    <li key={`${w.name}-${i}`}>
                      <Note wish={w} />
                    </li>
                  ))}
                </ul>
                <ul className="space-y-8 md:mt-16">
                  {right.map((w, i) => (
                    <li key={`${w.name}-${i}`}>
                      <Note wish={w} />
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
