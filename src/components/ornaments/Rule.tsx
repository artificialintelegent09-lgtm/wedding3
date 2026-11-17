/** A hairline rule with a small diamond at its heart. Colour follows the text colour. */
export function Rule({ className = "", align = "center" }: { className?: string; align?: "center" | "left" }) {
  return (
    <svg
      viewBox="0 0 220 12"
      className={`h-3 w-44 ${align === "center" ? "mx-auto" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
    >
      <path d="M0 6H92M128 6H220" strokeWidth="0.8" strokeOpacity="0.7" />
      <path d="M110 1.5l4.5 4.5-4.5 4.5-4.5-4.5z" strokeWidth="0.9" />
      <circle cx="98" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="122" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
