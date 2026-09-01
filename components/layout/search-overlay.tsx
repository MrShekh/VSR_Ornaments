"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductImage } from "@/components/product/product-image";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search jewellery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button className="search-overlay__close" onClick={onClose} aria-label="Close search">
            <X size={24} strokeWidth={1.2} />
          </button>
          <motion.div
            className="search-overlay__inner"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">Find a piece</p>
            <label className="search-overlay__field">
              <span className="sr-only">Search jewellery</span>
              <input autoFocus placeholder="SEARCH JEWELLERY" />
              <Search size={26} strokeWidth={1} />
            </label>
            <div className="search-overlay__suggestions">
              <div>
                <p className="meta-label">Suggested</p>
                {['Rings', 'Earrings', 'Necklaces', 'Bracelets'].map((item) => (
                  <Link key={item} href={`/collections?category=${item.toLowerCase()}`} onClick={onClose}>
                    {item}
                  </Link>
                ))}
              </div>
              <div className="search-overlay__pieces">
                <p className="meta-label">Pieces of note</p>
                {products.slice(0, 3).map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.slug} onClick={onClose}>
                    <ProductImage index={product.spriteIndex} />
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
