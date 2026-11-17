"use client";

import { AtSign } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { lt } from "@/lib/i18n";
import type { Person } from "@/types/invitation";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

function Profile({ person, label, className = "", imageClass }: { person: Person; label: string; className?: string; imageClass: string }) {
  const { locale } = useInvitation();
  const { m } = useMuse();
  return (
    <article className={className}>
      <div className="relative">
        <ImageReveal className={`relative ${imageClass}`}>
          <Photo asset={person.photo} sizes="(min-width: 1024px) 45vw, 90vw" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/0 via-45% to-transparent" />
        </ImageReveal>
        {/* The name sits on the photograph's dark foot, running past its edge. */}
        <h3 className="pointer-events-none absolute -bottom-[0.18em] left-4 right-4 font-display text-[clamp(4rem,11vw,9.5rem)] font-light italic leading-[0.86] tracking-[-0.03em] text-ivory sm:left-6">
          {person.nickname}
        </h3>
      </div>

      <div className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-espresso">
        <p className="col-span-2 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-espresso/70">{label}</p>
        <p className="col-span-2 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-medium leading-tight">{person.fullName}</p>
        <p className="col-span-2 border-t border-espresso/30 pt-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-espresso/75">
          {lt(person.childOf, locale)}
        </p>
        <p className="col-span-2 text-base font-medium leading-relaxed">
          {person.fatherName}
          <span className="px-2 font-display text-lg italic text-terracotta">{m.couple.and}</span>
          {person.motherName}
        </p>
        {person.instagram && (
          <a
            href={`https://instagram.com/${person.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 inline-flex min-h-11 items-center gap-2 self-start text-[0.78rem] font-bold tracking-[0.12em] underline decoration-terracotta decoration-2 underline-offset-[6px] hover:text-terracotta"
          >
            <AtSign className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            {person.instagram}
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Bride and groom profiles. Two photographs of different proportions, deliberately out of step:
 * the groom's is lower and overlaps the bride's, and an outlined ampersand sits behind both.
 */
export function Couple() {
  const { data } = useInvitation();
  const { m, no } = useMuse();
  const { bride, groom } = data.couple;

  return (
    <section id="couple" aria-labelledby="couple-title" className="muse-grain relative overflow-hidden bg-taupe text-espresso">
      {/* ampersand watermark */}
      <span
        aria-hidden="true"
        className="muse-outline pointer-events-none absolute -right-[4vw] top-[34%] select-none font-display text-[clamp(18rem,55vw,52rem)] font-light italic leading-none text-espresso/25"
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-[90rem] px-5 pb-24 pt-24 sm:px-10 lg:pb-44 lg:pt-36">
        <SectionHead no={no("couple")} label={m.couple.label} />
        <h2 id="couple-title" className="mt-6 font-display text-[clamp(3.4rem,10vw,9rem)] font-light italic leading-[0.9] tracking-[-0.03em]">
          <MaskLine>{m.couple.title}</MaskLine>
        </h2>

        <div className="mt-14 grid gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-7" y={40}>
            <Profile person={bride} label={m.couple.bride} imageClass="aspect-[5/6]" />
          </Reveal>
          <Reveal className="relative z-10 ml-auto w-[82%] lg:col-span-5 lg:col-start-8 lg:mt-56 lg:-ml-20 lg:w-auto" y={60} delay={0.1}>
            <Profile person={groom} label={m.couple.groom} imageClass="aspect-[3/4]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
