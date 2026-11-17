"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { luxe } from "@/lib/motion";

const TICK = "M1 13V1h12";

function Tick({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 14 14"
      className={`absolute h-3.5 w-3.5 text-gold ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: luxe, delay }}
      aria-hidden="true"
    >
      <path d={TICK} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </motion.svg>
  );
}

/**
 * Printed-stationery frame: a fine double rule that unfolds from the centre, with
 * small corner ticks. Wrap any card with it; surface colour comes from `className`.
 */
export function OrnateFrame({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  // Observe the unclipped wrapper: a clipped element can never report itself as in view.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const hidden = "inset(50% 50% 50% 50%)";
  const shown = "inset(0% 0% 0% 0%)";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 border border-gold/70"
        initial={{ clipPath: hidden }}
        animate={{ clipPath: inView ? shown : hidden }}
        transition={{ duration: 1.4, ease: luxe }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3.5 border border-gold/30"
        initial={{ clipPath: hidden }}
        animate={{ clipPath: inView ? shown : hidden }}
        transition={{ duration: 1.4, ease: luxe, delay: 0.12 }}
      />
      <Tick className="left-1 top-1" delay={0.9} />
      <Tick className="right-1 top-1 rotate-90" delay={0.9} />
      <Tick className="bottom-1 right-1 rotate-180" delay={0.9} />
      <Tick className="bottom-1 left-1 -rotate-90" delay={0.9} />
      <div className={`relative ${innerClassName}`}>{children}</div>
    </div>
  );
}
