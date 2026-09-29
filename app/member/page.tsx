"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";

/** Halaman sukses pendaftaran member (pengganti member.html di versi statis) */
export default function MemberSuccess() {
  const [nama, setNama] = useState("Tamu");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("member");
    if (q) setNama(q);
  }, []);

  const first = nama.trim().split(/\s+/)[0] || "Tamu";

  return (
    <main id="main">
      <section className="section" id="member-card" style={{ paddingTop: "8rem" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Kataloji Member</span>
            <h2>Selamat datang, {first}!</h2>
            <p>Pendaftaranmu sudah kami terima. Ini kartu member-mu.</p>
          </div>

          <div className="mcard" style={{ margin: "2rem 0" }}>
            <div className="mcard__top">
              <div className="mcard__brand">
                <span className="brand__mark">K</span> KATALOJI
              </div>
              <span className="mcard__type">Member</span>
            </div>
            <div className="mcard__mid">
              <div className="mcard__name">{nama}</div>
              <div className="mcard__no">KTJ · 0000 · 0000</div>
            </div>
            <div className="mcard__bot">
              <div>
                <div className="k">Poin</div>
                <div className="v">0</div>
              </div>
              <div>
                <div className="k">Status</div>
                <div className="v">Aktif</div>
              </div>
            </div>
          </div>

          <div className="vouchers">
            <div className="voucher voucher--muted">
              <div className="voucher__code">BDAY</div>
              <div className="voucher__info">
                <div className="t">Voucher Ulang Tahun</div>
                <div className="d">Aktif otomatis di bulan ulang tahunmu</div>
                <div className="x">Menunggu tanggal</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: ".9rem", flexWrap: "wrap" }}>
            <Link className="btn" href="/">← Kembali ke Beranda</Link>
            <a className="btn btn--ghost" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
