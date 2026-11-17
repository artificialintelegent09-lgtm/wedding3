"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { getWishChannel, whatsAppUrl } from "@/lib/contact";
import { formatShortDate } from "@/lib/datetime";
import { fieldMessage } from "@/lib/form-messages";
import { clean, LIMITS, validateWish, type FieldErrors } from "@/lib/validation";
import type { FeaturedWish } from "@/types/invitation";
import { Field, inputClass, SubmitButton } from "./fields";

const solidAction =
  "flex min-h-14 w-full items-center justify-between gap-4 bg-primary px-6 text-left text-[0.74rem] font-normal uppercase tracking-[0.26em] text-paper transition-colors hover:bg-primary-soft";

/** Opens WhatsApp in a new tab; if the browser blocks the popup, navigates this tab instead. */
function openWhatsApp(url: string) {
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.assign(url);
}

/** Fallback when no external form is configured: compose a wish, hand it to WhatsApp. */
export function WhatsAppWishForm({ number }: { number: string }) {
  const { data, copy, guestName } = useInvitation();
  const uid = useId();
  const [typedName, setTypedName] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  const name = typedName ?? guestName;
  const err = (f: string) => (errors[f] ? fieldMessage(errors[f], f, copy) : undefined);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateWish({ name, message });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const { bride, groom } = data.couple;
    const url = whatsAppUrl(
      number,
      copy.wishes.whatsappMessage({
        couple: `${bride.nickname} & ${groom.nickname}`,
        name: clean(name),
        message: clean(message),
      }),
    );
    setHandoffUrl(url);
    openWhatsApp(url);
  }

  if (handoffUrl) {
    return (
      <div role="status">
        <p className="font-display text-2xl italic leading-snug text-primary">{copy.wishes.handoff}</p>
        <a href={handoffUrl} target="_blank" rel="noopener noreferrer" className={`${solidAction} mt-6`}>
          <span>{copy.wishes.openAgain}</span>
          <MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => {
            setHandoffUrl(null);
            setMessage("");
          }}
          className="mt-4 min-h-11 text-[0.7rem] font-normal uppercase tracking-[0.24em] text-primary underline underline-offset-4 hover:opacity-70"
        >
          {copy.rsvp.edit}
        </button>
      </div>
    );
  }

  const left = LIMITS.wishMax - message.length;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Field id={`${uid}-name`} label={copy.wishes.name} error={err("name")}>
        <input
          id={`${uid}-name`}
          type="text"
          name="name"
          autoComplete="name"
          maxLength={LIMITS.nameMax + 20}
          placeholder={copy.wishes.namePlaceholder}
          value={name}
          onChange={(e) => setTypedName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={`${uid}-name-error`}
          className={inputClass}
        />
      </Field>

      <Field id={`${uid}-msg`} label={copy.wishes.message} error={err("message")} hint={copy.wishes.remaining(left)}>
        <textarea
          id={`${uid}-msg`}
          name="message"
          rows={4}
          maxLength={LIMITS.wishMax + 50}
          placeholder={copy.wishes.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={`${uid}-msg-error`}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="mt-4">
        <SubmitButton idle={copy.wishes.submit} icon={<MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />} />
      </div>
      <p className="mt-4 text-xs font-light leading-relaxed tracking-wide text-muted">{copy.wishes.channelHint}</p>
    </form>
  );
}

export function ExternalFormCard({ url }: { url: string }) {
  const { copy } = useInvitation();
  return (
    <div>
      <p className="max-w-sm font-light leading-relaxed text-ink/80">{copy.wishes.formIntro}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${solidAction} mt-6`}>
        <span>{copy.wishes.openForm}</span>
        <ExternalLink className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
      </a>
      <p className="mt-4 text-xs font-light tracking-wide text-muted">{copy.wishes.formNote}</p>
    </div>
  );
}

function Quote({ wish, index }: { wish: FeaturedWish; index: number }) {
  const { copy, locale } = useInvitation();
  return (
    <li className="list-none">
      <Reveal delay={(index % 2) * 0.06} y={20}>
        <figure className="border-t border-primary/20 py-7 first:border-t-0 first:pt-0 sm:py-9">
          <blockquote className="font-display text-[1.35rem] font-medium italic leading-[1.5] text-ink sm:text-2xl">
            <span aria-hidden="true" className="mr-1 text-rose-deep">“</span>
            {wish.message}
            <span aria-hidden="true" className="ml-0.5 text-rose-deep">”</span>
          </blockquote>
          <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-muted">
            <span className="font-normal text-primary">{wish.name}</span>
            {wish.date && (
              <>
                <span aria-hidden="true" className="h-px w-4 bg-current opacity-50" />
                <time dateTime={wish.date}>{formatShortDate(wish.date, locale)}</time>
              </>
            )}
            {wish.sample && (
              <span className="border border-rose-deep/60 px-2 py-0.5 text-[0.6rem] tracking-[0.2em] text-rose-deep">
                {copy.wishes.sampleTag}
              </span>
            )}
          </figcaption>
        </figure>
      </Reveal>
    </li>
  );
}

/**
 * Guestbook without a backend: a way to *send* wishes (external form, or WhatsApp),
 * and a wall of messages the couple chose to feature in the invitation's data file.
 * Sample messages are always tagged so they can never pass for real guest messages.
 */
export function Guestbook() {
  const { data, copy } = useInvitation();
  const channel = getWishChannel(data);
  const featured = data.wishes?.featured ?? [];
  const hasSample = featured.some((w) => w.sample);

  const composer = channel && (
    <div className="border-t border-primary/40 pt-7">
      <h3 className="font-display text-3xl font-normal italic leading-tight text-primary">{copy.wishes.cardTitle}</h3>
      <div className="mt-5">
        {channel.kind === "form" ? <ExternalFormCard url={channel.url} /> : <WhatsAppWishForm number={channel.number} />}
      </div>
    </div>
  );

  const wall = featured.length > 0 && (
    <div className="min-w-0">
      {hasSample ? (
        <p className="mb-8 border border-dashed border-rose-deep/50 bg-rose-light/50 px-4 py-3 text-[0.82rem] font-light leading-relaxed text-ink/80" role="note">
          <span className="mr-2 font-normal uppercase tracking-[0.2em] text-rose-deep">{copy.wishes.sampleTag}</span>
          {copy.wishes.sampleNote}
        </p>
      ) : (
        <p className="mb-8 text-[0.68rem] uppercase tracking-[0.3em] text-gold-deep">{copy.wishes.featuredNote}</p>
      )}
      <ul>
        {featured.map((wish, i) => (
          <Quote key={`${wish.name}-${i}`} wish={wish} index={i} />
        ))}
      </ul>
    </div>
  );

  if (!wall) return <div className="mx-auto max-w-md">{composer}</div>;

  return (
    <div className={`grid gap-14 ${composer ? "lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24" : "mx-auto max-w-2xl"}`}>
      {composer && <div className="lg:sticky lg:top-12 lg:self-start">{composer}</div>}
      {wall}
    </div>
  );
}
