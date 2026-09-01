import Image from "next/image";

const productImageAssets = [
  {
    src: "/images/products/arc-earrings-v2.png",
    alt: "Sculptural platinum and diamond Arc earrings",
  },
  {
    src: "/images/products/lumen-ring-v2.png",
    alt: "Oval-cut diamond Lumen solitaire ring in platinum",
  },
  {
    src: "/images/products/trace-pendant-v2.png",
    alt: "Two-stone diamond Trace pendant in platinum",
  },
  {
    src: "/images/products/line-bracelet-v2.png",
    alt: "Platinum and diamond Line tennis bracelet",
  },
  {
    src: "/images/products/axis-band-v2.png",
    alt: "Architectural platinum and diamond Axis band",
  },
] as const;

export function getProductImage(index: number) {
  const safeIndex = ((index % productImageAssets.length) + productImageAssets.length) % productImageAssets.length;
  return productImageAssets[safeIndex];
}

export function ProductImage({
  index,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 75vw, 28vw",
}: {
  index: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const asset = getProductImage(index);

  return (
    <div className={`product-crop ${className}`}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={95}
        className="product-crop__image"
      />
    </div>
  );
}
