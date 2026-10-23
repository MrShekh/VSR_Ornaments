import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/product/catalog";
export const metadata: Metadata = { title: "Search" };
export default function SearchPage() {
  return (
    <main id="main-content" className="inner-main">
      <section className="page-hero"><p className="eyebrow">Discover</p><h1>SEARCH<br /><em>JEWELLERY</em></h1></section>
      <Suspense fallback={<p className="catalog-loading">Loading jewellery…</p>}><Catalog searchPage /></Suspense>
    </main>
  );
}
