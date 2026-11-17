"use client";

import { useInvitation } from "@/components/InvitationContext";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { lt } from "@/lib/i18n";
import type { StoryMoment } from "@/types/invitation";
import { pad2, ROMAN } from "../config";
import { useMuse } from "../MuseContext";
import { Caption, MaskLine, SectionHead } from "../ui";

function Body({ moment, dark = false }: { moment: StoryMoment; dark?: boolean }) {
  const { locale } = useInvitation();
  return (
    <p
      className={`muse-dropcap mt-7 max-w-[34rem] text-[clamp(1.02rem,1.35vw,1.2rem)] leading-[1.85] ${
        dark ? "text-ivory/90" : "text-espresso/85"
      }`}
    >
      {lt(moment.body, locale)}
    </p>
  );
}

function Head({ moment, index, className = "" }: { moment: StoryMoment; index: number; className?: string }) {
  const { locale } = useInvitation();
  const { m } = useMuse();
  return (
    <header className={className}>
      <p className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.28em]">
        <span className="text-terracotta">
          {m.story.chapter} {ROMAN[index] ?? index + 1}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-espresso/40" />
        <span className="text-espresso/70">{lt(moment.date, locale)}</span>
      </p>
      <h3 className="mt-4 font-display text-[clamp(2.8rem,6.4vw,6rem)] font-light italic leading-[0.94] tracking-[-0.025em] [text-wrap:balance]">
        <MaskLine>{lt(moment.title, locale)}</MaskLine>
      </h3>
    </header>
  );
}

/** A giant outlined roman numeral, sitting behind a chapter. */
function Numeral({ index, className = "" }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`muse-outline pointer-events-none absolute select-none font-display text-[clamp(10rem,26vw,24rem)] font-light italic leading-none text-terracotta/45 ${className}`}
    >
      {ROMAN[index] ?? pad2(index + 1)}
    </span>
  );
}

function Chapter({ moment, index }: { moment: StoryMoment; index: number }) {
  const { locale } = useInvitation();
  const photo = moment.image;
  const layout = index % 4;

  const image = (aspect: string, sizes: string, parallax = true) =>
    photo && (
      <figure>
        <ImageReveal from={layout % 2 ? "right" : "left"} className={`relative ${aspect}`}>
          {parallax ? (
            <Parallax amount={5} className="relative h-full w-full">
              <Photo asset={photo} sizes={sizes} />
            </Parallax>
          ) : (
            <Photo asset={photo} sizes={sizes} />
          )}
        </ImageReveal>
        <Caption no={pad2(index + 1)} className="mt-3 max-w-sm">
          {photo.alt}
        </Caption>
      </figure>
    );

  if (layout === 0) {
    return (
      <article className="relative grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">{image("aspect-[4/5]", "(min-width: 1024px) 40vw, 90vw")}</div>
        <div className="relative lg:col-span-6 lg:col-start-7 lg:pt-24">
          <Numeral index={index} className="-right-4 -top-16 lg:-top-8" />
          <Reveal className="relative">
            <Head moment={moment} index={index} />
            <Body moment={moment} />
          </Reveal>
        </div>
      </article>
    );
  }

  if (layout === 1) {
    return (
      <article className="relative grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="relative order-2 lg:order-1 lg:col-span-5 lg:self-center">
          <Numeral index={index} className="-left-4 -top-24 lg:-left-10 lg:-top-40" />
          <Reveal className="relative">
            <Head moment={moment} index={index} />
            <Body moment={moment} />
          </Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:mt-20">
          {image("aspect-square", "(min-width: 1024px) 48vw, 90vw")}
        </div>
      </article>
    );
  }

  if (layout === 2) {
    return (
      <article className="relative grid gap-0 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">{image("aspect-[4/3]", "(min-width: 1024px) 62vw, 95vw", false)}</div>
        <Reveal
          y={50}
          className="relative z-10 -mt-12 ml-auto w-[92%] bg-olive-deep p-6 text-ivory shadow-[10px_10px_0_0_var(--color-terracotta)] sm:p-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:-ml-24 lg:mt-48 lg:w-auto lg:shadow-[14px_14px_0_0_var(--color-terracotta)]"
        >
          <p className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-taupe">
            <span>
              {ROMAN[index] ?? index + 1}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-taupe/60" />
            <span>{lt(moment.date, locale)}</span>
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.6rem)] font-light italic leading-[0.96] tracking-[-0.02em]">
            {lt(moment.title, locale)}
          </h3>
          <Body moment={moment} dark />
        </Reveal>
      </article>
    );
  }

  // layout 3: centred finale
  return (
    <article className="relative mx-auto max-w-4xl text-center">
      <Numeral index={index} className="left-1/2 top-0 -translate-x-1/2 lg:-top-24" />
      <Reveal className="relative">
        <Head moment={moment} index={index} className="flex flex-col items-center [&_p]:justify-center" />
      </Reveal>
      <div className="relative mx-auto mt-10 w-[68%] max-w-sm sm:w-[46%]">{image("aspect-[3/4]", "(min-width: 1024px) 24vw, 70vw", false)}</div>
      <Reveal className="mx-auto">
        <Body moment={moment} />
      </Reveal>
    </article>
  );
}

/**
 * The Love Chronicle: the story as a magazine feature. Four chapters, four compositions
 * (photo-left, photo-right, overlapping text block, centred finale), each with a chapter number,
 * a dropped capital and a captioned photograph.
 */
export function Story() {
  const { data } = useInvitation();
  const { m, no } = useMuse();
  const story = data.story ?? [];

  return (
    <section id="story" aria-labelledby="story-title" className="muse-grain relative overflow-hidden bg-ivory text-espresso">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-36">
        <SectionHead no={no("story")} label={m.story.label} />
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="story-title" className="font-display text-[clamp(3.6rem,12vw,11rem)] font-light italic leading-[0.86] tracking-[-0.035em] lg:col-span-9">
            <MaskLine>{m.story.title}</MaskLine>
          </h2>
          <div className="text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.26em] text-espresso/75 lg:col-span-3 lg:text-right">
            <p>{m.story.byline}</p>
            <p className="mt-1 text-terracotta">{m.story.chapters(story.length)}</p>
          </div>
        </div>

        <div className="mt-20 space-y-28 lg:mt-32 lg:space-y-48">
          {story.map((moment, i) => (
            <Chapter key={i} moment={moment} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
