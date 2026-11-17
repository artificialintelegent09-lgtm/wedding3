"use client";

import { Gift as GiftIcon } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { lt, type Copy } from "@/lib/i18n";
import type { BankAccount } from "@/types/invitation";

/** Groups digits for readability: "1234567890" → "1234 5678 90". Copying still uses the raw number. */
const spaced = (n: string) => n.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();

/** A place-card in the manner of printed stationery: fine double rule, didone numerals. */
function BankCard({ account, copy }: { account: BankAccount; copy: Copy }) {
  return (
    <div className="surface surface-paper relative border border-primary/20 p-7 shadow-[0_30px_60px_-40px_rgba(74,15,28,0.6)] sm:p-9">
      <div className="pointer-events-none absolute inset-1.5 border border-gold/45" aria-hidden="true" />
      <div className="relative">
        <p className="text-[0.68rem] font-normal uppercase tracking-[0.36em] text-gold-deep">{account.bank}</p>
        <p
          className="mt-5 break-words font-display text-[1.7rem] font-normal tabular-nums leading-tight tracking-[0.06em] text-primary sm:text-[2.2rem]"
          aria-label={account.accountNumber.split("").join(" ")}
        >
          {spaced(account.accountNumber)}
        </p>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-primary/15 pt-5">
          <div>
            <p className="text-[0.62rem] font-normal uppercase tracking-[0.3em] text-muted">{copy.gift.accountHolder}</p>
            <p className="mt-1 font-display text-lg font-normal uppercase tracking-[0.12em] text-ink">{account.accountHolder}</p>
          </div>
          <CopyButton value={account.accountNumber.replace(/\s+/g, "")} bank={account.bank} />
        </div>
      </div>
    </div>
  );
}

export function Gift() {
  const { data, copy, locale } = useInvitation();
  const gift = data.gift;
  if (!gift) return null;

  return (
    <section id="gift" className="surface surface-rose relative overflow-hidden px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow={copy.gift.eyebrow} title={copy.gift.title} index="06" />

        <Reveal className="mx-auto mt-8 max-w-xl text-center">
          <p className="font-display text-xl font-medium italic leading-relaxed text-ink/85 sm:text-2xl">{lt(gift.message, locale)}</p>
        </Reveal>

        <div className={`mt-14 grid gap-8 ${gift.accounts.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-md"}`}>
          {gift.accounts.map((account, i) => (
            <Reveal key={`${account.bank}-${account.accountNumber}`} delay={i * 0.12} y={36} className={i % 2 === 1 ? "md:mt-14" : ""}>
              <BankCard account={account} copy={copy} />
            </Reveal>
          ))}
        </div>

        {gift.address && (
          <Reveal className="mx-auto mt-16 max-w-md border-t border-primary/30 pt-8 text-center" delay={0.1}>
            <GiftIcon className="mx-auto h-6 w-6 text-primary" strokeWidth={1.2} aria-hidden="true" />
            <p className="mt-3 text-[0.66rem] font-normal uppercase tracking-[0.34em] text-gold-deep">{copy.gift.sendTo}</p>
            <p className="mt-2 font-display text-2xl text-primary">{gift.address.recipient}</p>
            <p className="mt-1 font-light leading-relaxed text-ink/75">{gift.address.address}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
