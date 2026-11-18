import type { Metadata } from "next";
import { InvitationPage } from "@/components/InvitationPage";
import { botanical_romance_demo as data } from "@/data/invitations/botanical-romance";
import { buildMetadata } from "@/lib/metadata";
import { BotanicalRomanceTemplate } from "@/templates/botanical-romance/BotanicalRomanceTemplate";

export const metadata: Metadata = buildMetadata(data);

/**
 * The site root is the Template 03 deployment: it serves Botanical Romance. The design is imported directly (not
 * through the template registry used by app/[slug]), so this page ships Botanical Romance's code, styles and fonts
 * and nothing from the other designs.
 */
export default function Home() {
  return (
    <InvitationPage data={data}>
      <BotanicalRomanceTemplate data={data} />
    </InvitationPage>
  );
}
