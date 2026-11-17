"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { luxe } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Use `x` for sideways reveals. */
  y?: number;
  x?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
}

/** Scroll-triggered fade + rise. Honors reduced motion via the root <MotionConfig>. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, amount = 0.2 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.95, ease: luxe, delay }}
    >
      {children}
    </motion.div>
  );
}
