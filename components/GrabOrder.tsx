import Image from "next/image";
import { BRAND } from "@/lib/data";
import { IconArrow } from "./icons";

/**
 * Penawaran pesan online lewat GrabFood.
 * Dipakai di halaman menu lengkap (setelah daftar menu) dan landing (kaki section menu).
 */
export function GrabOrder({ variant = "notice" }: { variant?: "notice" | "band" }) {
  return (
    <a
      className={`graborder graborder--${variant}`}
      href={BRAND.grabfoodUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="graborder__logo">
        <Image src="/assets/icon-grabfood.png" alt="GrabFood" width={192} height={192} />
      </span>

      <span className="graborder__body">
        <span className="graborder__eyebrow">Pesan online</span>
        <span className="graborder__title">Lapar? Pesan lewat GrabFood</span>
        <span className="graborder__desc">
          Semua menu di atas bisa dipesan antar lewat GrabFood. Atau mampir langsung —
          pesan di kasir.
        </span>
      </span>

      <span className="graborder__cta">
        Buka GrabFood
        <IconArrow size={16} />
      </span>
    </a>
  );
}
