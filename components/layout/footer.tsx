import Link from "next/link";
import { Camera, MessagesSquare, MoveUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <BrandMark className="brand-mark--footer" />
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
          <p>08 Mandaliya Chamber, 2nd Floor<br />Juni Gadhiwad, Soni Bajar, Rajkot</p>
          <a href="tel:+918905606489">+91 89056 06489</a>
          <a href="mailto:info@vsrornaments.com">info@vsrornaments.com</a>
          <Link href="/contact" className="footer-visit">Arrange a visit <MoveUpRight size={13} /></Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© VSR Ornaments Pvt. Ltd. 2026</span>
        <span>India / INR</span>
        <div><Link href="#">Privacy</Link><Link href="#">Terms</Link></div>
      </div>
    </footer>
  );
}
