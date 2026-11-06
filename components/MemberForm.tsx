"use client";

import { useState } from "react";
import Link from "next/link";
import { IconCheck } from "./icons";
import { normalisasiWhatsapp, validasiPelanggan } from "@/lib/pelanggan";

type Field = "nama" | "whatsapp" | "tanggalLahir";

/** Form pendaftaran member dengan integrasi ke backend CRM Supabase */
export function MemberForm() {
  const [values, setValues] = useState({ nama: "", whatsapp: "", tanggalLahir: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [serverError, setServerError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (id: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [id]: v }));
    setServerError("");
    if (errors[id]) validate(false);
  };

  const validate = (touch = true) => {
    const errList = validasiPelanggan({
      nama: values.nama,
      whatsapp: values.whatsapp,
      tgl_lahir: values.tanggalLahir,
    });

    const err: Partial<Record<Field, string>> = {};
    for (const msg of errList) {
      if (msg.toLowerCase().includes("nama") && !err.nama) {
        err.nama = msg;
      } else if (msg.toLowerCase().includes("whatsapp") && !err.whatsapp) {
        err.whatsapp = msg;
      } else if (msg.toLowerCase().includes("tanggal") && !err.tanggalLahir) {
        err.tanggalLahir = msg;
      }
    }

    if (touch) setErrors(err);
    else
      setErrors((prev) => {
        const next = { ...prev };
        (Object.keys(err) as Field[]).forEach((k) => {
          if (prev[k]) next[k] = err[k];
        });
        return next;
      });
    return Object.keys(err).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setServerError("");

    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: values.nama.trim(),
          whatsapp: normalisasiWhatsapp(values.whatsapp),
          tanggalLahir: values.tanggalLahir,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.duplikat) {
          setErrors({ whatsapp: data.pesan });
        } else {
          setServerError(data.pesan || "Pendaftaran gagal diproses.");
        }
        return;
      }

      setDone(true);
    } catch {
      setServerError("Koneksi ke server gagal. Cek jaringan dan coba lagi.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const namaDepan = values.nama.trim().split(/\s+/)[0] || "Teman";
    return (
      <div className="member__form" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <span className="contact__ico" style={{ margin: "0 auto .75rem" }}>
          <IconCheck size={22} />
        </span>
        <h3 style={{ marginBottom: ".5rem" }}>Pendaftaran berhasil</h3>
        <p style={{ color: "var(--coffee-600)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
          Terima kasih, {namaDepan}! Data kamu sudah terdaftar di sistem kasir Kataloji.
          Cukup sebutkan nomor WhatsApp-mu saat memesan untuk kumpulkan poin dan nikmati promo.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            className="btn btn--primary"
            href={`/member?member=${encodeURIComponent(values.nama.trim())}&wa=${encodeURIComponent(normalisasiWhatsapp(values.whatsapp))}`}
          >
            Lihat Status Member
          </Link>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => {
              setDone(false);
              setValues({ nama: "", whatsapp: "", tanggalLahir: "" });
            }}
          >
            Daftarkan Nomor Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="member__form" noValidate onSubmit={submit}>
      {serverError && (
        <div
          style={{
            padding: ".75rem 1rem",
            marginBottom: "1rem",
            background: "#fee2e2",
            color: "#991b1b",
            borderRadius: "6px",
            fontSize: "var(--fs-sm)",
          }}
        >
          {serverError}
        </div>
      )}
      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor="nama">
            Nama Lengkap <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            className={`control${errors.nama ? " is-error" : ""}`}
            type="text"
            id="nama"
            name="nama"
            autoComplete="name"
            value={values.nama}
            onChange={set("nama")}
            aria-invalid={!!errors.nama}
          />
          <span className="field__msg" aria-live="polite">{errors.nama ?? ""}</span>
        </div>
        <div className="field">
          <label htmlFor="whatsapp">
            No. WhatsApp <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            className={`control${errors.whatsapp ? " is-error" : ""}`}
            type="tel"
            id="whatsapp"
            name="whatsapp"
            inputMode="tel"
            placeholder="08xxxxxxxxxx atau +62..."
            autoComplete="tel"
            value={values.whatsapp}
            onChange={set("whatsapp")}
            aria-invalid={!!errors.whatsapp}
          />
          <span className="field__msg" aria-live="polite">{errors.whatsapp ?? ""}</span>
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="tanggalLahir">
            Tanggal Lahir <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            className={`control${errors.tanggalLahir ? " is-error" : ""}`}
            type="date"
            id="tanggalLahir"
            name="tanggalLahir"
            value={values.tanggalLahir}
            onChange={set("tanggalLahir")}
            aria-invalid={!!errors.tanggalLahir}
          />
          <span className="field__msg" aria-live="polite">{errors.tanggalLahir ?? ""}</span>
        </div>
      </div>
      <div style={{ marginTop: "1.4rem" }}>
        <button className="btn btn--block" type="submit" disabled={sending}>
          {sending ? <span className="spinner" /> : null}
          {sending ? "Mendaftarkan…" : "Daftar Jadi Member"}
        </button>
        <p className="member__note">
          Dengan mendaftar, kamu menyetujui penyimpanan data nama, nomor WhatsApp, dan tanggal
          lahir secara aman untuk keperluan program loyalitas &amp; promo ulang tahun.
        </p>
      </div>
    </form>
  );
}
