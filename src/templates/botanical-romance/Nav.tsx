"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { formatLongDate } from "@/lib/datetime";
import type { Locale } from "@/types/invitation";
import { Sprig } from "./art/compositions";
import { useBotanical } from "./BotanicalContext";
import { pad2, type SectionKey } from "./config";

const LANGS: { value: Locale; label: string; name: string }[] = [
  { value: "id", label: "ID", name: "Bahasa Indonesia" },
  { value: "en", label: "EN", name: "English" },
];

const ease = [0.22, 1, 0.36, 1] as const;

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
 * A slim header (monogram, language, menu) with a growing vine as reading progress, and a
 * full-height garden index. Language stays reachable from the very first screen (the gate);
 * the rest appears once the invitation is open.
 */
export function Nav() {
  const { data, opened, locale, setLocale } = useInvitation();
  const { b, sections } = useBotanical();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const current = useCurrentSection(sections, opened);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const vine = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => scrollY.on("change", (y) => setSolid(y > 40)), [scrollY]);

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
  const showBar = opened && (solid || menuOpen);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[95] flex h-14 items-center justify-between px-4 text-forest transition-colors duration-500 sm:px-8 ${
          showBar ? "bg-linen/95 backdrop-blur-sm" : "bg-transparent"
        } ${showBar && !menuOpen ? "shadow-[0_1px_0_0_rgba(38,61,50,0.12)]" : ""}`}
      >
        {opened ? (
          <a
            href="#home"
            onClick={goTo("home")}
            className="flex min-h-11 items-center font-display text-2xl font-medium italic tracking-wide"
            aria-label={`${couple}: ${b.sections.home}`}
          >
            {data.couple.monogram}
          </a>
        ) : (
          <span aria-hidden="true" />
        )}

        <div className="flex items-center gap-1 sm:gap-3">
          <div role="group" aria-label={b.nav.language} className="flex items-center text-[0.68rem] font-semibold tracking-[0.2em]">
            {LANGS.map((l, i) => {
              const active = locale === l.value;
              return (
                <span key={l.value} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="opacity-40">
                      /
                    </span>
                  )}
                  <button
                    type="button"
                    lang={l.value}
                    aria-label={l.name}
                    aria-pressed={active}
                    onClick={() => setLocale(l.value)}
                    className={`grid h-11 min-w-9 place-items-center px-1.5 transition-opacity ${
                      active ? "underline decoration-blush decoration-2 underline-offset-[7px]" : "opacity-60 hover:opacity-100"
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
              aria-controls="botanical-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 flex h-11 items-center gap-3 pl-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] transition-opacity hover:opacity-70"
            >
              <span className="hidden sm:inline">{menuOpen ? b.nav.close : b.nav.menu}</span>
              <span className="sr-only sm:hidden">{menuOpen ? b.nav.closeMenu : b.nav.openMenu}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${menuOpen ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ${menuOpen ? "top-1/2 w-full -rotate-45" : "top-full w-2/3"}`} />
              </span>
            </button>
          )}
        </div>

        {/* Reading progress: a vine that grows along the header as the garden is explored. */}
        {showBar && !menuOpen && (
          <motion.span
            aria-hidden="true"
            style={{ scaleX: vine }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-moss"
          />
        )}
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label={b.nav.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[78] hidden cursor-default bg-forest-deep/60 lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.nav
              id="botanical-menu"
              aria-label={b.nav.label}
              className="bot-paper fixed inset-0 z-[80] overflow-y-auto bg-linen text-forest lg:left-auto lg:w-[30rem] lg:shadow-[-30px_0_60px_-30px_rgba(28,45,36,0.5)]"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.7, ease }}
            >
              <Sprig flip trigger="mount" delay={0.3} className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-28 opacity-90 sm:w-32" />
              <div className="relative flex min-h-full flex-col px-7 pb-10 pt-24 sm:px-12">
                <ol className="space-y-0.5">
                  {sections.map((key, i) => {
                    const active = key === current;
                    return (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.035 }}
                      >
                        <a
                          ref={i === 0 ? firstLink : undefined}
                          href={`#${key}`}
                          onClick={goTo(key)}
                          aria-current={active ? "location" : undefined}
                          className="group flex min-h-12 items-baseline gap-5 border-b border-forest/10 py-2"
                        >
                          <span className="w-6 shrink-0 text-[0.68rem] font-semibold tracking-[0.2em] text-moss-deep">{pad2(i + 1)}</span>
                          <span
                            className={`font-display text-[clamp(1.7rem,5vw,2.3rem)] font-normal leading-tight transition-all duration-500 group-hover:translate-x-2 group-hover:italic ${
                              active ? "italic text-moss-deep" : ""
                            }`}
                          >
                            {b.sections[key]}
                          </span>
                          {active && <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 shrink-0 self-center rounded-full bg-blush" />}
                        </a>
                      </motion.li>
                    );
                  })}
                </ol>

                <div className="mt-10 pr-24 sm:pr-28">
                  <p className="font-display text-3xl italic leading-none">{couple}</p>
                  <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-moss-deep">
                    {formatLongDate(data.weddingDate, locale, tz)}
                  </p>
                  <p className="mt-3 max-w-[16rem] font-display text-lg italic leading-snug text-forest/75">{b.tagline}</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
