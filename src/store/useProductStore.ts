import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LocalStorage } from '@/enums';
import { IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { IProducts } from '@/types/products';

interface ProductState {
  products: IProducts;
  allProducts: IProducts;
  favorites: number[];
  scales: number[];
  selectedProduct: null | IProductItem,

  loading: boolean;
  hasFetched: boolean;
  error: string | null;

  getProductById: (id: number) => IProductItem | undefined;
  setProducts: (products: IProducts) => void;
  setAllProducts: (products: IProducts) => void;
  setSelectedProduct: (product: IProductItem) => void,
  filterByCategory: (category: string) => IProductItem[];
  setFavorites: (id: number) => void;
  setLoading: (value: boolean) => void;
  setHasFetched: (value: boolean) => void;
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
  allProducts: {
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
  selectedProduct: null,

  loading: false,
  hasFetched: false,
  error: null,

  setHasFetched: (value) => set({ hasFetched: value }),
  setProducts: (products) => set({ products }),
  setAllProducts: (allProducts) => set({ allProducts }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),

  getProductById: (id) => get().allProducts.content.find((product) => product.id === id),

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
