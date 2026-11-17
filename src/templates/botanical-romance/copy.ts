import type { Locale } from "@/types/invitation";

/**
 * Botanical Romance strings. Shared UI copy (forms, validation, calendar, countdown labels…) comes
 * from lib/i18n.ts; this file only holds what is specific to this template's garden voice.
 * Wedding information (names, dates, venues) is never translated: it lives in the data file.
 */
const en = {
  tagline: "A Love Story in Full Bloom.",
  sections: {
    home: "The Garden Gate",
    invitation: "Invitation",
    couple: "The Couple",
    journal: "Garden Journal",
    venue: "Garden Map",
    story: "Love Story",
    gallery: "Gallery",
    gift: "Gift",
    rsvp: "RSVP",
    wishes: "Guestbook",
    closing: "Full Bloom",
  },
  gate: {
    kicker: "The Wedding of",
    hint: "A private garden is waiting for you",
    preparedFor: "Prepared for",
    guestFallback: "Our Beloved Guest",
    open: "Enter the Garden",
  },
  hero: {
    date: "The date",
    place: "The garden",
    scroll: "Walk into the garden",
  },
  invitation: {
    label: "A Blessing to Begin",
    from: "From our families",
  },
  couple: {
    label: "Two Hearts, One Garden",
    title: "The Gardeners",
    and: "and",
    parents: "Raised by",
    follow: "Follow on Instagram",
    plate: "No.",
  },
  journal: {
    label: "Garden Journal",
    title: "The Day We Bloom",
    countdown: "Until the garden opens",
    entry: "Entry",
    when: "When",
    where: "Where",
    wishes: "Dress code",
  },
  venue: {
    label: "Garden Map",
    title: "Find Our Garden",
    address: "Address",
    halls: "Where each moment happens",
  },
  story: {
    label: "The Blooming Love Story",
    title: "From a Seed, Forever",
    intro: "Every great love begins as something small. Walk along the stem and watch ours grow.",
    stages: ["Seed", "Growing", "Blooming", "Forever"],
    stage: "Stage",
  },
  gallery: {
    label: "The Botanical Gallery",
    title: "Pressed Moments",
    plate: "Plate",
    count: (n: number) => `${n} photographs`,
  },
  gift: {
    title: "Seeds of Kindness",
    packet: "Gift packet",
    bank: "Bank",
    number: "Account number",
  },
  rsvp: {
    title: "Will You Walk the Garden with Us?",
  },
  wishes: {
    title: "Notes from the Garden",
  },
  closing: {
    label: "Full Bloom",
    thanks: "Thank you for being part of our garden",
    top: "Back to the garden gate",
    credit: "Template No. 03 — Botanical Romance. Demo photography: Pexels.",
  },
  nav: {
    menu: "Menu",
    close: "Close",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    label: "Invitation sections",
    progress: "Reading progress",
  },
};

export type BotanicalCopy = typeof en;

const id: BotanicalCopy = {
  tagline: "Kisah Cinta yang Mekar Sepenuhnya.",
  sections: {
    home: "Gerbang Taman",
    invitation: "Undangan",
    couple: "Mempelai",
    journal: "Jurnal Taman",
    venue: "Peta Taman",
    story: "Kisah Cinta",
    gallery: "Galeri",
    gift: "Hadiah",
    rsvp: "RSVP",
    wishes: "Buku Tamu",
    closing: "Mekar Sepenuhnya",
  },
  gate: {
    kicker: "Pernikahan",
    hint: "Sebuah taman pribadi menanti kehadiran Anda",
    preparedFor: "Khusus untuk",
    guestFallback: "Tamu Undangan",
    open: "Masuki Taman",
  },
  hero: {
    date: "Tanggal",
    place: "Taman kami",
    scroll: "Melangkah ke dalam taman",
  },
  invitation: {
    label: "Doa Pembuka",
    from: "Dari keluarga kami",
  },
  couple: {
    label: "Dua Hati, Satu Taman",
    title: "Para Penanam",
    and: "dan",
    parents: "Dibesarkan oleh",
    follow: "Ikuti di Instagram",
    plate: "No.",
  },
  journal: {
    label: "Jurnal Taman",
    title: "Hari Kami Mekar",
    countdown: "Hingga taman dibuka",
    entry: "Catatan",
    when: "Waktu",
    where: "Tempat",
    wishes: "Busana",
  },
  venue: {
    label: "Peta Taman",
    title: "Temukan Taman Kami",
    address: "Alamat",
    halls: "Tempat setiap momen berlangsung",
  },
  story: {
    label: "Kisah Cinta yang Bermekaran",
    title: "Dari Sebutir Benih, Selamanya",
    intro: "Setiap cinta yang besar bermula dari sesuatu yang kecil. Susuri batangnya dan saksikan cinta kami tumbuh.",
    stages: ["Benih", "Bertumbuh", "Mekar", "Selamanya"],
    stage: "Tahap",
  },
  gallery: {
    label: "Galeri Botani",
    title: "Momen yang Terawetkan",
    plate: "Lembar",
    count: (n) => `${n} foto`,
  },
  gift: {
    title: "Benih Kebaikan",
    packet: "Bungkus hadiah",
    bank: "Bank",
    number: "Nomor rekening",
  },
  rsvp: {
    title: "Maukah Anda Menyusuri Taman Bersama Kami?",
  },
  wishes: {
    title: "Catatan dari Taman",
  },
  closing: {
    label: "Mekar Sepenuhnya",
    thanks: "Terima kasih telah menjadi bagian dari taman kami",
    top: "Kembali ke gerbang taman",
    credit: "Template No. 03 — Botanical Romance. Foto demo: Pexels.",
  },
  nav: {
    menu: "Menu",
    close: "Tutup",
    language: "Bahasa",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    label: "Bagian undangan",
    progress: "Kemajuan membaca",
  },
};

const dictionaries: Record<Locale, BotanicalCopy> = { en, id };

export function getBotanicalCopy(locale: Locale): BotanicalCopy {
  return dictionaries[locale];
}
