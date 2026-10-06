"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight } from "./icons";

/**
 * Section promo — cover-flow: satu kartu utuh (banner + deskripsi + S&K),
 * kartu aktif di tengah, samping mengecil & blur. Panah di sisi stage,
 * swipe di mobile, keyboard ←→, autoplay lembut (pause saat hover/drag).
 */
export function PromoSection() {
  const len = PROMO_DETAIL.length;
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(0);
  const dragRef = React.useRef(0);
  const reduceRef = React.useRef(false);

  const next = React.useCallback(() => setActive((a) => (a + 1) % len), [len]);
  const prev = React.useCallback(
    () => setActive((a) => (a - 1 + len) % len),
    [len]
  );

  // hormati prefers-reduced-motion
  React.useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // autoplay lembut — berhenti saat hover / drag / reduced motion
  React.useEffect(() => {
    if (hovering || dragging || reduceRef.current) return;
    const id = window.setInterval(next, 5000);
    return () => window.clearInterval(id);
  }, [hovering, dragging, next]);

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
    if (d > 60) prev();
    else if (d < -60) next();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="section-head promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <h2>Promo minggu ini</h2>
          <p className="promohead__hint">
            Geser kartu atau klik panah untuk lihat promo lain. Klaim langsung
            di kasir.
          </p>
        </div>

        <div
          className="pflowstage"
          role="region"
          aria-label="Pilihan promo"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            className={`pflow${dragging ? " is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {PROMO_DETAIL.map((item, i) => {
              // posisi melingkar: -1, 0, +1 (3 promo)
              let pos = (i - active + len) % len;
              if (pos > Math.floor(len / 2)) pos -= len;
              const isCenter = pos === 0;
              const visible = Math.abs(pos) <= 1;
              return (
                <article
                  key={item.name}
                  className={`pflowcard${isCenter ? " is-center" : ""}`}
                  style={{
                    ["--pos" as string]: pos,
                    ["--drag" as string]: `${dragging ? dragX : 0}px`,
                    zIndex: isCenter ? 10 : 5,
                    visibility: visible ? "visible" : "hidden",
                  }}
                  aria-hidden={!isCenter}
                >
                  <div className="pflowcard__img">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={900}
                      height={1600}
                      sizes="(max-width:720px) 76vw, 400px"
                      draggable={false}
                    />
                  </div>
                  <div className="pflowcard__body">
                    <div className="pflowcard__top">
                      <h3>{item.name}</h3>
                      <span className="pflowcard__price">{item.price}</span>
                    </div>
                    <p className="pflowcard__note">{item.priceNote}</p>
                    <p className="pflowcard__desc">{item.desc}</p>
                    <div className="pflowcard__blocks">
                      <div className="pflowcard__block">
                        <h4>Syarat</h4>
                        <ul>
                          {item.syarat.map((t, j) => (
                            <li key={j}>{t}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pflowcard__block">
                        <h4>Ketentuan</h4>
                        <ul>
                          {item.ketentuan.map((t, j) => (
                            <li key={j}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="pflowarrow pflowarrow--l"
            aria-label="Promo sebelumnya"
            onClick={prev}
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className="pflowarrow pflowarrow--r"
            aria-label="Promo berikutnya"
            onClick={next}
          >
            <IconArrowRight />
          </button>
        </div>

        <p className="pflowcount" aria-live="polite">
          {active + 1} / {len}
        </p>
      </div>
    </section>
  );
}
