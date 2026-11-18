"use client";

import { motion } from "framer-motion";
import { useInvitation } from "@/components/InvitationContext";
import { Photo } from "@/components/ui/Photo";
import { formatParts } from "@/lib/datetime";
import { luxe } from "@/lib/motion";
import { BaseSpray, CornerSpray } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { describe, heroPanorama, SHAPES } from "../config";
import { Meta } from "../ui";

const rise = (delay: number, opened: boolean) => ({
  initial: { opacity: 0, y: 26 },
  animate: opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
  transition: { duration: 1.1, ease: luxe, delay },
});

/**
 * The first view of the garden once the gate is open. The names are set at full scale on paper; a leaf-shaped
 * window looks out over the garden where the story begins, and a small oval portrait rests on its edge like a
 * pressed photograph. Foliage grows in at the corners only after the gate has opened.
 */
export function Hero() {
  const { data, copy, locale, opened } = useInvitation();
  const { b } = useBotanical();
  const { bride, groom } = data.couple;
  const event = data.events[0];
  const tz = event?.timeZone ?? "UTC";
  const d = formatParts(data.weddingDate, locale, tz);
  const panorama = heroPanorama(data);
  const portrait = data.images.hero;

  return (
    <section id="home" aria-label={b.sections.home} className="bot-paper relative isolate min-h-svh overflow-hidden bg-linen text-forest">
      {opened && (
        <>
          <CornerSpray trigger="mount" delay={0.4} className="pointer-events-none absolute -right-16 -top-4 h-52 w-52 -scale-x-100 sm:h-72 sm:w-72 lg:right-0 lg:h-96 lg:w-96" />
          <BaseSpray trigger="mount" delay={1} className="pointer-events-none absolute -bottom-2 -left-12 h-28 w-52 sm:h-40 sm:w-72 lg:left-0 lg:h-52 lg:w-96" />
        </>
      )}

      <div className="relative mx-auto grid min-h-svh max-w-[88rem] items-center gap-10 px-5 pb-24 pt-24 sm:px-10 lg:grid-cols-12 lg:gap-x-6 lg:pb-16">
        <div className="lg:col-span-7">
          <motion.div {...rise(0.2, opened)}>
            <Meta className="text-moss-deep">{b.gate.kicker}</Meta>
          </motion.div>
          <motion.p {...rise(0.3, opened)} className="mt-2 font-display text-2xl italic text-forest/80 sm:text-3xl">
            {copy.hero.kicker}
          </motion.p>

          <h1 className="mt-4 font-display text-[clamp(4.6rem,22vw,10.5rem)] font-light leading-[0.84] tracking-[-0.03em]">
            <span className="sr-only">
              {bride.nickname} &amp; {groom.nickname}
            </span>
            <motion.span aria-hidden="true" className="block" {...rise(0.4, opened)}>
              {bride.nickname}
            </motion.span>
            <motion.span aria-hidden="true" className="block pl-[0.35em] italic text-moss-deep" {...rise(0.55, opened)}>
              <span className="mr-[0.06em] text-[0.62em] not-italic text-blush-deep">&amp;</span>
              {groom.nickname}
            </motion.span>
          </h1>

          <motion.p {...rise(0.8, opened)} className="mt-6 max-w-sm font-display text-[1.45rem] italic leading-snug text-forest/85 sm:text-[1.7rem]">
            {b.tagline}
          </motion.p>

          <motion.dl {...rise(0.95, opened)} className="mt-9 grid max-w-md grid-cols-2 gap-x-8 border-t border-forest/25 pt-5">
            <div>
              <dt>
                <Meta className="text-moss-deep">{b.hero.date}</Meta>
              </dt>
              <dd className="mt-1.5 font-display text-[1.7rem] font-medium leading-none sm:text-3xl">
                {d.day} {d.month}
                <span className="block pt-1 text-lg italic text-forest/75 sm:text-xl">
                  {d.weekday}, {d.year}
                </span>
              </dd>
            </div>
            {event && (
              <div>
                <dt>
                  <Meta className="text-moss-deep">{b.hero.place}</Meta>
                </dt>
                <dd className="mt-1.5 font-display text-xl font-medium leading-tight sm:text-2xl">
                  {event.venue.placeName ?? event.venue.name}
                  {event.venue.city && <span className="block pt-1 text-lg italic text-forest/75">{event.venue.city}</span>}
                </dd>
              </div>
            )}
          </motion.dl>
        </div>

        {/* A leaf-shaped window onto the garden, with a pressed portrait resting on its corner. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.4, ease: luxe, delay: 0.5 }}
          className="relative mx-auto w-full max-w-md pb-14 lg:col-span-5 lg:max-w-none lg:pb-20"
        >
          <span aria-hidden="true" className={`absolute inset-0 bottom-14 translate-x-3 translate-y-3 border border-moss/50 lg:bottom-20 ${SHAPES.leaf}`} />
          <div className={`relative aspect-[4/5] overflow-hidden bg-sage/40 lg:aspect-[4/5] ${SHAPES.leaf}`}>
            {/* Behind the gate: not preloaded and fetched at low priority, so it never competes with the gate photograph. */}
            <Photo asset={panorama} alt={describe(panorama, locale)} sizes="(min-width: 1024px) 40vw, 90vw" loading="eager" fetchPriority="low" className="bot-photo" />
          </div>
          <div className="absolute -bottom-0 -left-1 aspect-[3/4] w-[38%] min-w-28 rotate-[-4deg] sm:-left-6">
            <div className={`relative h-full w-full overflow-hidden border-[5px] border-linen bg-sage/40 shadow-[0_18px_40px_-18px_rgba(28,45,36,0.6)] ${SHAPES.oval}`}>
              <Photo asset={portrait} alt={describe(portrait, locale)} sizes="(min-width: 1024px) 14vw, 38vw" className="bot-photo" />
            </div>
          </div>
        </motion.div>
      </div>

      <HeroScroll opened={opened} />
    </section>
  );
}

/** A stem that grows downward, inviting the guest to keep scrolling. */
function HeroScroll({ opened }: { opened: boolean }) {
  const { b } = useBotanical();
  return (
    <motion.a
      href="#invitation"
      initial={{ opacity: 0 }}
      animate={{ opacity: opened ? 1 : 0 }}
      transition={{ duration: 1, delay: 1.6 }}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("invitation")?.scrollIntoView({ block: "start" });
      }}
      className="absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-moss-deep"
    >
      <span>{b.hero.scroll}</span>
      <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-moss/30">
        <span className="absolute inset-x-0 top-0 h-3 animate-drift bg-moss" />
      </span>
    </motion.a>
  );
}
