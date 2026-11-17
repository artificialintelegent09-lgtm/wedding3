"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { InvitationContext } from "@/components/InvitationContext";
import { getCopy } from "@/lib/i18n";
import { useGuestName } from "@/lib/use-guest-name";
import type { InvitationData, Locale } from "@/types/invitation";
import { BotanicalContext, type BotanicalContextValue } from "./BotanicalContext";
import { getSections, pad2 } from "./config";
import { getBotanicalCopy } from "./copy";
import { sans, serif } from "./fonts";
import { Nav } from "./Nav";
import { Gate } from "./sections/Gate";
import { useMusic } from "./use-music";

// Shared with the other templates on purpose: a guest's language choice follows them between invitations.
const LOCALE_KEY = "wedding-locale";
const isLocale = (v: unknown): v is Locale => v === "id" || v === "en";

/**
 * Client boundary: owns the gate's open/closed state and the active language, and provides context
 * to every section. Switching language re-renders in place (no reload), so the reader keeps their
 * scroll position.
 */
export function Shell({ data, children }: { data: InvitationData; children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  // data.locale is the default; a stored preference wins after hydration
  // (reading storage in the initializer would mismatch the prerendered HTML).
  const [locale, setLocaleState] = useState<Locale>(data.locale);
  const guestName = useGuestName();
  const { start, available, playing, toggle } = useMusic(data.music?.src);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a persisted preference
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* storage unavailable (private mode): keep the default */
    }
  }, []);

  // Keep the document language in sync for screen readers and hyphenation.
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

  // The page cannot scroll while the gate is up. The unlock clears the inline style outright:
  // restoring a captured "previous" value can re-apply a stale "hidden" and leave the page
  // permanently unscrollable (the stylesheet defines no overflow for <html>, so clearing is safe).
  useEffect(() => {
    if (opened) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.removeProperty("overflow");
    };
  }, [opened]);

  const open = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    // The guest's click is the user gesture that lets the browser play sound.
    start();
    setOpened(true);
  }, [start]);

  const sections = useMemo(() => getSections(data), [data]);
  const copy = getCopy(locale);
  const botanical = useMemo<BotanicalContextValue>(
    () => ({
      b: getBotanicalCopy(locale),
      sections,
      no: (key) => pad2(Math.max(0, sections.indexOf(key)) + 1),
      open,
      music: { available, playing, toggle },
    }),
    [locale, sections, open, available, playing, toggle],
  );

  return (
    // reducedMotion="user" removes transform/layout animation for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <InvitationContext.Provider value={{ data, copy, opened, guestName, locale, setLocale }}>
        <BotanicalContext.Provider value={botanical}>
          <div data-template="botanical-romance" className={`${serif.variable} ${sans.variable} bg-forest font-sans text-ink`}>
            <Nav />
            <AnimatePresence>{!opened && <Gate key="gate" />}</AnimatePresence>
            <main>{children}</main>
          </div>
        </BotanicalContext.Provider>
      </InvitationContext.Provider>
    </MotionConfig>
  );
}
