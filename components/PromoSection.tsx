"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";

/**
 * Section promo — interactive selector (referensi expanding panels).
 * Deretan panel poster: yang aktif mengembang menampilkan detail lengkap
 * (nama, harga, deskripsi, S&K) di overlay bawah; yang lain menyusut jadi
 * sliver vertikal dengan judul promo. Klik sliver untuk membukanya.
 * Mobile: panel tersusun vertikal — yang aktif jadi kartu penuh.
 */
export function PromoSection() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="section-head promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <h2>Promo minggu ini</h2>
          <p className="promohead__hint">
            Klik panel untuk membuka detail promo. Klaim langsung di kasir.
          </p>
        </div>

        <div className="islect">
          {PROMO_DETAIL.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={`islect__panel${active === i ? " is-active" : ""}`}
              style={{ ["--i" as string]: i }}
              onClick={() => setActive(i)}
              aria-expanded={active === i}
            >
              <span className="islect__img" aria-hidden="true">
                <Image
                  src={p.img}
                  alt=""
                  width={900}
                  height={1600}
                  sizes="(max-width:719px) 100vw, 40vw"
                  className="islect__img-el"
                  draggable={false}
                />
              </span>

              <span className="islect__tab">{p.name}</span>

              <span className="islect__info">
                <span className="islect__row">
                  <span className="islect__name">{p.name}</span>
                  <span className="islect__price">{p.price}</span>
                </span>
                <span className="islect__note">{p.priceNote}</span>
                <span className="islect__desc">{p.desc}</span>
                <span className="islect__blocks">
                  <span className="islect__block">
                    <span className="islect__h">Syarat</span>
                    <ul>
                      {p.syarat.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </span>
                  <span className="islect__block">
                    <span className="islect__h">Ketentuan</span>
                    <ul>
                      {p.ketentuan.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
