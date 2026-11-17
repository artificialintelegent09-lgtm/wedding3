"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { InvitationContext } from "@/components/InvitationContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { getCopy } from "@/lib/i18n";
import { useGuestName } from "@/lib/use-guest-name";
import type { InvitationData, Locale } from "@/types/invitation";
import { FloatingNav } from "./FloatingNav";
import { Cover } from "./sections/Cover";

const LOCALE_KEY = "wedding-locale";
const isLocale = (v: unknown): v is Locale => v === "id" || v === "en";

/**
 * Client boundary for the invitation: owns the cover's open/closed state and the
 * active language, locks scrolling while the cover is up, and provides context
 * to every section.
 */
export function Shell({ data, children }: { data: InvitationData; children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  // data.locale is the default; a stored preference wins after hydration
  // (reading storage in the initializer would mismatch the prerendered HTML).
  const [locale, setLocaleState] = useState<Locale>(data.locale);
  const guestName = useGuestName();
  const copy = getCopy(locale);

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

  useEffect(() => {
    if (opened) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [opened]);

  const open = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpened(true);
  }, []);

  return (
    // reducedMotion="user" removes transform/layout animation for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <InvitationContext.Provider value={{ data, copy, opened, guestName, locale, setLocale }}>
        <LanguageSwitcher />
        <AnimatePresence>{!opened && <Cover key="cover" onOpen={open} />}</AnimatePresence>
        <main data-template="royal-romance" className="bg-deep font-sans text-ink">
          {children}
        </main>
        <FloatingNav />
      </InvitationContext.Provider>
    </MotionConfig>
  );
}
