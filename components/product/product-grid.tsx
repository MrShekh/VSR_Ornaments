import Link from "next/link";
import { productMaterial, type Metal, type Product } from "@/data/products";
import { ProductImage } from "./product-image";
import { WishlistButton } from "./wishlist-button";

export function ProductGrid({ items, compact = false, metal = "white" }: { items: Product[]; compact?: boolean; metal?: Metal }) {
  return (
    <div className={`product-grid ${compact ? "product-grid--compact" : ""}`}>
      {items.map((product, index) => (
        <article className="product-card" key={product.slug}>
          <div className="product-card__visual">
            <Link href={`/product/${product.slug}?metal=${metal}`} className="product-card__image">
              <ProductImage product={product} metal={metal} priority={index < 2} />
            </Link>
            <WishlistButton product={product} metal={metal} compact />
            {product.isNew && <span className="product-card__badge">New</span>}
          </div>
          <div className="product-card__meta">
            <p>{product.category}</p>
            <h3><Link href={`/product/${product.slug}?metal=${metal}`}>{product.name}</Link></h3>
            <span>{productMaterial(product, metal)}</span>
            <strong>From {product.price}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
