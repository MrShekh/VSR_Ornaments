"use client";
import Link from "next/link";
import { getProduct, productMaterial } from "@/data/products";
import { wishlistKey } from "@/lib/wishlist";
import { ProductImage } from "./product-image";
import { MetalSelector } from "./metal-selector";
import { useWishlist } from "./use-wishlist";

export function Wishlist() {
  const wishlist = useWishlist();
  if (!wishlist.ready) return <p className="catalog-loading">Loading your saved pieces…</p>;
  return (
    <section aria-label="Saved jewellery" className="wishlist-section">
      <p className="wishlist-count" role="status">{wishlist.items.length} saved {wishlist.items.length === 1 ? "piece" : "pieces"}</p>
      {wishlist.storageUnavailable && <p role="status">Browser storage is unavailable; selections are saved for this visit only.</p>}
      {!wishlist.items.length ? <div className="catalog-empty"><h2>Your wishlist is waiting</h2><p>Tap the heart on a piece to save it here with your chosen metal.</p><Link href="/collections">Explore jewellery ↗</Link></div> :
      <div className="wishlist-grid">{wishlist.items.map((entry) => {
        const product = getProduct(entry.slug);
        if (!product) return null;
        return <article className="wishlist-card" key={wishlistKey(entry)}>
          <Link className="wishlist-card__images" href={`/product/${entry.slug}?metal=${entry.metal}`}>
            <ProductImage product={product} metal={entry.metal} sizes="(max-width: 760px) 100vw, 50vw" />
            <ProductImage product={product} metal={entry.metal} view="model" sizes="(max-width: 760px) 100vw, 50vw" />
          </Link>
          <p className="eyebrow">{product.category}</p>
          <h2><Link href={`/product/${entry.slug}?metal=${entry.metal}`}>{product.name}</Link></h2>
          <p className="wishlist-material">{productMaterial(product, entry.metal)}</p>
          <MetalSelector value={entry.metal} onChange={(metal) => wishlist.save({ slug: entry.slug, metal }, entry)} label={`Metal for ${product.name}`} />
          <div className="wishlist-card__actions"><span>From {product.price}</span><button type="button" onClick={() => wishlist.remove(entry)} aria-label={`Remove ${product.name} from wishlist`}>Remove</button></div>
        </article>;
      })}</div>}
    </section>
  );
}
