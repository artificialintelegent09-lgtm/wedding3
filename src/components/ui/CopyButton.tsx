"use client";

import { Check, Copy, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";

type State = "idle" | "copied" | "failed";

/** Clipboard API first, then the legacy selection fallback (older in-app WebViews). */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({ value, bank }: { value: string; bank: string }) {
  const { copy } = useInvitation();
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    const ok = await writeClipboard(value);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  const Icon = state === "copied" ? Check : state === "failed" ? TriangleAlert : Copy;
  const label = state === "copied" ? copy.gift.copied : state === "failed" ? copy.gift.copyFailed : copy.gift.copy;

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className={`inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-[0.7rem] font-normal uppercase tracking-[0.24em] transition-colors duration-300 ${
          state === "copied"
            ? "border-primary bg-primary text-paper"
            : state === "failed"
              ? "border-red-800 bg-red-50 text-red-900"
              : "border-primary/70 text-primary hover:bg-primary hover:text-paper"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? copy.gift.copiedAnnounce(bank) : state === "failed" ? copy.gift.copyFailed : ""}
      </span>
    </>
  );
}
