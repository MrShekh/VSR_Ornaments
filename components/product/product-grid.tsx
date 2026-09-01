import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductImage } from "./product-image";

export function ProductGrid({
  items,
  compact = false,
}: {
  items: Product[];
  compact?: boolean;
}) {
  return (
    <div className={`product-grid ${compact ? "product-grid--compact" : ""}`}>
      {items.map((product, index) => (
        <article className="product-card" key={product.slug} data-cursor="EXPLORE">
          <Link href={`/product/${product.slug}`} className="product-card__image">
            <ProductImage index={product.spriteIndex} priority={index < 2} />
            <span className="product-card__wish" aria-label="Add to wishlist">
              <Heart size={15} strokeWidth={1.25} />
            </span>
          </Link>
          <div className="product-card__meta">
            <p>{product.category}</p>
            <h3>
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <span>{product.material}</span>
            <strong>{product.price}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
