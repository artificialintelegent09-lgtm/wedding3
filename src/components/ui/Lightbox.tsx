"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useInvitation } from "@/components/InvitationContext";
import type { GalleryImage } from "@/types/invitation";

interface LightboxProps {
  images: GalleryImage[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

export function Lightbox({ images, index, onChange }: LightboxProps) {
  const { copy } = useInvitation();
  // False on the server and during hydration, true afterwards: portals need `document`.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  // Scroll lock, focus management and keyboard handling while open.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the dialog.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, go, onChange]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  if (!mounted) return null;

  const current = index !== null ? images[index] : null;
  const btn =
    "grid h-11 w-11 place-items-center border border-gold/50 bg-deep text-gold-light transition-colors hover:bg-paper hover:text-deep";

  return createPortal(
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={copy.gallery.counter(index + 1, images.length)}
          className="fixed inset-0 z-[100] flex flex-col bg-deep/[0.97]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-8">
            <p className="font-display text-xl italic text-paper" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} <span className="text-gold-light/60">/ {String(images.length).padStart(2, "0")}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              className={btn}
              aria-label={copy.gallery.close}
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-20">
            <motion.div
              key={current.src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-full cursor-grab touch-pan-y active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                draggable={false}
                className="max-h-[78svh] w-auto max-w-full select-none object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            <button
              type="button"
              className={`${btn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-6`}
              aria-label={copy.gallery.previous}
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${btn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-6`}
              aria-label={copy.gallery.next}
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <p className="px-4 py-4 text-center text-xs font-light uppercase tracking-[0.24em] text-paper/60">{current.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
