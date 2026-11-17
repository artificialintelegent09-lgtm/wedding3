"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Photo } from "@/components/ui/Photo";
import { luxe } from "@/lib/motion";
import type { ImageAsset } from "@/types/invitation";
import { SHAPES, type Shape } from "./config";

/** Small uppercase metadata: the voice of printed stationery. */
export function Meta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${className}`}>{children}</p>;
}

/** Section running head: number, a little leaf, then the label. */
export function SectionLabel({
  no,
  children,
  tone = "dark",
  align = "left",
  className = "",
}: {
  no?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] ${
        align === "center" ? "justify-center" : ""
      } ${tone === "light" ? "text-sage" : "text-moss-deep"} ${className}`}
    >
      {no && <span className="font-display text-base font-medium normal-case italic tracking-normal">{no}</span>}
      <svg aria-hidden="true" viewBox="0 0 28 12" className="h-3 w-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M1 6h13" />
        <path d="M14 6C17 1 22 1 27 6 22 11 17 11 14 6Z" fill="currentColor" fillOpacity="0.25" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

/** One headline line revealed from behind a mask, played once when scrolled into view. */
export function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    // The padding/negative margin pair keeps ascenders and descenders from being clipped by the mask.
    <span className={`block overflow-hidden py-[0.12em] -my-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: luxe, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * A photograph in an organic frame (arch, oval, moon gate, leaf), with a second hairline outline
 * offset behind it like a pressed print. `className` sizes the frame (aspect ratio, width).
 */
export function Framed({
  asset,
  alt,
  shape,
  sizes,
  className = "",
  outline = true,
  priority,
  from,
  delay,
  photoClass = "",
}: {
  asset: ImageAsset;
  alt: string;
  shape: Shape;
  sizes: string;
  className?: string;
  outline?: boolean;
  priority?: boolean;
  from?: "bottom" | "left" | "right";
  delay?: number;
  /** Extra classes for the photograph itself (hover effects, driven by a parent `group`). */
  photoClass?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {outline && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-current opacity-40 sm:translate-x-3 sm:translate-y-3 ${SHAPES[shape]}`}
        />
      )}
      <ImageReveal className={`relative h-full w-full bg-sage/30 ${SHAPES[shape]}`} from={from} delay={delay}>
        <Photo asset={asset} alt={alt} sizes={sizes} priority={priority} className={`bot-photo ${photoClass}`} />
      </ImageReveal>
    </div>
  );
}

/** Solid forest button with an inset hairline, like a debossed stationery label. */
export const buttonClass =
  "group relative inline-flex min-h-14 items-center justify-between gap-6 bg-forest px-7 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-linen transition-colors duration-500 hover:bg-moss-deep before:pointer-events-none before:absolute before:inset-1 before:border before:border-linen/30";

/** Quiet outlined button for secondary actions. */
export const ghostButtonClass =
  "group inline-flex min-h-12 items-center gap-3 border border-current px-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300";
