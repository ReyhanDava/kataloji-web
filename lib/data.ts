// Konfigurasi data landing page Kataloji
// Semua teks & aset terpusat di sini biar gampang diganti saat data owner final.

export const BRAND = {
  name: "Kataloji",
  fullName: "Kataloji Coffee & Eatery",
  location: "Cipayung · Jakarta Timur",
  tagline: "Ruang hening untuk kopi yang punya cerita",
  whatsapp: "6281384281588",
  instagram: "https://instagram.com/kataloji", // placeholder
  instagramUrl: "https://www.instagram.com/kataloji.co?utm_source=ig_web_button_share_sheet",
  grabfoodUrl: "https://r.grab.com/g/2-1-6-C3BTSF2ZMANFC6",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=-6.3260829604653965,106.9037646194168",
  email: "halo@kataloji.co", // placeholder
  address: "Ruko Puri Cipayung, Jl. Setu Cipayung No.09, Jakarta Timur 13840",
  hours: [
    { day: "Senin – Jumat", time: "08.00 – 22.00" }, // placeholder (Q4 PRD)
    { day: "Sabtu – Minggu", time: "08.00 – 23.00" }, // placeholder (Q4 PRD)
  ],
  openBadge: "Buka · 08.00 – 22.00 WIB",
};

/* ---------- MENU LENGKAP (satu sumber untuk landing + /menu) ---------- */
export type MenuItemData = {
  name: string;
  price: number;          // dalam ribuan rupiah (misal 30 = Rp 30.000)
  label?: string;         // "Terlaris" | "Baru"
  img?: string;           // URL foto; bila kosong, pakai placeholder huruf awal
  desc?: string;          // opsional, ditampilkan bila ada
};

export type MenuSub = { title: string; items: MenuItemData[] };
export type MenuCat = {
  id: string;
  title: string;
  desc: string;
  pick: MenuItemData & { why: string };  // menu pilihan "Pilihan kami"
  subs: MenuSub[];
};

