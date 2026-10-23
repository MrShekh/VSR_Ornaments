export const categories = ["Rings", "Earrings", "Necklaces", "Bracelets", "Pendants"] as const;
export type Category = (typeof categories)[number];
export const metals = [
  { id: "white", label: "White gold", material: "18k White Gold" },
  { id: "gold", label: "Gold", material: "18k Gold" },
  { id: "rose", label: "Rose gold", material: "18k Rose Gold" },
] as const;
export type Metal = (typeof metals)[number]["id"];
export type Product = {
  slug: string; code: string; name: string; category: Category; secondaryCategories?: Category[];
  collection: string; material: string; carats: string; price: string; priceValue: number;
  imageKey: string; isNew: boolean; arrivalOrder: number; keywords: string[];
};

// Illustrative catalogue: replace images, specifications and prices with approved
// VSR inventory before launch. Each entry represents a distinct pictured design.
export const products: Product[] = [
  { slug: "arc-diamond-earrings", code: "VSR-ARC-01", name: "Arc Diamond Earrings", category: "Earrings", collection: "Form I", material: "18k White Gold · 1.42 ct", carats: "1.42 ct", price: "₹ 2,85,000", priceValue: 285000, imageKey: "arc", isNew: true, arrivalOrder: 5, keywords: ["drop", "curved", "diamond"] },
  { slug: "lumen-oval-ring", code: "VSR-LUM-02", name: "Lumen Oval Ring", category: "Rings", collection: "Light Studies", material: "18k White Gold · 1.20 ct", carats: "1.20 ct", price: "₹ 4,60,000", priceValue: 460000, imageKey: "lumen", isNew: true, arrivalOrder: 4, keywords: ["solitaire", "engagement", "oval", "diamond"] },
  { slug: "trace-diamond-pendant", code: "VSR-TRA-03", name: "Trace Diamond Pendant", category: "Necklaces", secondaryCategories: ["Pendants"], collection: "Form I", material: "18k White Gold · 0.58 ct", carats: "0.58 ct", price: "₹ 1,35,000", priceValue: 135000, imageKey: "trace", isNew: true, arrivalOrder: 3, keywords: ["chain", "drop", "diamond"] },
  { slug: "line-tennis-bracelet", code: "VSR-LIN-04", name: "Line Tennis Bracelet", category: "Bracelets", collection: "Continuum", material: "18k White Gold · 4.80 ct", carats: "4.80 ct", price: "₹ 6,90,000", priceValue: 690000, imageKey: "line", isNew: false, arrivalOrder: 2, keywords: ["tennis", "diamond"] },
  { slug: "axis-diamond-band", code: "VSR-AXI-05", name: "Axis Diamond Band", category: "Rings", collection: "Continuum", material: "18k White Gold · 0.82 ct", carats: "0.82 ct", price: "₹ 2,10,000", priceValue: 210000, imageKey: "axis", isNew: false, arrivalOrder: 1, keywords: ["band", "wedding", "diamond"] },
];
export const collections = [...new Set(products.map((product) => product.collection))];
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const isMetal = (value: unknown): value is Metal => metals.some((metal) => metal.id === value);
export const getMetal = (value?: string | null) => metals.find((metal) => metal.id === value) ?? metals[0];
export const productMaterial = (product: Product, metal: Metal) => `${getMetal(metal).material} · ${product.carats}`;

const normalize = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const categoryWords: Record<string, Category> = {
  ring: "Rings", rings: "Rings", band: "Rings", bands: "Rings",
  earring: "Earrings", earrings: "Earrings",
  necklace: "Necklaces", necklaces: "Necklaces",
  bracelet: "Bracelets", bracelets: "Bracelets",
  pendant: "Pendants", pendants: "Pendants",
};
export const getCategory = (value: string): Category | undefined => categoryWords[normalize(value)];
export const matchesCategory = (product: Product, category: Category) => product.category === category || !!product.secondaryCategories?.includes(category);
export function matchesSearch(product: Product, query: string) {
  const tokens = normalize(query).split(/[^a-z0-9]+/).filter(Boolean);
  const words = normalize([product.name, product.collection, product.material, ...product.keywords, ...metals.map((metal) => metal.material)].join(" ")).split(/[^a-z0-9]+/);
  return tokens.every((token) => {
    const category = getCategory(token);
    // Whole category matching prevents "ring" from matching "earring".
    if (category) return matchesCategory(product, category);
    const singular = token === "diamonds" ? "diamond" : token;
    return words.some((word) => word.startsWith(singular));
  });
}
export type CatalogFilters = { q: string; category: string; collection: string; metal: string; price: string; sort: string; newOnly: boolean };
export const defaultFilters: CatalogFilters = { q: "", category: "", collection: "", metal: "", price: "", sort: "featured", newOnly: false };
export const priceRanges = [
  { id: "under-200000", label: "Under ₹ 2,00,000", min: 0, max: 200000 },
  { id: "200000-500000", label: "₹ 2,00,000 – ₹ 5,00,000", min: 200000, max: 500001 },
  { id: "over-500000", label: "Above ₹ 5,00,000", min: 500001, max: Infinity },
];
export function readCatalogFilters(params: Pick<URLSearchParams, "get">): CatalogFilters {
  return {
    q: (params.get("q") ?? "").trim(),
    category: getCategory(params.get("category") ?? "") ?? "",
    collection: collections.find((value) => normalize(value) === normalize(params.get("collection") ?? "")) ?? "",
    metal: isMetal(params.get("metal")) ? params.get("metal")! : "",
    price: priceRanges.some((range) => range.id === params.get("price")) ? params.get("price")! : "",
    sort: ["new", "price-asc", "price-desc"].includes(params.get("sort") ?? "") ? params.get("sort")! : "featured",
    newOnly: params.get("new") === "1",
  };
}
export function filterProducts(filters: Partial<CatalogFilters> = {}) {
  const state = { ...defaultFilters, ...filters };
  const category = getCategory(state.category);
  const range = priceRanges.find((item) => item.id === state.price);
  const result = products.filter((product) =>
    (!category || matchesCategory(product, category)) &&
    (!state.collection || product.collection === state.collection) &&
    (!state.newOnly || product.isNew) &&
    (!range || (product.priceValue >= range.min && product.priceValue < range.max)) &&
    matchesSearch(product, state.q),
  );
  if (state.sort === "new") result.sort((a, b) => b.arrivalOrder - a.arrivalOrder);
  if (state.sort === "price-asc") result.sort((a, b) => a.priceValue - b.priceValue);
  if (state.sort === "price-desc") result.sort((a, b) => b.priceValue - a.priceValue);
  return result;
}
