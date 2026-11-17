import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Underline-only input: quiet, like a line on printed stationery. */
export const inputClass =
  "w-full rounded-none border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base font-light text-ink placeholder:text-muted/55 transition-colors focus:border-primary focus:outline-none focus-visible:outline-none focus:shadow-[0_1px_0_0_var(--tpl-primary)] aria-[invalid=true]:border-red-800";

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.68rem] font-normal uppercase tracking-[0.28em] text-primary">
          {label}
        </label>
        {hint && <span className="text-xs font-light text-muted">{hint}</span>}
      </div>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-1.5 min-h-[1.1rem] text-sm text-red-800">
        {error}
      </p>
    </div>
  );
}

/** Solid oxblood action: label at the left, icon (default arrow) at the right. */
export function SubmitButton({ idle, icon }: { idle: string; icon?: ReactNode }) {
  return (
    <button
      type="submit"
      className="group flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-6 text-left text-[0.74rem] font-normal uppercase tracking-[0.26em] text-paper transition-colors hover:bg-primary-soft"
    >
      <span>{idle}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <ArrowRight className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />}
      </span>
    </button>
  );
}
