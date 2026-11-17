"use client";

import { type Cubic, mulberry32, r1 } from "./geometry";
import { Cluster, GrowSvg } from "./grow";
import { Blossom, Bloom, Branch, Bud, Eucalyptus, Fern, Gypsophila, Leaf, Seed, Soil, Stem } from "./parts";

interface ArtProps {
  className?: string;
  trigger?: "view" | "mount";
  delay?: number;
}

/* ---------------------------------------------------------------- */
/* Compositions                                                      */
/* ---------------------------------------------------------------- */

/** Foliage draping from the top-left corner. Mirror with `-scale-x-100` for the other side. */
export function CornerSpray(props: ArtProps) {
  return (
    <GrowSvg viewBox="0 0 340 340" {...props}>
      <Fern curve={[[22, -10], [8, 100], [58, 202], [132, 304]]} pairs={10} leaf={44} />
      <Eucalyptus curve={[[-10, 22], [112, 6], [226, 66], [322, 192]]} pairs={7} leaf={28} />
      <Branch curve={[[-10, 112], [56, 124], [108, 174], [128, 244]]} leaves={5} leaf={32} tip="bud" />
      <Gypsophila curve={[[40, 34], [128, 42], [204, 108], [262, 150]]} twigs={6} size={18} />
      <Bloom x={92} y={92} r={36} angle={14} />
      <Bloom x={176} y={58} r={20} angle={-20} kind="linen" />
      <Bloom x={66} y={176} r={22} angle={30} kind="fawn" layers={2} />
    </GrowSvg>
  );
}

/** A low bush with blooms. It rises from the bottom edge: place it at the foot of a frame. */
export function BaseSpray(props: ArtProps) {
  return (
    <GrowSvg viewBox="0 0 420 230" {...props}>
      <Fern curve={[[150, 232], [158, 182], [206, 136], [276, 108]]} pairs={9} leaf={40} />
      <Branch curve={[[42, 232], [52, 168], [28, 104], [66, 36]]} leaves={7} leaf={38} tip="bud" />
      <Eucalyptus curve={[[0, 214], [88, 196], [168, 206], [262, 168]]} pairs={6} leaf={26} />
      <Gypsophila curve={[[96, 232], [104, 170], [150, 118], [196, 80]]} twigs={6} size={18} />
      <Bloom x={112} y={156} r={32} angle={-8} />
      <Bloom x={196} y={176} r={21} angle={24} kind="linen" />
      <Bloom x={252} y={128} r={17} angle={-30} layers={2} />
    </GrowSvg>
  );
}

/** A tall single sprig: for margins and section edges. */
export function Sprig({ flip = false, ...props }: ArtProps & { flip?: boolean }) {
  return (
    <GrowSvg viewBox="0 0 130 420" {...props}>
      <g transform={flip ? "translate(130 0) scale(-1 1)" : undefined}>
        <Branch curve={[[66, 420], [24, 310], [104, 190], [64, 26]]} leaves={11} leaf={40} tip="bud" />
        <Gypsophila curve={[[56, 322], [20, 292], [10, 246], [24, 210]]} twigs={4} size={14} />
        <Gypsophila curve={[[88, 190], [118, 168], [124, 126], [110, 96]]} twigs={4} size={14} />
        <Bloom x={34} y={214} r={14} kind="linen" layers={2} />
      </g>
    </GrowSvg>
  );
}

/** A quiet ornament for titles: a small bloom with leaves running out to both sides. */
export function Divider(props: ArtProps) {
  return (
    <GrowSvg viewBox="0 0 280 48" {...props}>
      <Branch curve={[[134, 26], [100, 14], [58, 36], [6, 22]]} leaves={5} leaf={20} tip="leaf" width={1.2} />
      <Branch curve={[[146, 26], [180, 14], [222, 36], [274, 22]]} leaves={5} leaf={20} side={-1} tip="leaf" width={1.2} />
      <Bloom x={140} y={26} r={15} />
    </GrowSvg>
  );
}

/* ---------------------------------------------------------------- */
/* The four stages of the love story                                 */
/* ---------------------------------------------------------------- */

