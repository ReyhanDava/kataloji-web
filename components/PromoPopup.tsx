"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { POPUP_ITEMS, POPUP_PROMO } from "@/lib/data";

const SESSION_KEY = "kataloji_popup_closed";

function IconChevron({ dir = "left" }: { dir?: "left" | "right" }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/**
 * Popup promo — carousel geser ala cover-flow, pakai scroll-snap native.
 * Item tengah tajam & membesar; item samping blur/fade.
 * Geser dengan drag/swipe native; panah & keyboard juga berfungsi.
 */
export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setOpen(true), 2600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(false);
  };

  // sinkronkan state active saat user scroll/swipe manual
  const onScroll = () => {
    const v = viewRef.current;
    if (!v) return;
    const slides = v.querySelectorAll<HTMLElement>(".popup__slide");
    if (!slides.length) return;
    const sw = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(v).columnGap || "0") || 0;
    const step = sw + gap;
    if (step <= 0) return;
    const idx = Math.round(v.scrollLeft / step);
    if (idx !== active) setActive(Math.max(0, Math.min(POPUP_ITEMS.length - 1, idx)));
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, active]);

  if (!POPUP_PROMO.enabled || !open) return null;

  const goTo = (i: number) => {
    const v = viewRef.current;
    if (!v) return;
    const idx = Math.max(0, Math.min(POPUP_ITEMS.length - 1, i));
    const slides = v.querySelectorAll<HTMLElement>(".popup__slide");
    const sw = slides[0]?.offsetWidth ?? 0;
    const gap = parseFloat(getComputedStyle(v).columnGap || "0") || 0;
    v.scrollTo({ left: idx * (sw + gap), behavior: "smooth" });
    setActive(idx);
  };

  return (
    <div className="popup__backdrop" role="dialog" aria-modal="true" aria-label="Promo berjalan" onClick={close}>
      <div className="popup__wrap" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" type="button" onClick={close} aria-label="Tutup promo">
          ×
        </button>

        <div className="popup__stage">
          <button
            className="popup__arrow popup__arrow--prev"
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Promo sebelumnya"
          >
            <IconChevron dir="left" />
          </button>

          <div
            ref={viewRef}
            className="popup__viewport"
            onScroll={onScroll}
          >
            {POPUP_ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <div
                  key={item.img}
                  className={`popup__slide${isActive ? " is-active" : ""}`}
                  aria-hidden={!isActive}
                  onClick={() => { if (!isActive) goTo(i); }}
                >
                  <Image
                    src={item.img}
                    alt={item.alt}
                    width={900}
                    height={1600}
                    sizes="(max-width: 480px) 62vw, 240px"
                    draggable={false}
                    priority
                  />
                  <span className="popup__slidecap">{item.caption}</span>
                </div>
              );
            })}
          </div>

          <button
            className="popup__arrow popup__arrow--next"
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === POPUP_ITEMS.length - 1}
            aria-label="Promo berikutnya"
          >
            <IconChevron dir="right" />
          </button>
        </div>

        <div className="popup__dots" role="tablist" aria-label="Pilih promo">
          {POPUP_ITEMS.map((p, i) => (
            <button
              key={p.img}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Promo ${i + 1}`}
              className={`popup__dot${i === active ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="popup__actions">
          <Link className="btn btn--sm" href={POPUP_PROMO.ctaHref} onClick={close}>
            {POPUP_PROMO.ctaLabel}
          </Link>
          <button type="button" className="popup__dismiss" onClick={close}>
            {POPUP_PROMO.dismissLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
