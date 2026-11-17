import type { InvitationData } from "@/types/invitation";
import { amelia_rafael } from "./amelia-rafael";
import { botanical_romance_demo } from "./botanical-romance";
import { modern_muse_demo } from "./modern-muse";

/** Every invitation the app serves. The key is the URL slug. */
const all: InvitationData[] = [amelia_rafael, modern_muse_demo, botanical_romance_demo];

const bySlug = new Map(all.map((i) => [i.slug, i]));

/**
 * Slug opened by the site root (`/`). This project is the Template 03 deployment, so the root serves Botanical Romance.
 * The other designs stay reachable by slug: /amelia-rafael/ (Classic Luxury) and /amelia-rafael-muse/ (Modern Muse).
 */
export const DEFAULT_SLUG = botanical_romance_demo.slug;

export function getInvitation(slug: string): InvitationData | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return all.map((i) => i.slug);
}
