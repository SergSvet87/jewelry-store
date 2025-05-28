import { create } from 'zustand';

import { ICategory, ICollection } from '@/types/';

interface CatalogState {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  categories: ICategory[];
  collections: ICollection[];
  setCategories: (categories: ICategory[]) => void;
  setCollections: (collections: ICollection[]) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  page: 1,
  totalPages: 1,
  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
  categories: [],
  collections: [],
  setCategories: (categories) => set({ categories }),
  setCollections: (collections) => set({ collections }),
}));