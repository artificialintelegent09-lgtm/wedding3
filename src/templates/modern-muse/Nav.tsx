"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { formatParts } from "@/lib/datetime";
import type { Locale } from "@/types/invitation";
import { pad2, type SectionKey } from "./config";
import { useMuse } from "./MuseContext";

const LANGS: { value: Locale; label: string; name: string }[] = [
  { value: "id", label: "ID", name: "Bahasa Indonesia" },
  { value: "en", label: "EN", name: "English" },
];

const ease = [0.76, 0, 0.24, 1] as const;

/** Tracks which section is crossing the middle of the viewport. */
function useCurrentSection(sections: SectionKey[], enabled: boolean): SectionKey {
  const [current, setCurrent] = useState<SectionKey>("home");
  const key = sections.join();
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id as SectionKey);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of key.split(",")) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled, key]);
  return current;
}

/**
 * The magazine's running header plus a full-screen table of contents.
 * Language and music stay reachable from the very first screen (the gate), everything else
 * appears once the invitation is open.
 */
export function Nav() {
  const { data, opened, locale, setLocale } = useInvitation();
  const { m, sections, music } = useMuse();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  const current = useCurrentSection(sections, opened);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 48));

  // Menu: lock scroll, focus the first entry, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // Wait a frame so the scroll lock is released before scrolling.
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  };

  const couple = `${data.couple.bride.nickname} & ${data.couple.groom.nickname}`;
  const tz = data.events[0]?.timeZone ?? "UTC";
  const date = formatParts(data.weddingDate, locale, tz);
  const currentIndex = Math.max(0, sections.indexOf(current));
  const showBar = opened && (solid || menuOpen);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[95] flex h-14 items-center justify-between px-4 text-ivory transition-colors duration-500 sm:px-8 ${
          showBar ? "bg-espresso" : "bg-transparent"
        } ${showBar && !menuOpen ? "border-b border-ivory/15" : ""}`}
      >
        {opened ? (
          <a
            href="#home"
            onClick={goTo("home")}
            className="flex min-h-11 items-center font-display text-2xl font-semibold tracking-[0.04em]"
            aria-label={`${couple}: ${m.sections.home}`}
          >
            {data.couple.monogram}
          </a>
        ) : (
          <span aria-hidden="true" />
        )}

        <div className="flex items-center gap-1 sm:gap-3">
          {music.available && (
            <button
              type="button"
              onClick={music.toggle}
              aria-pressed={music.playing}
              aria-label={music.playing ? m.music.pause : m.music.play}
              className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-70"
            >
              {music.playing ? (
                <Volume2 className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <VolumeX className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} aria-hidden="true" />
              )}
            </button>
          )}

          <div role="group" aria-label={m.nav.language} className="flex items-center text-[0.68rem] font-bold tracking-[0.2em]">
            {LANGS.map((l, i) => {
              const active = locale === l.value;
              return (
                <span key={l.value} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
                  <button
                    type="button"
                    lang={l.value}
                    aria-label={l.name}
                    aria-pressed={active}
                    onClick={() => setLocale(l.value)}
                    className={`grid h-11 min-w-9 place-items-center px-1.5 transition-opacity ${
                      active ? "underline decoration-terracotta decoration-2 underline-offset-[7px]" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {l.label}
                  </button>
                </span>
              );
            })}
          </div>

          {opened && (
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="muse-contents"
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 flex h-11 items-center gap-3 pl-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] transition-opacity hover:opacity-70"
            >
              <span className="hidden sm:inline">{menuOpen ? m.nav.close : m.nav.contents}</span>
              <span className="sr-only sm:hidden">{menuOpen ? m.nav.closeMenu : m.nav.openMenu}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                    menuOpen ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-current transition-all duration-500 ${
                    menuOpen ? "top-1/2 w-full -rotate-45" : "top-full w-2/3"
                  }`}
                />
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Table of contents */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="muse-contents"
            aria-label={m.nav.label}
            className="muse-grain muse-grain-dark fixed inset-0 z-[80] overflow-y-auto bg-espresso text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="mx-auto grid min-h-full max-w-[90rem] gap-10 px-5 pb-12 pt-24 sm:px-10 lg:grid-cols-[1fr_20rem] lg:gap-20 lg:pt-28">
              <ol className="self-center">
                {sections.map((key, i) => {
                  const active = key === current;
                  return (
                    <motion.li
                      key={key}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.04 }}
                      className="border-b border-ivory/15 last:border-b-0"
                    >
                      <a
                        ref={i === 0 ? firstLink : undefined}
                        href={`#${key}`}
                        onClick={goTo(key)}
                        aria-current={active ? "location" : undefined}
                        className="group flex min-h-12 items-baseline gap-5 py-1.5 sm:gap-8"
                      >
                        <span className="w-7 shrink-0 text-[0.68rem] font-bold tracking-[0.2em] text-taupe sm:w-9">{pad2(i)}</span>
                        <span
                          className={`font-display text-[clamp(1.9rem,6.2vw,4.6rem)] font-normal leading-[1.08] transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-taupe ${
                            active ? "italic text-taupe" : ""
                          }`}
                        >
                          {m.sections[key]}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ol>

              <aside className="flex flex-col justify-end gap-6 border-ivory/15 pb-2 text-sm lg:border-l lg:pl-10">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-taupe">
                  {m.issue} · {m.issueNo}
                </p>
                <p className="font-display text-5xl leading-none">
                  {data.couple.bride.nickname}
                  <span className="block italic text-terracotta-soft">&amp; {data.couple.groom.nickname}</span>
                </p>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-ivory/80">
                  {date.day} {date.month} {date.year}
                </p>
                <p className="max-w-[15rem] text-sm leading-relaxed text-ivory/65">{m.tagline}</p>
              </aside>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop: a vertical "now reading" marker on the right edge. */}
      {opened && !menuOpen && (
        <p
          aria-hidden="true"
          className="vertical-rl pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 rotate-180 text-[0.62rem] font-bold uppercase tracking-[0.4em] text-ivory mix-blend-difference lg:block"
        >
          {pad2(currentIndex)} / {pad2(sections.length - 1)} — {m.sections[current]}
        </p>
      )}
    </>
  );
}
