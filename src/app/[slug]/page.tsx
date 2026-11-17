import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitationPage } from "@/components/InvitationPage";
import { getAllSlugs, getInvitation } from "@/data/invitations";
import { buildMetadata } from "@/lib/metadata";

// Static export: only the slugs below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = getInvitation(slug);
  return data ? buildMetadata(data) : {};
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const data = getInvitation(slug);
  if (!data) notFound();
  return <InvitationPage data={data} />;
}
