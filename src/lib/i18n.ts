import type { Locale, LocalizedText } from "@/types/invitation";

/**
 * UI strings that are not part of a customer's personal content.
 * Add a locale by extending `Locale` and adding a dictionary here.
 */
const en = {
  cover: {
    kicker: "The Wedding of",
    dear: "Dear",
    guestFallback: "Our Beloved Guest",
    invited: "You are warmly invited to celebrate our wedding",
    open: "Open Invitation",
  },
  hero: {
    kicker: "We are getting married",
    scroll: "Scroll",
  },
  couple: {
    eyebrow: "Bride & Groom",
    title: "Two Hearts, One Story",
    and: "&",
    brideLabel: "The Bride",
    groomLabel: "The Groom",
  },
  events: {
    eyebrow: "Save the Date",
    title: "The Celebration",
    countdownLabel: "Counting down to our day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    started: "Our celebration has begun",
    addToCalendar: "Add to Calendar",
    googleCalendar: "Google Calendar",
    downloadIcs: "Apple / Outlook (.ics)",
    dressCode: "Dress code",
    viewMap: "View Location",
  },
  location: {
    eyebrow: "Find Us",
    title: "Location",
    openMaps: "Open in Google Maps",
    mapTitle: "Map showing the wedding venue",
  },
  gallery: {
    eyebrow: "Our Moments",
    title: "Gallery",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    open: "Open photo",
    counter: (n: number, total: number) => `Photo ${n} of ${total}`,
  },
  story: {
    eyebrow: "How It Began",
    title: "Our Love Story",
  },
  gift: {
    eyebrow: "Wedding Gift",
    title: "With Gratitude",
    accountHolder: "Account holder",
    copy: "Copy Number",
    copied: "Copied!",
    copyFailed: "Could not copy",
    copiedAnnounce: (bank: string) => `${bank} account number copied to clipboard`,
    sendTo: "Send a gift to",
  },
  rsvp: {
    eyebrow: "Kindly Reply",
    title: "RSVP",
    name: "Your name",
    namePlaceholder: "Full name",
    attendance: "Will you attend?",
    attending: "Joyfully accept",
    declining: "Regretfully decline",
    guests: "Number of guests",
    guestsHint: (n: number) => `Including yourself, up to ${n}`,
    note: "Note (optional)",
    notePlaceholder: "Anything we should know?",
    submit: "Confirm via WhatsApp",
    channelHint: "This opens WhatsApp with your reply already written. Press Send there to deliver it.",
    handoffTitle: "Almost done!",
    handoffBody: "WhatsApp should now be open with your reply ready. Please press Send in WhatsApp so the couple receives it.",
    openAgain: "Open WhatsApp again",
    edit: "Edit my reply",
    deadline: (d: string) => `Please reply before ${d}`,
    message: (p: { couple: string; name: string; attending: boolean; date: string; guests: number; note: string }) =>
      [
        `Hello ${p.couple}! This is ${p.name}.`,
        p.attending
          ? `I would love to attend your wedding on ${p.date}.`
          : `Unfortunately I am unable to attend your wedding on ${p.date}, but you will be in my thoughts.`,
        p.attending ? `Number of guests: ${p.guests}` : "",
        p.note ? `Note: ${p.note}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  },
  wishes: {
    eyebrow: "Guestbook",
    title: "Wishes & Prayers",
    cardTitle: "Leave your wishes",
    formIntro: "Share a few warm words for the couple. They will read every message.",
    openForm: "Write your wishes",
    formNote: "Opens our guestbook form in a new tab.",
    name: "Your name",
    namePlaceholder: "Full name",
    message: "Your wishes",
    messagePlaceholder: "Write a warm message for the couple…",
    submit: "Send via WhatsApp",
    channelHint: "This opens WhatsApp with your message already written. Press Send there to deliver it.",
    handoff: "WhatsApp should now be open with your message ready. Please press Send in WhatsApp to deliver it.",
    openAgain: "Open WhatsApp again",
    remaining: (n: number) => `${n} characters left`,
    sampleTag: "Sample",
    sampleNote: "These are sample messages for preview. Wishes sent through this invitation are delivered to the couple and are not displayed here.",
    featuredNote: "Messages the couple chose to share",
    whatsappMessage: (p: { couple: string; name: string; message: string }) =>
      `Hello ${p.couple}! This is ${p.name}.
My wishes for you:

${p.message}`,
  },
  closing: {
    kicker: "With love & gratitude",
  },
  form: {
    required: "This field is required",
    tooShort: (n: number) => `Please enter at least ${n} characters`,
    tooLong: (n: number) => `Please keep it under ${n} characters`,
    pickOne: "Please choose an option",
    guestsRange: (max: number) => `Please choose between 1 and ${max} guests`,
  },
  nav: {
    home: "Home",
    couple: "Couple",
    events: "Events",
    gallery: "Gallery",
    gift: "Gift",
    rsvp: "RSVP",
    wishes: "Wishes",
    label: "Invitation sections",
  },
};

export type Copy = typeof en;

const id: Copy = {
  cover: {
    kicker: "The Wedding of",
    dear: "Kepada Yth.",
    guestFallback: "Tamu Undangan",
    invited: "Kami mengundang Anda untuk hadir di hari bahagia kami",
    open: "Buka Undangan",
  },
  hero: {
    kicker: "Kami akan menikah",
    scroll: "Gulir",
  },
  couple: {
    eyebrow: "Mempelai",
    title: "Dua Hati, Satu Cerita",
    and: "&",
    brideLabel: "Mempelai Wanita",
    groomLabel: "Mempelai Pria",
  },
  events: {
    eyebrow: "Save the Date",
    title: "Rangkaian Acara",
    countdownLabel: "Menghitung hari bahagia kami",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    started: "Acara kami telah dimulai",
    addToCalendar: "Simpan ke Kalender",
    googleCalendar: "Google Calendar",
    downloadIcs: "Apple / Outlook (.ics)",
    dressCode: "Dress code",
    viewMap: "Lihat Lokasi",
  },
  location: {
    eyebrow: "Lokasi",
    title: "Lokasi Acara",
    openMaps: "Buka di Google Maps",
    mapTitle: "Peta lokasi pernikahan",
  },
  gallery: {
    eyebrow: "Momen Kami",
    title: "Galeri",
    close: "Tutup",
    previous: "Foto sebelumnya",
    next: "Foto berikutnya",
    open: "Buka foto",
    counter: (n, total) => `Foto ${n} dari ${total}`,
  },
  story: {
    eyebrow: "Awal Cerita",
    title: "Kisah Cinta Kami",
  },
  gift: {
    eyebrow: "Hadiah Pernikahan",
    title: "Tanda Kasih",
    accountHolder: "Atas nama",
    copy: "Salin Nomor",
    copied: "Tersalin!",
    copyFailed: "Gagal menyalin",
    copiedAnnounce: (bank) => `Nomor rekening ${bank} berhasil disalin`,
    sendTo: "Kirim hadiah ke",
  },
  rsvp: {
    eyebrow: "Konfirmasi Kehadiran",
    title: "RSVP",
    name: "Nama Anda",
    namePlaceholder: "Nama lengkap",
    attendance: "Apakah Anda akan hadir?",
    attending: "Ya, saya akan hadir",
    declining: "Maaf, belum bisa hadir",
    guests: "Jumlah tamu",
    guestsHint: (n) => `Termasuk Anda, maksimal ${n}`,
    note: "Catatan (opsional)",
    notePlaceholder: "Ada yang perlu kami ketahui?",
    submit: "Konfirmasi via WhatsApp",
    channelHint: "WhatsApp akan terbuka dengan pesan yang sudah tertulis. Tekan Kirim di sana agar terkirim.",
    handoffTitle: "Hampir selesai!",
    handoffBody: "WhatsApp seharusnya sudah terbuka dengan pesan Anda. Mohon tekan Kirim di WhatsApp agar mempelai menerimanya.",
    openAgain: "Buka WhatsApp lagi",
    edit: "Ubah jawaban saya",
    deadline: (d) => `Mohon konfirmasi sebelum ${d}`,
    message: (p) =>
      [
        `Halo ${p.couple}! Saya ${p.name}.`,
        p.attending
          ? `Saya akan hadir di pernikahan Anda pada ${p.date}.`
          : `Mohon maaf, saya belum bisa hadir di pernikahan Anda pada ${p.date}. Doa terbaik untuk Anda berdua.`,
        p.attending ? `Jumlah tamu: ${p.guests}` : "",
        p.note ? `Catatan: ${p.note}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  },
  wishes: {
    eyebrow: "Buku Tamu",
    title: "Ucapan & Doa",
    cardTitle: "Tulis ucapan Anda",
    formIntro: "Sampaikan doa dan ucapan hangat untuk kedua mempelai. Setiap pesan akan mereka baca.",
    openForm: "Tulis Ucapan",
    formNote: "Formulir buku tamu akan terbuka di tab baru.",
    name: "Nama Anda",
    namePlaceholder: "Nama lengkap",
    message: "Ucapan & doa",
    messagePlaceholder: "Tulis ucapan hangat untuk kedua mempelai…",
    submit: "Kirim via WhatsApp",
    channelHint: "WhatsApp akan terbuka dengan pesan yang sudah tertulis. Tekan Kirim di sana agar terkirim.",
    handoff: "WhatsApp seharusnya sudah terbuka dengan pesan Anda. Mohon tekan Kirim di WhatsApp agar terkirim.",
    openAgain: "Buka WhatsApp lagi",
    remaining: (n) => `Sisa ${n} karakter`,
    sampleTag: "Contoh",
    sampleNote: "Ini hanyalah contoh pesan untuk pratinjau. Ucapan yang Anda kirim lewat undangan ini diterima langsung oleh mempelai dan tidak ditampilkan di sini.",
    featuredNote: "Pesan yang dipilih mempelai untuk dibagikan",
    whatsappMessage: (p) =>
      `Halo ${p.couple}! Saya ${p.name}.
Ucapan dan doa untuk Anda:

${p.message}`,
  },
  closing: {
    kicker: "Dengan cinta & rasa syukur",
  },
  form: {
    required: "Wajib diisi",
    tooShort: (n) => `Minimal ${n} karakter`,
    tooLong: (n) => `Maksimal ${n} karakter`,
    pickOne: "Silakan pilih salah satu",
    guestsRange: (max) => `Pilih antara 1 sampai ${max} tamu`,
  },
  nav: {
    home: "Awal",
    couple: "Mempelai",
    events: "Acara",
    gallery: "Galeri",
    gift: "Hadiah",
    rsvp: "RSVP",
    wishes: "Ucapan",
    label: "Bagian undangan",
  },
};

const dictionaries: Record<Locale, Copy> = { en, id };

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}

/** Resolves a LocalizedText for the active locale, falling back to any available variant. */
export function lt(text: LocalizedText | undefined, locale: Locale): string {
  if (text === undefined) return "";
  if (typeof text === "string") return text;
  return text[locale] ?? text.id ?? text.en ?? "";
}
