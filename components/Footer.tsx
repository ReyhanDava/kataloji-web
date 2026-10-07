import Link from "next/link";
import Image from "next/image";
import { BRAND, WA_LINK } from "@/lib/data";
import { IconInstagram, IconWhatsApp, IconTikTok } from "./icons";

/** Footer — dipakai di landing page dan halaman menu lengkap (satu sumber). */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__col">
            <Link className="brand" href="/#home" aria-label="Kataloji beranda">
              <Image src="/assets/logo-white.png" alt="Kataloji coffee and eatery" width={1600} height={723} style={{ height: "2.2rem", width: "auto" }} />
            </Link>
            <p style={{ marginTop: "1rem", maxWidth: "36ch", fontSize: "var(--fs-sm)", color: "var(--sage-300)" }}>
              Coffee &amp; eatery di Cipayung dengan roastery in-house. Kopi jujur, ruang
              hening, dan cerita yang hangat.
            </p>
            <div className="socials" style={{ marginTop: "1.25rem" }}>
              <a href={BRAND.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><IconInstagram /></a>
              <a href={WA_LINK} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><IconWhatsApp size={18} /></a>
              <a href="#" aria-label="TikTok"><IconTikTok /></a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 {BRAND.fullName}. Semua hak dilindungi.</span>
          <span>Dibuat dengan kopi di Cipayung, Jakarta Timur.</span>
        </div>
      </div>
    </footer>
  );
}
