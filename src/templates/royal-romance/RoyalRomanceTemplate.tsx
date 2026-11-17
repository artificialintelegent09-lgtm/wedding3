import { getRsvpChannel, showWishes } from "@/lib/contact";
import type { InvitationData } from "@/types/invitation";
import { Shell } from "./Shell";
import { Closing } from "./sections/Closing";
import { Couple } from "./sections/Couple";
import { Events } from "./sections/Events";
import { Gallery } from "./sections/Gallery";
import { Gift } from "./sections/Gift";
import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { Location } from "./sections/Location";
import { Rsvp } from "./sections/Rsvp";
import { Story } from "./sections/Story";
import { Wishes } from "./sections/Wishes";

/**
 * Royal Romance: burgundy, gold and ivory with lush rose ornaments.
 * Section order lives here, so a variant of this design can reorder or drop
 * sections without touching any section's code.
 */
export function RoyalRomanceTemplate({ data }: { data: InvitationData }) {
  return (
    <Shell data={data}>
      <Hero />
      <Intro />
      <Couple />
      <Events />
      <Location />
      <Gallery />
      {data.story && data.story.length > 0 && <Story />}
      {data.gift && <Gift />}
      {getRsvpChannel(data) && <Rsvp />}
      {showWishes(data) && <Wishes />}
      <Closing />
    </Shell>
  );
}
