"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { luxe } from "@/lib/motion";

/**
 * Curtain-style photo reveal: the frame wipes open while the image settles from a slight zoom.
 *
 * The in-view trigger watches the outer wrapper, never the clipped element: an
 * IntersectionObserver on an element whose own clip-path hides it reports "not visible",
 * so the reveal would never start and the photo would stay hidden forever.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const hidden =
    from === "bottom"
      ? "inset(100% 0% 0% 0%)"
      : from === "left"
        ? "inset(0% 100% 0% 0%)"
        : "inset(0% 0% 0% 100%)";

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: hidden }}
        animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : hidden }}
        transition={{ duration: 1.25, ease: luxe, delay }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.22 }}
          animate={{ scale: inView ? 1 : 1.22 }}
          transition={{ duration: 1.6, ease: luxe, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
