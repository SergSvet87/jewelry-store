import { create } from 'zustand';

import { CartState } from '@/types/';

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (id) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { id, quantity: 1 }] };
    }),
}));
