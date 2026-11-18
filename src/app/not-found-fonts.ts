import { Bodoni_Moda, Jost } from "next/font/google";

/**
 * Typefaces of the 404 page only (the page keeps its Classic Luxury look). The root not-found boundary is part of
 * every route, so these are declared with `preload: false`: the browser downloads a file only if the 404 page is
 * actually shown, and no other page preloads fonts it does not use.
 */
export const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
});

export const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
});
