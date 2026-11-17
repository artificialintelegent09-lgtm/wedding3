import { Berry, Bud, FloralSvg, Leaf, Rose, Vine } from "./botanical";

/**
 * A lush botanical spray anchored in the top-left corner of its box.
 * Mirror it with `-scale-x-100` / `-scale-y-100` for the other corners.
 */
export function FloralCorner({ className }: { className?: string }) {
  return (
    <FloralSvg viewBox="0 0 340 340" className={className}>
      {/* vines */}
      <Vine d="M-12 26C66 22 128 58 168 118S256 246 336 268" />
      <Vine d="M26 -12C22 66 58 128 118 168S246 256 268 336" width={1.2} />
      <Vine d="M20 -10C44 84 104 112 146 84S214 34 306 22" width={1} />
      <Vine d="M-10 110C60 120 96 164 94 224S110 300 130 336" width={1} />

      {/* back foliage */}
      <Leaf x={150} y={104} rotate={-38} length={58} tone="olive" />
      <Leaf x={104} y={152} rotate={52} length={56} tone="olive" />
      <Leaf x={196} y={168} rotate={30} length={50} tone="olive" />
      <Leaf x={168} y={206} rotate={72} length={46} tone="olive" />
      <Leaf x={230} y={236} rotate={44} length={46} tone="gold" />
      <Leaf x={266} y={262} rotate={14} length={44} tone="gold" />
      <Leaf x={204} y={92} rotate={-16} length={48} tone="gold" />
      <Leaf x={262} y={46} rotate={-8} length={44} tone="gold" />
      <Leaf x={100} y={196} rotate={96} length={44} tone="gold" />
      <Leaf x={116} y={252} rotate={84} length={40} tone="gold" />
      <Leaf x={52} y={140} rotate={116} length={40} tone="olive" />

      {/* berries on slender stems */}
      <Vine d="M246 252C268 232 282 214 288 188" width={0.8} />
      <Berry x={288} y={186} r={4} />
      <Berry x={278} y={202} r={3} />
      <Berry x={268} y={216} r={2.6} />
      <Vine d="M200 108C226 86 246 82 270 90" width={0.8} />
      <Berry x={272} y={90} r={3.6} />
      <Berry x={258} y={86} r={2.8} />
      <Vine d="M104 250C122 268 126 288 122 304" width={0.8} />
      <Berry x={122} y={306} r={3.8} />
      <Berry x={114} y={292} r={2.8} />

      {/* buds */}
      <Bud x={282} y={34} rotate={78} scale={0.9} tone="blush" />
      <Bud x={36} y={290} rotate={168} scale={0.9} tone="wine" />
      <Bud x={226} y={150} rotate={104} scale={0.7} tone="wine" />

      {/* flowers, back to front */}
      <Rose x={178} y={52} rotate={20} scale={0.78} tone="blush" />
      <Rose x={52} y={186} rotate={-30} scale={0.78} tone="ivory" />
      <Rose x={156} y={150} rotate={50} scale={0.62} tone="wine" />
      <Rose x={80} y={82} rotate={8} scale={1.32} tone="wine" />
      <Rose x={132} y={104} rotate={-24} scale={0.7} tone="ivory" />
      <Rose x={34} y={92} rotate={64} scale={0.6} tone="blush" />
    </FloralSvg>
  );
}
