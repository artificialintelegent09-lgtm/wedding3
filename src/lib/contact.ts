import type { InvitationData } from "@/types/invitation";

/** "+62 812-3456-7890" → "6281234567890" digits only, without a leading 00. */
export function normalizeWhatsAppNumber(input: string | undefined): string | null {
  if (!input) return null;
  const digits = input.replace(/\D/g, "").replace(/^00/, "");
  // E.164 numbers are 8–15 digits; anything else is a config mistake.
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/** https://wa.me link that opens a chat with the message already typed in. */
export function whatsAppUrl(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Only absolute https URLs are accepted for the external wishes form. */
export function safeHttpsUrl(input: string | undefined): string | null {
  if (!input) return null;
  try {
    const url = new URL(input);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** RSVP needs a valid WhatsApp number; otherwise the section is not shown (never a dead form). */
export function getRsvpChannel(data: InvitationData): { number: string; maxGuests: number } | null {
  if (!data.rsvp) return null;
  const number = normalizeWhatsAppNumber(data.rsvp.whatsappNumber);
  return number ? { number, maxGuests: data.rsvp.maxGuests } : null;
}

export type WishChannel = { kind: "form"; url: string } | { kind: "whatsapp"; number: string };

/** External form first, then WhatsApp. `null` means wishes cannot be collected. */
export function getWishChannel(data: InvitationData): WishChannel | null {
  if (!data.wishes) return null;
  const url = safeHttpsUrl(data.wishes.formUrl);
  if (url) return { kind: "form", url };
  const number = normalizeWhatsAppNumber(data.wishes.whatsappNumber ?? data.rsvp?.whatsappNumber);
  return number ? { kind: "whatsapp", number } : null;
}

/** The wishes section shows when it can collect wishes, or has featured messages to display. */
export function showWishes(data: InvitationData): boolean {
  return !!data.wishes && (getWishChannel(data) !== null || (data.wishes.featured?.length ?? 0) > 0);
}
