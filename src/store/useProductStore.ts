import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { mockProducts } from '@/mock/mockProducts';
import { getAllProducts } from '@/services';

interface ProductState {
  products: IProductItem[];
  favorites: number[];
  scales: number[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  setProducts: (products: IProductItem[]) => void;
  getProductById: (id: number) => IProductItem | undefined;
  filterByCategory: (category: string) => IProductItem[];
  setFavorites: (id: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  favorites: localStorageService.getItem<number[]>(
    LocalStorage.FAVORITE_PRODUCTS
  ) ?? [],
  scales: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getAllProducts();
      set({ products });
    } catch (err) {
      set({ error: 'Помилка при завантаженні продуктів' });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  filterByCategory: (category) => get().products.filter((p) => p.categoryName === category),

  setFavorites: (id) => {
    const { favorites } = get();
    const isFav = favorites.includes(id);
    const updated = isFav
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, updated);
  },
}));
