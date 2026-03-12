"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[]; // product IDs
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  count: () => number;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) =>
        set((state) => ({
          items: state.items.includes(id) ? state.items : [...state.items, id],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i !== id),
        })),
      toggleItem: (id) => {
        const { items } = get();
        if (items.includes(id)) {
          set({ items: items.filter((i) => i !== id) });
        } else {
          set({ items: [...items, id] });
        }
      },
      hasItem: (id) => get().items.includes(id),
      count: () => get().items.length,
      clearAll: () => set({ items: [] }),
    }),
    { name: "kumbil-wishlist" }
  )
);
