import Link from "next/link";
import Image from "next/image";
import { BRAND, WA_LINK } from "@/lib/data";
import { IconInstagram, IconWhatsApp, IconTikTok } from "./icons";

function IconGrab() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* Grab: lingkaran dengan 'G' bergaya — dibuat sederhana dari bentuk dasar */}
      <path d="M12 2a10 10 0 1 0 0 20c2.7 0 5.1-1.1 6.9-2.8V12h-7v3h3.6a6 6 0 1 1 0-6h3.4A10 10 0 0 0 12 2z" />
    </svg>
  );
}

/** Footer — dipakai di landing page dan halaman menu lengkap (satu sumber).
 *  Layout centered stack: logo → nav → sosial → copyright. */
export function Footer() {
  const nav = [
    { href: "/#tentang", label: "Tentang" },
    { href: "/#menu", label: "Menu" },
    { href: "/#promo", label: "Promo" },
    { href: "/#event", label: "Event" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#kontak", label: "Kontak" },
  ];

  const socials = [
    { href: BRAND.instagram, label: "Instagram", icon: <IconInstagram /> },
    { href: WA_LINK, label: "WhatsApp", icon: <IconWhatsApp size={20} /> },
    { href: "#", label: "TikTok", icon: <IconTikTok /> },
    { href: "#", label: "Grab", icon: <IconGrab /> },
  ];

  return (
    <footer className="footer footer--center">
      <div className="container">
        <Link className="brand" href="/#home" aria-label="Kataloji beranda">
          <Image
            src="/assets/logo-white.png"
            alt="Kataloji coffee and eatery"
            width={1600}
            height={723}
            style={{ height: "2.6rem", width: "auto" }}
          />
        </Link>

        <nav className="footernav" aria-label="Navigasi footer">
          {nav.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="footsocials">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
              {s.icon}
            </a>
          ))}
        </div>

        <div className="footer__bottom footer__bottom--center">
          <span>© 2026 {BRAND.fullName}. Semua hak dilindungi.</span>
        </div>
      </div>
    </footer>
  );
}
