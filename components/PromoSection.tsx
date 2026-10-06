"use client";

import React from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight } from "./icons";

/**
 * Section promo — 3D coverflow (referensi dg.singh252525, adaptasi CSS murni).
 * Kartu = poster portrait murni; ambient background blur mengikuti poster aktif.
 * Klik kartu tengah → deskripsi + S&K muncul sebagai overlay di dalam kartu.
 * Klik kartu samping / panah / swipe untuk navigasi.
 */
export function PromoSection() {
  const len = PROMO_DETAIL.length;
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const startX = React.useRef(0);
  const dragRef = React.useRef(0);
  const movedRef = React.useRef(false);

  const step = React.useCallback(
    (dir: 1 | -1) => {
      setActive((a) => (a + dir + len) % len);
      setOpen(false);
    },
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

  const p = PROMO_DETAIL[active];

  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="section-head promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <h2>Promo minggu ini</h2>
          <p className="promohead__hint">
            Klik poster di tengah untuk melihat detail promo. Klaim langsung di
            kasir.
          </p>
        </div>

        <div
          className="pflow2stage"
          role="region"
          aria-label="Pilihan promo"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {/* ambient background — blur poster aktif */}
          <div className="pflow2bg" key={active} aria-hidden="true">
            <Image src={p.img} alt="" width={900} height={1600} draggable={false} />
          </div>

          <div
            className={`pflow2${dragging ? " is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {PROMO_DETAIL.map((item, i) => {
              let pos = (i - active + len) % len;
              if (pos > Math.floor(len / 2)) pos -= len;
              const center = pos === 0;
              const visible = Math.abs(pos) <= 1;
              return (
                <article
                  key={item.name}
                  className={`pflow2card${center ? " is-center" : ""}${
                    center && open ? " is-open" : ""
                  }`}
                  style={{
                    ["--pos" as string]: pos,
                    ["--drag" as string]: `${dragging ? dragX : 0}px`,
                    zIndex: 10 - Math.abs(pos),
                    visibility: visible ? "visible" : "hidden",
                  }}
                  onClick={() => {
                    if (movedRef.current) return;
                    if (center) setOpen((o) => !o);
                    else {
                      setActive(i);
                      setOpen(false);
                    }
                  }}
                  aria-label={
                    center
                      ? `${item.name} — ${open ? "tutup detail" : "lihat detail"}`
                      : `Lihat promo ${item.name}`
                  }
                  role="button"
                >
                  <Image
                    src={item.img}
                    alt={item.alt}
                    width={900}
                    height={1600}
                    sizes="(max-width:719px) 58vw, 300px"
                    className="pflow2card__img"
                    draggable={false}
                  />

                  {center && (
                    <>
                      <span className="pflow2card__hint" aria-hidden={!open}>
                        Detail promo
                      </span>
                      <div className="pflow2card__info" aria-hidden={!open}>
                        <span className="pflow2card__row">
                          <span className="pflow2card__name">{item.name}</span>
                          <span className="pflow2card__price">{item.price}</span>
                        </span>
                        <span className="pflow2card__note">{item.priceNote}</span>
                        <span className="pflow2card__desc">{item.desc}</span>
                        <span className="pflow2card__blocks">
                          <span className="pflow2card__block">
                            <span className="pflow2card__h">Syarat</span>
                            <ul>
                              {item.syarat.map((t, j) => (
                                <li key={j}>{t}</li>
                              ))}
                            </ul>
                          </span>
                          <span className="pflow2card__block">
                            <span className="pflow2card__h">Ketentuan</span>
                            <ul>
                              {item.ketentuan.map((t, j) => (
                                <li key={j}>{t}</li>
                              ))}
                            </ul>
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="pflow2arrow pflow2arrow--l"
            aria-label="Promo sebelumnya"
            onClick={() => step(-1)}
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            className="pflow2arrow pflow2arrow--r"
            aria-label="Promo berikutnya"
            onClick={() => step(1)}
          >
            <IconArrowRight />
          </button>
        </div>

        <p className="pflow2count" aria-live="polite">
          {active + 1} / {len}
        </p>
      </div>
    </section>
  );
}
