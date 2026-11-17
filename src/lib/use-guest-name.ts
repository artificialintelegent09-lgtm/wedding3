"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function read(): string {
  const raw = new URLSearchParams(window.location.search).get("to") ?? "";
  return raw.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
}

/**
 * Guest name from `?to=Name+Here`, e.g. https://example.com/amelia-rafael?to=Budi+Santoso
 * Read on the client so the page itself stays fully static and CDN-cacheable.
 * Empty during server render and hydration.
 */
export function useGuestName(): string {
  return useSyncExternalStore(subscribe, read, () => "");
}
