import type { Locale } from "@/types/invitation";

/**
 * Modern Muse strings. Shared UI copy (forms, validation, calendar, countdown labels…) comes from
 * lib/i18n.ts; this file only holds what is specific to this template's editorial voice.
 * Wedding information (names, dates, venues) is never translated: it lives in the data file.
 */
const en = {
  issue: "The Wedding Issue",
  issueNo: "No. 01",
  tagline: "An editorial celebration of modern romance.",
  sections: {
    home: "Cover",
    invitation: "Invitation",
    couple: "Profiles",
    countdown: "Countdown",
    events: "Programme",
    venue: "Venue",
    gallery: "Gallery",
    story: "Love Chronicle",
    gift: "Gift",
    rsvp: "RSVP",
    wishes: "Letters",
    closing: "Closing",
  },
  gate: {
    preparedFor: "Prepared for",
    guestFallback: "Our Beloved Guest",
    open: "Open Invitation",
    openWithMusic: "Open with music",
    hint: "You are invited to the wedding of",
  },
  hero: {
    coverLines: "In this issue",
    lines: ["The ceremony", "The celebration", "The love story"],
    scroll: "Scroll",
    date: "Date",
    place: "Place",
  },
  quote: {
    label: "Opening note",
    invitation: "The invitation",
  },
  couple: {
    label: "Profiles",
    title: "The Two of Us",
    bride: "The Bride",
    groom: "The Groom",
    and: "and",
  },
  countdown: {
    label: "The countdown",
    title: "Until we say yes",
    save: "Save the date",
  },
  events: {
    label: "The programme",
    title: "Two moments, one day",
    when: "When",
    where: "Where",
  },
  venue: {
    label: "Find us",
    title: "The venue",
    halls: "Halls",
    address: "Address",
  },
  gallery: {
    label: "Curated",
    title: "The Gallery",
    plate: "Plate",
    plates: (n: number) => `${n} plates`,
    view: "View",
  },
  story: {
    label: "Feature",
    title: "The Love Chronicle",
    byline: "Words & memories by Amelia & Rafael",
    chapters: (n: number) => `${n} chapters`,
    chapter: "Chapter",
  },
  gift: {
    label: "With gratitude",
    title: "A token of love",
    shipping: "Send a gift to",
  },
  rsvp: {
    label: "Reply requested",
    title: "RSVP",
    sub: "Kindly let us know",
  },
  wishes: {
    label: "Guestbook",
    title: "Letters to the couple",
  },
  closing: {
    label: "Closing",
    thanks: "Thank you",
    colophon: "Colophon",
    credit: "Template No. 02 — Modern Muse. Demo photography: Pexels.",
    backToCover: "Back to cover",
  },
  nav: {
    contents: "Contents",
    close: "Close",
    language: "Language",
    openMenu: "Open contents",
    closeMenu: "Close contents",
    label: "Contents",
    now: "Now reading",
  },
  music: {
    play: "Play music",
    pause: "Pause music",
  },
};

export type MuseCopy = typeof en;

const id: MuseCopy = {
  issue: "Edisi Pernikahan",
  issueNo: "No. 01",
  tagline: "Perayaan editorial tentang cinta modern.",
  sections: {
    home: "Sampul",
    invitation: "Undangan",
    couple: "Profil",
    countdown: "Hitung Mundur",
    events: "Acara",
    venue: "Lokasi",
    gallery: "Galeri",
    story: "Kronik Cinta",
    gift: "Hadiah",
    rsvp: "RSVP",
    wishes: "Surat",
    closing: "Penutup",
  },
  gate: {
    preparedFor: "Khusus untuk",
    guestFallback: "Tamu Undangan",
    open: "Buka Undangan",
    openWithMusic: "Buka dengan musik",
    hint: "Anda diundang ke pernikahan",
  },
  hero: {
    coverLines: "Dalam edisi ini",
    lines: ["Akad nikah", "Resepsi", "Kisah cinta kami"],
    scroll: "Gulir",
    date: "Tanggal",
    place: "Tempat",
  },
  quote: {
    label: "Catatan pembuka",
    invitation: "Undangan",
  },
  couple: {
    label: "Profil",
    title: "Kami Berdua",
    bride: "Mempelai Wanita",
    groom: "Mempelai Pria",
    and: "dan",
  },
  countdown: {
    label: "Hitung mundur",
    title: "Menuju hari bahagia",
    save: "Simpan tanggalnya",
  },
  events: {
    label: "Susunan acara",
    title: "Dua momen, satu hari",
    when: "Waktu",
    where: "Tempat",
  },
  venue: {
    label: "Temukan kami",
    title: "Lokasi acara",
    halls: "Ruang",
    address: "Alamat",
  },
  gallery: {
    label: "Pilihan",
    title: "Galeri",
    plate: "Foto",
    plates: (n) => `${n} foto`,
    view: "Lihat",
  },
  story: {
    label: "Fitur",
    title: "Kronik Cinta",
    byline: "Kisah dan kenangan oleh Amelia & Rafael",
    chapters: (n) => `${n} bab`,
    chapter: "Bab",
  },
  gift: {
    label: "Dengan rasa syukur",
    title: "Tanda kasih",
    shipping: "Kirim hadiah ke",
  },
  rsvp: {
    label: "Mohon konfirmasi",
    title: "RSVP",
    sub: "Beri tahu kehadiran Anda",
  },
  wishes: {
    label: "Buku tamu",
    title: "Surat untuk mempelai",
  },
  closing: {
    label: "Penutup",
    thanks: "Terima kasih",
    colophon: "Kolofon",
    credit: "Template No. 02 — Modern Muse. Foto demo: Pexels.",
    backToCover: "Kembali ke sampul",
  },
  nav: {
    contents: "Daftar Isi",
    close: "Tutup",
    language: "Bahasa",
    openMenu: "Buka daftar isi",
    closeMenu: "Tutup daftar isi",
    label: "Daftar isi",
    now: "Sedang dibaca",
  },
  music: {
    play: "Putar musik",
    pause: "Jeda musik",
  },
};

const dictionaries: Record<Locale, MuseCopy> = { en, id };

export function getMuseCopy(locale: Locale): MuseCopy {
  return dictionaries[locale];
}
