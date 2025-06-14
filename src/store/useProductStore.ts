import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LocalStorage } from '@/enums';
import { IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { IProducts } from '@/types/products';

interface ProductState {
  products: IProducts;
  favorites: number[];
  scales: number[];

  loading: boolean;
  error: string | null;

  setProducts: (products: IProducts) => void;
  getProductById: (id: number) => IProductItem | undefined;
  filterByCategory: (category: string) => IProductItem[];
  setFavorites: (id: number) => void;
  setLoading: (value: boolean) => void;
}

export const useProductStore = create<ProductState>()(devtools((set, get) => ({
  products: {
    content: [],
    page: {
      size: 0,
      number: 0,
      totalElements: 0,
      totalPages: 0
    }
  },
  favorites: localStorageService.getItem<number[]>(
    LocalStorage.FAVORITE_PRODUCTS
  ) ?? [],
  scales: [],

  loading: false,
  error: null,

  setProducts: (products) => set({ products }),

  getProductById: (id) => get().products.content.find((product) => product.id === id),

  filterByCategory: (category) => get().products.content.filter((p) => p.categoryName === category),

  setFavorites: (id) => {
    const { favorites } = get();
    const isFav = favorites.includes(id);
    const updated = isFav
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, updated);
  },

  setLoading: (value) => set({ loading: value }),
})));
