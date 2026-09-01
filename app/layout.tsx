import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/layout/custom-cursor";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500"],
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vsratelier.example"),
  title: { default: "VSR Atelier — Fine Jewellery, Shaped by Light", template: "%s — VSR Atelier" },
  description: "An independent fine jewellery house creating objects of lasting beauty through light, form and exceptional Indian craftsmanship.",
  openGraph: {
    title: "VSR Atelier — Fine Jewellery, Shaped by Light",
    description: "Objects of lasting beauty, crafted with intention.",
    type: "website",
    images: [{ url: "/images/campaign-hero.png", width: 1728, height: 864 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <CustomCursor />
      </body>
    </html>
  );
}
