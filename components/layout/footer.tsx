import Link from "next/link";
import { Camera, MessagesSquare, MoveUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <p className="footer-wordmark">VSR <span>ATELIER</span></p>
          <p>Objects of lasting beauty, shaped in India and made to travel through generations.</p>
          <div className="site-footer__socials">
            <a href="#" aria-label="Instagram"><Camera size={16} strokeWidth={1.2} /></a>
            <a href="#" aria-label="LinkedIn"><MessagesSquare size={16} strokeWidth={1.2} /></a>
          </div>
        </div>
        <div>
          <p className="meta-label">Client care</p>
          <Link href="/contact">Book an appointment</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/contact">Shipping & returns</Link>
          <Link href="/contact">Jewellery care</Link>
        </div>
        <div>
          <p className="meta-label">The house</p>
          <Link href="/about">Our story</Link>
          <Link href="/craftsmanship">Craftsmanship</Link>
          <Link href="/bespoke">Bespoke</Link>
          <Link href="/collections">Collections</Link>
        </div>
        <div>
          <p className="meta-label">Visit</p>
          <p>By private appointment<br />Mumbai · New Delhi</p>
          <Link href="/contact" className="footer-visit">Arrange a visit <MoveUpRight size={13} /></Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© VSR Atelier 2026</span>
        <span>India / INR</span>
        <div><Link href="#">Privacy</Link><Link href="#">Terms</Link></div>
      </div>
    </footer>
  );
}
