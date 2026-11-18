import { Bodoni_Moda, Jost } from "next/font/google";

// High-contrast didone serif: couple names, dates, section titles, editorial statements.
export const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

// Clean geometric sans: body text, event details, forms, navigation.
export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
