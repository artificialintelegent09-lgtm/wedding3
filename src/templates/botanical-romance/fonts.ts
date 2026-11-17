import { Cormorant_Garamond, Manrope } from "next/font/google";

// Elegant high-contrast serif: couple names, headlines, romantic italic statements.
export const serif = Cormorant_Garamond({
  variable: "--font-botanical-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Soft, contemporary sans: small uppercase metadata, body copy, forms.
export const sans = Manrope({
  variable: "--font-botanical-sans",
  subsets: ["latin"],
  display: "swap",
});
