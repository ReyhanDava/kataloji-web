import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Poin Member",
  description:
    "Masukkan nomor WhatsApp untuk melihat saldo poin loyalitas Kataloji, nilai potongan yang bisa dipakai di kasir, dan promo ulang tahun.",
  alternates: { canonical: "/member" },
};

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return children;
}
