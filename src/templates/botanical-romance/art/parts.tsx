"use client";

import { motion } from "framer-motion";
import { bez, cubicPath, r1, tangent, type Cubic } from "./geometry";
import { P, useGrow } from "./grow";

/**
 * Botanical building blocks, drawn like pressed specimens: a flat wash of colour, a fine ink outline
 * and a few veins. Every shape unfurls from the point where it attaches (see GrowSvg).
 */

export type Tone = "sage" | "moss" | "forest";
const FILL: Record<Tone, string> = { sage: P.sage, moss: P.moss, forest: P.forest };

/** Where a leaf, petal or bud attaches: growth is a scale-up from this local origin. */
const FROM_BASE = { originX: 0, originY: 0.5 } as const;

/* ---------------------------------------------------------------- */
/* Leaves and stems                                                  */
/* ---------------------------------------------------------------- */

export function Leaf({
  x,
  y,
  angle,
  length,
  tone = "sage",
  slim = 0.36,
}: {
  x: number;
  y: number;
  angle: number;
  length: number;
  tone?: Tone;
  /** Width as a share of length. */
  slim?: number;
}) {
  const v = useGrow();
  const L = length;
  const W = L * slim;
  const ink = tone === "forest" ? P.sage : P.ink;
  const veins = [0.3, 0.5, 0.7]
    .map((k) => `M${r1(L * k)} 0L${r1(L * (k + 0.14))} ${r1(-W * 0.6)}M${r1(L * k)} 0L${r1(L * (k + 0.14))} ${r1(W * 0.6)}`)
    .join("");
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)})`}>
      <motion.g variants={v.grow} style={FROM_BASE}>
        <path
          d={`M0 0C${r1(L * 0.22)} ${r1(-W)} ${r1(L * 0.72)} ${r1(-W * 1.02)} ${r1(L)} 0C${r1(L * 0.72)} ${r1(W * 1.02)} ${r1(L * 0.22)} ${r1(W)} 0 0Z`}
          fill={FILL[tone]}
          fillOpacity={0.92}
          stroke={ink}
          strokeOpacity={0.4}
          strokeWidth={0.7}
        />
        <path d={`M0 0L${r1(L * 0.95)} 0${veins}`} stroke={ink} strokeOpacity={0.35} strokeWidth={0.55} />
      </motion.g>
    </g>
  );
}

export function Stem({ d, width = 1.5, color = P.ink, opacity = 0.85 }: { d: string; width?: number; color?: string; opacity?: number }) {
  const v = useGrow();
  return <motion.path d={d} variants={v.draw} stroke={color} strokeWidth={width} strokeOpacity={opacity} />;
}

export function Blossom({ x, y, r = 3, fill = P.linen }: { x: number; y: number; r?: number; fill?: string }) {
  const v = useGrow();
  return (
    <motion.g variants={v.grow} style={{ originX: 0.5, originY: 0.5 }}>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={P.fawn} strokeWidth={0.8} />
      <circle cx={x} cy={y} r={r * 0.3} fill={P.fawn} />
    </motion.g>
  );
}

/** A stem with leaves placed alternately along it, shrinking toward the tip. */
export function Branch({
  curve,
  leaves = 6,
  leaf = 40,
  side = 1,
  tip = "leaf",
  width = 1.5,
  tones = ["sage", "moss"],
}: {
  curve: Cubic;
  leaves?: number;
  leaf?: number;
  side?: 1 | -1;
  tip?: "leaf" | "bud" | "none";
  width?: number;
  tones?: Tone[];
}) {
  const items = [];
  for (let i = 0; i < leaves; i++) {
    const t = 0.14 + (i / Math.max(1, leaves - 1)) * 0.78;
    const [x, y] = bez(curve, t);
    const dir = i % 2 === 0 ? side : -side;
    items.push(
      <Leaf key={i} x={x} y={y} angle={tangent(curve, t) + dir * 50} length={leaf * (1 - t * 0.42)} tone={tones[i % tones.length]} />,
    );
  }
  const [ex, ey] = curve[3];
  const end = tangent(curve, 1);
  return (
    <>
      <Stem d={cubicPath(curve)} width={width} />
      {items}
      {tip === "leaf" && <Leaf x={ex} y={ey} angle={end} length={leaf * 0.7} tone={tones[leaves % tones.length]} />}
      {tip === "bud" && <Bud x={ex} y={ey} angle={end + 90} scale={0.7} />}
    </>
  );
}

/** Round-leaved eucalyptus: leaves in pairs on short petioles. */
export function Eucalyptus({
  curve,
  pairs = 6,
  leaf = 22,
  width = 1.4,
}: {
  curve: Cubic;
  pairs?: number;
  leaf?: number;
  width?: number;
}) {
  const v = useGrow();
  const items = [];
  for (let i = 0; i < pairs; i++) {
    const t = 0.16 + (i / Math.max(1, pairs - 1)) * 0.8;
    const [x, y] = bez(curve, t);
    const base = tangent(curve, t);
    const L = leaf * (1 - t * 0.38);
    for (const dir of [1, -1] as const) {
      const a = base + dir * (62 + (i % 2) * 10);
      const tone: Tone = (i + (dir === 1 ? 0 : 1)) % 3 === 0 ? "moss" : "sage";
      items.push(
        <g key={`${i}-${dir}`} transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(a)})`}>
          <motion.g variants={v.grow} style={FROM_BASE}>
            <path d={`M0 0L${r1(L * 0.18)} 0`} stroke={P.ink} strokeOpacity={0.6} strokeWidth={0.8} />
            <ellipse cx={r1(L * 0.68)} cy={0} rx={r1(L * 0.5)} ry={r1(L * 0.46)} fill={FILL[tone]} fillOpacity={0.95} stroke={P.ink} strokeOpacity={0.35} strokeWidth={0.7} />
            <path d={`M${r1(L * 0.2)} 0L${r1(L * 1.1)} 0`} stroke={P.ink} strokeOpacity={0.25} strokeWidth={0.5} />
          </motion.g>
        </g>,
      );
    }
  }
  const [ex, ey] = curve[3];
  items.push(<Leaf key="tip" x={ex} y={ey} angle={tangent(curve, 1)} length={leaf * 0.9} tone="sage" slim={0.5} />);
  return (
    <>
      <Stem d={cubicPath(curve)} width={width} />
      {items}
    </>
  );
}

