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
      setErrorMsg("Masukkan nomor WhatsApp yang valid (contoh: 08123456789 atau +628...).");
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
      <section
        className="section"
        id="member-card"
        style={{
          paddingTop: "7.5rem",
          paddingBottom: "5.5rem",
          minHeight: "88vh",
          background: "linear-gradient(180deg, #FAF5EE 0%, #F5ECE0 60%, #ECE2D2 100%)",
        }}
      >
        <div className="container" style={{ maxWidth: "620px", marginInline: "auto" }}>
          
          {/* Section Header */}
          <div style={{ marginBottom: "2.25rem", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "999px",
                background: "rgba(58, 70, 54, 0.09)",
                border: "1px solid rgba(58, 70, 54, 0.16)",
                color: "var(--sage-800, #3A4636)",
                fontSize: "0.725rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--sage-600, #6E8570)",
                  display: "inline-block",
                }}
              />
              Loyalitas &amp; Reward Digital
            </span>

            <h1
              style={{
                fontFamily: "var(--font-fraunces, serif)",
                fontSize: "clamp(1.85rem, 4.5vw, 2.5rem)",
                color: "var(--coffee-900, #2A231A)",
                marginBottom: "0.65rem",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Cek Poin Member Kataloji
            </h1>

            <p
              style={{
                color: "var(--coffee-600, #6B5F4D)",
                fontSize: "var(--fs-sm, 0.95rem)",
                lineHeight: 1.6,
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              Ketik nomor WhatsApp yang terdaftar untuk melihat saldo poin belanja dan klaim reward spesialmu di kasir.
            </p>
          </div>

          {/* Form Pencarian Member */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(67, 56, 43, 0.12)",
              borderRadius: "18px",
              padding: "1.5rem",
              marginBottom: "2rem",
              boxShadow: "0 10px 30px -6px rgba(42, 35, 26, 0.07), 0 2px 6px -1px rgba(42, 35, 26, 0.04)",
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 240px", position: "relative" }}>
                <input
                  type="tel"
                  inputMode="tel"
                  className="control"
                  style={{
                    width: "100%",
                    minHeight: "48px",
                    background: "#FAF7F2",
                    border: "1px solid rgba(67, 56, 43, 0.18)",
                    borderRadius: "12px",
                    padding: "0 1rem",
                    fontSize: "0.95rem",
                    color: "var(--coffee-900, #2A231A)",
                    fontWeight: 500,
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  placeholder="Ketik nomor WhatsApp (cth: 0812...)"
                  value={inputWa}
                  onChange={(e) => {
                    setInputWa(e.target.value);
                    setErrorMsg("");
                    setNotFound(false);
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn"
                disabled={loading}
                style={{
                  minHeight: "48px",
                  padding: "0 1.6rem",
                  flex: "0 0 auto",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: loading ? "wait" : "pointer",
                }}
              >
                {loading ? "Memeriksa…" : "Periksa Member"}
              </button>
            </form>

            <div
              style={{
                marginTop: "0.75rem",
                fontSize: "0.775rem",
                color: "var(--coffee-400, #8C7E68)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Format nomor: 08xx atau +628xx. Poin dicatat otomatis saat kasir memproses struk belanja.</span>
            </div>

            {errorMsg && (
              <p
                style={{
                  color: "#B0553B",
                  background: "#FCEFEA",
                  border: "1px solid rgba(176, 85, 59, 0.2)",
                  borderRadius: "8px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "0.825rem",
                  marginTop: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {errorMsg}
              </p>
            )}

            {/* Alert: Nomor Belum Terdaftar */}
            {notFound && (
              <div
                style={{
                  marginTop: "1.25rem",
                  padding: "1.25rem",
                  background: "#FDF8F3",
                  borderRadius: "14px",
                  borderLeft: "4px solid var(--amber-500, #C08A3E)",
                  borderTop: "1px solid rgba(192, 138, 62, 0.2)",
                  borderRight: "1px solid rgba(192, 138, 62, 0.2)",
                  borderBottom: "1px solid rgba(192, 138, 62, 0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--coffee-900, #2A231A)",
                    marginBottom: "0.35rem",
                  }}
                >
                  Nomor WhatsApp belum terdaftar di program member
                </p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--coffee-600, #6B5F4D)",
                    marginBottom: "1rem",
                    lineHeight: 1.55,
                  }}
                >
                  Nomor ini belum tercatat dalam sistem poin Kataloji. Daftarkan nomor WhatsApp-mu gratis saat memesan langsung di kasir atau isi formulir pendaftaran di halaman utama.
                </p>
                <Link
                  className="btn"
                  href="/#member"
                  style={{
                    fontSize: "0.825rem",
                    borderRadius: "10px",
                    padding: "0.55rem 1.15rem",
                    minHeight: "38px",
                  }}
                >
                  Daftar Member Baru di Beranda →
                </Link>
              </div>
            )}
          </div>

          {/* Kartu Member Digital & Rincian Reward */}
          {member && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              
              {/* Luxury Digital Membership Card */}
              <div
                style={{
                  position: "relative",
                  maxWidth: "460px",
                  margin: "1.5rem auto 2.25rem",
                  borderRadius: "22px",
                  padding: "1.85rem 1.75rem",
                  background: "linear-gradient(135deg, #1C150F 0%, #2D2319 50%, #15100B 100%)",
                  color: "#FAF5EE",
                  boxShadow: "0 22px 50px -12px rgba(26, 20, 16, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.25)",
                  overflow: "hidden",
                }}
              >
                {/* Subtle Gold Ambient Glow */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "190px",
                    height: "190px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(212, 175, 55, 0) 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Card Top: Brand Emblem & Type */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.6rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span
                      style={{
                        display: "inline-grid",
                        placeItems: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #D4AF37 0%, #997307 100%)",
                        color: "#1A1410",
                        fontFamily: "var(--font-fraunces, serif)",
                        fontWeight: 800,
                        fontSize: "1rem",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      K
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces, serif)",
                        letterSpacing: "0.2em",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#FAF5EE",
                      }}
                    >
                      KATALOJI
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#F2D179",
                      background: "rgba(212, 175, 55, 0.12)",
                      border: "1px solid rgba(212, 175, 55, 0.28)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "6px",
                    }}
                  >
                    Member Digital
                  </span>
                </div>

                {/* EMV Gold Chip & Contactless Indicator */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.4rem",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "30px",
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #E6C875 0%, #B89230 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.35)",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gridTemplateRows: "1fr 1fr",
                      gap: "2px",
                      padding: "3px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.25)",
                    }}
                  >
                    <div style={{ border: "1px solid rgba(0,0,0,0.25)", borderRadius: "2px" }} />
                    <div style={{ border: "1px solid rgba(0,0,0,0.25)", borderRadius: "2px" }} />
                    <div style={{ border: "1px solid rgba(0,0,0,0.25)", borderRadius: "2px" }} />
                    <div style={{ border: "1px solid rgba(0,0,0,0.25)", borderRadius: "2px" }} />
                  </div>

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.75 }}
                  >
                    <path d="M2 12a10 10 0 0 1 10-10" />
                    <path d="M6 12a6 6 0 0 1 6-6" />
                    <path d="M10 12a2 2 0 0 1 2-2" />
                  </svg>
                </div>

                {/* Card Middle: Member Identity */}
                <div style={{ marginBottom: "1.6rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces, serif)",
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "#FAF5EE",
                      lineHeight: 1.25,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {member.nama}
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      letterSpacing: "0.14em",
                      color: "rgba(250, 245, 238, 0.65)",
                      marginTop: "0.35rem",
                    }}
                  >
                    {member.whatsappFormatted}
                  </div>
                </div>

                {/* Card Bottom: Points Balance & Cash Equivalent */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderTop: "1px solid rgba(250, 245, 238, 0.12)",
                    paddingTop: "1.1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(250, 245, 238, 0.55)",
                        marginBottom: "0.25rem",
                        fontWeight: 600,
                      }}
                    >
                      Saldo Poin
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                      <span
                        style={{
                          fontSize: "1.85rem",
                          fontWeight: 800,
                          color: "#F6D268",
                          lineHeight: 1,
                        }}
                      >
                        {member.poin}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "rgba(250, 245, 238, 0.75)", fontWeight: 600 }}>
                        Poin
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "rgba(250, 245, 238, 0.55)",
                        marginBottom: "0.25rem",
                        fontWeight: 600,
                      }}
                    >
                      Nilai Potongan Kasir
                    </div>
                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#FAF5EE",
                        lineHeight: 1.1,
                      }}
                    >
                      Rp {member.nilaiRupiah.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Reward & Voucher Status */}
              <div style={{ display: "grid", gap: "1rem" }}>
                
                {/* Benefit 1: Tukar Poin Kasir */}
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(67, 56, 43, 0.12)",
                    borderRadius: "16px",
                    padding: "1.35rem 1.45rem",
                    display: "flex",
                    gap: "1.1rem",
                    alignItems: "flex-start",
                    boxShadow: "0 3px 12px rgba(42, 35, 26, 0.04)",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: member.poin >= 5 ? "#F4FAF2" : "#F7F5F2",
                      border: member.poin >= 5 ? "1px solid #B8E0B0" : "1px solid rgba(67, 56, 43, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: member.poin >= 5 ? "#2A6E18" : "var(--coffee-600, #6B5F4D)",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    POIN
                  </div>

                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-fraunces, serif)",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--coffee-900, #2A231A)",
                        }}
                      >
                        Potongan Tagihan Kasir
                      </span>

                      {member.poin >= 5 ? (
                        <span
                          style={{
                            fontSize: "0.725rem",
                            fontWeight: 700,
                            color: "#1E6822",
                            background: "#E8F7E4",
                            border: "1px solid rgba(30, 104, 34, 0.2)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "999px",
                          }}
                        >
                          Siap Ditukar di Kasir
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.725rem",
                            fontWeight: 600,
                            color: "var(--coffee-600, #6B5F4D)",
                            background: "rgba(67, 56, 43, 0.07)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "999px",
                          }}
                        >
                          {member.poin}/5 Poin (Minimal 5)
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "0.875rem", color: "var(--coffee-600, #6B5F4D)", margin: "0.4rem 0 0.55rem", lineHeight: 1.55 }}>
                      {member.poin >= 5
                        ? `Kamu memiliki saldo ${member.poin} poin yang dapat langsung ditukarkan menjadi potongan belanja senilai Rp ${member.nilaiRupiah.toLocaleString("id-ID")} di kasir.`
                        : `Kumpulkan minimal 5 poin untuk ditukarkan di kasir (1 poin = Rp 1.000 potongan). Dapatkan 1 poin setiap belanja kelipatan Rp 20.000.`}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.775rem", fontWeight: 600, color: "var(--sage-800, #3A4636)" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Cukup sebutkan nomor WhatsApp kamu saat bertransaksi di kasir</span>
                    </div>
                  </div>
                </div>

                {/* Benefit 2: Traktiran Ulang Tahun */}
                <div
                  style={{
                    background: member.ultahBulanIni ? "#FFFBF6" : "#FFFFFF",
                    border: member.ultahBulanIni
                      ? "1px solid rgba(192, 138, 62, 0.45)"
                      : "1px solid rgba(67, 56, 43, 0.12)",
                    borderRadius: "16px",
                    padding: "1.35rem 1.45rem",
                    display: "flex",
                    gap: "1.1rem",
                    alignItems: "flex-start",
                    boxShadow: member.ultahBulanIni
                      ? "0 4px 18px rgba(192, 138, 62, 0.14)"
                      : "0 3px 12px rgba(42, 35, 26, 0.04)",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: member.ultahBulanIni ? "#FDEFE7" : "#F7F5F2",
                      border: member.ultahBulanIni ? "1px solid #E6B9A8" : "1px solid rgba(67, 56, 43, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: member.ultahBulanIni ? "#A84323" : "var(--coffee-600, #6B5F4D)",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    BDAY
                  </div>

                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-fraunces, serif)",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--coffee-900, #2A231A)",
                        }}
                      >
                        Traktiran Ulang Tahun
                      </span>

                      {member.ultahBulanIni ? (
                        <span
                          style={{
                            fontSize: "0.725rem",
                            fontWeight: 700,
                            color: "#A84323",
                            background: "#FDEFE7",
                            border: "1px solid rgba(168, 67, 35, 0.25)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "999px",
                          }}
                        >
                          Aktif Bulan Ini
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "0.725rem",
                            fontWeight: 600,
                            color: "var(--coffee-600, #6B5F4D)",
                            background: "rgba(67, 56, 43, 0.07)",
                            padding: "0.25rem 0.65rem",
                            borderRadius: "999px",
                          }}
                        >
                          Otomatis di Bulan Lahir
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "0.875rem", color: "var(--coffee-600, #6B5F4D)", margin: "0.4rem 0 0.55rem", lineHeight: 1.55 }}>
                      {member.ultahBulanIni
                        ? `Selamat ulang tahun! Bulan ini adalah bulan spesialmu${member.tanggalUltah ? ` (tanggal ${member.tanggalUltah})` : ""}. Mampir ke Kataloji dan dapatkan promo traktiran spesial di kasir.`
                        : member.tglLahir
                          ? `Tanggal lahirmu tercatat (${member.tglLahir}). Promo & traktiran spesial akan aktif otomatis saat bulan kelahiranmu tiba.`
                          : "Dapatkan traktiran dan promo minuman/hidangan spesial di kasir pada bulan kelahiranmu."}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.775rem",
                        fontWeight: 600,
                        color: member.ultahBulanIni ? "#A84323" : "var(--sage-800, #3A4636)",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>
                        {member.ultahBulanIni
                          ? "Tunjukkan nomor WhatsApp kamu ke kasir saat berkunjung"
                          : "Otomatis aktif saat bulan kelahiran tiba"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Navigasi Bawah */}
          <div
            style={{
              marginTop: "2.75rem",
              display: "flex",
              gap: "0.9rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              className="btn btn--ghost"
              href="/"
              style={{
                borderRadius: "12px",
                fontSize: "0.875rem",
                padding: "0.65rem 1.35rem",
                minHeight: "42px",
              }}
            >
              ← Kembali ke Beranda
            </Link>

            <a
              className="btn btn--ghost"
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Halo Kasir Kataloji, saya mau tanya soal program member loyalitas...")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: "12px",
                fontSize: "0.875rem",
                padding: "0.65rem 1.35rem",
                minHeight: "42px",
              }}
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
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "grid", placeItems: "center", color: "var(--coffee-600, #6B5F4D)" }}>
          Memuat halaman member…
        </div>
      }
    >
      <MemberContent />
    </Suspense>
  );
}
