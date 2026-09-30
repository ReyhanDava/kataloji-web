"use client";

import { useState } from "react";
import Image from "next/image";
import { TENTANG_SLIDES } from "@/lib/data";

/** Carousel geser (scroll-snap) untuk slide interior di section Tentang Kami — arrow nav */
export function TentangCarousel() {
  const [idx, setIdx] = useState(0);

  const goTo = (i: number) => {
    const track = document.getElementById("tentangTrack");
    if (!track) return;
    const clamped = Math.max(0, Math.min(TENTANG_SLIDES.length - 1, i));
    const slide = track.querySelector<HTMLElement>(".tslide");
    const sw = slide?.offsetWidth ?? 0;
    track.scrollTo({ left: clamped * sw, behavior: "smooth" });
    setIdx(clamped);
  };

  const onScroll = () => {
    const track = document.getElementById("tentangTrack");
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".tslide");
    const sw = slide?.offsetWidth ?? 0;
    if (!sw) return;
    setIdx(Math.round(track.scrollLeft / sw));
  };

  return (
    <div className="tcarousel">
      <div className="tcarousel__track" id="tentangTrack" onScroll={onScroll}>
        {TENTANG_SLIDES.map((s) => (
          <figure className="tslide" key={s.img}>
            <Image src={s.img} alt={s.alt} width={900} height={1125} loading="lazy" />
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="tcarousel__arrow tcarousel__arrow--prev"
        onClick={() => goTo(idx - 1)}
        disabled={idx === 0}
        aria-label="Foto sebelumnya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        className="tcarousel__arrow tcarousel__arrow--next"
        onClick={() => goTo(idx + 1)}
        disabled={idx === TENTANG_SLIDES.length - 1}
        aria-label="Foto berikutnya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
