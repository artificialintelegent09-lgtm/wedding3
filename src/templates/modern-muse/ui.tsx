"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { luxe } from "@/lib/motion";

/**
 * One line of a headline, revealed from behind a mask. Pass `active` to drive it manually
 * (the cover waits for the gate to open); otherwise it plays once when scrolled into view.
 */
export function MaskLine({
  children,
  delay = 0,
  active,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  active?: boolean;
  className?: string;
}) {
  const transition = { duration: 1.1, ease: luxe, delay };
  const motionProps =
    active === undefined
      ? { initial: { y: "108%" }, whileInView: { y: 0 }, viewport: { once: true, amount: 0.5 } }
      : { initial: { y: "108%" }, animate: { y: active ? 0 : "108%" } };
  return (
    // The padding/negative margin pair keeps ascenders and descenders from being clipped by the mask.
    <span className={`block overflow-hidden py-[0.1em] -my-[0.1em] ${className}`}>
      <motion.span className="block" transition={transition} {...motionProps}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * The running head of a section: a bold number, a hairline and a small uppercase label.
 * Gives the page its numbered, magazine-contents rhythm.
 */
export function SectionHead({
  no,
  label,
  tone = "dark",
  className = "",
}: {
  no: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.3em] ${
        tone === "light" ? "text-ivory" : "text-espresso"
      } ${className}`}
    >
      <span className={tone === "light" ? "text-taupe" : "text-terracotta"}>{no}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60 sm:w-16" />
      <span>{label}</span>
    </div>
  );
}

/** Small uppercase metadata, the voice of magazine captions and running heads. */
export function Meta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.26em] ${className}`}>{children}</p>
  );
}

/** Vertical running text at the edge of a section, as in printed spreads. */
export function VerticalMeta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={`vertical-rl rotate-180 text-[0.62rem] font-bold uppercase tracking-[0.4em] ${className}`}
    >
      {children}
    </p>
  );
}

/** Photo caption: hairline, plate number, text. */
export function Caption({
  no,
  children,
  tone = "dark",
  className = "",
}: {
  no?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex gap-3 text-[0.68rem] font-medium leading-snug tracking-wide ${
        tone === "light" ? "text-ivory/75" : "text-espresso/70"
      } ${className}`}
    >
      {no && <span className="font-bold tracking-[0.2em]">{no}</span>}
      <span>{children}</span>
    </p>
  );
}