export const MENU_FULL: MenuCat[] = [
  {
    id: "kopi",
    title: "Kopi",
    desc: "Espresso-based, manual brew, dan kreasi signature Kataloji.",
    pick: {
      name: "Spanish Latte OG",
      price: 30,
      label: "Terlaris",
      img: "/assets/menu-coffe.jpeg",
      why: "Espresso dan susu manis yang creamy, favorit pelanggan tetap.",
    },
    subs: [
      {
        title: "Coffee Enthusiasm",
        items: [
          { name: "Espresso", price: 16 },
          { name: "Americano", price: 26 },
          { name: "Café Latte", price: 26 },
          { name: "Cappuccino", price: 28, img: "/assets/menu-items/cappucino.jpg" },
          { name: "Magic", price: 28 },
        ],
      },
      {
        title: "Manual Brew",
        items: [
          { name: "Manual Brew (Lokal)", price: 30 },
          { name: "Manual Brew (Seasonal)", price: 33 },
        ],
      },
      {
        title: "Coffee Mocktail",
        items: [
          { name: "Montblanc", price: 32, img: "/assets/menu-items/montblack.jpg" },
          { name: "Black Lemonade", price: 32, label: "Terlaris", img: "/assets/menu-items/blacklemonade.jpg" },
          { name: "Black Orange", price: 32, img: "/assets/menu-items/blackorange.jpg" },
        ],
      },
      {
        title: "Coffee Fusion",
        items: [
          { name: "Affogato", price: 24 },
          { name: "Crème Brûlée", price: 35 },
          { name: "Butterscotch", price: 35, img: "/assets/menu-items/butterscotch.jpg" },
          { name: "Gula Aren", price: 30 },
          { name: "Spanish Latte OG", price: 30, label: "Terlaris" },
          { name: "Spanish Latte Pistachio", price: 38, label: "Baru" },
        ],
      },
    ],
  },
  {
    id: "nonkopi",
    title: "Non-Kopi & Matcha",
    desc: "Matcha, coklat, teh, slush, dan mocktail segar.",
    pick: {
      name: "Taro Latte",
      price: 30,
      img: "/assets/menu-non-coffee.jpeg",
      why: "Taro lembut dan manis, cocok untuk yang lagi hindari kafein.",
    },
    subs: [
      {
        title: "Matcha Series",
        items: [
          { name: "Matcha Original", price: 30 },
          { name: "Matcha Crème Brûlée", price: 40, label: "Baru" },
          { name: "Dirty Matcha", price: 40 },
          { name: "Strawberry Matcha", price: 40 },
          { name: "Matcha Pistachio", price: 40 },
          { name: "Matcha Cheese", price: 32 },
        ],
      },
      {
        title: "Coklat",
        items: [
          { name: "Chocolate", price: 30 },
          { name: "Chocolate Mint", price: 30 },
          { name: "Chocolate Pistachio", price: 32 },
        ],
      },
      {
        title: "Taro",
        items: [
          { name: "Taro Latte", price: 30 },
          { name: "Taro Cheese", price: 32 },
        ],
      },
      {
        title: "Yakult",
        items: [
          { name: "Easy Peachy", price: 30 },
          { name: "Le Lact", price: 30 },
          { name: "Sakura Bloom", price: 30, img: "/assets/menu-items/sakura-blue.jpg" },
        ],
      },
      {
        title: "Tea",
        items: [
          { name: "Strawberry Tea", price: 20 },
          { name: "Mango Tea", price: 20 },
          { name: "Peach Tea", price: 22 },
          { name: "Lemon Tea", price: 22 },
          { name: "Jasmine Tea", price: 22 },
          { name: "Lychee Tea", price: 22 },
        ],
      },
      {
        title: "Artisan Tea",
        items: [
          { name: "Summer", price: 32 },
          { name: "Cosmopolitan", price: 32 },
        ],
      },
      {
        title: "Mocktail",
        items: [
          { name: "Summer Flamingo", price: 28 },
          { name: "Beach Cheese", price: 30 },
          { name: "Velvet Hibiscus", price: 30 },
        ],
      },
      {
        title: "Slush",
        items: [
          { name: "Soursop Mango", price: 25 },
          { name: "Grapes Apple Berry", price: 25, img: "/assets/menu-items/grapes-apple-brrry.jpg" },
          { name: "Lychee Berry", price: 25 },
          { name: "Orange Peach", price: 25, img: "/assets/menu-items/orange-peach.jpg" },
        ],
      },
    ],
  },
  {
    id: "pastry",
    title: "Pastry & Sweet",
    desc: "Dipanggang tiap pagi — camilan manis teman kopi.",
    pick: {
      name: "Butter Croissant",
      price: 28,
      label: "Terlaris",
      img: "/assets/menu-sweetpastries.jpeg",
      why: "Berlapis dan renyah, paling enak selagi hangat.",
    },
    subs: [
      {
        title: "Sweet Pastries",
        items: [
          { name: "Butter Croissant", price: 28, label: "Terlaris", img: "/assets/menu-items/butter-croissant.jpg" },
          { name: "Pain au Choco", price: 35 },
          { name: "Crombolini Choco Sprinkles", price: 30, img: "/assets/menu-items/cromboloni-choco-sprinkles.jpg" },
          { name: "Pain Suisse", price: 32, img: "/assets/menu-items/pain-suisse.jpg" },
          { name: "Cookies Red Velvet", price: 20, img: "/assets/menu-items/cookies-red-velvet.jpg" },
          { name: "Cookies Original", price: 18, img: "/assets/menu-items/cookies-original.jpg" },
          { name: "Cheesecake", price: 30 },
          { name: "Ice Cream Scoop", price: 20, img: "/assets/menu-items/ice-cream-scoop.jpg" },
        ],
      },
    ],
  },
  {
    id: "main",
    title: "Main Course",
    desc: "Hidangan utama, pasta, dan nasi — porsi jujur.",
    pick: {
      name: "Nasi Goreng Kataloji",
      price: 45,
      label: "Terlaris",
      img: "/assets/menu-nusantara.jpeg",
      why: "Nasi goreng khas Kataloji — paling sering dipesan.",
    },
    subs: [
      {
        title: "Pasta",
        items: [
          { name: "Spaghetti Bolognese", price: 38, img: "/assets/menu-items/spaghetti-bolognese.jpg" },
          { name: "Spaghetti Carbonara", price: 38, label: "Terlaris", img: "/assets/menu-items/spaghetti-carbonarra.jpg" },
          { name: "Spaghetti Aglio e Olio", price: 40, img: "/assets/menu-items/spaghetti-aglio.jpg" },
        ],
      },
      {
        title: "Nasi",
        items: [
          { name: "Nasi Goreng Kataloji", price: 45, img: "/assets/menu-items/nasi-goreng.jpg" },
          { name: "Rice Bowl Ayam", price: 40 },
        ],
      },
    ],
  },
  {
    id: "starter",
    title: "Starter",
    desc: "Pembuka ringan sebelum hidangan utama.",
    pick: {
      name: "Dimsum Mozzarella",
      price: 35,
      img: "/assets/menu-startermenu.jpeg",
      why: "Lembut di dalam, gurih di luar — favorit meja santai.",
    },
    subs: [
      {
        title: "Starter",
        items: [
          { name: "Spicy Corn Ribs", price: 25 },
          { name: "Tahu Cabe Garam", price: 25 },
          { name: "Tahu Walik", price: 25, img: "/assets/menu-items/tahu-walik.jpg" },
          { name: "French Fries", price: 25, img: "/assets/menu-items/french-fries.jpg" },
          { name: "Pisang Goreng", price: 30, img: "/assets/menu-items/pisang-goreng.jpg" },
          { name: "Singkong Goreng", price: 30, img: "/assets/menu-items/singkong-goreng.jpg" },
          { name: "Spicy Wings", price: 30, img: "/assets/menu-items/spicy-wings.jpg" },
          { name: "Dimsum Mozzarella", price: 35 },
        ],
      },
    ],
  },
] as const;

