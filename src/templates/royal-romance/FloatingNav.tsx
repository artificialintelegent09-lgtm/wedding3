"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Gift, Heart, House, Images, Mail, MessageCircleHeart, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInvitation } from "@/components/InvitationContext";
import { getRsvpChannel, showWishes } from "@/lib/contact";
import { luxe } from "@/lib/motion";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

/** Bottom navigation pill: thumb-reachable on phones, labelled on larger screens. */
export function FloatingNav() {
  const { data, copy, opened } = useInvitation();
  const [active, setActive] = useState("home");

  const items: NavItem[] = [
    { id: "home", label: copy.nav.home, icon: House },
    { id: "couple", label: copy.nav.couple, icon: Heart },
    { id: "events", label: copy.nav.events, icon: CalendarHeart },
    { id: "gallery", label: copy.nav.gallery, icon: Images },
    ...(data.gift ? [{ id: "gift", label: copy.nav.gift, icon: Gift }] : []),
    ...(getRsvpChannel(data) ? [{ id: "rsvp", label: copy.nav.rsvp, icon: Mail }] : []),
    ...(showWishes(data) ? [{ id: "wishes", label: copy.nav.wishes, icon: MessageCircleHeart }] : []),
  ];
  const idsKey = items.map((i) => i.id).join();

  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // A section becomes "current" when it crosses the middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of idsKey.split(",")) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [opened, idsKey]);

  return (
    <motion.nav
      aria-label={copy.nav.label}
      initial={{ y: 80 }}
      animate={{ y: opened ? 0 : 80 }}
      transition={{ duration: 0.9, ease: luxe, delay: opened ? 1.8 : 0 }}
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gold/35 bg-deep lg:inset-x-auto lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2 lg:border"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between lg:max-w-none lg:gap-1 lg:px-2">
        {items.map(({ id, label, icon: Icon }) => {
          const current = active === id;
          return (
            <li key={id} className="flex-1 lg:flex-none">
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={current ? "location" : undefined}
                className={`relative flex h-14 flex-col items-center justify-center gap-1 px-2 transition-colors duration-300 lg:min-w-20 ${
                  current ? "text-paper" : "text-gold-light/65 hover:text-paper"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 top-0 h-0.5 origin-center bg-gold transition-transform duration-500 ${current ? "scale-x-100" : "scale-x-0"}`}
                />
                <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.4} aria-hidden="true" />
                <span className="text-[0.52rem] font-normal uppercase tracking-[0.18em]">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
