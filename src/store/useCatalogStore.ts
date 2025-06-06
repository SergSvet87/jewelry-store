import { create } from 'zustand';

interface CatalogState {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  page: 1,
  totalPages: 1,
  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
}));