import type { Copy } from "@/lib/i18n";
import { LIMITS, type FieldCode } from "@/lib/validation";

/** Human message for one invalid field. */
export function fieldMessage(code: FieldCode, field: string, copy: Copy, maxGuests = 1): string {
  const f = copy.form;
  const min = field === "message" ? LIMITS.wishMin : LIMITS.nameMin;
  const max = field === "message" ? LIMITS.wishMax : field === "note" ? LIMITS.noteMax : LIMITS.nameMax;
  switch (code) {
    case "required":
      return f.required;
    case "tooShort":
      return f.tooShort(min);
    case "tooLong":
      return f.tooLong(max);
    case "pickOne":
      return f.pickOne;
    case "guestsRange":
      return f.guestsRange(maxGuests);
  }
}