/** Fern frond: narrow leaflets in opposite pairs, longest near the base. */
export function Fern({ curve, pairs = 9, leaf = 34, width = 1.2 }: { curve: Cubic; pairs?: number; leaf?: number; width?: number }) {
  const items = [];
  for (let i = 0; i < pairs; i++) {
    const t = 0.1 + (i / Math.max(1, pairs - 1)) * 0.84;
    const [x, y] = bez(curve, t);
    const base = tangent(curve, t);
    const L = leaf * (1 - t * 0.72);
    items.push(<Leaf key={`a${i}`} x={x} y={y} angle={base + 62} length={L} tone={i % 3 === 0 ? "sage" : "moss"} slim={0.2} />);
    items.push(<Leaf key={`b${i}`} x={x} y={y} angle={base - 62} length={L} tone={i % 3 === 1 ? "sage" : "moss"} slim={0.2} />);
  }
  const [ex, ey] = curve[3];
  items.push(<Leaf key="tip" x={ex} y={ey} angle={tangent(curve, 1)} length={leaf * 0.28} tone="moss" slim={0.22} />);
  return (
    <>
      <Stem d={cubicPath(curve)} width={width} />
      {items}
    </>
  );
}

/** Baby's-breath: a thin stem that forks into tiny white blossoms. */
export function Gypsophila({ curve, twigs = 6, size = 16 }: { curve: Cubic; twigs?: number; size?: number }) {
  const items = [];
  for (let i = 0; i < twigs; i++) {
    const t = 0.22 + (i / Math.max(1, twigs - 1)) * 0.74;
    const [x, y] = bez(curve, t);
    const dir = i % 2 === 0 ? 1 : -1;
    const a = ((tangent(curve, t) + dir * (38 + (i % 3) * 8)) * Math.PI) / 180;
    const L = size * (0.9 - t * 0.35);
    const tx = x + Math.cos(a) * L;
    const ty = y + Math.sin(a) * L;
    items.push(
      <Stem key={`s${i}`} d={`M${r1(x)} ${r1(y)}L${r1(tx)} ${r1(ty)}`} width={0.8} opacity={0.7} />,
      <Blossom key={`b${i}`} x={tx} y={ty} r={2.3} />,
    );
  }
  const [ex, ey] = curve[3];
  return (
    <>
      <Stem d={cubicPath(curve)} width={1} opacity={0.75} />
      {items}
      <Blossom x={ex} y={ey} r={2.6} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Flowers                                                           */
/* ---------------------------------------------------------------- */

export type BloomKind = "blush" | "linen" | "fawn";
const PETAL: Record<BloomKind, { fill: string; ink: string; heart: string }> = {
  blush: { fill: P.blush, ink: P.rose, heart: P.forest },
  linen: { fill: P.linen, ink: P.fawn, heart: P.forest },
  fawn: { fill: P.fawn, ink: "#766b57", heart: P.forest },
};

/** One teardrop petal pointing up from the origin. */
const petalPath = (h: number, w: number) =>
  `M0 0C${r1(-w * 0.95)} ${r1(-h * 0.22)} ${r1(-w * 1.02)} ${r1(-h * 0.86)} 0 ${r1(-h)}C${r1(w * 1.02)} ${r1(-h * 0.86)} ${r1(w * 0.95)} ${r1(-h * 0.22)} 0 0Z`;

/** A full-faced garden flower seen from above: layers of overlapping petals around a seeded heart. */
export function Bloom({
  x,
  y,
  r = 30,
  angle = 0,
  kind = "blush",
  layers = 3,
}: {
  x: number;
  y: number;
  r?: number;
  angle?: number;
  kind?: BloomKind;
  layers?: number;
}) {
  const v = useGrow();
  const c = PETAL[kind];
  const rings = [];
  for (let l = 0; l < layers; l++) {
    const count = 8 - l;
    const h = r * (1 - l * 0.27);
    const w = h * 0.4;
    const offset = (l * 360) / (count * 2);
    const petals = [];
    for (let i = 0; i < count; i++) {
      petals.push(
        <path
          key={i}
          d={petalPath(h, w)}
          transform={`rotate(${r1((360 / count) * i + offset)})`}
          fill={c.fill}
          fillOpacity={0.5 + l * 0.17}
          stroke={c.ink}
          strokeOpacity={0.55}
          strokeWidth={0.6}
        />,
      );
    }
    rings.push(
      <motion.g key={l} variants={v.grow} style={{ originX: 0.5, originY: 0.5 }}>
        {petals}
      </motion.g>,
    );
  }
  const dots = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    return <circle key={i} cx={r1(Math.cos(a) * r * 0.2)} cy={r1(Math.sin(a) * r * 0.2)} r={r * 0.035} fill={P.fawn} />;
  });
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)})`}>
      {rings}
      <motion.g variants={v.grow} style={{ originX: 0.5, originY: 0.5 }}>
        <circle r={r * 0.14} fill={c.heart} />
        {dots}
      </motion.g>
    </g>
  );
}

/** A closed bud with two sepals, pointing up from (x, y) when angle is 0. */
export function Bud({ x, y, angle = 0, scale = 1 }: { x: number; y: number; angle?: number; scale?: number }) {
  const v = useGrow();
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)}) scale(${scale})`}>
      <motion.g variants={v.grow} style={{ originX: 0.5, originY: 1 }}>
        <path d="M0 0C-12-6-13-24 0-36 13-24 12-6 0 0Z" fill={P.blush} fillOpacity={0.92} stroke={P.rose} strokeOpacity={0.6} strokeWidth={1} />
        <path d="M0-2C-5-11-4-24 0-32M0-2C5-11 4-24 0-32" stroke={P.rose} strokeOpacity={0.45} strokeWidth={0.8} />
        <path d="M0 0C-11 2-17-4-15-14M0 0C11 2 17-4 15-14" fill={P.sage} fillOpacity={0.9} stroke={P.ink} strokeOpacity={0.4} strokeWidth={0.8} />
      </motion.g>
    </g>
  );
}

