import { getProduct, isMetal, type Metal } from "../data/products";

export type WishlistEntry = { slug: string; metal: Metal };
export const wishlistKey = (entry: WishlistEntry) => `${entry.slug}:${entry.metal}`;
export function parseWishlist(raw: string): WishlistEntry[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const unique = new Map<string, WishlistEntry>();
    for (const item of value) {
      if (item && typeof item.slug === "string" && getProduct(item.slug) && isMetal(item.metal)) {
        const entry = { slug: item.slug, metal: item.metal };
        unique.set(wishlistKey(entry), entry);
      }
    }
    return [...unique.values()];
  } catch { return []; }
}
export function saveWishlistEntry(items: WishlistEntry[], entry: WishlistEntry, previous?: WishlistEntry) {
  const remaining = items.filter((item) => wishlistKey(item) !== wishlistKey(entry) && (!previous || wishlistKey(item) !== wishlistKey(previous)));
  return [...remaining, entry];
}
