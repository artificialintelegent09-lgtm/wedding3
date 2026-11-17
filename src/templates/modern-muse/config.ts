import { getRsvpChannel, showWishes } from "@/lib/contact";
import type { InvitationData, Locale } from "@/types/invitation";
import type { MuseCopy } from "./copy";

/**
 * Editorial configuration for Modern Muse: which photos play which role and how the gallery is laid
 * out. Everything personal (names, dates, venues, words) still comes from the invitation data;
 * change the numbers below to re-art-direct the same photos.
 */

export type SectionKey = keyof MuseCopy["sections"];

/** Ordered table of contents. Optional sections appear only when the invitation provides them. */
export function getSections(data: InvitationData): SectionKey[] {
  const sections: SectionKey[] = ["home", "invitation", "couple", "countdown", "events", "venue", "gallery"];
  if (data.story && data.story.length > 0) sections.push("story");
  if (data.gift) sections.push("gift");
  if (getRsvpChannel(data)) sections.push("rsvp");
  if (showWishes(data)) sections.push("wishes");
  sections.push("closing");
  return sections;
}

export interface GalleryTile {
  /** Index into `data.gallery`. */
  i: number;
  /** Tailwind classes: column span on mobile (2-col grid) and desktop (12-col grid). */
  span: string;
  /** Aspect ratio class. Photos are cropped to it, respecting each image's focal point. */
  aspect: string;
  /** Vertical offset on desktop, for the staggered magazine rhythm. */
  offset?: string;
}

/**
 * Arrangement of the nine demo gallery photos: panoramic, portrait and square, with deliberate
 * offsets. Mobile is a 2-column grid; desktop a 12-column grid. Photos not listed here are
 * appended in a plain 4-column spread, so adding photos to the data never loses any.
 */
export const GALLERY_LAYOUT: GalleryTile[] = [
  { i: 0, span: "col-span-2 lg:col-span-7", aspect: "aspect-[3/2]" },
  { i: 1, span: "col-span-1 lg:col-span-4 lg:col-start-9", aspect: "aspect-[2/3]", offset: "lg:mt-24" },
  { i: 2, span: "col-span-1 lg:col-span-3 lg:col-start-2", aspect: "aspect-square", offset: "lg:-mt-24" },
  { i: 3, span: "col-span-2 lg:col-span-7 lg:col-start-6", aspect: "aspect-[16/10]", offset: "lg:mt-6" },
  { i: 7, span: "col-span-1 lg:col-span-4", aspect: "aspect-[4/5]" },
  { i: 4, span: "col-span-1 lg:col-span-8", aspect: "aspect-[3/2]", offset: "lg:mt-32" },
  { i: 5, span: "col-span-2 lg:col-span-5 lg:col-start-2", aspect: "aspect-[3/2]" },
  { i: 6, span: "col-span-1 lg:col-span-3 lg:col-start-8", aspect: "aspect-square", offset: "lg:-mt-12" },
  { i: 8, span: "col-span-1 lg:col-span-4 lg:col-start-10", aspect: "aspect-[4/5]", offset: "lg:mt-10" },
];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** "20.03.2027" cover-style date, in the event's own timezone. */
export function dotDate(iso: string, timeZone: string, locale: Locale): string {
  const parts = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("day")}.${get("month")}.${get("year")}`;
}

/** Which gallery photo (index into `data.gallery`) plays a supporting role outside the gallery. */
export const PICKS = {
  /** Beside the wedding quote: a quiet moment of prayer. */
  quote: 5,
  /** Beside the RSVP form: a joyful one. */
  rsvp: 8,
} as const;

/** "08:00": 24-hour clock in the event's own timezone, identical on server and client. */
export function clock(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(
    new Date(iso),
  );
}
