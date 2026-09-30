"use client";

import { useState } from "react";
import Image from "next/image";
import { TENTANG_SLIDES } from "@/lib/data";

/** Carousel geser (scroll-snap) untuk slide interior di section Tentang Kami */
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
        {TENTANG_SLIDES.map((s, i) => (
          <figure className={`tslide${i === idx ? " is-active" : ""}`} key={s.img}>
            <Image src={s.img} alt={s.alt} width={900} height={1125} loading="lazy" />
          </figure>
        ))}
      </div>

      <figcaption className="tcarousel__caption">
        {TENTANG_SLIDES[idx]?.caption}
      </figcaption>

      <div className="tcarousel__nav" role="tablist" aria-label="Foto Kataloji">
        {TENTANG_SLIDES.map((s, i) => (
          <button
            key={s.img}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Foto ${i + 1}`}
            className={`tcarousel__dot${i === idx ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
