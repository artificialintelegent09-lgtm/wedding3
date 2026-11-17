import type { Metadata } from "next";
import { InvitationPage } from "@/components/InvitationPage";
import { DEFAULT_SLUG, getInvitation } from "@/data/invitations";
import { buildMetadata } from "@/lib/metadata";

const data = getInvitation(DEFAULT_SLUG)!;

export const metadata: Metadata = buildMetadata(data);

/** The site root shows the default invitation. Every invitation also lives at /{slug}. */
export default function Home() {
  return <InvitationPage data={data} />;
}
