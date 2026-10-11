import Link from "next/link";
import Image from "next/image";
import { BRAND, WA_LINK } from "@/lib/data";
import { IconInstagram, IconWhatsApp, IconTikTok, IconPin } from "./icons";

/** Footer ringkas —
 *  Desktop: Brand | Kontak | Jam Buka | Ikuti Kami (sejajar satu baris).
 *  Mobile : tetap Jam Buka → Kontak → Brand → Ikuti Kami. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* 1. Brand */}
          <div className="footer__col footer__col--brand">
            <Link className="brand" href="/#home" aria-label="Kataloji beranda">
              <Image src="/assets/logo-white.png" alt="Kataloji coffee and eatery" width={1600} height={723} style={{ height: "2.4rem", width: "auto" }} />
            </Link>
            <p>
              Coffee &amp; eatery dengan roastery in-house. Kopi jujur, ruang hening, dan
              cerita yang hangat.
            </p>
          </div>

          {/* 2. Jam Buka */}
          <div className="footer__col footer__col--hours">
            <h4>Jam Buka</h4>
            <ul className="footer__hours">
              <li><span>Senin – Jumat</span><span>08.00 – 22.00</span></li>
              <li><span>Sabtu – Minggu</span><span>08.00 – 22.00</span></li>
            </ul>
          </div>

          {/* 3. Kontak */}
          <div className="footer__col footer__col--contact">
            <h4>Kontak</h4>
            <p className="footer__addr">
              <IconPin size={18} />
              <span>{BRAND.address}</span>
            </p>
            <a className="footer__wa" href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={18} /> WhatsApp 0813 8428 1588
            </a>
          </div>

          {/* 4. Ikuti Kami */}
          <div className="footer__col footer__col--social">
            <h4>Ikuti Kami</h4>
            <div className="socials">
              <a href={BRAND.instagramUrl} aria-label="Instagram Kataloji" target="_blank" rel="noopener noreferrer"><IconInstagram /></a>
              <a href={WA_LINK} aria-label="WhatsApp Kataloji" target="_blank" rel="noopener noreferrer"><IconWhatsApp /></a>
              <a href="https://www.tiktok.com/@kataloji.co" aria-label="TikTok Kataloji" target="_blank" rel="noopener noreferrer"><IconTikTok /></a>
              <a className="socials__grab" href={BRAND.grabfoodUrl} aria-label="Pesan lewat GrabFood" target="_blank" rel="noopener noreferrer">
                <Image src="/assets/icon-grabfood.png" alt="" width={192} height={192} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 {BRAND.fullName}. Semua hak dilindungi.</span>
        </div>
      </div>
    </footer>
  );
}
