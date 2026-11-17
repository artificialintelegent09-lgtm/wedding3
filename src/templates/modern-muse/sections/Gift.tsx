"use client";

import { PackageOpen } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { lt } from "@/lib/i18n";
import { useMuse } from "../MuseContext";
import { MaskLine, SectionHead } from "../ui";

/** "1234567890" → "1234 5678 90" for reading; copying still uses the raw number. */
const spaced = (n: string) => n.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();

/**
 * Wedding gift. No cards: the accounts are rows in a ledger, set in large figures and divided by
 * rules, with the copy action at the end of each row. The heading stays put while they scroll.
 */
export function Gift() {
  const { data, copy, locale } = useInvitation();
  const { m, no } = useMuse();
  const gift = data.gift;
  if (!gift) return null;

  return (
    <section id="gift" aria-labelledby="gift-title" className="muse-grain relative overflow-hidden bg-ivory-2 text-espresso">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:gap-x-12 lg:py-36">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead no={no("gift")} label={m.gift.label} />
            <h2 id="gift-title" className="mt-6 font-display text-[clamp(3.4rem,8.5vw,7.6rem)] font-light italic leading-[0.9] tracking-[-0.03em]">
              <MaskLine>{m.gift.title}</MaskLine>
            </h2>
            <p className="mt-8 max-w-md text-[1.05rem] leading-[1.8] text-espresso/85">{lt(gift.message, locale)}</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t-2 border-espresso">
            {gift.accounts.map((account, i) => (
              <li key={`${account.bank}-${account.accountNumber}`} className="border-b border-espresso/30">
                <Reveal delay={i * 0.08} y={30} className="grid gap-5 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:py-10">
                  <div>
                    <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-terracotta">
                      <span className="text-espresso/70">{String(i + 1).padStart(2, "0")}</span>
                      {account.bank}
                    </p>
                    <p
                      className="mt-3 break-words font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-medium leading-none tracking-[0.02em] tabular-nums"
                      aria-label={account.accountNumber.split("").join(" ")}
                    >
                      <span aria-hidden="true">{spaced(account.accountNumber)}</span>
                    </p>
                    <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-espresso/75">
                      {copy.gift.accountHolder} — <span className="text-espresso">{account.accountHolder}</span>
                    </p>
                  </div>
                  <CopyButton value={account.accountNumber.replace(/\s+/g, "")} bank={account.bank} />
                </Reveal>
              </li>
            ))}
          </ul>

          {gift.address && (
            <Reveal className="mt-12 border-l-4 border-terracotta pl-6 sm:pl-8" y={24}>
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-espresso/75">
                <PackageOpen className="h-4 w-4 text-terracotta" strokeWidth={1.8} aria-hidden="true" />
                {m.gift.shipping}
              </p>
              <p className="mt-3 font-display text-3xl font-medium italic">{gift.address.recipient}</p>
              <p className="mt-1 max-w-sm leading-relaxed text-espresso/85">{gift.address.address}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
