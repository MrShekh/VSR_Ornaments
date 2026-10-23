import type { Metadata } from "next";
import { Wishlist } from "@/components/product/wishlist";
export const metadata: Metadata = { title: "Wishlist" };
export default function WishlistPage() {
  return (
    <main id="main-content" className="inner-main">
      <section className="page-hero"><p className="eyebrow">Your selection</p><h1>SAVED<br /><em>PIECES</em></h1><p>Your chosen pieces and metal finishes, saved on this browser for your next visit.</p></section>
      <Wishlist />
    </main>
  );
}
