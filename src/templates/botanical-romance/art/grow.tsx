"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { luxe } from "@/lib/motion";

/** Brand colours as CSS variables, so SVG art follows the template tokens. */
export const P = {
  forest: "var(--bot-forest)",
  /** Stems, veins and outlines. Dark sections lighten it by setting --bot-ink on a wrapper. */
  ink: "var(--bot-ink, var(--bot-forest))",
  sage: "var(--bot-sage)",
  moss: "var(--bot-moss)",
  linen: "var(--bot-linen)",
  blush: "var(--bot-blush)",
  fawn: "var(--bot-fawn)",
  /** Deeper rose for outlines on ivory. */
  rose: "#86584f",
} as const;

interface GrowVariants {
  /** Stem or outline that draws itself. */
  draw: Variants;
  /** Leaves and petals unfurl from where they attach. */
  grow: Variants;
  fade: Variants;
}

const live: GrowVariants = {
  draw: {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: luxe } },
  },
  grow: {
    hidden: { scale: 0.15, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 1.1, ease: luxe } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, ease: luxe } },
  },
};

const still: Variants = { hidden: { opacity: 1 }, show: { opacity: 1 } };
const calm: GrowVariants = { draw: still, grow: still, fade: still };

const GrowContext = createContext<GrowVariants>(live);
export const useGrow = () => useContext(GrowContext);

/**
 * Root of every illustration. The plant grows once, the first time it scrolls into view
 * (or on mount, for art that is already on screen). Reduced motion shows the finished plant.
 */
export function GrowSvg({
  viewBox,
  className,
  trigger = "view",
  delay = 0,
  stagger = 0.05,
  preserveAspectRatio,
  children,
}: {
  viewBox: string;
  className?: string;
  trigger?: "view" | "mount";
  delay?: number;
  stagger?: number;
  preserveAspectRatio?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.12 } };

  return (
    <GrowContext.Provider value={reduce ? calm : live}>
      <motion.svg
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        className={className}
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={container}
        {...triggerProps}
      >
        {children}
      </motion.svg>
    </GrowContext.Provider>
  );
}

/** Groups parts so a whole stem grows together, then the next one starts (see GardenBloom). */
export function Cluster({ delay = 0, stagger = 0.04, children }: { delay?: number; stagger?: number; children: ReactNode }) {
  const variants: Variants = { hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: stagger } } };
  return <motion.g variants={variants}>{children}</motion.g>;
}
