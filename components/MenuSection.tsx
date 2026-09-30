import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";

/* Tile katalog — isi & urutan mengikuti SPEC_TAMPILAN_MENU_LANDING */
const CATS: Array<{
  id: string; label: string; desc: string; min: number; img: string; w: number; h: number; big?: boolean;
}> = [
  {
    id: "kopi",
    label: "Kopi",
    desc: "Espresso, manual brew, dan kreasi signature.",
    min: 16,
    img: "/assets/hl-kopi.jpeg",
    w: 900, h: 1600,
    big: true,
  },
  {
    id: "nonkopi",
    label: "Non-Kopi & Matcha",
    desc: "Matcha, teh, slush, dan mocktail segar.",
    min: 20,
    img: "/assets/hl-nonkopi.jpeg",
    w: 800, h: 635,
  },
  {
    id: "pastry",
    label: "Pastry & Starter",
    desc: "Dipanggang tiap pagi, plus camilan pembuka.",
    min: 18,
    img: "/assets/hl-pastry.jpeg",
    w: 800, h: 635,
  },
  {
    id: "makanan",
    label: "Main Course",
    desc: "Hidangan utama, pasta, dan mie.",
    min: 38,
    img: "/assets/hl-main.jpeg",
    w: 800, h: 635,
  },
  {
    id: "makanan",
    label: "Rice Bowl",
    desc: "Nasi hangat dengan lauk pilihan.",
    min: 32,
    img: "/assets/hl-ricebowl.jpeg",
    w: 800, h: 635,
  },
];

/** Section menu di landing — 5 tile katalog, tile Kopi besar span 2 baris */
export function MenuSection() {
  return (
    <section className="section section--alt" id="menu" aria-labelledby="menuTitle">
      <div className="container">
        <div className="menucat__head">
          <span className="eyebrow">Katalog</span>
          <h2 id="menuTitle">Menu &amp; harga</h2>
        </div>

        <Reveal className="menucat">
          {CATS.map((c) => (
            <Link
              key={c.label}
              className={`menucat__tile${c.big ? " menucat__tile--big" : ""}`}
              href={`/menu?kategori=${c.id}`}
            >
              <span className="menucat__img">
                {c.img ? (
                  <Image
                    src={c.img}
                    alt={`Katalog ${c.label}`}
                    width={c.w}
                    height={c.h}
                    loading="lazy"
                    style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: "100%", position: "absolute", inset: 0 }}
                  />
                ) : (
                  <span className="menucat__ph" aria-hidden="true">{c.label.charAt(0)}</span>
                )}
              </span>
              <span className="menucat__txt">
                <span className="menucat__h">{c.label}</span>
                <span className="menucat__desc">{c.desc}</span>
                <span className="menucat__meta">Mulai {c.min}K</span>
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="menucat__foot">
          <p>Pesan langsung di kasir. Mau lihat semuanya sekaligus?</p>
          <Link className="btn" href="/menu">
            Lihat menu lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}
