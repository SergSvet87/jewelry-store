import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LocalStorage } from '@/enums';
import { IFilterParams, IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { IProducts } from '@/types/products';

import { useCatalogStore } from './useCatalogStore';
import { getAllProducts } from '@/services';

interface ProductState {
  products: IProducts;
  allProducts: IProducts;
  collectionProducts: IProductItem[];
  favorites: number[];
  scales: number[];
  selectedProduct: null | IProductItem,
  loading: boolean;
  hasFetched: boolean;
  isNew: boolean;
  error: string | null;

  getProductById: (id: number) => IProductItem | undefined;
  setIsNew: (value: boolean) => void;
  setProducts: (products: IProducts) => void;
  setCollectionProducts: (collectionProducts: IProductItem[]) => void;
  setAllProducts: (products: IProducts) => void;
  setSelectedProduct: (product: IProductItem) => void,
  filterByCategory: (category: string) => IProductItem[];
  setFavorites: (id: number) => void;
  setScale : (id:number) => void;
  setLoading: (value: boolean) => void;
  setHasFetched: (value: boolean) => void;
  fetchProducts: (signal: AbortSignal) => Promise<void>;
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
  collectionProducts: [],
  favorites: localStorageService.getItem<number[]>(
    LocalStorage.FAVORITE_PRODUCTS
  ) ?? [],
  scales: localStorageService.getItem<number[]>(
    LocalStorage.SCALES_PRODUCTS
  ) ?? [],
  
  selectedProduct: null,

  loading: false,
  hasFetched: false,
  error: null,
  isNew: false,

  setIsNew: (value) => set({ isNew: value }),
  setHasFetched: (value) => set({ hasFetched: value }),
  setProducts: (products) => set({ products }),
  setCollectionProducts: (collectionProducts) => set({ collectionProducts }),
  setAllProducts: (allProducts) => set({ allProducts }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),

  getProductById: (id) => get().allProducts.content.find((product) => product.id === id),

  filterByCategory: (category) => get().products.content.filter((p) => p.categoryName === category),

  setFavorites: (id) => {
    const { favorites } = get();
    const isFav = favorites.includes(id);
    const updated = isFav
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, updated);
  },

  setScale : (id) => {
    const {scales} = get();
    const isScale = scales.includes(id);
    const updated = isScale 
    ? scales.filter((item) => item !== id)
    : [...scales, id]

    console.log("Ключ для запису:", LocalStorage.SCALES_PRODUCTS);
    console.log("Дані для запису:", updated);

    set({scales : updated});
    localStorageService.setItem(LocalStorage.SCALES_PRODUCTS, updated);
  },

  setLoading: (value) => set({ loading: value }),

  fetchProducts: async (signal: AbortSignal) => {
    const { 
      page, 
      sortBy, 
      selectedCategories, 
      selectedCollections, 
      selectedMaterials, 
      priceRange 
    } = useCatalogStore.getState(); 

    try {
      set({ loading: true, error: null });

      const filters:IFilterParams = {
        page: page - 1, 
        size: 12, 
        sortBy: sortBy,
        categories: selectedCategories,
        collections: selectedCollections,
        materials: selectedMaterials,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      const res = await getAllProducts(filters, signal); 
      set({ products: res, loading: false });

    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        set({ error: (err as Error).message, loading: false });
      } else {
        set({ loading: false });
      }
    }
  },

})));
