import { create } from 'zustand'

import { ISingleProduct } from '../../types/product'
import { mockProducts } from '../../mock/mockProducts'

interface ProductState {
  products: ISingleProduct[]
  setProducts: (products: ISingleProduct[]) => void
  getProductById: (id: number) => ISingleProduct | undefined
  filterByCategory: (category: string) => ISingleProduct[]
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: mockProducts,
  setProducts: (products) => set({ products }),
  getProductById: (id) => get().products.find((product) => product.id === id),
  filterByCategory: (category) => get().products.filter((p) => p.category === category),
}))
