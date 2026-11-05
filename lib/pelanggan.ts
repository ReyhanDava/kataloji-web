export interface InputPelanggan {
  nama: string;
  whatsapp: string;
  tgl_lahir: string;
}

export function normalisasiWhatsapp(input: string): string {
  let digit = (input || "").replace(/\D/g, "");
  if (!digit) return "";

  if (digit.startsWith("0")) digit = "62" + digit.slice(1);
  if (digit.startsWith("8")) digit = "62" + digit;
  if (digit.startsWith("620")) digit = "62" + digit.slice(3);

  return digit;
}

export function formatWhatsapp(input: string): string {
  const digit = normalisasiWhatsapp(input);
  if (!digit.startsWith("62") || digit.length < 10) return input || "";
  const sisa = digit.slice(2);
  const bagian = [sisa.slice(0, 3), sisa.slice(3, 7), sisa.slice(7)].filter(
    (b) => b.length > 0,
  );
  return "+62 " + bagian.join("-");
}

export function validasiPelanggan(input: InputPelanggan): string[] {
  const errors: string[] = [];

  const nama = (input.nama || "").trim();
  if (!nama) {
    errors.push("Nama lengkap wajib diisi.");
  } else if (nama.length < 2) {
    errors.push("Nama minimal 2 karakter.");
  } else if (nama.length > 80) {
    errors.push("Nama maksimal 80 karakter.");
  }

  const wa = normalisasiWhatsapp(input.whatsapp);
  if (!wa) {
    errors.push("Nomor WhatsApp wajib diisi.");
  } else if (!wa.startsWith("62")) {
    errors.push("Nomor WhatsApp harus nomor Indonesia (awali 08 atau 62).");
  } else if (wa.length < 11 || wa.length > 15) {
    errors.push("Nomor WhatsApp tidak wajar (10 sampai 14 digit).");
  }

  if (!input.tgl_lahir) {
    errors.push("Tanggal lahir wajib diisi.");
  } else {
    const tgl = new Date(input.tgl_lahir + "T00:00:00");
    if (Number.isNaN(tgl.getTime())) {
      errors.push("Tanggal lahir tidak valid.");
    } else {
      const hariIni = new Date();
      hariIni.setHours(0, 0, 0, 0);
      if (tgl > hariIni) {
        errors.push("Tanggal lahir tidak boleh di masa depan.");
      } else {
        const batasTua = new Date(hariIni);
        batasTua.setFullYear(batasTua.getFullYear() - 120);
        if (tgl < batasTua) {
          errors.push("Tanggal lahir tidak valid (lebih dari 120 tahun).");
        }
      }
    }
  }

  return errors;
}
