"use client";

import { useInvitation } from "@/components/InvitationContext";
import { showWishes } from "@/lib/contact";
import { Reveal } from "@/components/motion/Reveal";
import { Guestbook } from "@/components/forms/Guestbook";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Wishes() {
  const { data, copy } = useInvitation();
  if (!showWishes(data)) return null;
  return (
    <section id="wishes" className="surface surface-paper relative px-6 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={copy.wishes.eyebrow} title={copy.wishes.title} index="08" align="left" />
        <Reveal className="mt-14" y={30}>
          <Guestbook />
        </Reveal>
      </div>
    </section>
  );
}
