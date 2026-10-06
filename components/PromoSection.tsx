"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight, IconPlus } from "./icons";

/**
 * Section promo — kartu detail kompak dengan SLIDE ke samping antar promo.
 * Panah di kanan header + di sisi kartu, swipe, keyboard ←→.
 * S&K dilipat jadi tombol "Syarat & ketentuan" — dibuka saat diklik.
 */
export function PromoSection() {
  const len = PROMO_DETAIL.length;
  const [active, setActive] = React.useState(0);
  const [skOpen, setSkOpen] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(0);
  const dragRef = React.useRef(0);

  const step = React.useCallback((dir: 1 | -1) => {
    setActive((a) => (a + dir + PROMO_DETAIL.length) % PROMO_DETAIL.length);
    setSkOpen(false);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    startX.current = e.clientX;
    dragRef.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    dragRef.current = e.clientX - startX.current;
    setDragX(dragRef.current);
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    const d = dragRef.current;
    dragRef.current = 0;
    setDragX(0);
    if (d > 60) step(-1);
    else if (d < -60) step(1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="promohead">
          <div className="promohead__row">
            <div>
              <span className="eyebrow">Promo Berjalan</span>
              <h2>Promo minggu ini</h2>
            </div>

          </div>
        </div>

        <div
          className="promostage"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className={`promotrack${dragging ? " is-dragging" : ""}`}
            style={{
              transform: `translateX(calc(${-active * 100}% + ${dragging ? dragX : 0}px))`,
            }}
          >
            {PROMO_DETAIL.map((p) => (
              <article
                className="promocard"
                key={p.name}
                aria-hidden={PROMO_DETAIL[active].name !== p.name}
              >
                <div className="promocard__media">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    width={900}
                    height={1600}
                    sizes="(max-width:719px) 100vw, 220px"
                    priority={p === PROMO_DETAIL[0]}
                    draggable={false}
                  />
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
            ))}
          </div>

          <button
            type="button"
            className={`tcarousel__arrow tcarousel__arrow--prev${active === 0 ? " is-muted" : ""}`}
            aria-label="Promo sebelumnya"
            onClick={() => step(-1)}
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className={`tcarousel__arrow tcarousel__arrow--next${active === len - 1 ? " is-muted" : ""}`}
            aria-label="Promo berikutnya"
            onClick={() => step(1)}
          >
            <IconArrowRight />
          </button>
        </div>

        <div className="promodots" role="tablist" aria-label="Pilih promo">
          {PROMO_DETAIL.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={active === idx}
              aria-label={`Promo ${idx + 1}: ${t.name}`}
              className={`promodot${active === idx ? " is-active" : ""}`}
              onClick={() => {
                setActive(idx);
                setSkOpen(false);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
