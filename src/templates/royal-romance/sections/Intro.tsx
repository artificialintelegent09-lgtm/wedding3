"use client";

import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { BotanicalSprig } from "@/components/ornaments/botanical-line";
import { Monogram } from "@/components/ornaments/Monogram";
import { lt } from "@/lib/i18n";

/** An editorial opening statement: monogram in the margin, a large italic verse, a quiet message. */
export function Intro() {
  const { data, locale } = useInvitation();
  const { intro, couple } = data;
  return (
    <section id="intro" className="surface surface-paper relative overflow-hidden px-6 py-24 sm:py-36">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[11rem_1fr] lg:gap-24">
        <Reveal className="flex items-center gap-5 lg:block">
          <Monogram monogram={couple.monogram} className="w-20 text-primary lg:w-28" />
          <span aria-hidden="true" className="h-px flex-1 bg-primary/25 lg:mt-8 lg:block lg:w-full lg:flex-none" />
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <blockquote>
              <p className="font-display text-[1.7rem] font-medium italic leading-[1.32] tracking-[-0.005em] text-primary sm:text-[2.6rem] lg:text-5xl">
                <span aria-hidden="true" className="mr-1 text-rose">“</span>
                {lt(intro.quote, locale)}
                <span aria-hidden="true" className="ml-0.5 text-rose">”</span>
              </p>
              {intro.quoteSource && (
                <footer className="mt-6 flex items-center gap-3 text-[0.68rem] font-normal uppercase tracking-[0.32em] text-gold-deep">
                  <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
                  {lt(intro.quoteSource, locale)}
                </footer>
              )}
            </blockquote>
          </Reveal>

          <Reveal delay={0.12} className="mt-14 max-w-lg border-t border-primary/20 pt-8">
            <p className="text-[1.02rem] font-light leading-[1.95] text-ink/80 sm:text-lg">{lt(intro.message, locale)}</p>
          </Reveal>
        </div>
      </div>

      {/* a single sprig leaning in from the lower edge */}
      <BotanicalSprig bg="var(--tpl-paper)" className="pointer-events-none absolute -bottom-10 -right-6 h-72 w-auto rotate-[14deg] text-gold/70 sm:h-96 lg:right-10" />
    </section>
  );
}
