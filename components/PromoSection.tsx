"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconPlus } from "./icons";

/**
 * Section promo — KATALOG PROMO.
 * Tab navigasi = poster mini (poster promo sudah memuat nama & harga),
 * satu kartu detail kompak di bawahnya. Desktop: S&K tampil langsung
 * 2 kolom; mobile: S&K dilipat agar section tetap pendek.
 */
export function PromoSection() {
  const [active, setActive] = React.useState(0);
  const [skOpen, setSkOpen] = React.useState(false);

  const p = PROMO_DETAIL[active];

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="promohead">
          <div className="promohead__row">
            <div>
              <span className="eyebrow">Promo Berjalan</span>
              <h2>Promo minggu ini</h2>
            </div>
            <div className="promotabs" role="tablist" aria-label="Pilih promo">
              {PROMO_DETAIL.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={t.name}
                  className={`promotab${active === i ? " is-active" : ""}`}
                  onClick={() => {
                    setActive(i);
                    setSkOpen(false);
                  }}
                >
                  <Image
                    src={t.img}
                    alt=""
                    width={90}
                    height={160}
                    sizes="56px"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* kartu detail kompak — berganti sesuai tab */}
        <article className="promocard" key={active} role="tabpanel">
          <div className="promocard__media">
            <Image
              src={p.img}
              alt={p.alt}
              width={900}
              height={1600}
              sizes="(max-width:719px) 100vw, 220px"
              priority={active === 0}
              draggable={false}
            />
            {/* overlay nama+harga: hanya mobile (desktop sudah ada di info) */}
            <span className="promocard__onmedia">
              <span className="promocard__onname">{p.name}</span>
              <span className="promocard__onprice">{p.price}</span>
            </span>
          </div>

          <div className="promocard__info">
            <div className="promocard__row">
              <h3>{p.name}</h3>
              <div className="promocard__price">
                <span className="now">{p.price}</span>
                <span className="note">{p.priceNote}</span>
              </div>
            </div>

            <p className="promocard__desc">{p.desc}</p>

            <button
              type="button"
              className={`promocard__skbtn${skOpen ? " is-open" : ""}`}
              aria-expanded={skOpen}
              onClick={() => setSkOpen((o) => !o)}
            >
              Syarat &amp; ketentuan
              <IconPlus size={16} />
            </button>

            <div className={`promocard__sk${skOpen ? " is-open" : ""}`}>
              <div className="promocard__block">
                <h4>Syarat</h4>
                <ul>{p.syarat.map((t, j) => <li key={j}>{t}</li>)}</ul>
              </div>
              <div className="promocard__block">
                <h4>Ketentuan</h4>
                <ul>{p.ketentuan.map((t, j) => <li key={j}>{t}</li>)}</ul>
              </div>
            </div>

            <span className="promocard__claim">Klaim langsung di kasir.</span>
          </div>
        </article>
      </div>
    </section>
  );
}