export const MENU_COUNT = MENU_FULL.reduce(
  (t, c) => t + c.subs.reduce((s, x) => s + x.items.length, 0),
  0
);

/** Format harga tampilan dia "30K" (terima angka ribuan) */
export const fprice = (n: number) => `${n}K`;

export const MENU_TABS = [
  { id: "all", label: "Semua" },
  { id: "kopi", label: "Kopi" },
  { id: "nonkopi", label: "Non-Kopi & Matcha" },
  { id: "pastry", label: "Pastry & Sweet" },
  { id: "main", label: "Main Course" },
  { id: "starter", label: "Starter" },
] as const;

/** Slug kecil untuk id link */
export const menuSlug = (name: string) =>
  name.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------- Section Promo (bento) ---------- */
export const PROMO_END = "2026-10-04T23:59:59+07:00"; // akhir semua promo

/* Daftar promo untuk section detail — banner (kiri) + panel detail (kanan) */
export const PROMO_DETAIL = [
  {
    img: "/assets/Promo1.jpeg",
    imgDesktop: "/assets/promo-desktop-1.jpg",
    imgMobile: "/assets/promo-mobile-1.jpg",
    alt: "Banner promo Kataloji Signature Table — 139K",
    name: "Kataloji Signature Table",
    price: "Rp 139.000",
    priceNote: "2 food + 2 signature beverage + free French fries",
    desc: "Paket sharing berisi 2 hidangan pilihan (Nasi Goreng atau Kwetiau Goreng) plus 2 signature beverage (Sakura Bloom / MontBlanc) dan gratis French Fries. Cocok untuk 2–4 orang.",
    syarat: [
      "Berlaku untuk semua varian Nasi Goreng & Kwetiau Goreng.",
      "Signature beverage: Sakura Bloom atau MontBlanc.",
      "Berlaku dine-in & takeaway, tidak untuk pesan-antar online.",
    ],
    ketentuan: [
      "Tidak dapat digabung dengan promo lain.",
      "Berlaku setiap hari selama jam operasional.",
      "Berlaku sampai 4 Oktober 2026.",
    ],
  },
  {
    img: "/assets/Promo3.jpeg",
    imgDesktop: "/assets/promo-desktop-3.jpg",
    imgMobile: "/assets/promo-mobile-3.jpg",
    alt: "Banner promo After Work Treat — min. belanja 100K gratis pisang goreng",
    name: "After Work Treat",
    price: "Gratis Pisang Goreng",
    priceNote: "min. belanja Rp 100.000",
    desc: "Pulang kerja mampir dulu. Minimal belanja Rp 100.000 dan dapatkan pisang goreng gratis — pas buat teman ngobrol sore.",
    syarat: [
      "Minimal belanja Rp 100.000 sebelum pajak.",
      "Berlaku Senin–Jumat, pukul 16.00–19.00 WIB.",
      "1 pisang goreng per transaksi.",
    ],
    ketentuan: [
      "Berlaku untuk dine-in maupun takeaway.",
      "Tidak berlaku bersamaan dengan promo bundel lain.",
      "Berlaku sampai 4 Oktober 2026.",
    ],
  },
  {
    img: "/assets/Promo2.jpeg",
    imgDesktop: "/assets/promo-desktop-2.jpg",
    imgMobile: "/assets/promo-mobile-2.jpg",
    alt: "Banner promo Combo Deal — 55K Spaghetti Aglio e Olio + Grapes Apple Berry",
    name: "Combo Deal",
    price: "Rp 55.000",
    priceNote: "Spaghetti Aglio e Olio + Grapes Apple Berry",
    desc: "Kombinasi pasta dan minuman segar: Spaghetti Aglio e Olio berpadu Grapes Apple Berry. Good food, great mood — tersedia sepanjang hari.",
    syarat: [
      "Berlaku untuk semua varian ukuran reguler.",
      "Harga paket sudah termasuk pajak.",
      "Tersedia untuk dine-in atau takeaway.",
    ],
    ketentuan: [
      "Berlaku setiap hari selama jam operasional.",
      "Tidak dapat digabung dengan promo lain.",
      "Berlaku sampai 4 Oktober 2026.",
    ],
  },
] as const;

