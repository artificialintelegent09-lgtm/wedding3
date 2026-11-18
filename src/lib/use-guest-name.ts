"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function read(): string {
  const raw = new URLSearchParams(window.location.search).get("to") ?? "";
  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
  // Cut by code point, not UTF-16 unit, so an emoji is never split in half.
  return Array.from(cleaned).slice(0, 60).join("").trimEnd();
}

/**
 * Guest name from `?to=Name+Here`, e.g. https://example.com/amelia-rafael?to=Budi+Santoso
 * Read on the client so the page itself stays fully static and CDN-cacheable.
 * Empty during server render and hydration.
 */
export function useGuestName(): string {
  return useSyncExternalStore(subscribe, read, () => "");
}
