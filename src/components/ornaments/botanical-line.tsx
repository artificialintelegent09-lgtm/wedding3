"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import { luxe } from "@/lib/motion";

/**
 * Vintage-botanical line illustrations. Everything is drawn with `currentColor`
 * strokes (set the colour with a text-* class) and unfolds when it scrolls into
 * view: stems and flowers draw themselves, leaves fade up behind them.
 * Geometry is parametric and deterministic: no randomness, no hydration drift.
 */

type Pt = [number, number];
type Cubic = [Pt, Pt, Pt, Pt];

const bez = ([a, b, c, d]: Cubic, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};

/** Direction of the curve at t, in degrees. */
const tangent = (c: Cubic, t: number): number => {
  const [x1, y1] = bez(c, Math.max(0, t - 0.01));
  const [x2, y2] = bez(c, Math.min(1, t + 0.01));
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
};

const cubicPath = ([a, b, c, d]: Cubic) =>
  `M${a[0]} ${a[1]}C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;

/* ---------------------------------------------------------------- */
/* Animation plumbing                                                */
/* ---------------------------------------------------------------- */

const BackgroundContext = createContext<string>("transparent");

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: luxe } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: luxe } },
};
const instant: Variants = { hidden: { opacity: 1 }, show: { opacity: 1 } };

const DrawContext = createContext<{ draw: Variants; fade: Variants }>({ draw, fade });

interface BotanicalSvgProps {
  viewBox: string;
  className?: string;
  /** Colour used to hide stem lines behind leaves and petals. Match the surface the art sits on. */
  bg?: string;
  /** "view": draw when scrolled into view (default). "mount": draw immediately. */
  trigger?: "view" | "mount";
  delay?: number;
  children: ReactNode;
}

function BotanicalSvg({ viewBox, className, bg = "var(--tpl-paper)", trigger = "view", delay = 0, children }: BotanicalSvgProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? { draw: instant, fade: instant } : { draw, fade };
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  };
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.15 } };

  return (
    <BackgroundContext.Provider value={bg}>
      <DrawContext.Provider value={variants}>
        <motion.svg
          viewBox={viewBox}
          className={className}
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={container}
          {...triggerProps}
        >
          {children}
        </motion.svg>
      </DrawContext.Provider>
    </BackgroundContext.Provider>
  );
}

/* ---------------------------------------------------------------- */
/* Primitives                                                        */
/* ---------------------------------------------------------------- */

function Stroke({ d, width = 1.6, opacity = 1 }: { d: string; width?: number; opacity?: number }) {
  const v = useContext(DrawContext);
  return <motion.path d={d} variants={v.draw} strokeWidth={width} strokeOpacity={opacity} />;
}

function Leaf({ x, y, angle, length }: { x: number; y: number; angle: number; length: number }) {
  const v = useContext(DrawContext);
  const bg = useContext(BackgroundContext);
  const L = length;
  const W = L * 0.34;
  const veins = [0.28, 0.46, 0.64]
    .map((k) => {
      const vx = L * k;
      return `M${vx} 0L${vx + L * 0.15} ${-W * 0.62}M${vx} 0L${vx + L * 0.15} ${W * 0.62}`;
    })
    .join("");
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)})`}>
      <motion.g variants={v.fade}>
        <path
          d={`M0 0C${L * 0.2} ${-W} ${L * 0.7} ${-W * 1.05} ${L} 0C${L * 0.7} ${W * 1.05} ${L * 0.2} ${W} 0 0Z`}
          fill={bg}
          strokeWidth={0.9}
         
        />
        <path d={`M0 0L${L * 0.92} 0${veins}`} strokeWidth={0.6} strokeOpacity={0.7} />
      </motion.g>
    </g>
  );
}

function Berry({ x, y, r = 3 }: { x: number; y: number; r?: number }) {
  const v = useContext(DrawContext);
  const bg = useContext(BackgroundContext);
  return (
    <motion.g variants={v.fade}>
      <circle cx={x} cy={y} r={r} fill={bg} strokeWidth={1.3} />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.22} fill="currentColor" stroke="none" opacity={0.6} />
    </motion.g>
  );
}

export function Bud({ x, y, angle = 0, scale = 1 }: { x: number; y: number; angle?: number; scale?: number }) {
  const v = useContext(DrawContext);
  const bg = useContext(BackgroundContext);
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <motion.g variants={v.fade}>
        <path d="M0 0C-9-5-10-20 0-28 10-20 9-5 0 0Z" fill={bg} strokeWidth={1.3} />
        <path d="M0-2C-4-9-3-19 0-25M0-2C4-9 3-19 0-25" strokeWidth={0.9} strokeOpacity={0.7} />
        <path d="M0 0C-9 3-14-3-12-11M0 0C9 3 14-3 12-11" strokeWidth={1.1} />
      </motion.g>
    </g>
  );
}

const PETAL_OUTER = "M0 -3C-23 -4 -29 -25 -10 -34C-2 -37 6 -37 12 -33C29 -25 23 -4 0 -3Z";
const PETAL_MID = "M0 -2C-16 -3 -20 -17 -7 -23C-1 -25 5 -25 9 -22C20 -17 16 -3 0 -2Z";
const PETAL_IN = "M0 -1C-10 -2 -12 -11 -4 -14C0 -15 4 -15 6 -13C12 -10 10 -2 0 -1Z";

