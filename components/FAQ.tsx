"use client";

import { useState } from "react";
import { FAQ } from "@/lib/data";
import { Reveal } from "./Reveal";
import { IconPlus } from "./icons";

/** Section FAQ dengan accordion — client-side open/close */
export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section section--alt" id="faq">
      <div className="container">
        <div className="section-head reveal is-in">
          <span className="eyebrow">Tanya Jawab</span>
          <h2>FAQ — pertanyaan yang sering muncul</h2>
          <p>Kalau masih ada yang belum jelas, tanyakan langsung lewat WhatsApp.</p>
        </div>
        <Reveal className="faq">
          {FAQ.map((item, i) => (
            <div className="faq__item" key={item.q}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={openIdx === i}
                aria-controls={`faq-${i}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span>{item.q}</span>
                <IconPlus />
              </button>
              <div
                id={`faq-${i}`}
                className="faq__a"
                role="region"
                aria-hidden={openIdx !== i}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
