"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { InvitationContext } from "@/components/InvitationContext";
import { getCopy } from "@/lib/i18n";
import { useGuestName } from "@/lib/use-guest-name";
import type { InvitationData, Locale } from "@/types/invitation";
import { getSections, pad2 } from "./config";
import { getMuseCopy } from "./copy";
import { cormorant, manrope } from "./fonts";
import { MuseContext, type MuseContextValue } from "./MuseContext";
import { Nav } from "./Nav";
import { Gate } from "./sections/Gate";
import { useMusic } from "./use-music";

// Shared with Royal Romance on purpose: a guest's language choice follows them between invitations.
const LOCALE_KEY = "wedding-locale";
const isLocale = (v: unknown): v is Locale => v === "id" || v === "en";

/**
 * Client boundary: owns the gate's open/closed state, the active language and the music player,
 * and provides context to every section. Switching language re-renders in place (no reload),
 * so the reader keeps their scroll position.
 */
export function Shell({ data, children }: { data: InvitationData; children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [locale, setLocaleState] = useState<Locale>(data.locale);
  const guestName = useGuestName();
  const music = useMusic(data.music?.src);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a persisted preference
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* storage unavailable (private mode): keep the default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* best effort */
    }
  }, []);

  // The page cannot scroll while the gate is up.
  useEffect(() => {
    if (opened) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [opened]);

  const { start } = music;
  const open = useCallback(
    (withMusic = false) => {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (withMusic) start();
      setOpened(true);
    },
    [start],
  );

  const sections = useMemo(() => getSections(data), [data]);
  const copy = getCopy(locale);
  const muse = useMemo<MuseContextValue>(
    () => ({
      m: getMuseCopy(locale),
      sections,
      no: (key) => pad2(Math.max(0, sections.indexOf(key))),
      music,
      open,
    }),
    [locale, sections, music, open],
  );

  return (
    // reducedMotion="user" removes transform/layout animation for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <InvitationContext.Provider value={{ data, copy, opened, guestName, locale, setLocale }}>
        <MuseContext.Provider value={muse}>
          <div
            data-template="modern-muse"
            className={`${cormorant.variable} ${manrope.variable} bg-espresso font-sans text-ink`}
          >
            <Nav />
            <AnimatePresence>{!opened && <Gate key="gate" />}</AnimatePresence>
            <main>{children}</main>
          </div>
        </MuseContext.Provider>
      </InvitationContext.Provider>
    </MotionConfig>
  );
}
