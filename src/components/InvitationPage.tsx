import { eventJsonLd } from "@/lib/metadata";
import { templates } from "@/templates/registry";
import type { InvitationData } from "@/types/invitation";

/** Resolves an invitation's template and renders it, plus structured data. */
export function InvitationPage({ data }: { data: InvitationData }) {
  const Template = templates[data.templateId];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventJsonLd(data) }} />
      <Template data={data} />
    </>
  );
}
