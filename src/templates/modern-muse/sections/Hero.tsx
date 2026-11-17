"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { Photo } from "@/components/ui/Photo";
import { formatParts } from "@/lib/datetime";
import { luxe } from "@/lib/motion";
import { dotDate } from "../config";
import { useMuse } from "../MuseContext";
import { MaskLine } from "../ui";

/**
 * Magazine cover. Mobile: one full-bleed photograph with the names stacked across its lower half.
 * Desktop: the photograph takes the right 60% like a printed cover, and the names run across the
 * seam into it. Cover lines sit left in small, bold metadata.
 */
export function Hero() {
  const { data, locale, opened } = useInvitation();
  const { m, no } = useMuse();
  const { bride, groom } = data.couple;
  const tz = data.events[0]?.timeZone ?? "UTC";
  const d = formatParts(data.weddingDate, locale, tz);
  const event = data.events[0];

  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label={m.sections.home}
      className="relative isolate min-h-svh overflow-hidden bg-espresso text-ivory"
    >
      {/* photograph */}
      <div className="absolute inset-0 lg:left-[38%]">
        <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.18 }}
            animate={{ scale: opened ? 1 : 1.18 }}
            transition={{ duration: 2.4, ease: luxe }}
          >
            <Photo asset={data.images.hero} sizes="(min-width: 1024px) 62vw, 100vw" priority />
          </motion.div>
        </motion.div>
        {/* scrims: keep the type legible without flattening the photo */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 via-35% to-transparent to-60%" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-espresso/70 to-transparent" />
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-espresso to-transparent lg:block" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-[100rem] flex-col justify-between px-5 pb-8 pt-20 sm:px-10 lg:pb-12">
        {/* top: issue line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: opened ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-start justify-between gap-6 text-[0.68rem] font-bold uppercase tracking-[0.3em]"
        >
          <span className="text-taupe">{m.issue}</span>
          <span className="text-right text-ivory/80">
            {m.issueNo} — {no("home")}
          </span>
        </motion.div>

        {/* cover lines: desktop left column */}
        <motion.ul
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: opened ? 1 : 0, x: opened ? 0 : -16 }}
          transition={{ duration: 1.1, ease: luxe, delay: 1.6 }}
          className="absolute left-10 top-1/2 hidden w-56 -translate-y-[60%] space-y-5 lg:block"
          aria-label={m.hero.coverLines}
        >
          <li className="text-[0.66rem] font-bold uppercase tracking-[0.3em] text-taupe">{m.hero.coverLines}</li>
          {m.hero.lines.map((line, i) => (
            <li key={line} className="flex gap-4 border-t border-ivory/25 pt-3 text-sm font-semibold uppercase leading-snug tracking-[0.14em]">
              <span className="text-terracotta-soft">{String(i + 1).padStart(2, "0")}</span>
              {line}
            </li>
          ))}
        </motion.ul>

        {/* names + metadata */}
        <div className="relative mt-auto">
          <h1 className="font-display font-light leading-[0.8] tracking-[-0.035em]">
            <span className="sr-only">
              {bride.nickname} &amp; {groom.nickname}
            </span>
            <span aria-hidden="true" className="block text-[clamp(5.6rem,31vw,9rem)] sm:text-[clamp(8rem,22vw,15rem)] lg:text-[clamp(9rem,15.5vw,17rem)]">
              <MaskLine active={opened} delay={0.9}>{bride.nickname}</MaskLine>
              <MaskLine active={opened} delay={1.1} className="pl-[0.38em] italic text-terracotta-soft">
                <span className="mr-[0.08em] text-[0.55em] not-italic text-ivory">&amp;</span>
                {groom.nickname}
              </MaskLine>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 16 }}
            transition={{ duration: 1, ease: luxe, delay: 1.7 }}
            className="mt-7 grid grid-cols-[1fr_auto] items-end gap-x-6 gap-y-5 border-t border-ivory/30 pt-5 sm:grid-cols-[1.3fr_1fr_auto] lg:mt-9"
          >
            <p className="col-span-2 max-w-md font-display text-[1.55rem] font-light italic leading-tight sm:col-span-1 sm:text-3xl">
              {m.tagline}
            </p>
            <dl className="grid gap-3 text-[0.72rem] font-bold uppercase tracking-[0.22em]">
              <div>
                <dt className="sr-only">{m.hero.date}</dt>
                <dd className="text-lg tracking-[0.1em] sm:text-xl">{dotDate(data.weddingDate, tz, locale)}</dd>
                <dd className="mt-0.5 text-ivory/75">
                  {d.weekday}
                </dd>
              </div>
              {event && (
                <div>
                  <dt className="sr-only">{m.hero.place}</dt>
                  <dd className="text-ivory/75">{event.venue.placeName ?? event.venue.name}, {event.venue.city}</dd>
                </div>
              )}
            </dl>
            <div className="flex flex-col items-end gap-3">
              <span aria-hidden="true" className="muse-barcode block h-10 w-24 text-ivory/90" />
              <a
                href="#invitation"
                className="group hidden items-center gap-2 text-[0.64rem] font-bold uppercase tracking-[0.3em] text-ivory/80 hover:text-ivory sm:flex"
              >
                {m.hero.scroll}
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
