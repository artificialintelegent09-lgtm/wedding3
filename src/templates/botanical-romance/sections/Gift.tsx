"use client";

import { PackageOpen } from "lucide-react";
import { useInvitation } from "@/components/InvitationContext";
import { Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { lt } from "@/lib/i18n";
import { Divider, Posy } from "../art/compositions";
import { useBotanical } from "../BotanicalContext";
import { Meta, Rise, SectionLabel } from "../ui";

/** "1234567890" → "1234 5678 90" for reading; copying still uses the raw number. */
const spaced = (n: string) => n.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();

/**
 * Wedding gift. Each bank account is a packet of seeds: a crimped kraft top, a linen label with a posy,
 * the number set large and the copy action underneath. The page never moves money: it only shows
 * where a guest can send a gift.
 */
export function Gift() {
  const { data, copy, locale } = useInvitation();
  const { b, no } = useBotanical();
  const gift = data.gift;
  if (!gift) return null;

  return (
    <section id="gift" aria-labelledby="gift-title" className="bot-paper relative overflow-hidden bg-linen-2 text-forest">
      <div className="relative mx-auto max-w-[72rem] px-5 py-24 sm:px-10 lg:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel no={no("gift")} align="center">
            {copy.gift.eyebrow}
          </SectionLabel>
          <h2 id="gift-title" className="mt-5 font-display text-[clamp(3rem,9vw,6.6rem)] font-light italic leading-[0.95] tracking-[-0.02em]">
            <Rise>{b.gift.title}</Rise>
          </h2>
          <Divider className="mx-auto mt-6 h-9 w-56" />
          <p className="mt-6 text-base leading-[1.85] text-forest/85 sm:text-[1.075rem]">{lt(gift.message, locale)}</p>
        </div>

        <ul className="mx-auto mt-16 grid max-w-3xl gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-20">
          {gift.accounts.map((account, i) => (
            <li key={`${account.bank}-${account.accountNumber}`} className={i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1 lg:mt-6"}>
              <Reveal y={40} delay={i * 0.1}>
                <div className="relative bg-[#d9d0bd] shadow-[0_30px_50px_-30px_rgba(38,61,50,0.6)]">
                  <div
                    aria-hidden="true"
                    className="h-7 bg-[repeating-linear-gradient(90deg,#c4b9a3_0_2px,#d9d0bd_2px_7px)] shadow-[inset_0_-6px_8px_-6px_rgba(38,61,50,0.25)]"
                  />
                  <div className="p-4 sm:p-5">
                    <div className="relative bg-linen px-5 pb-6 pt-6 text-center ring-1 ring-forest/20">
                      <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-forest/15" />
                      <Meta className="text-moss-deep">
                        {b.gift.packet} · {String(i + 1).padStart(2, "0")}
                      </Meta>
                      <p className="mt-2 font-display text-[2rem] font-medium italic leading-none">{account.bank}</p>
                      <Posy className="mx-auto mt-3 h-28 w-28" delay={0.2 + i * 0.1} kind={i % 2 === 0 ? "blush" : "linen"} />
                      <p className="mt-3 text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">{b.gift.number}</p>
                      <p
                        className="mt-1 break-words font-display text-[clamp(1.7rem,5vw,2.2rem)] font-medium leading-tight tracking-[0.04em] tabular-nums"
                        aria-label={account.accountNumber.split("").join(" ")}
                      >
                        <span aria-hidden="true">{spaced(account.accountNumber)}</span>
                      </p>
                      <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-forest/75">
                        {copy.gift.accountHolder}
                        <span className="mt-0.5 block text-[0.8rem] tracking-[0.1em] text-forest">{account.accountHolder}</span>
                      </p>
                      <div className="mt-5">
                        <CopyButton value={account.accountNumber.replace(/\s+/g, "")} bank={account.bank} />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {gift.address && (
          <Reveal y={30} className="mx-auto mt-16 max-w-md">
            <div className="border border-dashed border-forest/40 bg-linen/60 px-6 py-6 text-center">
              <p className="flex items-center justify-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-moss-deep">
                <PackageOpen className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                {copy.gift.sendTo}
              </p>
              <p className="mt-3 font-display text-3xl font-medium italic">{gift.address.recipient}</p>
              <p className="mt-1 leading-relaxed text-forest/85">{gift.address.address}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
