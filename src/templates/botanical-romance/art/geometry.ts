export type Pt = [number, number];
export type Cubic = [Pt, Pt, Pt, Pt];

/** Point on a cubic Bézier at t. */
export const bez = ([a, b, c, d]: Cubic, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
};

/** Direction of the curve at t, in degrees. */
export const tangent = (c: Cubic, t: number): number => {
  const [x1, y1] = bez(c, Math.max(0, t - 0.01));
  const [x2, y2] = bez(c, Math.min(1, t + 0.01));
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
};

export const cubicPath = ([a, b, c, d]: Cubic) =>
  `M${a[0]} ${a[1]}C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;

/** Small deterministic PRNG: art must be identical on server and client (no hydration drift). */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const r1 = (n: number) => Math.round(n * 10) / 10;
