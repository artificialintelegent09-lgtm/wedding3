import type { Locale } from "@/types/invitation";

const INTL_LOCALE: Record<Locale, string> = { en: "en-GB", id: "id-ID" };

/** "Saturday, 20 March 2027" rendered in the event's own timezone, identical on server and client. */
export function formatLongDate(iso: string, locale: Locale, timeZone: string): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(new Date(iso));
}

export function formatParts(iso: string, locale: Locale, timeZone: string) {
  const d = new Date(iso);
  const f = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(INTL_LOCALE[locale], { ...opts, timeZone }).format(d);
  return {
    weekday: f({ weekday: "long" }),
    day: f({ day: "numeric" }),
    month: f({ month: "long" }),
    year: f({ year: "numeric" }),
  };
}

/** "08:00 – 10:00 WIB" */
export function formatTimeRange(
  startIso: string,
  endIso: string,
  locale: Locale,
  timeZone: string,
  label?: string,
): string {
  const f = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  });
  const range = `${f.format(new Date(startIso))} – ${f.format(new Date(endIso))}`;
  return label ? `${range} ${label}` : range;
}

export function formatShortDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
