"use client";

import { useState } from "react";
import { IconCheck } from "./icons";

type Field = "nama" | "whatsapp" | "tanggalLahir";

/** Form pendaftaran member dengan validasi — port dari app.js (PRD 2.4) */
export function MemberForm() {
  const [values, setValues] = useState({ nama: "", whatsapp: "", tanggalLahir: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (id: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [id]: v }));
    // real-time: revalidasi hanya field yang sedang error
    if (errors[id]) validate(false);
  };

  const isPhone = (v: string) => /^08\d{8,12}$/.test(v.replace(/\s/g, ""));

  const validate = (touch = true) => {
    const err: Partial<Record<Field, string>> = {};
    const nama = values.nama.trim();
    if (nama.length < 3) err.nama = "Nama minimal 3 karakter.";

    const wa = values.whatsapp.trim();
    if (!wa) err.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!isPhone(wa)) err.whatsapp = "Format: 08xxxxxxxxxx (10–14 digit).";

    const tgl = values.tanggalLahir;
    if (!tgl) err.tanggalLahir = "Tanggal lahir wajib diisi.";
    else {
      const d = new Date(tgl);
      const now = new Date();
      const age = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (d > now) err.tanggalLahir = "Tanggal tidak boleh di masa depan.";
      else if (age > 120) err.tanggalLahir = "Tanggal lahir tidak valid.";
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
    try {
      // TODO integrasi backend: POST /api/members { nama, whatsapp, tanggalLahir }
      await new Promise((r) => setTimeout(r, 900));
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="member__form" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <span className="contact__ico" style={{ margin: "0 auto .75rem" }}>
          <IconCheck size={22} />
        </span>
        <h3 style={{ marginBottom: ".5rem" }}>Pendaftaran diterima</h3>
        <p style={{ color: "var(--coffee-600)", fontSize: "var(--fs-sm)" }}>
          Terima kasih, {values.nama.trim().split(/\s+/)[0]}! Voucher &amp; promo akan kami
          kirim ke WhatsApp-mu.
        </p>
        <button
          className="btn btn--ghost"
          type="button"
          style={{ marginTop: "1.5rem" }}
          onClick={() => {
            setDone(false);
            setValues({ nama: "", whatsapp: "", tanggalLahir: "" });
          }}
        >
          Daftarkan member lain
        </button>
      </div>
    );
  }

  return (
    <form className="member__form" noValidate onSubmit={submit}>
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
            placeholder="cth. Muhammad Reyhan"
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
            inputMode="numeric"
            placeholder="08xxxxxxxxxx"
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
          Dengan mendaftar, kamu menyetujui penyimpanan data (nama, No. WhatsApp, tanggal
          lahir) secara aman untuk keperluan voucher &amp; promo. Kami tidak menjual data
          ke pihak ketiga.
        </p>
      </div>
    </form>
  );
}
