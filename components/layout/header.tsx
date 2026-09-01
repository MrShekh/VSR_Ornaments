"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { SearchOverlay } from "./search-overlay";

const primary = [
  ["Jewellery", "/collections"],
  ["Collections", "/collections"],
  ["New Arrivals", "/collections?sort=new"],
];
const secondary = [
  ["Bespoke", "/bespoke"],
  ["Our Story", "/about"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <div className="announcement">COMPLIMENTARY SHIPPING · PRIVATE APPOINTMENTS · WORLDWIDE DELIVERY</div>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <nav className="site-nav" aria-label="Primary navigation">
          <div className="site-nav__group site-nav__group--left">
            {primary.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
          <Link className="wordmark" href="/" aria-label="VSR Atelier home">
            <small>FINE JEWELLERY HOUSE</small>
            <strong>VSR</strong>
            <span>ATELIER</span>
          </Link>
          <div className="site-nav__group site-nav__group--right">
            {secondary.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
            <button onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={15} strokeWidth={1.25} /></button>
            <Link href="/contact" aria-label="Account"><UserRound size={15} strokeWidth={1.25} /></Link>
            <Link href="/wishlist" aria-label="Shopping bag"><ShoppingBag size={15} strokeWidth={1.25} /></Link>
          </div>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={23} strokeWidth={1.2} />
          </button>
          <button className="mobile-search-button" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={21} strokeWidth={1.2} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={25} strokeWidth={1.1} /></button>
            <p className="eyebrow">VSR Atelier</p>
            <nav>
              {[...primary, ["Bespoke", "/bespoke"], ["Craftsmanship", "/craftsmanship"], ["Our Story", "/about"]].map(([label, href], index) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 + index * 0.06 }}>
                  <Link href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu__utility">
              <button onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>Search</button>
              <Link href="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>Private appointment</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
