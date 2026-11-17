import type { InvitationData } from "@/types/invitation";

/**
 * Demo invitation for the Royal Romance template.
 *
 * To create a real invitation: copy this file, change the values, point the
 * images at real photos in /public, then register it in ../registry.ts.
 * All names, numbers and addresses below are fictional sample content.
 *
 * Text fields accept either one string (shown in every language) or
 * `{ id: "...", en: "..." }` variants. `locale` is the language guests see
 * first; they can switch via the ID/EN toggle.
 *
 * Demo photos live in /public/images/amelia-rafael (sources: Pexels, free
 * license — see CREDITS.txt in that folder). Replace them with the couple's
 * own photos and update width/height to the real pixel sizes.
 */
const img = (name: string, w: number, h: number, alt: string, focal?: string) => ({
  src: `/images/amelia-rafael/${name}.webp`,
  width: w,
  height: h,
  alt,
  focal,
});

export const amelia_rafael: InvitationData = {
  slug: "amelia-rafael",
  templateId: "royal-romance",
  locale: "id",
  meta: {
    title: "Amelia & Rafael — Undangan Pernikahan",
    description:
      "Dengan penuh sukacita, Amelia & Rafael mengundang Anda untuk hadir dan memberikan doa restu pada hari pernikahan mereka, Sabtu, 20 Maret 2027.",
    ogImage: "/images/amelia-rafael/og.jpg",
  },
  couple: {
    monogram: "A&R",
    bride: {
      role: "bride",
      nickname: "Amelia",
      fullName: "Amelia Putri Wijaya",
      childOf: { id: "Putri pertama dari", en: "The eldest daughter of" },
      fatherName: "Bpk. Hendra Wijaya",
      motherName: "Ibu Sari Dewi Wijaya",
      photo: img("bride", 1200, 1324, "Amelia dalam kebaya pengantin putih berjalan menuju pelaminan", "50% 38%"),
      instagram: "amelia.wijaya",
    },
    groom: {
      role: "groom",
      nickname: "Rafael",
      fullName: "Rafael Adhitama Pratama",
      childOf: { id: "Putra kedua dari", en: "The second son of" },
      fatherName: "Bpk. Bambang Pratama",
      motherName: "Ibu Lestari Pratama",
      photo: img("groom", 880, 1350, "Rafael dalam jas pengantin putih memegang buku nikah", "45% 30%"),
      instagram: "rafael.pratama",
    },
  },
  weddingDate: "2027-03-20T08:00:00+07:00",
  images: {
    cover: img("cover", 1000, 1136, "Buku nikah di atas kain beludru burgundy"),
    hero: img("hero", 1400, 2100, "Rafael mencium kening Amelia di depan pelaminan", "50% 38%"),
    closing: img("closing", 1920, 1280, "Amelia memandang pelaminan berhias tirai burgundy dan bunga", "50% 42%"),
  },
  intro: {
    quote: {
      id: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
      en: "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy.",
    },
    quoteSource: { id: "Q.S. Ar-Rum: 21", en: "Ar-Rum 30:21" },
    message: {
      id: "Dengan memohon rahmat dan ridha Tuhan Yang Maha Esa serta restu keluarga, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan dan turut berbahagia di awal perjalanan hidup baru kami.",
      en: "With the blessing of God and the love of our families, we joyfully invite you to witness and celebrate the beginning of our new life together.",
    },
  },
  events: [
    {
      id: "akad",
      kind: "akad",
      title: "Akad Nikah",
      startsAt: "2027-03-20T08:00:00+07:00",
      endsAt: "2027-03-20T10:00:00+07:00",
      timeZone: "Asia/Jakarta",
      timezoneLabel: "WIB",
      venue: {
        name: "The Garden Terrace",
        placeName: "Hotel Indonesia Kempinski Jakarta",
        address: "Hotel Indonesia Kempinski, Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat 10310",
        city: "Jakarta",
        mapsUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Indonesia+Kempinski+Jakarta",
        mapsQuery: "Hotel Indonesia Kempinski Jakarta",
      },
      note: {
        id: "Dihadiri keluarga inti dan kerabat dekat.",
        en: "Immediate family and close relatives.",
      },
      dressCode: { id: "Ivory lembut & champagne", en: "Soft ivory & champagne" },
    },
    {
      id: "reception",
      kind: "reception",
      title: { id: "Resepsi Pernikahan", en: "Wedding Reception" },
      startsAt: "2027-03-20T18:00:00+07:00",
      endsAt: "2027-03-20T21:30:00+07:00",
      timeZone: "Asia/Jakarta",
      timezoneLabel: "WIB",
      venue: {
        name: "Grand Ballroom",
        placeName: "Hotel Indonesia Kempinski Jakarta",
        address: "Hotel Indonesia Kempinski, Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat 10310",
        city: "Jakarta",
        mapsUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Indonesia+Kempinski+Jakarta",
        mapsQuery: "Hotel Indonesia Kempinski Jakarta",
      },
      note: {
        id: "Dilanjutkan dengan jamuan makan malam.",
        en: "Dinner and celebration to follow.",
      },
      dressCode: { id: "Formal · Burgundy & emas", en: "Black tie · Burgundy & gold" },
    },
  ],
  gallery: [
    img("gallery-1", 1600, 1067, "Amelia dan Rafael memegang buku nikah di pelaminan"),
    img("gallery-2", 1200, 1800, "Senyum bahagia saat penandatanganan buku nikah"),
    img("gallery-3", 1200, 1200, "Pemasangan cincin pada ijab kabul"),
    img("gallery-4", 1600, 1067, "Amelia menghampiri Rafael di pelaminan", "50% 40%"),
    img("gallery-5", 1600, 1067, "Dekorasi taman dengan untaian lampu di kala senja"),
    img("gallery-6", 1600, 1068, "Doa bersama seusai akad nikah"),
    img("gallery-7", 1200, 1200, "Sepasang buku nikah merah dan hijau"),
    img("gallery-8", 1170, 1467, "Rangkaian bunga di area resepsi"),
    img("gallery-9", 1600, 1067, "Momen akad nikah disaksikan keluarga"),
  ],
  story: [
    {
      date: { id: "Juni 2018", en: "June 2018" },
      title: { id: "Salam Pertama", en: "The First Hello" },
      body: {
        id: "Sebuah acara ulang tahun sahabat, kesukaan yang sama pada musik jazz lawas, dan percakapan yang tanpa terasa berlangsung hingga restoran tutup.",
        en: "A mutual friend's birthday dinner, a shared love of old jazz records, and a conversation that somehow lasted until the restaurant closed.",
      },
      image: img("story-1", 1000, 1000, "Momen hangat di awal perjalanan Amelia dan Rafael"),
    },
    {
      date: { id: "Desember 2020", en: "December 2020" },
      title: { id: "Perjalanan Pertama", en: "Our First Journey" },
      body: {
        id: "Jalanan basah oleh hujan, kereta yang tertinggal, dan tawa yang tak ada habisnya. Perjalanan itu mengajarkan kami bahwa rumah bukan sebuah tempat, melainkan satu sama lain.",
        en: "Rain-soaked streets, missed trains and a hundred laughs. It was the trip that taught us home isn't a place, it's each other.",
      },
      image: img("story-2", 1000, 1000, "Amelia dan Rafael berjalan berdua di jalan setapak yang rindang"),
    },
    {
      date: { id: "September 2025", en: "September 2025" },
      title: { id: "Lamaran", en: "The Proposal" },
      body: {
        id: "Di bawah untaian lampu senja, dengan cincin yang disembunyikan di dalam buku puisi kesayangan kami, Rafael mengajukan pertanyaan itu. Amelia menjawab ya bahkan sebelum kalimatnya selesai.",
        en: "Under a canopy of fairy lights, with a ring hidden inside a book of our favourite poems, Rafael asked the question. Amelia said yes before he finished.",
      },
      image: img("story-3", 1000, 1000, "Taman dengan untaian lampu tempat Rafael melamar Amelia"),
    },
    {
      date: { id: "Maret 2027", en: "March 2027" },
      title: { id: "Selamanya Dimulai", en: "Forever Begins" },
      body: {
        id: "Dikelilingi orang-orang terkasih, kami melangkah ke babak berikutnya — dan menjadi kehormatan bagi kami bila Anda berkenan mendampingi.",
        en: "Surrounded by the people we love most, we step into the next chapter, and we would be honoured to have you beside us.",
      },
      image: img("story-4", 1000, 1000, "Amelia dan Rafael merayakan hari bahagia di pelaminan"),
    },
  ],
  gift: {
    message: {
      id: "Kehadiran Anda adalah hadiah terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih, kami menyediakan rekening berikut.",
      en: "Your presence is the greatest gift. Should you wish to bless us further, you may send a gift through the accounts below.",
    },
    accounts: [
      { bank: "BCA", accountNumber: "1234567890", accountHolder: "Amelia Putri Wijaya" },
      { bank: "Bank Mandiri", accountNumber: "1230009876543", accountHolder: "Rafael Adhitama Pratama" },
    ],
    address: {
      recipient: "Amelia & Rafael",
      address: "Jl. Kemang Raya No. 18, Jakarta Selatan 12730",
    },
  },
  rsvp: {
    // Replies are sent to this WhatsApp number (international format). SAMPLE number: replace it.
    whatsappNumber: "6281234567890",
    maxGuests: 4,
    deadline: "2027-03-01",
    message: {
      id: "Konfirmasi Anda sangat membantu kami menyiapkan tempat dan jamuan terbaik untuk Anda.",
      en: "Your confirmation helps us prepare a seat and a place setting for you.",
    },
  },
  wishes: {
    // Optional: an https link to your own Google Form (or similar). When set, the guestbook
    // card opens it. When omitted, guests send their wishes by WhatsApp (to the RSVP number
    // unless `whatsappNumber` is set here).
    // formUrl: "https://forms.gle/your-form-id",
    //
    // Messages you want shown on the invitation. There is no database: copy the wishes you
    // receive here and redeploy. These four are fictional samples (flagged `sample: true`);
    // remove the flag, or the whole entry, when you replace them with real messages.
    featured: [
      {
        name: "Tante Maya & Om Dimas",
        message:
          "Semoga rumah kalian selalu dipenuhi tawa, kesabaran, dan teh hangat yang tak pernah habis. Kami turut berbahagia untuk kalian berdua.",
        date: "2027-01-12",
        sample: true,
      },
      {
        name: "Nadia Kusuma",
        message:
          "Amelia, wajahmu selalu berbinar setiap bercerita tentang Rafael. Semoga seumur hidupmu dipenuhi hal yang sama. Sampai jumpa di lantai dansa!",
        date: "2027-01-15",
        sample: true,
      },
      {
        name: "Reza & Tika",
        message:
          "Selamat, kalian berdua! Untuk petualangan baru, pagi-pagi yang tenang, dan menua bersama.",
        date: "2027-01-20",
        sample: true,
      },
      {
        name: "Pak Hendro",
        message:
          "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallah untuk kalian berdua.",
        date: "2027-02-02",
        sample: true,
      },
    ],
  },
  closing: {
    message: {
      id: "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir. Doa restu Anda adalah bagian paling berharga dari kisah kami.",
      en: "It is our honour to share this day with you. Your presence, your prayers and your warm wishes will be a treasured part of our story.",
    },
    signature: { id: "Dengan cinta & rasa syukur", en: "With love & gratitude" },
  },
};