/** Seed → sprout → bud → bloom, each drawn on a 120×120 sheet and sitting on the same soil line. */
export function StageArt({ stage, className, delay = 0 }: { stage: 0 | 1 | 2 | 3; className?: string; delay?: number }) {
  return (
    <GrowSvg viewBox="0 0 120 120" className={className} delay={delay} stagger={0.07}>
      <Soil x={60} y={100} width={78} />
      {stage === 0 && (
        <>
          <Seed x={60} y={90} scale={1.15} />
          <path d="M42 70C48 62 54 60 60 66" stroke="var(--bot-moss)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 4" />
        </>
      )}
      {stage === 1 && (
        <>
          <Stem d="M60 99C60 88 59 78 60 66" width={2} />
          <Leaf x={60} y={68} angle={-28} length={30} slim={0.46} tone="sage" />
          <Leaf x={60} y={68} angle={-152} length={26} slim={0.46} tone="moss" />
        </>
      )}
      {stage === 2 && (
        <>
          <Stem d="M60 99C62 84 57 68 60 44" width={2} />
          <Leaf x={60.6} y={84} angle={-34} length={28} slim={0.4} tone="sage" />
          <Leaf x={59.4} y={72} angle={-146} length={26} slim={0.4} tone="moss" />
          <Leaf x={59.6} y={58} angle={-40} length={22} slim={0.4} tone="sage" />
          <Bud x={60} y={46} scale={0.9} />
        </>
      )}
      {stage === 3 && (
        <>
          <Stem d="M60 99C56 86 64 72 60 54" width={2} />
          <Leaf x={58.8} y={86} angle={-36} length={26} slim={0.4} tone="sage" />
          <Leaf x={60.6} y={76} angle={-144} length={24} slim={0.4} tone="moss" />
          <Stem d="M60.4 76C74 70 84 60 88 48" width={1.5} />
          <Bud x={88} y={50} angle={14} scale={0.5} />
          <Bloom x={60} y={44} r={27} />
        </>
      )}
    </GrowSvg>
  );
}

/* ---------------------------------------------------------------- */
/* The garden in full bloom                                          */
/* ---------------------------------------------------------------- */

type Top = "bloom" | "linen" | "bud" | "gypsophila" | "fern";

/**
 * The closing metaphor: a bed of flowers of different heights that opens stem by stem, left to right.
 * Deterministic (seeded) so the server and the client draw the same garden.
 */
export function GardenBloom({ className, count = 17 }: { className?: string; count?: number }) {
  const rand = mulberry32(2027);
  const stems = Array.from({ length: count }, (_, i) => {
    const x = 30 + (i / (count - 1)) * 1140 + (rand() - 0.5) * 36;
    // Taller toward the middle, like a bed that crests.
    const crest = Math.sin((i / (count - 1)) * Math.PI);
    const h = 120 + crest * 150 + rand() * 70;
    const lean = (rand() - 0.5) * 90;
    const topX = x + lean;
    const topY = 372 - h;
    const curve: Cubic = [
      [x, 376],
      [x + lean * -0.4, 376 - h * 0.35],
      [x + lean * 1.1, 376 - h * 0.7],
      [topX, topY],
    ];
    const pick = rand();
    const top: Top = pick < 0.4 ? "bloom" : pick < 0.58 ? "linen" : pick < 0.74 ? "bud" : pick < 0.88 ? "gypsophila" : "fern";
    return { i, curve, topX, topY, top, size: 20 + rand() * 16, angle: (rand() - 0.5) * 60, leaf: 24 + rand() * 12 };
  });

  return (
    <GrowSvg viewBox="0 0 1200 380" className={className} preserveAspectRatio="xMidYMax slice" stagger={0.2}>
      {stems.map((s) => (
        <Cluster key={s.i} stagger={0.035}>
          <Branch curve={s.curve} leaves={4 + (s.i % 3)} leaf={s.leaf} side={s.i % 2 === 0 ? 1 : -1} tip="none" width={1.6} />
          {s.top === "bloom" && <Bloom x={s.topX} y={s.topY} r={s.size + 6} angle={s.angle} />}
          {s.top === "linen" && <Bloom x={s.topX} y={s.topY} r={s.size + 2} angle={s.angle} kind="linen" />}
          {s.top === "bud" && <Bud x={s.topX} y={s.topY} angle={s.angle / 2} scale={1.1} />}
          {s.top === "gypsophila" && (
            <>
              <Blossom x={s.topX} y={s.topY} r={3} />
              <Gypsophila curve={[[s.topX, s.topY + 40], [s.topX - 6, s.topY + 20], [s.topX + 8, s.topY + 8], [s.topX, s.topY]]} twigs={5} size={20} />
            </>
          )}
          {s.top === "fern" && <Leaf x={s.topX} y={s.topY + 6} angle={-90 + s.angle / 3} length={r1(s.leaf * 1.6)} slim={0.28} tone="moss" />}
        </Cluster>
      ))}
    </GrowSvg>
  );
}

/** A small posy for stationery: seed packets, labels. */
export function Posy(props: ArtProps & { kind?: "blush" | "linen" }) {
  const { kind = "blush", ...rest } = props;
  return (
    <GrowSvg viewBox="0 0 140 150" {...rest}>
      <Branch curve={[[70, 150], [58, 112], [88, 84], [70, 52]]} leaves={5} leaf={34} tip="leaf" />
      <Eucalyptus curve={[[70, 150], [96, 124], [112, 96], [122, 62]]} pairs={4} leaf={18} width={1.2} />
      <Bloom x={68} y={48} r={30} kind={kind} />
      <Bloom x={112} y={58} r={14} kind="linen" layers={2} />
    </GrowSvg>
  );
}
