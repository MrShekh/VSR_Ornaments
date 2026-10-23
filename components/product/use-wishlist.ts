"use client";

import { useSyncExternalStore } from "react";
import { parseWishlist, saveWishlistEntry, wishlistKey, type WishlistEntry } from "@/lib/wishlist";

const STORAGE_KEY = "vsr-wishlist-v1";
const EVENT = "vsr-wishlist-change";
let memory = "[]";
let storageUnavailable = false;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(EVENT, callback); };
}
function getSnapshot() {
  if (storageUnavailable) return memory;
  try { return localStorage.getItem(STORAGE_KEY) ?? memory; } catch { return memory; }
}
function write(items: WishlistEntry[]) {
  memory = JSON.stringify(items);
  try { localStorage.setItem(STORAGE_KEY, memory); storageUnavailable = false; }
  catch { storageUnavailable = true; }
  window.dispatchEvent(new Event(EVENT));
}
export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const items = parseWishlist(raw);
  return {
    items, ready, storageUnavailable,
    has: (entry: WishlistEntry) => items.some((item) => wishlistKey(item) === wishlistKey(entry)),
    save: (entry: WishlistEntry, previous?: WishlistEntry) => write(saveWishlistEntry(parseWishlist(getSnapshot()), entry, previous)),
    remove: (entry: WishlistEntry) => write(parseWishlist(getSnapshot()).filter((item) => wishlistKey(item) !== wishlistKey(entry))),
  };
}
