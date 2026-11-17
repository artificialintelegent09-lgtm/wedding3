"use client";

import { MessageCircle } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { getRsvpChannel, whatsAppUrl } from "@/lib/contact";
import { formatLongDate, formatShortDate } from "@/lib/datetime";
import { fieldMessage } from "@/lib/form-messages";
import { clean, LIMITS, validateRsvp, type FieldErrors } from "@/lib/validation";
import { Field, inputClass, SubmitButton } from "./fields";

type Attendance = "attending" | "declining";

/** Opens WhatsApp in a new tab; if the browser blocks the popup, navigates this tab instead. */
function openWhatsApp(url: string) {
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.assign(url);
}

export function RsvpForm() {
  const { data, copy, guestName, locale } = useInvitation();
  const channel = getRsvpChannel(data);
  const uid = useId();

  // `null` means "untouched": show the guest's name from the link until they type.
  const [typedName, setTypedName] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  if (!channel) return null;
  const name = typedName ?? guestName;
  const err = (field: string) => {
    const code = errors[field];
    return code ? fieldMessage(code, field, copy, channel.maxGuests) : undefined;
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!channel) return;

    const found = validateRsvp({ name, attendance, guests, note }, channel.maxGuests);
    setErrors(found);
    if (Object.keys(found).length > 0 || !attendance) return;

    const { bride, groom } = data.couple;
    const message = copy.rsvp.message({
      couple: `${bride.nickname} & ${groom.nickname}`,
      name: clean(name),
      attending: attendance === "attending",
      date: formatLongDate(data.weddingDate, locale, data.events[0]?.timeZone ?? "UTC"),
      guests,
      note: clean(note),
    });
    const url = whatsAppUrl(channel.number, message);
    setHandoffUrl(url);
    openWhatsApp(url);
  }

  // The reply only exists once the guest presses Send in WhatsApp, so say exactly that.
  if (handoffUrl) {
    return (
      <div className="py-4 text-center" role="status">
        <MessageCircle className="mx-auto h-10 w-10 text-gold-deep" strokeWidth={1} aria-hidden="true" />
        <p className="mt-4 font-display text-3xl italic text-primary">{copy.rsvp.handoffTitle}</p>
        <p className="mx-auto mt-3 max-w-xs font-light leading-relaxed text-ink/80">{copy.rsvp.handoffBody}</p>
        <a
          href={handoffUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-6 text-[0.74rem] font-normal uppercase tracking-[0.26em] text-paper transition-colors hover:bg-primary-soft"
        >
          <span>{copy.rsvp.openAgain}</span>
          <MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
        </a>
        <div>
          <button
            type="button"
            onClick={() => setHandoffUrl(null)}
            className="mt-5 min-h-11 text-[0.7rem] font-normal uppercase tracking-[0.24em] text-primary underline underline-offset-4 hover:opacity-70"
          >
            {copy.rsvp.edit}
          </button>
        </div>
      </div>
    );
  }

  const options: { value: Attendance; label: string }[] = [
    { value: "attending", label: copy.rsvp.attending },
    { value: "declining", label: copy.rsvp.declining },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="relative text-left">
      <Field id={`${uid}-name`} label={copy.rsvp.name} error={err("name")}>
        <input
          id={`${uid}-name`}
          type="text"
          name="name"
          autoComplete="name"
          maxLength={LIMITS.nameMax + 20}
          placeholder={copy.rsvp.namePlaceholder}
          value={name}
          onChange={(e) => setTypedName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={`${uid}-name-error`}
          className={inputClass}
        />
      </Field>

      <fieldset aria-describedby={`${uid}-att-error`}>
        <legend className="mb-1 text-[0.68rem] font-normal uppercase tracking-[0.28em] text-primary">
          {copy.rsvp.attendance}
        </legend>
        <div className="border-t border-ink/15">
          {options.map((o) => {
            const selected = attendance === o.value;
            return (
              <label
                key={o.value}
                className={`flex min-h-14 cursor-pointer items-center gap-4 border-b border-ink/15 py-3 font-display text-xl transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                  selected ? "text-primary" : "text-ink/55 hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-attendance`}
                  value={o.value}
                  checked={selected}
                  onChange={() => setAttendance(o.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${selected ? "border-primary" : "border-ink/40"}`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                <span className={selected ? "italic" : ""}>{o.label}</span>
              </label>
            );
          })}
        </div>
        <p id={`${uid}-att-error`} role={errors.attendance ? "alert" : undefined} className="mt-1.5 min-h-[1.1rem] text-sm text-red-800">
          {err("attendance")}
        </p>
      </fieldset>

      {attendance !== "declining" && (
        <Field
          id={`${uid}-guests`}
          label={copy.rsvp.guests}
          hint={copy.rsvp.guestsHint(channel.maxGuests)}
          error={err("guests")}
        >
          <div className="mt-2 flex items-center gap-2" role="group" aria-label={copy.rsvp.guests}>
            {Array.from({ length: channel.maxGuests }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={guests === n}
                onClick={() => setGuests(n)}
                className={`h-12 flex-1 border font-display text-xl transition-colors ${
                  guests === n
                    ? "border-primary bg-primary text-paper"
                    : "border-ink/25 text-primary hover:border-primary"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>
      )}

      <Field id={`${uid}-note`} label={copy.rsvp.note} error={err("note")}>
        <textarea
          id={`${uid}-note`}
          name="note"
          rows={2}
          maxLength={LIMITS.noteMax + 50}
          placeholder={copy.rsvp.notePlaceholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          aria-invalid={!!errors.note}
          aria-describedby={`${uid}-note-error`}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="mt-4">
        <SubmitButton idle={copy.rsvp.submit} icon={<MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />} />
      </div>

      <p className="mt-4 text-center text-xs font-light leading-relaxed tracking-wide text-muted">
        {copy.rsvp.channelHint}
      </p>
      {data.rsvp?.deadline && (
        <p className="mt-2 text-center text-xs font-light tracking-wide text-muted">
          {copy.rsvp.deadline(formatShortDate(data.rsvp.deadline, locale))}
        </p>
      )}
    </form>
  );
}
