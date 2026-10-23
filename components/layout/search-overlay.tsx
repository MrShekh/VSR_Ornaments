"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { categories, filterProducts } from "@/data/products";
import { ProductImage } from "@/components/product/product-image";
import { Modal } from "@/components/ui/modal";

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = filterProducts({ q: query });
  function submit(event: FormEvent) {
    event.preventDefault();
    router.push(`/search${query.trim() ? "?q=" + encodeURIComponent(query.trim()) : ""}`);
    onClose();
  }
  return (
    <Modal label="Search jewellery" className="search-overlay" onClose={onClose}>
      <div className="search-overlay__inner">
        <button className="search-overlay__close" onClick={onClose} aria-label="Close search"><X size={24} strokeWidth={1.2} /></button>
        <p className="eyebrow">Find a piece</p>
        <form className="search-overlay__field" role="search" onSubmit={submit}>
          <label className="sr-only" htmlFor="quick-search">Search jewellery</label>
          <input id="quick-search" autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="SEARCH JEWELLERY" />
          <button type="submit" aria-label="View search results"><Search size={26} strokeWidth={1} /></button>
        </form>
        <div className="search-overlay__suggestions">
          <div><p className="meta-label">Categories</p>{categories.map((item) => <Link key={item} href={`/collections?category=${item.toLowerCase()}`} onClick={onClose}>{item}</Link>)}</div>
          <div className="search-overlay__pieces">
            <p className="meta-label" role="status">{query.trim() ? `${results.length} matching pieces` : "Pieces of note"}</p>
            {results.slice(0, 4).map((product) => <Link href={`/product/${product.slug}`} key={product.slug} onClick={onClose}><ProductImage product={product} sizes="(max-width: 760px) 90vw, 40vw" /><span>{product.name}</span></Link>)}
            {!results.length && <p className="search-empty">No matching pieces. Try a category or another name.</p>}
            {!!results.length && <Link className="search-view-all" href={`/search?q=${encodeURIComponent(query.trim())}`} onClick={onClose}>View all results ↗</Link>}
          </div>
        </div>
      </div>
    </Modal>
  );
}
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return open ? <SearchPanel onClose={onClose} /> : null;
}
