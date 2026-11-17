"use client";

import { useInvitation } from "@/components/InvitationContext";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { Reveal } from "@/components/motion/Reveal";
import { lt } from "@/lib/i18n";
import { BaseSpray, CornerSpray } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { Rise, SectionLabel } from "../ui";

/**
 * RSVP: the invitation to reply, on forest green, with a linen reply card laid on top like a card tucked into
 * an envelope. The form is the shared one, so validation, the WhatsApp hand-off and translations behave exactly
 * as in every other template: the reply only exists once the guest presses Send in WhatsApp.
 */
export function Rsvp() {
  const { data, copy, locale } = useInvitation();
  const { b, no } = useBotanical();

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="bot-paper bot-paper-dark bot-ink-light relative overflow-hidden bg-forest text-linen">
      <CornerSpray className="pointer-events-none absolute -left-20 -top-6 h-56 w-56 sm:-left-10 sm:h-72 sm:w-72" />
      <BaseSpray className="pointer-events-none absolute -bottom-2 -left-10 hidden h-40 w-72 lg:block" />

      <div className="relative mx-auto grid max-w-[72rem] gap-14 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:py-36">
        <div className="lg:col-span-5">
          <SectionLabel no={no("rsvp")} tone="light">
            {copy.rsvp.eyebrow}
          </SectionLabel>
          <h2 id="rsvp-title" className="mt-5 font-display text-[clamp(2.7rem,7vw,4.6rem)] font-light italic leading-[1.02] tracking-[-0.015em]">
            <Rise>{b.rsvp.title}</Rise>
          </h2>
          {data.rsvp?.message && <p className="mt-6 max-w-md text-base leading-[1.85] text-linen/90">{lt(data.rsvp.message, locale)}</p>}
        </div>

        <Reveal y={50} className="relative lg:col-span-7">
          <div className="relative bg-linen p-6 text-forest shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10 lg:p-12">
            <span aria-hidden="true" className="bot-tape absolute -top-3 left-8 h-6 w-24 -rotate-3" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-forest/15 sm:inset-3" />
            <div className="relative">
              <RsvpForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
