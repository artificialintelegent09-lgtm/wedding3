"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Travel as a percentage of the container height, in each direction. */
  amount?: number;
  className?: string;
}

/**
 * Clips its container (give it positioning via className) and drifts the child at a different speed than the page
 * scroll. The child is oversized by `amount` on each edge so no gaps appear.
 */
export function Parallax({ children, amount = 10, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  const pad = reduce ? 0 : amount;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `${-pad}%`, bottom: `${-pad}%`, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Moves a decorative element against the scroll direction. For florals and ornaments. */
export function ParallaxLayer({
  children,
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  /** Pixels of travel across the viewport pass. Negative moves upward. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
