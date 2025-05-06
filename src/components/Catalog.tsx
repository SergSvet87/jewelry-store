import { FC } from 'react';

import { Product } from '@/types/';
import ProductCard from '@/features/product/ProductCard';

interface ICatalogProps {
  data: Product[];
  totalPages?: number;
  categoryId?: number;
}

export const Catalog: FC<ICatalogProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
