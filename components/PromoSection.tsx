import Image from "next/image";
import { PROMO_DETAIL } from "@/lib/data";
import { Reveal } from "./Reveal";

/** Section promo — daftar promo: banner kecil kiri + detail (deskripsi, syarat, ketentuan) kanan */
export function PromoSection() {
  return (
    <section className="section" id="promo">
      <div className="container">
        <div className="section-head reveal is-in promohead">
          <span className="eyebrow">Promo Berjalan</span>
          <div className="promohead__row">
            <h2>Promo minggu ini</h2>
            <p>Klaim langsung di kasir. Jangan sampai kelewatan.</p>
          </div>
        </div>

        <div className="promolist">
          {PROMO_DETAIL.map((p) => (
            <Reveal className="promorow" key={p.name} as="article">
              <div className="promorow__banner">
                <Image src={p.img} alt={p.alt} width={900} height={1600} sizes="(max-width:860px) 45vw, 220px" />
              </div>

              <div className="promorow__info">
                <div className="promorow__top">
                  <h3>{p.name}</h3>
                  <div className="promorow__price">
                    <span className="now">{p.price}</span>
                    <span className="note">{p.priceNote}</span>
                  </div>
                </div>

                <p className="promorow__desc">{p.desc}</p>

                <div className="promorow__block">
                  <h4>Syarat</h4>
                  <ul>
                    {p.syarat.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="promorow__block">
                  <h4>Ketentuan</h4>
                  <ul>
                    {p.ketentuan.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
