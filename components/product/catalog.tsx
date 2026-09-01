"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { ProductGrid } from "./product-grid";
import { products } from "@/data/products";

const tabs = ["All", "Rings", "Earrings", "Necklaces", "Bracelets", "Pendants"];
const filterGroups = ["Category", "Collection", "Metal", "Gold colour", "Karat", "Diamond", "Stone", "Price", "Availability"];

export function Catalog() {
  const [active, setActive] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visible = useMemo(() => active === "All" ? products : products.filter((product) => product.category === active), [active]);

  return (
    <>
      <div className="catalog-toolbar">
        <div className="catalog-tabs" aria-label="Product categories">
          {tabs.map((tab) => <button onClick={() => setActive(tab)} key={tab} aria-pressed={active === tab}>{tab}</button>)}
        </div>
        <button onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={13} /> Filters</button>
      </div>
      <div className="catalog-grid"><ProductGrid items={visible} /></div>
      <AnimatePresence>
        {filtersOpen && (
          <motion.aside className="filter-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .5, ease: [0.22,1,0.36,1] }} aria-label="Product filters">
            <button className="filter-drawer__close" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={22} strokeWidth={1.2} /></button>
            <p className="eyebrow">Refine the edit</p>
            <h2>Filters</h2>
            {filterGroups.map((group) => <div className="filter-group" key={group}><button>{group}<ChevronDown size={15} strokeWidth={1.2} /></button></div>)}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
