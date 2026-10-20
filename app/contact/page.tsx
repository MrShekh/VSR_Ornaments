import type { Metadata } from "next";
import Image from "next/image";
import { EditorialLink } from "@/components/ui/editorial-link";

export const metadata: Metadata = { title: "Contact", description: "Arrange a private appointment with VSR Ornaments." };

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-grid">
      <div className="contact-grid__image"><Image src="/images/campaign-earring-cream-v2.png" alt="Private appointment at VSR Ornaments" fill priority sizes="50vw" /></div>
      <section className="contact-grid__form">
        <p className="eyebrow">Private appointments</p><h1>LET US<br /><em>WELCOME YOU.</em></h1>
        <p>Meet with a VSR advisor in Rajkot, or begin a private consultation from anywhere in the world.</p>
        <address className="contact-details">
          <strong>VSR Ornaments Pvt. Ltd.</strong>
          <span>08 Mandaliya Chamber, 2nd Floor, Juni Gadhiwad, Opp. Jalaram Chiki, Soni Bajar, Rajkot.</span>
          <a href="tel:+918905606489">+91 89056 06489</a>
          <a href="mailto:info@vsrornaments.com">info@vsrornaments.com</a>
        </address>
        <form>
          <label>First name<input name="firstName" autoComplete="given-name" required /></label>
          <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
          <label>Email<input type="email" name="email" autoComplete="email" required /></label>
          <label>Telephone<input type="tel" name="phone" autoComplete="tel" /></label>
          <label>Your enquiry<textarea name="message" rows={4} /></label>
          <EditorialLink href="/contact?sent=true">Send enquiry</EditorialLink>
        </form>
      </section>
    </main>
  );
}
