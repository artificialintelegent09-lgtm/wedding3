"use client";

import { useInvitation } from "@/components/InvitationContext";
import type { Locale } from "@/types/invitation";

const OPTIONS: { value: Locale; label: string; name: string }[] = [
  { value: "id", label: "ID", name: "Bahasa Indonesia" },
  { value: "en", label: "EN", name: "English" },
];

/**
 * Fixed language toggle, top-right, above the cover. A slim deep-plum chip with
 * a gold hairline: legible on every surface and quiet enough for the stationery look.
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useInvitation();
  return (
    <div className="fixed right-3 top-3 z-[95] flex items-stretch border border-gold/45 bg-deep/85 backdrop-blur-sm sm:right-5 sm:top-5">
      {OPTIONS.map((option, i) => {
        const active = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-label={option.name}
            aria-pressed={active}
            onClick={() => setLocale(option.value)}
            className={`relative flex h-10 min-w-11 items-center justify-center px-3 text-[0.64rem] font-normal tracking-[0.22em] transition-colors duration-300 ${
              i > 0 ? "border-l border-gold/30" : ""
            } ${active ? "text-paper" : "text-gold-light/55 hover:text-gold-light"}`}
          >
            {active && <span aria-hidden="true" className="absolute inset-x-2.5 bottom-1.5 h-px bg-gold" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
