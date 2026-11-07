import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cek Poin Member · Kataloji Coffee & Eatery",
  description:
    "Masukkan nomor WhatsApp untuk melihat saldo poin loyalitas Kataloji, nilai potongan yang bisa dipakai di kasir, dan promo ulang tahun.",
  alternates: { canonical: "/member" },
};

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
