export type Product = {
  slug: string;
  name: string;
  category: string;
  collection: string;
  material: string;
  price: string;
  spriteIndex: number;
};

export const products: Product[] = [
  {
    slug: "arc-diamond-earrings",
    name: "Arc Diamond Earrings",
    category: "Earrings",
    collection: "Form I",
    material: "Platinum · 1.42 ct",
    price: "₹ 2,85,000",
    spriteIndex: 0,
  },
  {
    slug: "lumen-oval-ring",
    name: "Lumen Oval Ring",
    category: "Rings",
    collection: "Light Studies",
    material: "Platinum · 1.20 ct",
    price: "₹ 4,60,000",
    spriteIndex: 1,
  },
  {
    slug: "trace-diamond-pendant",
    name: "Trace Diamond Pendant",
    category: "Necklaces",
    collection: "Form I",
    material: "18k White Gold · 0.58 ct",
    price: "₹ 1,35,000",
    spriteIndex: 2,
  },
  {
    slug: "line-tennis-bracelet",
    name: "Line Tennis Bracelet",
    category: "Bracelets",
    collection: "Continuum",
    material: "Platinum · 4.80 ct",
    price: "₹ 6,90,000",
    spriteIndex: 3,
  },
  {
    slug: "axis-diamond-band",
    name: "Axis Diamond Band",
    category: "Rings",
    collection: "Continuum",
    material: "Platinum · 0.82 ct",
    price: "₹ 2,10,000",
    spriteIndex: 4,
  },
  {
    slug: "arc-diamond-earrings-rose",
    name: "Arc Earrings, Rose",
    category: "Earrings",
    collection: "Form I",
    material: "18k Rose Gold · 1.42 ct",
    price: "₹ 2,75,000",
    spriteIndex: 0,
  },
  {
    slug: "lumen-solitaire-ring",
    name: "Lumen Solitaire Ring",
    category: "Rings",
    collection: "Light Studies",
    material: "18k White Gold · 1.08 ct",
    price: "₹ 3,95,000",
    spriteIndex: 1,
  },
  {
    slug: "trace-drop-pendant",
    name: "Trace Drop Pendant",
    category: "Pendants",
    collection: "Light Studies",
    material: "Platinum · 0.62 ct",
    price: "₹ 1,58,000",
    spriteIndex: 2,
  },
  {
    slug: "continuum-riviere-bracelet",
    name: "Continuum Rivière Bracelet",
    category: "Bracelets",
    collection: "Continuum",
    material: "18k White Gold · 4.20 ct",
    price: "₹ 5,85,000",
    spriteIndex: 3,
  },
  {
    slug: "axis-open-band",
    name: "Axis Open Band",
    category: "Rings",
    collection: "Form II",
    material: "Platinum · 0.74 ct",
    price: "₹ 1,95,000",
    spriteIndex: 4,
  },
];

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug) ?? products[0];
