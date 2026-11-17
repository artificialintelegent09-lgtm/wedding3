"use client";

import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { lt } from "@/lib/i18n";
import { Divider, Sprig } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { SectionLabel } from "../ui";

/**
 * The opening blessing and the invitation itself, set on forest green like a verse read at the garden
 * wall. Two sprigs stand at either margin; the words stay centred and large for easy reading.
 */
export function Invitation() {
  const { data, locale } = useInvitation();
  const { b, no } = useBotanical();
  const { quote, quoteSource, message } = data.intro;

  return (
    <section id="invitation" aria-labelledby="invitation-title" className="bot-paper bot-paper-dark bot-ink-light relative overflow-hidden bg-forest text-linen">
      <Sprig className="pointer-events-none absolute -left-6 bottom-0 hidden h-[34rem] w-36 opacity-90 sm:block lg:left-10" />
      <Sprig flip className="pointer-events-none absolute -right-6 bottom-0 hidden h-[34rem] w-36 opacity-90 sm:block lg:right-10" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 lg:py-36">
        <SectionLabel no={no("invitation")} tone="light" align="center">
          {b.invitation.label}
        </SectionLabel>

        <Reveal y={36} className="mt-10">
          <span aria-hidden="true" className="block h-12 font-display text-8xl leading-none text-blush">
            “
          </span>
          <h2
            id="invitation-title"
            className="font-display text-[clamp(1.55rem,4.8vw,2.45rem)] font-normal italic leading-[1.35] tracking-[-0.005em]"
          >
            {lt(quote, locale)}
          </h2>
          {quoteSource && (
            <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-sage">— {lt(quoteSource, locale)}</p>
          )}
        </Reveal>

        <Divider className="mx-auto mt-14 h-9 w-56 opacity-95" />

        <Reveal y={28} delay={0.1} className="mt-12">
          <p className="mx-auto max-w-xl text-base leading-[1.9] text-linen/90 sm:text-[1.075rem]">{lt(message, locale)}</p>
        </Reveal>
      </div>
    </section>
  );
}
