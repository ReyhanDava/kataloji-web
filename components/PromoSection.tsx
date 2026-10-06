"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight } from "./icons";

/**
 * Section promo — slide geser ke samping (kiri/kanan).
 * Satu slide = poster (kiri, cover penuh) + panel Deskripsi (kanan).
 * Mobile: poster 16:9 di atas, deskripsi di bawah — tetap slide horizontal.
 * Navigasi: panah, swipe, keyboard ←→.
 */
export function PromoSection() {
  const len = PROMO_DETAIL.length;
  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(0);
  const dragRef = React.useRef(0);
  const movedRef = React.useRef(false);

  const step = React.useCallback(
    (dir: 1 | -1) => setActive((a) => (a + dir + len) % len),
    [len]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    movedRef.current = false;
    startX.current = e.clientX;
    dragRef.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    dragRef.current = e.clientX - startX.current;
    if (Math.abs(dragRef.current) > 8) movedRef.current = true;
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
        <div className="section-head promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <h2>Promo minggu ini</h2>
          <p className="promohead__hint">
            Geser ke samping atau klik panah untuk promo lain. Klaim langsung
            di kasir.
          </p>
        </div>

        <div
          className="pslidestage"
          role="region"
          aria-label="Pilihan promo"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className={`pslidetrack${dragging ? " is-dragging" : ""}`}
            style={{
              transform: `translateX(calc(${-active * 100}% + ${dragging ? dragX : 0}px))`,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {PROMO_DETAIL.map((p) => (
              <article className="pslide" key={p.name} aria-hidden={PROMO_DETAIL[active].name !== p.name}>
                <div className="pslide__media">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    width={900}
                    height={1600}
                    sizes="(max-width:719px) 100vw, 40vw"
                    draggable={false}
                  />
                </div>

                <div className="pslide__info">
                  <span className="pslide__label">Deskripsi</span>
                  <div className="pslide__row">
                    <h3>{p.name}</h3>
                    <span className="pslide__price">{p.price}</span>
                  </div>
                  <span className="pslide__note">{p.priceNote}</span>
                  <p className="pslide__desc">{p.desc}</p>
                  <div className="pslide__blocks">
                    <div className="pslide__block">
                      <h4>Syarat</h4>
                      <ul>{p.syarat.map((t, j) => <li key={j}>{t}</li>)}</ul>
                    </div>
                    <div className="pslide__block">
                      <h4>Ketentuan</h4>
                      <ul>{p.ketentuan.map((t, j) => <li key={j}>{t}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="pslidearrow pslidearrow--l"
            aria-label="Promo sebelumnya"
            onClick={() => step(-1)}
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className="pslidearrow pslidearrow--r"
            aria-label="Promo berikutnya"
            onClick={() => step(1)}
          >
            <IconArrowRight />
          </button>
        </div>

        <p className="pslidecount" aria-live="polite">
          {active + 1} / {len}
        </p>
      </div>
    </section>
  );
}
