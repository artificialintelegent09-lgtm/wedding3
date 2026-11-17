import { getRsvpChannel, showWishes } from "@/lib/contact";
import type { InvitationData } from "@/types/invitation";
import { Shell } from "./Shell";
import { Closing } from "./sections/Closing";
import { Countdown } from "./sections/Countdown";
import { Couple } from "./sections/Couple";
import { Events } from "./sections/Events";
import { Gallery } from "./sections/Gallery";
import { Gift } from "./sections/Gift";
import { Hero } from "./sections/Hero";
import { Quote } from "./sections/Quote";
import { Rsvp } from "./sections/Rsvp";
import { Story } from "./sections/Story";
import { Venue } from "./sections/Venue";
import { Wishes } from "./sections/Wishes";

/**
 * Modern Muse: Editorial × Bold. Section order lives here and must match getSections() in config.ts,
 * which numbers the sections and builds the contents page.
 */
export function ModernMuseTemplate({ data }: { data: InvitationData }) {
  return (
    <Shell data={data}>
      <Hero />
      <Quote />
      <Couple />
      <Countdown />
      <Events />
      <Venue />
      <Gallery />
      {data.story && data.story.length > 0 && <Story />}
      {data.gift && <Gift />}
      {getRsvpChannel(data) && <Rsvp />}
      {showWishes(data) && <Wishes />}
      <Closing />
    </Shell>
  );
}
