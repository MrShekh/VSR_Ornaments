"use client";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { ProductGrid } from "./product-grid";
import { categories, collections, filterProducts, getMetal, metals, priceRanges, readCatalogFilters } from "@/data/products";
import { Modal } from "@/components/ui/modal";

export function Catalog({ searchPage = false }: { searchPage?: boolean }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersButton = useRef<HTMLButtonElement>(null);
  const filters = readCatalogFilters(params);
  const visible = filterProducts(filters);
  const filterCount = [filters.category, filters.collection, filters.metal, filters.price, filters.newOnly].filter(Boolean).length;
  const closeFilters = () => { setFiltersOpen(false); filtersButton.current?.focus(); };
  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value); else next.delete(key);
    }
    startTransition(() => router.push(`${pathname}${next.size ? "?" + next.toString() : ""}`, { scroll: false }));
  }
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    update({ q: String(new FormData(event.currentTarget).get("q") ?? "").trim() });
  }
  function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    update(Object.fromEntries(["category", "collection", "metal", "price", "new"].map((key) => [key, String(values.get(key) ?? "")])));
    closeFilters();
  }
  return (
    <section className="catalog" aria-label={searchPage ? "Search results" : "Jewellery catalogue"}>
      <div className="catalog-intro">
        <p className="eyebrow">{filters.newOnly ? "The latest edit" : searchPage ? "Find your piece" : "Explore the collection"}</p>
        <h2>{filters.newOnly ? "New arrivals" : filters.q ? `Results for “${filters.q}”` : filters.category || "All jewellery"}</h2>
        <form className="catalog-search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="catalog-query">Search jewellery</label>
          <input key={filters.q} id="catalog-query" name="q" type="search" defaultValue={filters.q} placeholder="Search rings, earrings, necklaces…" />
          <button type="submit" aria-label="Search catalogue"><Search size={20} strokeWidth={1.2} /></button>
        </form>
      </div>
      <div className="catalog-toolbar">
        <div className="catalog-tabs" aria-label="Product categories">
          {["All", ...categories].map((category) => <button type="button" onClick={() => update({ category: category === "All" ? "" : category.toLowerCase() })} key={category} aria-pressed={(filters.category || "All") === category}>{category}</button>)}
        </div>
        <button type="button" ref={filtersButton} onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={14} /> Filters{filterCount ? ` (${filterCount})` : ""}</button>
      </div>
      <div className="catalog-summary">
        <p role="status">{pending ? "Updating…" : `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`}</p>
        {(filterCount > 0 || filters.q) && <button type="button" onClick={() => startTransition(() => router.push(pathname, { scroll: false }))}>Clear all</button>}
        <label>Sort by <select value={filters.sort} onChange={(event) => update({ sort: event.target.value === "featured" ? "" : event.target.value })}>
          <option value="featured">Featured</option><option value="new">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
        </select></label>
      </div>
      <div className="catalog-grid" aria-busy={pending}>
        {visible.length ? <ProductGrid items={visible} metal={getMetal(filters.metal).id} /> : <div className="catalog-empty"><h3>No matching pieces</h3><p>Try another search or clear your filters to explore the collection.</p><button onClick={() => router.push(pathname, { scroll: false })}>Clear search and filters</button></div>}
        <p className="catalog-disclaimer">Illustrative collection. Final designs, metal options, pricing and availability are confirmed by the atelier.</p>
      </div>
      {filtersOpen && <Modal label="Product filters" className="filter-modal" onClose={closeFilters}>
        <form className="filter-drawer" onSubmit={apply}>
          <button type="button" className="filter-drawer__close" onClick={closeFilters} aria-label="Close filters"><X size={22} /></button>
          <p className="eyebrow">Refine the edit</p><h2>Filters</h2>
          <label className="filter-field">Category<select name="category" defaultValue={filters.category}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="filter-field">Collection<select name="collection" defaultValue={filters.collection}><option value="">All collections</option>{collections.map((collection) => <option key={collection}>{collection}</option>)}</select></label>
          <label className="filter-field">Metal<select name="metal" defaultValue={filters.metal}><option value="">All metals</option>{metals.map((metal) => <option value={metal.id} key={metal.id}>{metal.label}</option>)}</select></label>
          <p className="filter-note">Choose a metal to preview available finishes.</p>
          <label className="filter-field">Price<select name="price" defaultValue={filters.price}><option value="">All prices</option>{priceRanges.map((range) => <option value={range.id} key={range.id}>{range.label}</option>)}</select></label>
          <label className="filter-checkbox"><input type="checkbox" name="new" value="1" defaultChecked={filters.newOnly} /> New arrivals only</label>
          <button className="filter-apply" type="submit">Show matching pieces</button>
          <button className="filter-reset" type="button" onClick={() => { startTransition(() => router.push(pathname, { scroll: false })); closeFilters(); }}>Reset all filters</button>
        </form>
      </Modal>}
    </section>
  );
}
