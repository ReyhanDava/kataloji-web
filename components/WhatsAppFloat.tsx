"use client";

import { useEffect, useState } from "react";
import { WA_LINK } from "@/lib/data";
import { IconWhatsApp } from "./icons";

/**
 * Tombol WhatsApp mengambang — CTA reservasi yang selalu terjangkau tanpa
 * harus scroll ke section Kontak. Muncul setelah user mulai scroll (bukan
 * langsung menutupi hero), dan disembunyikan saat popup promo terbuka.
 */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      className="wafloat"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservasi lewat WhatsApp"
    >
      <IconWhatsApp size={20} />
      <span className="wafloat__txt">Reservasi</span>
    </a>
  );
}
