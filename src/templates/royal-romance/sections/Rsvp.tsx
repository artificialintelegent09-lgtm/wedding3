"use client";

import { useInvitation } from "@/components/InvitationContext";
import { getRsvpChannel } from "@/lib/contact";
import { lt } from "@/lib/i18n";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { Reveal } from "@/components/motion/Reveal";
import { BotanicalSprig } from "@/components/ornaments/botanical-line";
import { OrnateFrame } from "@/components/ui/OrnateFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Rsvp() {
  const { data, copy, locale } = useInvitation();
  if (!getRsvpChannel(data)) return null;
  return (
    <section id="rsvp" className="surface surface-aged relative overflow-hidden px-5 py-24 sm:py-36">
      <BotanicalSprig bg="var(--tpl-paper-2)" className="pointer-events-none absolute -bottom-8 -left-8 h-64 w-auto -rotate-[12deg] text-gold/70 sm:left-10 sm:h-96" />

      <div className="relative mx-auto max-w-xl">
        <SectionHeading eyebrow={copy.rsvp.eyebrow} title={copy.rsvp.title} index="07" />
        {data.rsvp?.message && (
          <Reveal className="mx-auto mt-6 max-w-md text-center">
            <p className="font-display text-xl font-medium italic text-ink/80">{lt(data.rsvp.message, locale)}</p>
          </Reveal>
        )}
        <Reveal className="mt-12" y={36}>
          <OrnateFrame className="surface surface-paper bg-paper shadow-[0_40px_70px_-45px_rgba(74,15,28,0.55)]" innerClassName="px-7 pb-9 pt-10 sm:px-12 sm:pb-12 sm:pt-12">
            <RsvpForm />
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}
