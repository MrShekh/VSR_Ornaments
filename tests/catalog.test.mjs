import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { categories, filterProducts, getProduct, getMetal, matchesCategory, metals, products, readCatalogFilters } from "../data/products.ts";

for (const category of categories) {
  test(`search returns only ${category}, including singular and uppercase queries`, () => {
    for (const q of [category, category.slice(0, -1), `  ${category.toUpperCase()}  `]) {
      const results = filterProducts({ q });
      assert.ok(results.length > 0);
      assert.ok(results.every((item) => matchesCategory(item, category)));
    }
  });
  test(`category URLs filter ${category}`, () => {
    const result = filterProducts(readCatalogFilters(new URLSearchParams({ category: category.toLowerCase() })));
    assert.ok(result.length > 0);
    assert.ok(result.every((item) => matchesCategory(item, category)));
  });
}
test("ring search does not include earrings", () => {
  assert.deepEqual(filterProducts({ q: "ring" }).map((item) => item.slug), ["lumen-oval-ring", "axis-diamond-band"]);
});
test("compound search intersects words", () => {
  assert.deepEqual(filterProducts({ q: "oval diamond ring" }).map((item) => item.slug), ["lumen-oval-ring"]);
  assert.equal(filterProducts({ q: "rose gold earrings" }).length, 1);
});
test("empty and unmatched searches", () => {
  assert.equal(filterProducts({ q: "   " }).length, products.length);
  assert.equal(filterProducts({ q: "unobtainium" }).length, 0);
});
test("filters combine and can yield no results", () => {
  assert.equal(filterProducts({ category: "Rings", collection: "Continuum", price: "200000-500000" }).length, 1);
  assert.equal(filterProducts({ category: "Rings", price: "under-200000" }).length, 0);
});
test("new arrivals is a proper subset and newest-first ordering", () => {
  const results = filterProducts(readCatalogFilters(new URLSearchParams("new=1&sort=new")));
  assert.ok(results.length > 0 && results.length < products.length);
  assert.ok(results.every((item) => item.isNew));
  assert.deepEqual(results.map((item) => item.arrivalOrder), [5, 4, 3]);
});
test("price sorting is numeric and does not mutate catalogue order", () => {
  const before = products.map((item) => item.slug);
  const prices = products.map((item) => item.priceValue);
  assert.deepEqual(filterProducts({ sort: "price-asc" }).map((item) => item.priceValue), [...prices].sort((a, b) => a - b));
  assert.deepEqual(filterProducts({ sort: "price-desc" }).map((item) => item.priceValue), [...prices].sort((a, b) => b - a));
  assert.deepEqual(products.map((item) => item.slug), before);
});
test("unknown URL values and product slugs are handled", () => {
  const parsed = readCatalogFilters(new URLSearchParams("category=invalid&metal=blue&price=-5&sort=bad"));
  assert.equal(parsed.category, "");
  assert.equal(parsed.metal, "");
  assert.equal(parsed.sort, "featured");
  assert.equal(getMetal("blue").id, "white");
  assert.equal(getProduct("not-a-product"), undefined);
});
test("each product has distinct, high-resolution galleries for all three metals", () => {
  const paths = new Set();
  for (const product of products) for (const metal of metals) {
    const path = new URL(`../public/images/products/${product.imageKey}-${metal.id}-gallery.png`, import.meta.url);
    assert.ok(existsSync(path), path.pathname);
    const png = readFileSync(path);
    assert.equal(png.toString("ascii", 1, 4), "PNG");
    const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
    assert.ok(width >= 1600 && height >= 800);
    assert.ok(width / height > 1.95 && width / height < 2.05);
    paths.add(path.href);
  }
  assert.equal(paths.size, products.length * 3);
});
