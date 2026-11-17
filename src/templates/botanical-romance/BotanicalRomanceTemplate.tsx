import { getRsvpChannel, showWishes } from "@/lib/contact";
import type { InvitationData } from "@/types/invitation";
import { Shell } from "./Shell";
import { Closing } from "./sections/Closing";
import { Couple } from "./sections/Couple";
import { Gallery } from "./sections/Gallery";
import { Gift } from "./sections/Gift";
import { Hero } from "./sections/Hero";
import { Invitation } from "./sections/Invitation";
import { Journal } from "./sections/Journal";
import { Rsvp } from "./sections/Rsvp";
import { Story } from "./sections/Story";
import { Venue } from "./sections/Venue";
import { Wishes } from "./sections/Wishes";

/**
 * Botanical Romance: a living garden experience. Section order lives here and must match
 * getSections() in config.ts, which numbers the sections and builds the menu.
 */
export function BotanicalRomanceTemplate({ data }: { data: InvitationData }) {
  return (
    <Shell data={data}>
      <Hero />
      <Invitation />
      <Couple />
      <Journal />
      <Venue />
      {data.story && data.story.length > 0 && <Story />}
      <Gallery />
      {data.gift && <Gift />}
      {getRsvpChannel(data) && <Rsvp />}
      {showWishes(data) && <Wishes />}
      <Closing />
    </Shell>
  );
}
