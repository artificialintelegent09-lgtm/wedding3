import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { InvitationData, TemplateId } from "@/types/invitation";

export interface TemplateProps {
  data: InvitationData;
}

/**
 * Every visual design is one entry here. A template receives the same `InvitationData` contract, so new
 * designs plug in without any change to content, routing or the API.
 *
 * Templates are loaded with dynamic imports and resolved on the client side of the TemplateHost boundary, so a
 * route only ships the code, styles and fonts of the design it renders: with static imports (or a lookup inside a
 * Server Component) all three designs landed in every page's bundle.
 */
export const templates: Record<TemplateId, ComponentType<TemplateProps>> = {
  "royal-romance": dynamic(() => import("./royal-romance/RoyalRomanceTemplate").then((m) => m.RoyalRomanceTemplate)),
  "modern-muse": dynamic(() => import("./modern-muse/ModernMuseTemplate").then((m) => m.ModernMuseTemplate)),
  "botanical-romance": dynamic(() => import("./botanical-romance/BotanicalRomanceTemplate").then((m) => m.BotanicalRomanceTemplate)),
};