/* Slide galeri interior untuk carousel di Tentang Kami — urutan sesuai penomoran file */
export const TENTANG_SLIDES = [
  {
    img: "/assets/about-tentang.jpeg",
    alt: "Suasana ruang Kataloji — meja kayu, pencahayaan hangat, sudut baca",
    caption: "Sudut roastery — tempat semuanya dimulai.",
  },
  {
    img: "/assets/about-tentang-2.jpg",
    alt: "Interior Kataloji — dekorasi hangat dan pencahayaan lembut",
    caption: "Detail kecil yang bikin betah.",
  },
  {
    img: "/assets/about-tentang-3.jpg",
    alt: "Sudut ruang Kataloji dari sisi lain",
    caption: "Meja panjang untuk cerita yang panjang.",
  },
  {
    img: "/assets/about-tentang-4.jpg",
    alt: "Sudut favorit di Kataloji",
    caption: "Pojok yang selalu jadi tempat pulang.",
  },
  {
    img: "/assets/about-tentang-5.jpg",
    alt: "Suasana siang di ruang Kataloji",
    caption: "Cahaya siang masuk lewat jendela.",
  },
  {
    img: "/assets/about-tentang-6.jpg",
    alt: "Meja dan kursi Kataloji dari sudut berbeda",
    caption: "Ada cerita di setiap meja.",
  },
] as const;

