import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kataloji Coffee & Eatery — Kopi, Senyap, & Cerita",
  description:
    "Kataloji Coffee and Eatery, Cipayung, Jakarta Timur. Coffee & eatery dengan roastery in-house.",
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuSection } from "@/components/MenuSection";
import { MemberForm } from "@/components/MemberForm";
import { Reveal } from "@/components/Reveal";
import { FAQSection } from "@/components/FAQ";
import { PromoPopup } from "@/components/PromoPopup";
import { PromoSection } from "@/components/PromoSection";
import { TentangCarousel } from "@/components/TentangCarousel";
import {
  IconArrow, IconCheckSmall, IconInstagram,
} from "@/components/icons";
import {
  BRAND, EVENT_ITEMS,
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
              <h2>Kabar terbaru dari Kataloji</h2>
              <p>
                Best sellers, program reward, dan event seru — klik kartunya buat
                lihat detail lengkapnya di Instagram kami.
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
      </main>

      <Footer />

      <PromoPopup />
    </>
  );
}
