"use client";

import { useInvitation } from "@/components/InvitationContext";
import { RsvpForm } from "@/components/forms/RsvpForm";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { lt } from "@/lib/i18n";
import { PICKS } from "../config";
import { useMuse } from "../MuseContext";
import { Caption, MaskLine, SectionHead } from "../ui";

/**
 * RSVP on a terracotta spread: the word itself is the headline, a photograph sits under it, and the
 * ivory form sheet overlaps the photograph like a loose page laid on top. The form is the shared one,
 * so behaviour (validation, WhatsApp hand-off, translations) is identical to every other template.
 */
export function Rsvp() {
  const { data, locale } = useInvitation();
  const { m, no } = useMuse();
  const photo = data.gallery[PICKS.rsvp] ?? data.images.hero;

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="muse-grain muse-grain-dark relative overflow-hidden bg-terracotta text-ivory">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("rsvp")} label={m.rsvp.label} tone="light" className="[&>span:first-child]:text-ivory" />
        <h2 id="rsvp-title" className="mt-4 font-display text-[clamp(6rem,26vw,22rem)] font-light italic leading-[0.8] tracking-[-0.05em]">
          <MaskLine>{m.rsvp.title}</MaskLine>
        </h2>

        <div className="relative mt-10 grid gap-0 lg:mt-0 lg:grid-cols-12 lg:gap-x-8">
          <figure className="lg:col-span-5 lg:-mt-6">
            <ImageReveal className="relative aspect-[4/3] lg:aspect-[4/5]">
              <Photo asset={photo} sizes="(min-width: 1024px) 38vw, 90vw" />
            </ImageReveal>
            <Caption tone="light" no="—" className="mt-3 max-w-xs">
              {photo.alt}
            </Caption>
          </figure>

          <Reveal
            y={50}
            className="relative z-10 -mt-14 ml-auto w-[94%] bg-ivory p-6 text-espresso shadow-[0_40px_80px_-30px_rgba(33,31,29,0.7)] sm:p-10 lg:col-span-7 lg:-ml-20 lg:mt-24 lg:w-auto lg:p-14"
          >
            <p className="font-display text-3xl font-light italic leading-tight sm:text-4xl">{m.rsvp.sub}</p>
            {data.rsvp?.message && <p className="mt-3 max-w-md leading-relaxed text-espresso/80">{lt(data.rsvp.message, locale)}</p>}
            <div className="mt-8">
              <RsvpForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
