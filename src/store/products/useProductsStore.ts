import { create } from 'zustand';

import { ISingleProduct } from '@/types/';
import { mockProducts } from '@/mock/mockProducts';

interface ProductState {
  products: ISingleProduct[];
  favorites: string[];
  page: number;
  totalPages: number;
  setProducts: (products: ISingleProduct[]) => void;
  getProductById: (id: string) => ISingleProduct | undefined;
  filterByCategory: (category: string) => ISingleProduct[];
  toggleFavorite: (id: string) => void;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  favorites: [],
  page: 1,
  totalPages: 1,
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  filterByCategory: (category) => get().products.filter((p) => p.category === category),
  toggleFavorite: (id) => {
    const { favorites } = get();
    set({
      favorites: favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id],
    });
  },
  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
}));
