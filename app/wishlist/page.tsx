import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <main id="main-content" className="inner-main">
      <section className="page-hero"><p className="eyebrow">Your selection</p><h1>SAVED<br /><em>PIECES</em></h1><p>A private edit to return to, compare and share with a VSR advisor.</p></section>
      <div className="catalog-grid"><ProductGrid items={products.slice(0, 3)} /></div>
    </main>
  );
}
