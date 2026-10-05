"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { IconArrowLeft, IconArrowRight } from "./icons";

/** Section promo — carousel slide ke samping untuk pilih promo, bukan scroll panjang ke bawah */
export function PromoSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    setCanPrev(x > 4);
    setCanNext(x < max - 4);
    // hitung slide aktif terdekat
    const items = Array.from(el.querySelectorAll<HTMLElement>(".promoslide"));
    let best = 0, bestDist = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft - x);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateNav();
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".promoslide");
    const target = items[idx];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, active - 1));
  const next = () => scrollTo(Math.min(PROMO_DETAIL.length - 1, active + 1));

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
                disabled={!canPrev}
              >
                <IconArrowLeft />
              </button>
              <span className="promonav__count">{active + 1} / {PROMO_DETAIL.length}</span>
              <button
                className="promonav__btn"
                aria-label="Promo berikutnya"
                onClick={next}
                disabled={!canNext}
              >
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="promotrack" ref={trackRef}>
          {PROMO_DETAIL.map((p) => (
            <article className="promoslide" key={p.name}>
              <div className="promoslide__banner">
                <Image
                  src={p.img}
                  alt={p.alt}
                  width={900}
                  height={1600}
                  sizes="(max-width:860px) 85vw, 320px"
                />
              </div>
              <div className="promoslide__info">
                <div className="promoslide__top">
                  <h3>{p.name}</h3>
                  <div className="promoslide__price">
                    <span className="now">{p.price}</span>
                    <span className="note">{p.priceNote}</span>
                  </div>
                </div>
                <p className="promoslide__desc">{p.desc}</p>
                <div className="promoslide__block">
                  <h4>Syarat</h4>
                  <ul>{p.syarat.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
                <div className="promoslide__block">
                  <h4>Ketentuan</h4>
                  <ul>{p.ketentuan.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
