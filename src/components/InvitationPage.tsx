import type { ReactNode } from "react";
import { eventJsonLd } from "@/lib/metadata";
import type { InvitationData } from "@/types/invitation";

/** Wraps an invitation's template with its structured data (schema.org events). */
export function InvitationPage({ data, children }: { data: InvitationData; children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventJsonLd(data) }} />
      {children}
    </>
  );
}
