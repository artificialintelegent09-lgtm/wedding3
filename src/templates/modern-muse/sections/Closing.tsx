"use client";

import { ArrowUp } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { formatLongDate } from "@/lib/datetime";
import { lt } from "@/lib/i18n";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

/** Closing spread: full-bleed photograph, the names once more at full scale, a signature and the colophon. */
export function Closing() {
  const { data, locale } = useInvitation();
  const { m, no } = useMuse();
  const { bride, groom } = data.couple;
  const tz = data.events[0]?.timeZone ?? "UTC";

  return (
    <section id="closing" aria-labelledby="closing-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-espresso text-ivory">
      <Parallax amount={7} className="absolute inset-0 -z-10">
        <Photo asset={data.images.closing} sizes="100vw" />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-espresso/60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/30 to-espresso/50" />

      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-5 pb-8 pt-24 sm:px-10 lg:pt-32">
        <SectionHead no={no("closing")} label={m.closing.label} tone="light" />

        <div className="my-auto py-16">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-taupe">{m.closing.thanks}</p>
          <h2
            id="closing-title"
            className="mt-4 font-display text-[clamp(4.6rem,22vw,19rem)] font-light leading-[0.8] tracking-[-0.045em]"
          >
            <span className="sr-only">
              {bride.nickname} &amp; {groom.nickname}
            </span>
            <span aria-hidden="true" className="block">
              <MaskLine>{bride.nickname}</MaskLine>
              <MaskLine delay={0.15} className="pl-[0.35em] italic text-terracotta-soft">
                <span className="mr-[0.08em] text-[0.55em] not-italic text-ivory">&amp;</span>
                {groom.nickname}
              </MaskLine>
            </span>
          </h2>

          <Reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end" y={30}>
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-light italic leading-snug lg:col-span-7">{lt(data.closing.message, locale)}</p>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="font-display text-3xl italic">{lt(data.closing.signature, locale)}</p>
              <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.26em] text-ivory/80">
                {formatLongDate(data.weddingDate, locale, tz)}
              </p>
            </div>
          </Reveal>
        </div>

        <footer className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-t border-ivory/30 pt-5 text-[0.68rem] font-medium leading-relaxed tracking-wide text-ivory/75">
          <p>
            <span className="mr-3 font-bold uppercase tracking-[0.26em] text-taupe">{m.closing.colophon}</span>
            {m.closing.credit}
          </p>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("home")?.scrollIntoView({ block: "start" });
            }}
            className="group inline-flex min-h-11 items-center gap-2 font-bold uppercase tracking-[0.26em] text-ivory hover:text-terracotta-soft"
          >
            {m.closing.backToCover}
            <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.8} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
