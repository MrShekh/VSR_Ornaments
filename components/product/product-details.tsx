"use client";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getMetal, productMaterial, type Product } from "@/data/products";
import { ProductImage } from "./product-image";
import { MetalSelector } from "./metal-selector";
import { WishlistButton } from "./wishlist-button";
import { useWishlist } from "./use-wishlist";

export function ProductDetails({ product }: { product: Product }) {
  const params = useSearchParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const metal = getMetal(params.get("metal"));
  const wishlist = useWishlist();
  return (
    <div className="pdp">
      <div className="pdp-gallery" aria-label="Selected metal gallery" aria-busy={pending}>
        <figure className="pdp-gallery__item"><ProductImage product={product} metal={metal.id} priority sizes="(max-width: 760px) 200vw, 70vw" /><figcaption>THE PIECE / {metal.label}</figcaption></figure>
        <figure className="pdp-gallery__item"><ProductImage product={product} metal={metal.id} view="model" priority sizes="(max-width: 760px) 200vw, 70vw" /><figcaption>WORN / {metal.label}</figcaption></figure>
        <p className="pdp-preview-note">Illustrative previews of the selected finish. Final proportions, metal and stone specifications are confirmed by the atelier.</p>
      </div>
      <aside className="pdp-info">
        <p className="eyebrow">{product.collection} / {product.category}</p>
        <h1>{product.name}</h1>
        <p className="pdp-info__price">From {product.price}</p>
        <p className="pdp-info__desc">A study in balance and light. Explore the piece in your preferred finish, then save your selection or speak with the atelier.</p>
        <div className="option-block">
          <div><span>Metal</span><span aria-live="polite">{metal.label}</span></div>
          <MetalSelector value={metal.id} onChange={(value) => startTransition(() => router.replace(`/product/${product.slug}?metal=${value}`, { scroll: false }))} />
        </div>
        <p className="pdp-selected-material">{productMaterial(product, metal.id)}</p>
        <p className="filter-note">Price shown is indicative. Request a quote for your chosen metal and size.</p>
        <div className="pdp-actions">
          <Link href="/contact">Request enquiry</Link>
          <Link href="/contact">Book an appointment</Link>
          <WishlistButton product={product} metal={metal.id} />
          <Link className="pdp-wishlist-link" href="/wishlist">View wishlist ({wishlist.items.length}) ↗</Link>
        </div>
        {wishlist.storageUnavailable && <p role="status">Browser storage is unavailable; this selection is saved for this visit only.</p>}
        <div className="pdp-accordions">
          <details><summary>Details</summary><p>{productMaterial(product, metal.id)}. Product code {product.code}. All specifications are subject to confirmation.</p></details>
          <details><summary>Fitting & care</summary><p>Our atelier will confirm sizing and care guidance when you enquire.</p></details>
          <details><summary>Delivery</summary><p>Delivery timing and availability will be confirmed with your selected piece and finish.</p></details>
        </div>
      </aside>
    </div>
  );
}
