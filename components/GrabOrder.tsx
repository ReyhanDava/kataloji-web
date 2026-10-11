import Image from "next/image";
import { BRAND } from "@/lib/data";
import { IconArrow } from "./icons";

/**
 * Tautan pesan antar lewat GrabFood.
 * Dipakai sebagai baris ringkas di section Menu landing, di bawah CTA "Lihat menu lengkap".
 */
export function GrabOrder() {
  return (
    <a
      className="graborder"
      href={BRAND.grabfoodUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan antar lewat GrabFood"
    >
      <span className="graborder__logo">
        <Image src="/assets/icon-grabfood.png" alt="GrabFood" width={192} height={192} />
      </span>
      <span className="graborder__text">
        <span className="graborder__caption">Pesan antar</span>
        <span className="graborder__name">lewat GrabFood</span>
      </span>
      <span className="graborder__arrow"><IconArrow size={16} /></span>
    </a>
  );
}
