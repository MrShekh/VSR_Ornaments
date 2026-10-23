import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/product/catalog";

export const metadata: Metadata = {
  title: "Fine Jewellery",
  description: "Explore rings, earrings, necklaces and bracelets from VSR Ornaments.",
};

export default function CollectionsPage() {
  return (
    <main id="main-content" className="inner-main">
      <section className="page-hero">
        <p className="eyebrow">The jewellery</p>
        <h1>FINE<br /><em>JEWELLERY</em></h1>
        <p>An exploration of form, light and craftsmanship—made in limited numbers and finished by hand.</p>
      </section>
      <Suspense fallback={<p className="catalog-loading">Loading jewellery…</p>}><Catalog /></Suspense>
    </main>
  );
}
