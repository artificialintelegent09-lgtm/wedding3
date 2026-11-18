import type { Metadata, Viewport } from "next";
import "./globals.css";

// Public URL of the site, for canonical and Open Graph URLs. NEXT_PUBLIC_SITE_URL wins; on Vercel the production
// domain is also exposed at build time, so previews never point at localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Wedding Invitation",
  description: "A digital wedding invitation.",
};

export const viewport: Viewport = {
  themeColor: "#240810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
