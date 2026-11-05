import { NextResponse } from "next/server";
import { normalisasiWhatsapp, validasiPelanggan } from "@/lib/pelanggan";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const nama = typeof body.nama === "string" ? body.nama.trim() : "";
    const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp : "";
    const tgl_lahir =
      typeof body.tanggalLahir === "string"
        ? body.tanggalLahir
        : typeof body.tgl_lahir === "string"
        ? body.tgl_lahir
        : "";

    const errors = validasiPelanggan({ nama, whatsapp, tgl_lahir });
    if (errors.length > 0) {
      return NextResponse.json({ ok: false, pesan: errors[0] }, { status: 400 });
    }

    const wa = normalisasiWhatsapp(whatsapp);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { ok: false, pesan: "Konfigurasi server database belum lengkap." },
        { status: 500 }
      );
    }

    // Cek duplikasi nomor WhatsApp (BR-CUS)
    const cekRes = await fetch(
      `${supabaseUrl}/rest/v1/pelanggan?whatsapp=eq.${wa}&select=id,nama`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    if (!cekRes.ok) {
      const errText = await cekRes.text();
      return NextResponse.json(
        { ok: false, pesan: "Gagal memeriksa status nomor WhatsApp: " + errText },
        { status: 500 }
      );
    }

    const terdaftar = await cekRes.json();
    if (Array.isArray(terdaftar) && terdaftar.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          duplikat: true,
          pesan: "Nomor WhatsApp ini sudah terdaftar sebagai pelanggan Kataloji.",
        },
        { status: 409 }
      );
    }

    // Insert pelanggan baru
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/pelanggan`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        nama,
        whatsapp: wa,
        tgl_lahir,
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      return NextResponse.json(
        { ok: false, pesan: "Gagal menyimpan data member: " + errText },
        { status: 500 }
      );
    }

    const hasil = await insertRes.json();
    return NextResponse.json({
      ok: true,
      data: Array.isArray(hasil) && hasil.length > 0 ? hasil[0] : { nama, whatsapp: wa },
    });
  } catch (err: unknown) {
    console.error("API Members Error:", err);
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : "Terjadi kesalahan internal.";
    return NextResponse.json({ ok: false, pesan: msg }, { status: 500 });
  }
}
