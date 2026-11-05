"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { normalisasiWhatsapp } from "@/lib/pelanggan";

interface MemberData {
  id: string;
  nama: string;
  whatsapp: string;
  whatsappFormatted: string;
  poin: number;
  nilaiRupiah: number;
  tglLahir: string | null;
  ultahBulanIni: boolean;
  tanggalUltah: number | null;
}

function MemberContent() {
  const [inputWa, setInputWa] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [member, setMember] = useState<MemberData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const cekNomor = useCallback(async (waTarget: string) => {
    const waBersih = normalisasiWhatsapp(waTarget);
    if (!waBersih || waBersih.length < 10) {
      setErrorMsg("Masukkan nomor WhatsApp yang valid (contoh: 08123456789).");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/members/check?wa=${encodeURIComponent(waBersih)}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.pesan || "Gagal memeriksa status member.");
        return;
      }

      if (data.found && data.member) {
        setMember(data.member);
        setNotFound(false);
      } else {
        setMember(null);
        setNotFound(true);
      }
    } catch {
      setErrorMsg("Koneksi ke server gagal. Cek jaringan dan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qWa = params.get("wa");
    if (qWa) {
      setInputWa(qWa);
      cekNomor(qWa);
    }
  }, [cekNomor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cekNomor(inputWa);
  };

  return (
    <main id="main">
      <section className="section" id="member-card" style={{ paddingTop: "7.5rem", minHeight: "85vh" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          
          {/* Header */}
          <div className="section-head" style={{ marginBottom: "2rem", textAlign: "center" }}>
            <span className="eyebrow">Program Loyalitas &amp; Poin</span>
            <h1 style={{ fontSize: "var(--fs-2xl)", marginBottom: ".5rem" }}>
              Member Digital Kataloji
            </h1>
            <p style={{ color: "var(--coffee-600)", fontSize: "var(--fs-sm)" }}>
              Kumpulkan 1 poin setiap kelipatan Rp 20.000 belanja. Tukarkan poinmu langsung di kasir sebagai potongan tagihan.
            </p>
          </div>

          {/* Form Pencarian / Cek Member */}
          <div
            style={{
              background: "var(--cream-100, #F4ECE1)",
              border: "1px solid rgba(42,35,26,0.12)",
              borderRadius: "14px",
              padding: "1.5rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 18px rgba(42,35,26,0.04)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
              <input
                type="tel"
                className="control"
                style={{ flex: "1 1 240px", minHeight: "44px", background: "#fff" }}
                placeholder="Ketik nomor WhatsApp (cth: 0812...)"
                value={inputWa}
                onChange={(e) => {
                  setInputWa(e.target.value);
                  setErrorMsg("");
                  setNotFound(false);
                }}
              />
              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
                style={{ minHeight: "44px", padding: "0 1.5rem", flex: "0 0 auto" }}
              >
                {loading ? "Memeriksa…" : "Periksa Member"}
              </button>
            </form>

            {errorMsg && (
              <p style={{ color: "#991b1b", fontSize: "var(--fs-xs)", marginTop: ".75rem" }}>
                {errorMsg}
              </p>
            )}

            {notFound && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "#fff",
                  borderRadius: "8px",
                  borderLeft: "4px solid var(--amber-500, #C88F7B)",
                }}
              >
                <p style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--coffee-900)", marginBottom: ".25rem" }}>
                  Nomor WhatsApp belum terdaftar.
                </p>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--coffee-600)", marginBottom: ".75rem" }}>
                  Kamu belum terdaftar di program loyalitas Kataloji. Daftarkan nomor WhatsApp-mu sekarang gratis untuk mulai kumpulkan poin belanja dan reward ulang tahun.
                </p>
                <Link className="btn btn--sm" href="/#member" style={{ fontSize: "var(--fs-xs)" }}>
                  Daftar Member Baru Sekarang →
                </Link>
              </div>
            )}
          </div>

          {/* Kartu Member Digital (Bila Ditemukan) */}
          {member && (
            <div style={{ animation: "fadeIn .3s ease" }}>
              <div className="mcard" style={{ margin: "1.5rem 0 2rem" }}>
                <div className="mcard__top">
                  <div className="mcard__brand">
                    <span className="brand__mark">K</span> KATALOJI
                  </div>
                  <span className="mcard__type">Member Digital</span>
                </div>
                <div className="mcard__mid">
                  <div className="mcard__name" style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                    {member.nama}
                  </div>
                  <div className="mcard__no" style={{ letterSpacing: "1px", color: "var(--sage-200)" }}>
                    {member.whatsappFormatted}
                  </div>
                </div>
                <div className="mcard__bot" style={{ borderTop: "1px solid rgba(251,246,235,0.15)", paddingTop: "1rem" }}>
                  <div>
                    <div className="k" style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".08em", opacity: 0.8 }}>
                      Saldo Poin
                    </div>
                    <div className="v" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#facc15" }}>
                      {member.poin} Poin
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="k" style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".08em", opacity: 0.8 }}>
                      Nilai Potongan Kasir
                    </div>
                    <div className="v" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--cream-50)" }}>
                      Rp {member.nilaiRupiah.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Voucher & Benefit */}
              <div className="vouchers" style={{ display: "grid", gap: ".9rem" }}>
                <div className="voucher">
                  <div className="voucher__code">POIN</div>
                  <div className="voucher__info">
                    <div className="t">Tukar Poin di Kasir</div>
                    <div className="d">
                      {member.poin >= 5
                        ? `Kamu memiliki ${member.poin} poin (senilai Rp ${member.nilaiRupiah.toLocaleString("id-ID")}) siap ditukarkan sebagai potongan tagihan!`
                        : `Kumpulkan minimal 5 poin untuk ditukarkan langsung di kasir (saat ini ${member.poin}/5 poin).`}
                    </div>
                    <div className="x">Cukup sebutkan No. WhatsApp saat memesan</div>
                  </div>
                </div>

                <div className={`voucher ${member.ultahBulanIni ? "" : "voucher--muted"}`}>
                  <div className="voucher__code">BDAY</div>
                  <div className="voucher__info">
                    <div className="t">
                      Promo Spesial Ulang Tahun{member.ultahBulanIni ? " (Aktif Bulan Ini)" : ""}
                    </div>
                    <div className="d">
                      {member.ultahBulanIni
                        ? `Bulan ini adalah bulan ulang tahunmu${member.tanggalUltah ? ` (tanggal ${member.tanggalUltah})` : ""}. Dapatkan promo & traktiran spesial saat berkunjung ke Kataloji!`
                        : "Klaim promo dan traktiran spesial di kasir pada bulan kelahiranmu."}
                    </div>
                    <div className="x">
                      {member.ultahBulanIni ? "Tunjukkan nomor WhatsApp ke kasir" : "Otomatis aktif di bulan kelahiran"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tombol Balik & Bantuan */}
          <div style={{ marginTop: "2.5rem", display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn--ghost" href="/">
              ← Kembali ke Beranda
            </Link>
            <a
              className="btn btn--ghost"
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Kasir via WhatsApp
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}

export default function MemberPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>Memuat...</div>}>
      <MemberContent />
    </Suspense>
  );
}
