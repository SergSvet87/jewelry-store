import { PageLayout } from "../layouts"
import { useProductStore } from "../store/products/useProductsStore"

export const Products = () => {
  const products = useProductStore((state) => state.products)

  return (
   <PageLayout products={products} />
  )
}