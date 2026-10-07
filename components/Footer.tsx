import Link from "next/link";
import Image from "next/image";
import { BRAND, WA_LINK } from "@/lib/data";
import { IconInstagram, IconWhatsApp, IconTikTok, IconPin, IconClock } from "./icons";

function IconGrab() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* Grab: bentuk "G" sederhana konsisten dgn ikon lain */}
      <path d="M12 2a10 10 0 1 0 0 20c2.7 0 5.1-1.1 6.9-2.8V12h-7v3h3.6a6 6 0 1 1 0-6h3.4A10 10 0 0 0 12 2z" />
    </svg>
  );
}

/** Footer + Kontak — dipakai di landing page dan halaman menu lengkap (satu sumber).
 *  Bagian atas: info kontak fungsional (alamat, jam, WA, tombol reservasi, peta).
 *  Bagian bawah: centered stack — logo, nav, sosial, copyright. */
export function Footer() {
  const nav = [
    { href: "/#tentang", label: "Tentang" },
    { href: "/#menu", label: "Menu" },
    { href: "/#promo", label: "Promo" },
    { href: "/#event", label: "Event" },
    { href: "/#faq", label: "FAQ" },
  ];

  const socials = [
    { href: BRAND.instagram, label: "Instagram", icon: <IconInstagram /> },
    { href: WA_LINK, label: "WhatsApp", icon: <IconWhatsApp size={20} /> },
    { href: "#", label: "TikTok", icon: <IconTikTok /> },
    { href: "#", label: "Grab", icon: <IconGrab /> },
  ];

  return (
    <footer className="footer footer--merged" id="kontak">
      {/* ---- BAGIAN KONTAK ---- */}
      <div className="container footer__contact">
        <div className="footer__contactinfo">
          <h2>Kontak &amp; reservasi</h2>
          <p className="footer__contactlead">
            Mampir langsung, atau hubungi dulu lewat WhatsApp — kami siap bantu
            reservasi ruang dan pemesanan event.
          </p>

          <div className="footer__contactrows">
            <div className="contact__row">
              <span className="contact__ico"><IconPin /></span>
              <div>
                <h4>Alamat</h4>
                <p>{BRAND.address}</p>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__ico"><IconClock /></span>
              <div>
                <h4>Jam Operasional</h4>
                <table className="hours">
                  <tbody>
                    {BRAND.hours.map((h) => (
                      <tr key={h.day}>
                        <td>{h.day}</td>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__ico"><IconWhatsApp /></span>
              <div>
                <h4>WhatsApp</h4>
                <p>+62 812-3456-7890 · Respon cepat di jam operasional</p>
              </div>
            </div>
          </div>

          <a className="btn" href={WA_LINK} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> Reservasi via WhatsApp
          </a>
        </div>

        <div className="footer__map">
          <iframe
            title="Peta lokasi Kataloji Coffee and Eatery"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.87%2C-6.43%2C106.89%2C-6.41&layer=mapnik&marker=-6.42%2C106.88"
          />
        </div>
      </div>

      {/* ---- BAGIAN BAWAH: logo, nav, sosial, copyright ---- */}
      <div className="container footer__base">
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
