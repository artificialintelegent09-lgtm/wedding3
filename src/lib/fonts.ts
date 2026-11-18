import { Cormorant_Garamond, Manrope } from "next/font/google";

/**
 * Cormorant Garamond + Manrope: shared by Modern Muse and Botanical Romance, so the pair is declared (and
 * downloaded) once. Fonts are declared per template, never in the root layout: a route only loads the
 * typefaces of the design it renders. Royal Romance's own pair lives in templates/royal-romance/fonts.ts.
 */

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
