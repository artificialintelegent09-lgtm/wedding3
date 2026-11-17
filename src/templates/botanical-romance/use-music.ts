"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Optional background music. It lives in the Shell, which never unmounts while the invitation is open, so
 * navigating between sections or switching language can never restart the track.
 *
 * - Nothing autoplays: `start()` must be called from a click (the gate's open button).
 * - The file is only downloaded when playback starts (`preload="none"`); on mount a tiny HEAD request checks
 *   that the file exists, so a missing track hides the control instead of leaving a dead button.
 */
export function useMusic(src: string | undefined) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [reachable, setReachable] = useState(false);

  useEffect(() => {
    if (!src) return;
    const controller = new AbortController();
    fetch(src, { method: "HEAD", signal: controller.signal })
      .then((res) => setReachable(res.ok && (res.headers.get("content-type") ?? "").startsWith("audio/")))
      .catch(() => setReachable(false));
    return () => controller.abort();
  }, [src]);

  const ensure = useCallback(() => {
    if (!src) return null;
    if (!audio.current) {
      const a = new Audio();
      a.preload = "none";
      a.loop = true;
      a.volume = 0.6;
      a.src = src;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      a.addEventListener("error", () => {
        setPlaying(false);
        setReachable(false);
      });
      audio.current = a;
    }
    return audio.current;
  }, [src]);

  /** Starts playback. Call inside a click handler so the browser allows sound. */
  const start = useCallback(() => {
    // play() rejects if the browser refuses (no user gesture, missing file): stay silent, stay "off".
    ensure()?.play().catch(() => setPlaying(false));
  }, [ensure]);

  const toggle = useCallback(() => {
    const a = ensure();
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [ensure]);

  useEffect(
    () => () => {
      audio.current?.pause();
      audio.current = null;
    },
    [],
  );

  return { available: !!src && reachable, playing, start, toggle };
}
