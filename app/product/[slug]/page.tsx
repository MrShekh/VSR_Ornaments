import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { getProductImage, ProductImage } from "@/components/product/product-image";
import { ProductGrid } from "@/components/product/product-grid";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product.name, description: `${product.name} in ${product.material}, handcrafted by VSR Atelier.` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://vsratelier.example${getProductImage(product.spriteIndex).src}`,
    description: `${product.name}, handcrafted in ${product.material}.`,
    brand: { "@type": "Brand", name: "VSR Atelier" },
    offers: { "@type": "Offer", priceCurrency: "INR", price: product.price.replace(/[^0-9]/g, ""), availability: "https://schema.org/InStock" },
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-gallery__item"><ProductImage index={product.spriteIndex} priority sizes="(max-width: 768px) 92vw, 62vw" /></div>
          <div className="pdp-gallery__item pdp-gallery__item--campaign"><Image src="/images/campaign-ring.png" alt={`${product.name} worn`} fill sizes="31vw" /></div>
          <div className="pdp-gallery__item"><ProductImage index={product.spriteIndex} sizes="(max-width: 768px) 92vw, 31vw" /></div>
          <div className="pdp-gallery__item pdp-gallery__item--campaign"><Image src="/images/craftsmanship.png" alt={`${product.name} being finished by hand`} fill sizes="31vw" /></div>
          <div className="pdp-gallery__item"><ProductImage index={product.spriteIndex} sizes="(max-width: 768px) 92vw, 31vw" /></div>
        </div>
        <aside className="pdp-info">
          <p className="eyebrow">{product.collection} / {product.category}</p>
          <h1>{product.name}</h1>
          <p className="pdp-info__price">{product.price}</p>
          <p className="pdp-info__desc">A study in balance and light. Hand-finished to reveal the character of each diamond from every angle.</p>
          <div className="option-block"><div><span>Metal</span><span>White gold</span></div><div className="metal-options"><button aria-label="Yellow gold" /><button aria-label="Rose gold" /><button aria-label="White gold" /></div></div>
          <div className="option-block"><div><span>Size</span><span>Select</span></div></div>
          <div className="pdp-actions">
            <Link href="/contact">Request enquiry</Link>
            <Link href="/contact">Book an appointment</Link>
            <button><Heart size={14} strokeWidth={1.2} /> Add to wishlist</button>
          </div>
          <div className="pdp-accordions">
            <details><summary>Details</summary><p>{product.material}. Product code VSR-{product.spriteIndex + 1}0{product.spriteIndex + 4}.</p></details>
            <details><summary>Craftsmanship</summary><p>Designed in our studio and set, polished and inspected by hand in India.</p></details>
            <details><summary>Delivery</summary><p>Complimentary insured delivery. Most pieces are dispatched within 7–10 working days.</p></details>
            <details><summary>Jewellery care</summary><p>Annual inspection and professional cleaning are offered by appointment.</p></details>
          </div>
        </aside>
      </div>
      <section className="related"><p className="eyebrow">Continue the story</p><h2>Related pieces</h2><ProductGrid items={products.filter((item) => item.slug !== product.slug).slice(0, 4)} /></section>
    </main>
  );
}
