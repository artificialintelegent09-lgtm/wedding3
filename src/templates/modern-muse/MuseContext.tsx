"use client";

import { createContext, useContext } from "react";
import type { MuseCopy } from "./copy";
import type { SectionKey } from "./config";

export interface MuseContextValue {
  /** Template-specific strings for the active language. */
  m: MuseCopy;
  /** Ordered table of contents; the index is the section number. */
  sections: SectionKey[];
  /** "03": zero-padded position of a section in the issue. */
  no: (key: SectionKey) => string;
  music: {
    /** False when the invitation has no music: the control is hidden. */
    available: boolean;
    playing: boolean;
    toggle: () => void;
    /** Used by the gate's "open with music": must run inside a click handler. */
    start: () => void;
  };
  /** Opens the gate; `withMusic` starts the track inside the same click. */
  open: (withMusic?: boolean) => void;
}

export const MuseContext = createContext<MuseContextValue | null>(null);

export function useMuse(): MuseContextValue {
  const ctx = useContext(MuseContext);
  if (!ctx) throw new Error("useMuse must be used inside the Modern Muse shell");
  return ctx;
}
