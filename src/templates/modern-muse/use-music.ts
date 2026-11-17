"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Optional background music. The audio element is only created (and the file only requested) when the
 * guest presses play, so nothing downloads or autoplays unexpectedly.
 */
export function useMusic(src: string | undefined) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const ensure = useCallback(() => {
    if (!src) return null;
    if (!audio.current) {
      const a = new Audio(src);
      a.loop = true;
      a.volume = 0.5;
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      audio.current = a;
    }
    return audio.current;
  }, [src]);

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

  return { available: !!src, playing, start, toggle };
}