export const EVENT_ITEMS = [
  {
    id: "best-seller",
    title: "Kataloji Best Sellers",
    img: "/assets/ev-bestseller.jpg",
    alt: "Poster Kataloji Best Sellers — 6 menu favorit pelanggan",
    ig: "https://www.instagram.com/p/Ddp67V6yNMw/",
  },
  {
    id: "gift-reward",
    title: "Loyalty Card Reward",
    img: "/assets/ev-giftreward.jpg",
    alt: "Poster Loyalty Card Kataloji — kumpulkan stempel, dapat hadiah",
    ig: "https://www.instagram.com/p/Ddf1sMHSuC-/",
  },
  {
    id: "music-fest",
    title: "Kataloji Music Fest",
    img: "/assets/ev-musicfest.jpg",
    alt: "Poster Kataloji Music Fest — live musik di Kataloji",
    ig: "https://www.instagram.com/p/Da64UFWPupA/",
  },
] as const;

export const USP = [
  {
    title: "Biji Single-Origin",
    desc: "Kopi pilihan dari Gayo, Kintamani, dan Toraja yang diroasting sendiri di ruang kami.",
    icon: "coffee",
  },
  {
    title: "Harga Jujur & Transparan",
    desc: "Setiap menu diberi harga yang jelas di katalog — tanpa kejutan di kasir.",
    icon: "price",
  },
  {
    title: "Member Berapresiasi",
    desc: "Voucher ulang tahun & promo pelanggan setia dikirim langsung via WhatsApp.",
    icon: "check",
  },
] as const;

export const ABOUT_STATS = [
  { n: "2022", l: "Sejak berdiri" },
  { n: "24+", l: "Varian kopi & menu" },
  { n: "1.200+", l: "Member terdaftar" },
] as const;

export const WA_LINK = `https://wa.me/${BRAND.whatsapp}`;

export const POPUP_PROMO = {
  enabled: true,
  title: "Promo berjalan",
  ctaLabel: "Lihat detail promo",
  ctaHref: "/#promo",
  dismissLabel: "Nanti dulu",
} as const;

export const POPUP_ITEMS = [
  {
    img: "/assets/Promo1.jpeg",
    alt: "Promo Kataloji Signature Table — 139K untuk 2 makanan + 2 signature beverage + free french fries",
    caption: "Kataloji Signature Table — 139K",
  },
  {
    img: "/assets/Promo2.jpeg",
    alt: "Promo Combo Deal — 55K Spaghetti Aglio e Olio + Grapes Apple Berry",
    caption: "Combo Deal — 55K",
  },
  {
    img: "/assets/Promo3.jpeg",
    alt: "Promo After Work Treat — min. spend 100K, gratis pisang goreng, Senin–Jumat 16.00–19.00",
    caption: "After Work Treat — min. 100K",
  },
] as const;

export const FAQ = [
  {
    q: "Apakah Kataloji punya Wi-Fi dan colokan?",
    a: "Ya, Wi-Fi gratis dan colokan di hampir semua meja. Kami juga punya area kerja yang cukup hening di lantai atas.",
  },
  {
    q: "Bisa reservasi untuk working space atau small event?",
    a: `Bisa. Reservasi via WhatsApp ${BRAND.whatsapp} minimal 1 hari sebelumnya. Max. booking 4 jam untuk area indoor.`,
  },
  {
    q: "Ada menu non-kopi atau suitable untuk yang tidak minum kopi?",
    a: "Ada — Matcha Series, Chocolate, aneka teh, dan mocktail. Semua bisa dilihat di katalog menu kami.",
  },
  {
    q: "Bagaimana cara jadi member dan benefitnya?",
    a: "Isi formulir singkat di bagian Member. Voucher ulang tahun & promo eksklusif dikirim langsung via WhatsApp. Gratis, tanpa biaya tahunan.",
  },
  {
    q: "Apakah roasting bisa custom untuk corporate gift?",
    a: "Bisa. Kami menyediakan repacking bean 250 gr atau 1 kg dengan label custom. Minimal order 10 pack, PO 5 hari kerja.",
  },
] as const;
