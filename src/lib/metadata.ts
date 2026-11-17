import type { Metadata } from "next";
import type { InvitationData } from "@/types/invitation";

export function buildMetadata(data: InvitationData): Metadata {
  const { title, description, ogImage } = data.meta;
  return {
    title,
    description,
    // Invitations are private to their guests: keep them out of search results.
    robots: { index: false, follow: false },
    alternates: { canonical: `/${data.slug}/` },
    openGraph: {
      type: "website",
      title,
      description,
      locale: data.locale === "id" ? "id_ID" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** schema.org Event data for each ceremony. Escaped so it is safe inside a <script> tag. */
export function eventJsonLd(data: InvitationData): string {
  const graph = data.events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${data.couple.bride.nickname} & ${data.couple.groom.nickname}: ${e.title}`,
    startDate: e.startsAt,
    endDate: e.endsAt,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: e.venue.name,
      address: e.venue.address,
    },
  }));
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
