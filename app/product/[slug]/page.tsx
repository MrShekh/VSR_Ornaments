import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, matchesCategory, products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductDetails } from "@/components/product/product-details";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return { title: product.name, description: `Explore ${product.name} in white gold, gold and rose gold at VSR Ornaments.` };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug && matchesCategory(item, product.category));
  return (
    <main id="main-content">
      <Suspense fallback={<p className="catalog-loading">Loading your piece…</p>}><ProductDetails product={product} /></Suspense>
      <section className="related"><p className="eyebrow">Continue the story</p><h2>{related.length ? "Related pieces" : "Explore the collection"}</h2><ProductGrid items={related.length ? related : products.filter((item) => item.slug !== product.slug).slice(0, 4)} /></section>
    </main>
  );
}
