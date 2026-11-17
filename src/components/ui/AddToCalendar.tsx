"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import type { WeddingEvent } from "@/types/invitation";

/**
 * Text-style action with an underline. The menu is a small paper slip, readable on any surface.
 * It opens upward so it stays inside its own card: a menu opening downward is painted over by
 * the next card when cards are stacked on mobile.
 */
export function AddToCalendar({ event, tone = "dark" }: { event: WeddingEvent; tone?: "dark" | "light" }) {
  const { data, copy, locale } = useInvitation();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const headline = `${data.couple.bride.nickname} & ${data.couple.groom.nickname}`;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const itemClass =
    "flex min-h-11 w-full items-center px-5 text-left text-sm tracking-wide text-ink transition-colors hover:bg-paper-2 focus-visible:bg-paper-2";

  return (
    <div ref={wrapper} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-11 items-center gap-2 border-b border-current pb-0.5 text-[0.7rem] font-normal uppercase tracking-[0.24em] transition-opacity hover:opacity-70 ${
          tone === "dark" ? "text-primary" : "text-gold-light"
        }`}
      >
        <CalendarPlus className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
        {copy.events.addToCalendar}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 border border-gold/60 bg-paper py-1 shadow-[0_20px_40px_-15px_rgba(36,8,16,0.5)]"
          >
            <a
              href={googleCalendarUrl(event, headline, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className={itemClass}
              onClick={() => setOpen(false)}
            >
              {copy.events.googleCalendar}
            </a>
            <button
              type="button"
              className={itemClass}
              onClick={() => {
                downloadIcs(event, headline, data.slug, locale);
                setOpen(false);
              }}
            >
              {copy.events.downloadIcs}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
