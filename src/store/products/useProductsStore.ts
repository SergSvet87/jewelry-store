import { create } from 'zustand';

import { ISingleProduct } from '@/types/';
import { mockProducts } from '@/mock/mockProducts';

interface ProductState {
  products: ISingleProduct[];
  favorites: number[];
  scales: number[];
  setProducts: (products: ISingleProduct[]) => void;
  getProductById: (id: number) => ISingleProduct | undefined;
  filterByCategory: (category: string) => ISingleProduct[];
  toggleFavorite: (id: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  favorites: [],
  scales: [],
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  filterByCategory: (category) => get().products.filter((p) => p.categoryName === category),
  toggleFavorite: (id) => {
    const { favorites } = get();
    set({
      favorites: favorites.some((id) => id === id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id],
    });
  },
}));
