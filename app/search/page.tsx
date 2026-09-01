import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <main id="main-content" className="inner-main">
      <section className="page-hero"><p className="eyebrow">Discover</p><h1>SEARCH<br /><em>JEWELLERY</em></h1><label className="search-overlay__field" style={{ width: "min(780px, 90vw)", marginTop: 50 }}><span className="sr-only">Search jewellery</span><input placeholder="RINGS, DIAMONDS, COLLECTIONS" /><Search strokeWidth={1} /></label></section>
      <section className="related"><p className="eyebrow">Popular pieces</p><h2>Pieces of note</h2><ProductGrid items={products.slice(0, 4)} /></section>
    </main>
  );
}