/** A rose in outline: concentric overlapping petals around a small spiral. */
export function Rose({ x, y, r = 36, angle = 0 }: { x: number; y: number; r?: number; angle?: number }) {
  const v = useContext(DrawContext);
  const bg = useContext(BackgroundContext);
  const s = r / 36;
  const ring = (path: string, angles: number[], width: number) =>
    angles.map((a) => (
      <motion.path key={`${path}-${a}`} d={path} transform={`rotate(${a})`} fill={bg} variants={v.draw} strokeWidth={width} />
    ));
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
      {ring(PETAL_OUTER, [0, 72, 144, 216, 288], 1.3)}
      {ring(PETAL_MID, [36, 108, 180, 252, 324], 1.15)}
      {ring(PETAL_IN, [10, 135, 250], 1)}
      <motion.path
        d="M0 0c-2.6-.2-3.6-2.4-2.2-3.8 1.9-1.8 5.2-.6 5.3 2 .1 2.9-3.2 4.6-6.2 3.6"
        variants={v.draw}
        strokeWidth={0.7}
       
      />
    </g>
  );
}

interface BranchProps {
  curve: Cubic;
  leaves?: number;
  leaf?: number;
  /** Which side the first leaf sits on. */
  side?: 1 | -1;
  /** End the branch with a bud ("bud"), a berry ("berry"), or a leaf ("leaf"). */
  tip?: "bud" | "berry" | "leaf" | "none";
  width?: number;
}

/** A stem with leaves placed alternately along it, tapering toward the tip. */
export function Branch({ curve, leaves = 6, leaf = 40, side = 1, tip = "leaf", width = 1.7 }: BranchProps) {
  const items = [];
  for (let i = 0; i < leaves; i++) {
    const t = 0.14 + (i / Math.max(1, leaves - 1)) * 0.8;
    const [x, y] = bez(curve, t);
    const dir = i % 2 === 0 ? side : -side;
    const angle = tangent(curve, t) + dir * 48;
    const size = leaf * (1 - t * 0.4);
    items.push(<Leaf key={i} x={x} y={y} angle={angle} length={size} />);
  }
  const [ex, ey] = curve[3];
  const endAngle = tangent(curve, 1);
  return (
    <>
      <Stroke d={cubicPath(curve)} width={width} />
      {items}
      {tip === "leaf" && <Leaf x={ex} y={ey} angle={endAngle} length={leaf * 0.7} />}
      {tip === "bud" && <Bud x={ex} y={ey} angle={endAngle + 90} scale={0.9} />}
      {tip === "berry" && <Berry x={ex} y={ey} r={3.6} />}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Compositions                                                      */
/* ---------------------------------------------------------------- */

interface ArtProps {
  className?: string;
  bg?: string;
  trigger?: "view" | "mount";
  delay?: number;
}

/** Anchored in the top-left corner; mirror with `-scale-x-100` / `-scale-y-100` for other corners. */
export function BotanicalCorner(props: ArtProps) {
  return (
    <BotanicalSvg viewBox="0 0 320 320" {...props}>
      <Branch curve={[[-10, 44], [92, 22], [176, 76], [262, 160]]} leaves={7} leaf={46} tip="bud" />
      <Branch curve={[[34, -10], [18, 94], [74, 172], [146, 262]]} leaves={6} leaf={42} side={-1} tip="leaf" />
      <Branch curve={[[-10, 132], [40, 146], [84, 190], [104, 252]]} leaves={4} leaf={32} tip="berry" width={1.4} />
      <Rose x={72} y={76} r={40} angle={12} />
      <Rose x={150} y={42} r={20} angle={-30} />
      <Berry x={214} y={32} r={3} />
      <Berry x={226} y={46} r={2.4} />
    </BotanicalSvg>
  );
}

/** A tall single sprig: for margins, hero spines, section edges. */
export function BotanicalSprig(props: ArtProps) {
  return (
    <BotanicalSvg viewBox="0 0 150 440" {...props}>
      <Branch curve={[[78, 440], [34, 320], [112, 180], [74, 22]]} leaves={11} leaf={44} tip="bud" />
      <Branch curve={[[56, 318], [18, 290], [8, 246], [18, 214]]} leaves={3} leaf={28} side={-1} tip="berry" width={1.4} />
      <Branch curve={[[90, 176], [124, 158], [136, 118], [124, 88]]} leaves={3} leaf={28} tip="berry" width={1.4} />
    </BotanicalSvg>
  );
}

/** A wide horizontal spray with a single rose: a quiet ornament for titles and closings. */
export function BotanicalSpray(props: ArtProps) {
  return (
    <BotanicalSvg viewBox="0 0 420 150" {...props}>
      <Branch curve={[[210, 96], [150, 56], [80, 120], [8, 74]]} leaves={7} leaf={34} tip="bud" />
      <Branch curve={[[210, 96], [270, 56], [340, 120], [412, 74]]} leaves={7} leaf={34} side={-1} tip="bud" />
      <Rose x={210} y={86} r={30} />
      <Berry x={190} y={36} r={3} />
      <Berry x={232} y={34} r={3} />
    </BotanicalSvg>
  );
}
