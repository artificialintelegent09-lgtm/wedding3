import { Bodoni_Moda } from "next/font/google";

// Declared once in lib/fonts.ts and shared with Botanical Romance.
export { cormorant, manrope } from "@/lib/fonts";

/**
 * The chapter drop cap in the Love Chronicle has always been set in Bodoni Moda (it used the page-wide display
 * font, which was Bodoni). Declared here, without preload, so that look is kept exactly while the typeface is only
 * downloaded where the drop cap actually appears (Modern Muse's story), instead of on every page.
 */
export const dropCap = Bodoni_Moda({
  variable: "--font-muse-dropcap",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
});
