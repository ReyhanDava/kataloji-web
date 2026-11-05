"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/** Navbar sticky + toggle mobile — port dari .nav di app.js */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // sinkronkan state React dengan class body (CSS pakai body.nav-open)
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const links = [
    { href: "/#tentang", label: "Tentang" },
    { href: "/#menu", label: "Menu" },
    { href: "/#promo", label: "Promo" },
    { href: "/#event", label: "Event" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#kontak", label: "Kontak" },
    { href: "/member", label: "Cek Poin Member" },
  ];

  return (
    <header className={`nav${stuck ? " is-stuck" : ""}`}>
      <div className="container nav__inner">
        <Link className="brand" href="/#home" aria-label="Kataloji beranda">
          <Image src="/assets/logo-navbar.png" alt="Kataloji coffee and eatery" width={1600} height={722} priority />
        </Link>
        <nav
          className="nav__links"
          id="mainnav"
          aria-label="Navigasi utama"
          onClick={() => setOpen(false)}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <Link
            className="btn btn--ghost"
            href="/member"
            style={{
              padding: ".45rem .9rem",
              fontSize: "var(--fs-xs)",
              minHeight: "36px",
              whiteSpace: "nowrap",
            }}
          >
            Cek Poin
          </Link>
          <button
            className="nav__toggle"
            type="button"
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="mainnav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bars">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      {open && <style>{`body{overflow:hidden}`}</style>}
    </header>
  );
}
