import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kataloji Coffee & Eatery — Kopi, Senyap, & Cerita",
  description:
    "Kataloji Coffee and Eatery, Cipayung, Jakarta Timur. Coffee & eatery dengan roastery in-house.",
};

import { Navbar } from "@/components/Navbar";
import { MenuSection } from "@/components/MenuSection";
import { MemberForm } from "@/components/MemberForm";
import { Reveal } from "@/components/Reveal";
import { FAQSection } from "@/components/FAQ";
import { PromoPopup } from "@/components/PromoPopup";
import { PromoSection } from "@/components/PromoSection";
import { TentangCarousel } from "@/components/TentangCarousel";
import {
  IconArrow, IconCheckSmall, IconInstagram, IconPin, IconClock,
  IconWhatsApp, IconTikTok,
} from "@/components/icons";
import {
  BRAND, EVENT_ITEMS, WA_LINK,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Lewati ke konten</a>
      <Navbar />
      <main id="main">

        {/* ============ HERO ============ */}
        <section className="hero" id="home">
          <div className="container hero__grid">
            <Reveal className="hero__copy">
              <span className="eyebrow">{BRAND.location}</span>
              <h1>
                Ruang hening untuk <em>kopi yang punya cerita</em>
              </h1>
              <p className="hero__sub">
                Di Kataloji, kami meracik biji single-origin pilihan dengan roastery
                in-house. Sederhana, jujur, dan perlahan — seperti secangkir kopi yang
                seharusnya.
              </p>
              <div className="hero__cta">
                <Link className="btn" href="/#menu">
                  Lihat Menu <IconArrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TENTANG (manifesto, gabung USP) ============ */}
        <section className="section" id="tentang">
          <div className="container about2">
            <Reveal className="about2__copy">
              <span className="eyebrow">Tentang Kami</span>
              <h2 className="about2__title">
                Kopi yang baik tidak perlu <em>bersuara keras.</em>
              </h2>

              <div className="about2__story">
                <p>
                  Berawal dari satu mesin roasting bekas di garasi kecil Cipayung, 2022.
                  Kami tidak sedang membangun kerajaan — cuma satu ruang hening tempat
                  kopi yang jujur bisa bicara sendiri.
                </p>
                <p>
                  Nama kami — dari <em>katalog</em> dan <em>logi</em> — berarti tempat
                  mencatat hal-hal baik. Yang kami catat bukan angka, tapi ritus kecil:
                  bunyi steam pertama di pagi hari, obrolan di meja dekat jendela,
                  pelanggan yang kembali ke kursi yang sama.
                </p>
              </div>

              <div className="about2__pillars">
                <p className="about2__pillarsTitle">Yang kami jaga tiap hari:</p>
                <ul>
                  <li>
                    <strong>Biji single-origin</strong> dari Gayo, Kintamani, dan Toraja —
                    kami roast sendiri, tanpa shortcut.
                  </li>
                  <li>
                    <strong>Harga yang ditulis jelas</strong> di katalog, tanpa kejutan
                    di kasir.
                  </li>
                  <li>
                    <strong>Member yang dirayakan</strong> — bukan sekadar dihitung
                    sebagai poin.
                  </li>
                </ul>
              </div>

              <p className="about2__foot">
                Dari 2022 sampai sekarang — 24+ varian kopi & menu, dan ribuan cangkir
                yang menemani cerita-cerita kecil pelanggan.
              </p>
            </Reveal>

            <Reveal className="about2__media">
              <TentangCarousel />
              <div className="about2__quote">
                <span className="about2__quoteMark">&ldquo;</span>
                Sederhana, jujur, dan perlahan — seperti secangkir kopi yang seharusnya.
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MENU ============ */}
        <MenuSection />

        {/* ============ PROMO ============ */}
        <PromoSection />

        {/* ============ EVENT & KOLABORASI ============ */}
        <section className="section section--alt" id="event">
          <div className="container">
            <div className="section-head reveal is-in">
              <span className="eyebrow">Event & Kolaborasi</span>
              <h2>Kolaborasi, musik, dan cerita Kataloji</h2>
              <p>
                Dari cupping session bareng roastery lain sampai Acoustic Night tiap
                weekend — klik kartunya buat lihat cerita lengkapnya di Instagram kami.
              </p>
            </div>

            <Reveal className="eventfeed">
              {EVENT_ITEMS.map((e) => (
                <a
                  key={e.id}
                  className="eventfeed__item"
                  href={e.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${e.title} — buka postingan Instagram Kataloji`}
                >
                  <Image
                    src={e.img}
                    alt={e.alt}
                    width={900}
                    height={900}
                    loading="lazy"
                  />
                  <span className="eventfeed__ig" aria-hidden="true">
                    <IconInstagram /> <span>Lihat di Instagram</span>
                  </span>
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ============ MEMBER ============ */}
        <section className="section section--alt" id="member">
          <div className="container">
            <div className="section-head reveal is-in">
              <span className="eyebrow">Jadi Member</span>
              <h2>Dapatkan voucher &amp; promo pelanggan setia</h2>
              <p>
                Isi formulir singkat di bawah. Voucher ulang tahun dan promo akan kami
                kirim langsung ke WhatsApp-mu.
              </p>
            </div>
            <Reveal className="member">
              <div className="member__aside">
                <div>
                  <Image
                    src="/assets/logo-white.png"
                    alt="Logo Kataloji"
                    width={1600}
                    height={723}
                    className="member__logo"
                  />
                  <h3 style={{ marginTop: "1rem" }}>Kataloji Member</h3>
                  <p>Gratis, selamanya. Tanpa biaya langganan, tanpa kontrak.</p>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    "Voucher ulang tahun otomatis tiap tahun",
                    "Promo eksklusif via WhatsApp",
                    "Poin per transaksi & menu member",
                  ].map((perk) => (
                    <li className="member__perk" key={perk}>
                      <IconCheckSmall />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <MemberForm />
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <FAQSection />

        {/* ============ KONTAK ============ */}
        <section className="section" id="kontak">
          <div className="container">
            <div className="section-head reveal is-in">
              <span className="eyebrow">Kontak &amp; Reservasi</span>
              <h2>Mampir, pesan, atau reservasi dulu</h2>
              <p>
                Kami ada di Cipayung, Jakarta Timur. Hubungi via WhatsApp untuk reservasi
                ruang dan pemesanan event.
              </p>
            </div>
            <Reveal className="contact__grid">
              <div className="contact__list">
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
                <div className="contact__wa">
                  <a className="btn" href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <IconWhatsApp size={18} /> Reservasi via WhatsApp
                  </a>
                </div>
              </div>
              <div className="contact__map">
                <iframe
                  title="Peta lokasi Kataloji Coffee and Eatery"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=106.87%2C-6.43%2C106.89%2C-6.41&layer=mapnik&marker=-6.42%2C106.88"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
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
            <div className="footer__col">
              <h4>Jelajah</h4>
              <Link href="/#menu">Menu</Link>
              <Link href="/#tentang">Tentang Kami</Link>
              <Link href="/#galeri">Galeri</Link>
              <Link href="/#promo">Promo</Link>
              <Link href="/member">Jadi Member</Link>
            </div>
            <div className="footer__col">
              <h4>Kontak</h4>
              <Link href="/#kontak">Cipayung, Jakarta Timur</Link>
              <a href={WA_LINK}>+62 812-3456-7890</a>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <Link href="/#kontak">08.00 – 22.00 WIB</Link>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 {BRAND.fullName}. Semua hak dilindungi.</span>
            <span>Dibuat dengan kopi di Cipayung, Jakarta Timur.</span>
          </div>
        </div>
      </footer>

      <PromoPopup />
    </>
  );
}
