import { Cormorant_Garamond, Manrope } from "next/font/google";

// Expressive editorial serif: couple names, headlines, italic statements.
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Contemporary sans (variable weight): metadata, body copy, forms.
export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
