import { create } from 'zustand';

import { ICategoryItem } from '@/types/';

interface CategoryState {
  categories: ICategoryItem[];
  
  setCategories: (categories: ICategoryItem[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  
  setCategories: (categories) => set({ categories }),
}));