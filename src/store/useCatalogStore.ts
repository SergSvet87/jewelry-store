import { create } from 'zustand';

import { ICategoryItem, ICollectionItem } from '../types/';

interface CatalogState {
  page: number;
  totalPages: number;
  categories: ICategoryItem[];
  category: string | null;
  collections: ICollectionItem[];
  collection: string | null;
  sort: string;
  materials: string[];
  selectedCategories: string[];
  selectedCollections: string[];
  selectedMaterials: string[];
  priceRange: [number, number];

  loading: boolean;

  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setCategory: (cat: string | null) => void;
  setCollection: (col: string | null) => void;
  setSort: (sort: string) => void;
  setCategories: (categories: ICategoryItem[]) => void;
  setCollections: (collections: ICollectionItem[]) => void;
  
  setSelectedCategories: (categoriesName: string[]) => void;
  setSelectedCollections: (collectionsName: string[]) => void;
  setSelectedMaterials: (materials: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setLoading: (value: boolean) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  page: 1,
  totalPages: 1,
  category: null,
  collection: null,
  categories: [],
  collections: [],
  materials: [],
  sort: 'asc',
  selectedCategories: [],
  selectedCollections: [],
  selectedMaterials: [],
  priceRange: [20, 37775],

  loading: false,

  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setCategory: (category) => set({ category }),
  setCollection: (collection) => set({ collection }),
  setSort: (sort) => set({ sort }),
  setCategories: (categories) => set({categories}),
  setCollections: (collections) => set({collections}),

  setSelectedCategories: (categoriesName) => set({ selectedCategories: categoriesName }),
  setSelectedCollections: (collectionsName) => set({ selectedCollections: collectionsName }),
  setSelectedMaterials: (materials) => set({ selectedMaterials: materials }),
  setPriceRange: (range) => set({ priceRange: range }),
  setLoading: (value) => set({ loading: value }),
}));