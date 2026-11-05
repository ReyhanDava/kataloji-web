import { NextResponse } from "next/server";
import { normalisasiWhatsapp, formatWhatsapp } from "@/lib/pelanggan";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawWa = searchParams.get("wa") || "";
    return cariMember(rawWa);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ ok: false, pesan: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawWa = typeof body.whatsapp === "string" ? body.whatsapp : "";
    return cariMember(rawWa);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan server.";
    return NextResponse.json({ ok: false, pesan: msg }, { status: 500 });
  }
}

async function cariMember(inputWa: string) {
  const wa = normalisasiWhatsapp(inputWa);
  if (!wa || wa.length < 10) {
    return NextResponse.json(
      { ok: false, pesan: "Nomor WhatsApp tidak valid. Masukkan nomor HP aktif." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { ok: false, pesan: "Konfigurasi server database belum lengkap." },
      { status: 500 }
    );
  }

  const res = await fetch(
    `${supabaseUrl}/rest/v1/pelanggan?whatsapp=eq.${wa}&select=id,nama,whatsapp,poin,tgl_lahir,created_at`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json(
      { ok: false, pesan: "Gagal membaca database: " + errText },
      { status: 500 }
    );
  }

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({
      ok: true,
      found: false,
      waNormalized: wa,
      pesan: "Nomor WhatsApp belum terdaftar di sistem member Kataloji.",
    });
  }

  const pel = data[0];
  const poin = Number(pel.poin) || 0;
  const hariIni = new Date();
  let ultahBulanIni = false;
  let tanggalUltah: number | null = null;

  if (pel.tgl_lahir) {
    const d = new Date(pel.tgl_lahir + "T00:00:00");
    if (!Number.isNaN(d.getTime())) {
      ultahBulanIni = d.getMonth() === hariIni.getMonth();
      if (ultahBulanIni) tanggalUltah = d.getDate();
    }
  }

  return NextResponse.json({
    ok: true,
    found: true,
    member: {
      id: pel.id,
      nama: pel.nama,
      whatsapp: pel.whatsapp,
      whatsappFormatted: formatWhatsapp(pel.whatsapp),
      poin,
      nilaiRupiah: poin * 1000,
      tglLahir: pel.tgl_lahir,
      ultahBulanIni,
      tanggalUltah,
    },
  });
}
