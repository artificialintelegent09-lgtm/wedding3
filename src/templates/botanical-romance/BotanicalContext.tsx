"use client";

import { createContext, useContext } from "react";
import type { SectionKey } from "./config";
import type { BotanicalCopy } from "./copy";

export interface BotanicalContextValue {
  /** Template-specific strings for the active language. */
  b: BotanicalCopy;
  /** Ordered table of contents; the index is the section number. */
  sections: SectionKey[];
  /** "03": zero-padded position of a section. */
  no: (key: SectionKey) => string;
  /** Opens the garden gate. */
  open: () => void;
}

export const BotanicalContext = createContext<BotanicalContextValue | null>(null);

export function useBotanical(): BotanicalContextValue {
  const ctx = useContext(BotanicalContext);
  if (!ctx) throw new Error("useBotanical must be used inside the Botanical Romance shell");
  return ctx;
}
