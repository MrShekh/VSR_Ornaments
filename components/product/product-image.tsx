import Image from "next/image";
import { getMetal, type Metal, type Product } from "@/data/products";

export function getProductImage(product: Product, metal: Metal = "white") {
  return `/images/products/${product.imageKey}-${metal}-gallery.png`;
}

export function ProductImage({ product, metal = "white", view = "piece", priority = false, className = "", sizes = "(max-width: 760px) 100vw, (max-width: 1100px) 66vw, 50vw" }: {
  product: Product;
  metal?: Metal;
  view?: "piece" | "model";
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`product-crop product-crop--${view} ${className}`}>
      <Image
        src={getProductImage(product, metal)}
        alt={`${product.name} in ${getMetal(metal).label.toLowerCase()}${view === "model" ? ", worn on a model" : ", close-up"}`}
        width={2048}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        quality={95}
        className="product-crop__image"
      />
    </div>
  );
}
