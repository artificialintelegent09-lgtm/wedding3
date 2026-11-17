import type { InvitationData } from "@/types/invitation";
import { amelia_rafael } from "./amelia-rafael";

/**
 * Demo invitation for the Modern Muse template (Editorial × Bold).
 *
 * It deliberately reuses the Amelia & Rafael demo content and photography: the wedding
 * information is identical across templates, only the visual design differs. To make a real
 * Modern Muse invitation, copy this file, replace the spread with your own content (see
 * amelia-rafael.ts for the full shape) and register it in ./index.ts.
 *
 * Editorial-only choices (which photo opens which composition, gallery arrangement, captions)
 * live in src/templates/modern-muse/config.ts.
 */
export const modern_muse_demo: InvitationData = {
  ...amelia_rafael,
  slug: "amelia-rafael-muse",
  templateId: "modern-muse",
  meta: {
    ...amelia_rafael.meta,
    title: "Amelia & Rafael — The Wedding Issue",
  },
  music: {
    // A synthesised ambient loop so the control can be demonstrated. Replace with your own track.
    src: "/audio/muse-ambient.wav",
    title: "Ambient loop (demo)",
  },
};
