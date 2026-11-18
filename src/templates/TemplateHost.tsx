"use client";

import { templates, type TemplateProps } from "./registry";

/**
 * Client boundary that picks the invitation's design. The designs are lazily loaded in the registry; keeping
 * the lookup on the client side of the boundary means the page only references the chunks of the design it
 * actually renders (a Server Component that imports all three pulls all three into every route).
 */
export function TemplateHost({ data }: TemplateProps) {
  const Template = templates[data.templateId];
  return <Template data={data} />;
}
