import { PageLayout } from '@/layouts';
import { useProductStore } from '@/store/products/useProductsStore';

export const Catalog = () => {
  const products = useProductStore((state) => state.products);

  return <PageLayout products={products} />;
};