/** A seed: an oval with a groove and a highlight. */
export function Seed({ x, y, angle = -18, scale = 1 }: { x: number; y: number; angle?: number; scale?: number }) {
  const v = useGrow();
  return (
    <g transform={`translate(${r1(x)} ${r1(y)}) rotate(${angle}) scale(${scale})`}>
      <motion.g variants={v.grow} style={{ originX: 0.5, originY: 0.5 }}>
        <ellipse rx={13} ry={8} fill={P.fawn} stroke="#766b57" strokeWidth={1.1} />
        <path d="M-10-1C-4 3 4 3 10-1" stroke="#766b57" strokeOpacity={0.7} strokeWidth={0.9} />
        <path d="M-7-4.4C-3-6.4 2-6.6 5-5.6" stroke={P.linen} strokeOpacity={0.8} strokeWidth={1.2} />
      </motion.g>
    </g>
  );
}

/** A mound of soil with a few pebbles. */
export function Soil({ x, y, width = 90 }: { x: number; y: number; width?: number }) {
  const v = useGrow();
  const h = width * 0.16;
  return (
    <motion.g variants={v.fade}>
      <path
        d={`M${r1(x - width / 2)} ${y}C${r1(x - width * 0.22)} ${r1(y - h)} ${r1(x + width * 0.22)} ${r1(y - h)} ${r1(x + width / 2)} ${y}`}
        fill={P.fawn}
        fillOpacity={0.55}
        stroke="#766b57"
        strokeOpacity={0.7}
        strokeWidth={1}
      />
      <circle cx={x - width * 0.18} cy={y - h * 0.32} r={1.4} fill="#766b57" fillOpacity={0.7} />
      <circle cx={x + width * 0.12} cy={y - h * 0.5} r={1.1} fill="#766b57" fillOpacity={0.7} />
      <circle cx={x + width * 0.28} cy={y - h * 0.2} r={1.5} fill="#766b57" fillOpacity={0.7} />
    </motion.g>
  );
}
