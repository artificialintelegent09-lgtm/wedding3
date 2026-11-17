/**
 * Client-side form validation. There is no server: these checks only make sure
 * the WhatsApp message a guest is about to send is complete and well-formed.
 * Error values are stable codes that each locale translates (see form-messages.ts).
 */
export const LIMITS = {
  nameMin: 2,
  nameMax: 60,
  wishMin: 5,
  wishMax: 400,
  noteMax: 300,
} as const;

export type FieldCode = "required" | "tooShort" | "tooLong" | "pickOne" | "guestsRange";
export type FieldErrors = Partial<Record<string, FieldCode>>;

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Strips control characters and trims, keeping intentional line breaks. */
export const clean = (s: string) => s.replace(CONTROL_CHARS, "").replace(/[ \t]+/g, " ").trim();

function text(value: string, min: number, max: number): FieldCode | undefined {
  const v = clean(value);
  if (!v) return "required";
  if (v.length < min) return "tooShort";
  if (v.length > max) return "tooLong";
}

export interface RsvpValues {
  name: string;
  attendance: "attending" | "declining" | null;
  guests: number;
  note: string;
}

export function validateRsvp(v: RsvpValues, maxGuests: number): FieldErrors {
  const errors: FieldErrors = {};
  const name = text(v.name, LIMITS.nameMin, LIMITS.nameMax);
  if (name) errors.name = name;
  if (!v.attendance) errors.attendance = "pickOne";
  if (v.attendance === "attending" && !(Number.isInteger(v.guests) && v.guests >= 1 && v.guests <= maxGuests)) {
    errors.guests = "guestsRange";
  }
  if (clean(v.note).length > LIMITS.noteMax) errors.note = "tooLong";
  return errors;
}

export interface WishValues {
  name: string;
  message: string;
}

export function validateWish(v: WishValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = text(v.name, LIMITS.nameMin, LIMITS.nameMax);
  if (name) errors.name = name;
  const message = text(v.message, LIMITS.wishMin, LIMITS.wishMax);
  if (message) errors.message = message;
  return errors;
}
