import type { Metadata } from "next";
import { MenuPageClient } from "@/components/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu & Harga",
  description:
    "Daftar menu lengkap Kataloji Coffee & Eatery Cipayung: kopi, non-kopi & matcha, pastry, main course, dan starter beserta harganya. Pesan langsung di kasir atau lewat GrabFood.",
  alternates: { canonical: "/menu" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/menu",
    siteName: "Kataloji Coffee & Eatery",
    title: "Menu & Harga — Kataloji Coffee & Eatery",
    description:
      "Kopi, non-kopi & matcha, pastry, main course, dan starter. Lengkap dengan harga.",
    images: [
      {
        url: "/assets/og-kataloji.jpg",
        width: 1200,
        height: 630,
        alt: "Menu Kataloji Coffee & Eatery",
      },
    ],
  },
};

export default function MenuPage() {
  return <MenuPageClient />;
}
