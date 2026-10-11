"use client";

import { useEffect, useMemo, useState } from "react";
import { MENU_FULL, MENU_TABS, fprice, menuSlug } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/** Baca ?kategori= dari URL tanpa next/navigation (ringan) */
function useParam(param: string): string | null {
  const [val, setVal] = useState<string | null>(null);
  useEffect(() => {
    setVal(new URLSearchParams(window.location.search).get(param));
  }, [param]);
  return val;
}

export default function MenuPage() {
  const catParam = useParam("kategori");
  const [cat, setCat] = useState<string>("all");

  useEffect(() => {
    if (catParam) setCat(catParam);
  }, [catParam]);

  const cats = useMemo(
    () => (cat === "all" ? MENU_FULL : MENU_FULL.filter((c) => c.id === cat)),
    [cat]
  );

  return (
    <>
      <Navbar />

      <main>
        <div className="container">
          <div className="menupage__head">
            <span className="eyebrow">Menu</span>
            <h1>Menu yang bisa kamu cicipi</h1>
            <p>
              Pilih kategori menu favoritmu. Pemesanan dilakukan langsung di kasir.
            </p>
          </div>

          <div className="menubar">
            <div className="menubar__tabs" role="tablist" aria-label="Kategori menu">
              {MENU_TABS.map((t) => (
                <button
                  key={t.id}
                  className={`tab${cat === t.id ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={cat === t.id}
                  onClick={() => setCat(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {cats.map((c) => (
            <section className={`menupanel menupanel--${c.id}`} key={c.id} aria-label={c.title}>
              <header className="menupanel__head">
                <h2>{c.title}</h2>
                <p>{c.desc}</p>
              </header>

              {c.pick && (
                <div className="menupick" id={menuSlug(c.pick.name)}>
                  <figure className="menupick__media">
                    {c.pick.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.pick.img} alt={c.pick.name} loading="lazy" />
                    ) : (
                      <span className="menupick__ph" aria-hidden="true">
                        {c.pick.name.charAt(0)}
                      </span>
                    )}
                  </figure>
                  <div className="menupick__body">
                    <span className="menupick__label">Pilihan kami</span>
                    <h3 className="menupick__name">{c.pick.name}</h3>
                    <p className="menupick__why">{c.pick.why}</p>
                    <span className="menupick__price">{fprice(c.pick.price)}</span>
                  </div>
                </div>
              )}

              {c.subs.map((s) => (
                <div className="menusub" key={s.title}>
                  <h3 className="menusub__title">{s.title}</h3>
                  <div className="menulist">
                    {s.items.map((it) => (
                      <div className="menuitem" key={it.name} id={menuSlug(it.name)}>
                        <span className="menuitem__thumb">
                          {it.img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={it.img} alt={it.name} loading="lazy" />
                          ) : (
                            it.name.charAt(0)
                          )}
                        </span>
                        <span className="menuitem__name">
                          {it.name}
                          {it.label ? (
                            <span className="menuitem__label">{it.label}</span>
                          ) : null}
                        </span>
                        <span className="menuitem__price">{fprice(it.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <p className="menufoot">Harga di atas belum termasuk pajak.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
