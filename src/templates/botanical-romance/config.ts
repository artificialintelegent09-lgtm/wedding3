import { getRsvpChannel, showWishes } from "@/lib/contact";
import type { ImageAsset, InvitationData, Locale } from "@/types/invitation";
import type { BotanicalCopy } from "./copy";

/**
 * Art-direction configuration for Botanical Romance: which photographs play which role, how the
 * gallery is composed and how the story's four milestones map onto the stages of a plant.
 * Everything personal (names, dates, venues, words) still comes from the invitation data.
 */

export type SectionKey = keyof BotanicalCopy["sections"];

/** Ordered table of contents. Optional sections appear only when the invitation provides them. */
export function getSections(data: InvitationData): SectionKey[] {
  const sections: SectionKey[] = ["home", "invitation", "couple", "journal", "venue"];
  if (data.story && data.story.length > 0) sections.push("story");
  sections.push("gallery");
  if (data.gift) sections.push("gift");
  if (getRsvpChannel(data)) sections.push("rsvp");
  if (showWishes(data)) sections.push("wishes");
  sections.push("closing");
  return sections;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"] as const;

/** "08:00": 24-hour clock in the event's own timezone, identical on server and client. */
export function clock(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(
    new Date(iso),
  );
}

/* ------------------------------------------------------------------ */
/* Photographs                                                         */
/* ------------------------------------------------------------------ */

/** The garden at dusk: framed by the gate. Falls back to the cover for invitations without it. */
export function gatePhoto(data: InvitationData): ImageAsset {
  return data.story?.[2]?.image ?? data.gallery[4] ?? data.images.cover;
}

/** A wide view of the garden: the stage on which the hero is set. */
export function heroPanorama(data: InvitationData): ImageAsset {
  return data.gallery[4] ?? data.images.hero;
}

/**
 * Photo descriptions are authored in Indonesian in the data file. English equivalents live here, keyed
 * by file, so a guest reading in English never meets Indonesian captions or alt text.
 */
const ENGLISH_ALT: Record<string, string> = {
  "bride.webp": "Amelia in a white bridal kebaya walking toward the wedding stage",
  "groom.webp": "Rafael in a white wedding suit holding the marriage book",
  "cover.webp": "The marriage book on burgundy velvet",
  "hero.webp": "Rafael kissing Amelia's forehead in front of the wedding stage",
  "closing.webp": "Amelia gazing at the wedding stage dressed with burgundy drapes and flowers",
  "gallery-1.webp": "Amelia and Rafael holding their marriage books on the stage",
  "gallery-2.webp": "Happy smiles as the marriage book is signed",
  "gallery-3.webp": "Exchanging rings during the ijab kabul",
  "gallery-4.webp": "Amelia walking toward Rafael at the stage",
  "gallery-5.webp": "The garden at dusk, hung with string lights",
  "gallery-6.webp": "Shared prayer after the akad nikah",
  "gallery-7.webp": "A pair of red and green marriage books",
  "gallery-8.webp": "Flower arrangement at the reception",
  "gallery-9.webp": "The akad nikah, witnessed by family",
  "story-1.webp": "A warm moment at the start of Amelia and Rafael's journey",
  "story-2.webp": "Amelia and Rafael walking together on a shaded path",
  "story-3.webp": "The garden with string lights where Rafael proposed to Amelia",
  "story-4.webp": "Amelia and Rafael celebrating their happy day on the stage",
};

/** Description of a photograph in the active language. */
export function describe(asset: ImageAsset, locale: Locale): string {
  if (locale !== "en") return asset.alt;
  return ENGLISH_ALT[asset.src.split("/").pop() ?? ""] ?? asset.alt;
}

/* ------------------------------------------------------------------ */
/* Organic frames                                                      */
/* ------------------------------------------------------------------ */

/** Frame silhouettes borrowed from the garden: a doorway arch, a petal, a moon gate, a leaf. */
export const SHAPES = {
  arch: "rounded-t-[999px]",
  oval: "rounded-[50%]",
  round: "rounded-full",
  leaf: "rounded-tl-[40%] rounded-br-[40%] rounded-tr-md rounded-bl-md",
  rect: "rounded-[2px]",
} as const;

export type Shape = keyof typeof SHAPES;

export interface GalleryTile {
  /** Index into `data.gallery`. */
  i: number;
  shape: Shape;
  /** Column span on mobile (2-col grid) and desktop (12-col grid). */
  span: string;
  aspect: string;
  /** Vertical offset on desktop, for an unhurried, hand-hung rhythm. */
  offset?: string;
}

/**
 * Arrangement of the nine demo photographs: each frame shape suits what is in the picture. Photos not
 * listed here are appended as plain frames, so adding photos to the data never loses any.
 */
export const GALLERY_LAYOUT: GalleryTile[] = [
  { i: 0, shape: "rect", span: "col-span-2 lg:col-span-7", aspect: "aspect-[3/2]" },
  { i: 1, shape: "arch", span: "col-span-1 lg:col-span-4 lg:col-start-9", aspect: "aspect-[3/4]", offset: "lg:mt-20" },
  { i: 2, shape: "round", span: "col-span-1 lg:col-span-3 lg:col-start-2", aspect: "aspect-square", offset: "lg:-mt-24" },
  { i: 3, shape: "leaf", span: "col-span-2 lg:col-span-7 lg:col-start-5", aspect: "aspect-[16/10]", offset: "lg:mt-4" },
  { i: 4, shape: "oval", span: "col-span-2 lg:col-span-6", aspect: "aspect-[4/3]", offset: "lg:mt-16" },
  { i: 6, shape: "oval", span: "col-span-1 lg:col-span-3 lg:col-start-9", aspect: "aspect-[4/5]", offset: "lg:mt-4" },
  { i: 7, shape: "arch", span: "col-span-1 lg:col-span-4 lg:col-start-2", aspect: "aspect-[4/5]", offset: "lg:mt-8" },
  { i: 5, shape: "rect", span: "col-span-2 lg:col-span-7 lg:col-start-6", aspect: "aspect-[3/2]", offset: "lg:-mt-24" },
  { i: 8, shape: "leaf", span: "col-span-2 lg:col-span-6 lg:col-start-2", aspect: "aspect-[3/2]", offset: "lg:mt-10" },
];

/** Frame and relative size for each stage of the story: small seed, growing, blooming, forever. */
export const STORY_FRAMES: Shape[] = ["round", "oval", "arch", "arch"];
