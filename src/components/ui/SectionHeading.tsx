import { Reveal } from "@/components/motion/Reveal";

/**
 * Editorial section opener: a numbered label with a hairline, then a large didone title.
 * `tone` picks colours for the surface it sits on; `align` lets sections vary their rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  index,
  tone = "dark",
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: string;
  /** Section number shown before the label, e.g. "02". */
  index?: string;
  /** "dark" text for ivory sections, "light" text for oxblood/espresso sections. */
  tone?: "dark" | "light";
  align?: "center" | "left";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <p
        className={`flex items-center gap-3 text-[0.68rem] font-normal uppercase tracking-[0.34em] ${
          align === "center" ? "justify-center" : ""
        } ${light ? "text-gold-light" : "text-gold-deep"}`}
      >
        {index && <span className="font-display text-sm font-normal normal-case italic tracking-normal">{index}</span>}
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2
        className={`mt-5 font-display text-[2.5rem] font-normal leading-[1.04] tracking-[-0.01em] sm:text-6xl ${
          light ? "text-paper" : "text-primary"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
