import { lt } from "@/lib/i18n";
import type { Locale, WeddingEvent } from "@/types/invitation";

/** `2027-03-20T08:00:00+07:00` → `20270320T010000Z` */
function toUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function location(event: WeddingEvent): string {
  return `${event.venue.name}, ${event.venue.address}`;
}

export function googleCalendarUrl(event: WeddingEvent, headline: string, locale: Locale): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${headline} · ${lt(event.title, locale)}`,
    dates: `${toUtcStamp(event.startsAt)}/${toUtcStamp(event.endsAt)}`,
    location: location(event),
    details: [lt(event.note, locale), event.dressCode ? `Dress code: ${lt(event.dressCode, locale)}` : ""]
      .filter(Boolean)
      .join("\n"),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 requires lines to be folded at 75 octets. */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  out.push(rest);
  return out.join("\r\n");
}

export function buildIcs(event: WeddingEvent, headline: string, slug: string, locale: Locale): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Digital Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${slug}-${event.id}@wedding-invitation`,
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(event.startsAt)}`,
    `DTEND:${toUtcStamp(event.endsAt)}`,
    `SUMMARY:${escapeIcs(`${headline} · ${lt(event.title, locale)}`)}`,
    `LOCATION:${escapeIcs(location(event))}`,
    `DESCRIPTION:${escapeIcs([lt(event.note, locale), event.dressCode ? `Dress code: ${lt(event.dressCode, locale)}` : ""].filter(Boolean).join("\n"))}`,
    `URL:${event.venue.mapsUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.map(fold).join("\r\n")}\r\n`;
}

export function downloadIcs(event: WeddingEvent, headline: string, slug: string, locale: Locale) {
  const blob = new Blob([buildIcs(event, headline, slug, locale)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Keyless Google Maps embed URL. Works without an API key. */
export function mapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
