"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight } from "./icons";

/**
 * Section promo — card stack 3D (referensi fan-deck, tanpa framer-motion).
 * Kartu aktif di depan, lainnya muncul di belakang kiri-kanan.
 * Klik kartu samping / drag kartu aktif / keyboard ←→ untuk ganti promo.
 */
export function PromoSection() {
  const len = PROMO_DETAIL.length;
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const dragRef = useRef(0);

  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive((a) => Math.min(len - 1, a + 1)), [len]);
  const go = useCallback((i: number) => setActive(Math.max(0, Math.min(len - 1, i))), [len]);

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
    const THRESHOLD = 70;
    if (d > THRESHOLD) prev();
    else if (d < -THRESHOLD) next();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // cegah scroll halaman saat drag horizontal di sentuhan
  useEffect(() => {
    document.documentElement.style.setProperty("scroll-behavior", "smooth");
  }, []);

  const p = PROMO_DETAIL[active];

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="section-head promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <div className="promohead__row">
            <h2>Promo minggu ini</h2>
            <div className="promohead__nav">
              <button
                className="promonav__btn"
                aria-label="Promo sebelumnya"
                onClick={prev}
                disabled={active === 0}
              >
                <IconArrowLeft />
              </button>
              <span className="promonav__count">{active + 1} / {len}</span>
              <button
                className="promonav__btn"
                aria-label="Promo berikutnya"
                onClick={next}
                disabled={active === len - 1}
              >
                <IconArrowRight />
              </button>
            </div>
          </div>
          <p className="promohead__hint">Geser kartu atau klik kartu di belakang untuk lihat promo lain.</p>
        </div>

        {/* STAGE — tumpukan kartu */}
        <div
          className="deckstage"
          role="region"
          aria-label="Pilihan promo"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className={`deck${dragging ? " is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {PROMO_DETAIL.map((item, i) => {
              const off = i - active; // -2..2
              const abs = Math.abs(off);
              const isActive = off === 0;
              // sembunyikan yang terlalu jauh
              if (abs > 2) return null;
              const style: React.CSSProperties = {
                ["--off" as string]: off,
                ["--abs" as string]: abs,
                ["--drag" as string]: `${isActive ? dragX : 0}px`,
                zIndex: 100 - abs,
              };
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`deckcard${isActive ? " is-active" : ""}`}
                  style={style}
                  onClick={() => !dragging && !isActive && go(i)}
                  aria-label={isActive ? item.name : `Lihat promo ${item.name}`}
                  aria-current={isActive}
                >
                  <span className="deckcard__img">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={900}
                      height={1600}
                      sizes="(max-width:720px) 78vw, 380px"
                      draggable={false}
                    />
                  </span>
                  <span className="deckcard__meta">
                    <span className="deckcard__name">{item.name}</span>
                    <span className="deckcard__price">{item.price}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAIL promo aktif — ikut berganti */}
        <div className="promodetail" key={active}>
          <div className="promodetail__top">
            <h3>{p.name}</h3>
            <div className="promodetail__price">
              <span className="now">{p.price}</span>
              <span className="note">{p.priceNote}</span>
            </div>
          </div>
          <p className="promodetail__desc">{p.desc}</p>
          <div className="promodetail__cols">
            <div className="promodetail__block">
              <h4>Syarat</h4>
              <ul>{p.syarat.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="promodetail__block">
              <h4>Ketentuan</h4>
              <ul>{p.ketentuan.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
