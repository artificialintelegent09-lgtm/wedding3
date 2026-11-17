/**
 * AR monogram: two didone capitals joined by a small italic ampersand, inside a
 * fine double ring. Colour comes from the surrounding text colour (currentColor).
 */
export function Monogram({
  monogram,
  className = "",
  ring = true,
}: {
  monogram: string;
  /** Wrap the letters in the double ring. */
  ring?: boolean;
  /** Size with a w-* class; type scales with the element (font-size is relative to the width). */
  className?: string;
}) {
  const [a = "", b = ""] = monogram.split("&").map((s) => s.trim());
  return (
    <div
      className={`relative grid aspect-square place-items-center @container ${className}`}
      role="img"
      aria-label={`${a} and ${b}`}
    >
      {ring && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="97" strokeWidth="0.9" />
          <circle cx="100" cy="100" r="92" strokeWidth="0.45" strokeOpacity="0.7" />
          {[0, 90, 180, 270].map((r) => (
            <path key={r} transform={`rotate(${r} 100 100)`} d="M100 1.5v5" strokeWidth="1" />
          ))}
        </svg>
      )}
      <div className="relative flex items-baseline justify-center font-display leading-none">
        <span className="text-[34cqw] font-normal tracking-tight">{a}</span>
        <span className="-mx-[1.5cqw] translate-y-[1cqw] text-[16cqw] font-normal italic opacity-80">&amp;</span>
        <span className="text-[34cqw] font-normal italic tracking-tight">{b}</span>
      </div>
    </div>
  );
}
