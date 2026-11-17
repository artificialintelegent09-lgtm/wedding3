"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useInvitation } from "@/components/InvitationContext";
import type { GalleryImage } from "@/types/invitation";
import { pad2 } from "./config";
import { useMuse } from "./MuseContext";

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;
const ease = [0.22, 1, 0.36, 1] as const;

const slide = {
  enter: (dir: number) => ({ x: dir * 70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -70, opacity: 0 }),
};

/**
 * Full-screen viewer. Keyboard (arrows, Escape, Tab kept inside), swipe on touch screens,
 * and a directional slide between photographs. Rendered in a portal, so it uses fixed brand
 * colours instead of the template's CSS variables.
 */
export function Lightbox({
  images,
  index,
  onChange,
}: {
  images: GalleryImage[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const { copy } = useInvitation();
  const { m } = useMuse();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialog = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(1);
  const isOpen = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

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
        const focusable = dialog.current?.querySelectorAll<HTMLElement>("button");
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
  const arrow =
    "grid h-12 w-12 shrink-0 place-items-center border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-espresso";

  return createPortal(
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={copy.gallery.counter(index + 1, images.length)}
          className="fixed inset-0 z-[100] flex flex-col bg-espresso/[0.98] font-sans text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5">
            <p aria-hidden="true" className="font-display text-3xl font-light italic sm:text-4xl">
              {pad2(index + 1)}
              <span className="text-taupe"> / {pad2(images.length)}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              aria-label={copy.gallery.close}
              className="flex h-12 items-center gap-3 border border-ivory/40 px-4 text-[0.68rem] font-bold uppercase tracking-[0.24em] transition-colors hover:bg-ivory hover:text-espresso"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
            >
              <span className="hidden sm:inline">{copy.gallery.close}</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 sm:px-24">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current.src}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={onDragEnd}
                className="max-h-full cursor-grab touch-pan-y active:cursor-grabbing"
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
                  className="max-h-[70svh] w-auto max-w-full select-none object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 px-4 pb-5 pt-4 sm:px-8 sm:pb-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" className={arrow} aria-label={copy.gallery.previous} onClick={() => go(-1)}>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="min-w-0 flex-1 text-center text-[0.72rem] font-medium leading-snug tracking-wide text-ivory/80">
              <span className="mr-2 font-bold uppercase tracking-[0.2em] text-taupe">
                {m.gallery.plate} {pad2(index + 1)}
              </span>
              {current.alt}
            </p>
            <button type="button" className={arrow} aria-label={copy.gallery.next} onClick={() => go(1)}>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
