import type { InvitationData } from "@/types/invitation";
import { amelia_rafael } from "./amelia-rafael";

/**
 * Demo invitation for the Botanical Romance template (A Living Garden Experience).
 *
 * It deliberately reuses the Amelia & Rafael demo content and photography: the wedding
 * information is identical across templates, only the visual design differs. To make a real
 * Botanical Romance invitation, copy this file, replace the spread with your own content (see
 * amelia-rafael.ts for the full shape) and register it in ./index.ts.
 *
 * Template-only choices (which photo plays which role, gallery arrangement, English photo
 * captions) live in src/templates/botanical-romance/config.ts.
 */
export const botanical_romance_demo: InvitationData = {
  ...amelia_rafael,
  slug: "amelia-rafael-botanical",
  templateId: "botanical-romance",
  meta: {
    ...amelia_rafael.meta,
    title: "Amelia & Rafael — A Love Story in Full Bloom",
  },
  music: {
    // Never autoplays: the guest's tap on the gate's open button starts it, the header control pauses it.
    // Place the licensed track at public/audio/lagu-dunia-yang-nanti.mp3. Until the file exists the music
    // control stays hidden, so there is no dead button.
    src: "/audio/lagu-dunia-yang-nanti.mp3",
    title: "Lagu Dunia Yang Nanti",
  },
};
