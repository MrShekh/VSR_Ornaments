"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./use-wishlist";
import type { Metal, Product } from "@/data/products";

export function WishlistButton({ product, metal = "white", compact = false }: { product: Product; metal?: Metal; compact?: boolean }) {
  const wishlist = useWishlist();
  const entry = { slug: product.slug, metal };
  const saved = wishlist.has(entry);
  return (
    <button type="button" className={compact ? "product-card__wish" : "wishlist-action"} aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`} aria-pressed={saved} onClick={() => saved ? wishlist.remove(entry) : wishlist.save(entry)}>
      <Heart size={compact ? 16 : 18} strokeWidth={1.25} fill={saved ? "currentColor" : "none"} />
      {!compact && <span>{saved ? "Saved to wishlist" : "Add to wishlist"}</span>}
    </button>
  );
}
