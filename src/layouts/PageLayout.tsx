import { FC } from 'react';

import { Product } from '@/types/';
import { Catalog } from '@/components/Catalog';

interface PageLayoutProps {
  products: Product[];
}

export const PageLayout: FC<PageLayoutProps> = ({ products }) => {
  return (
    <div className="container mx-auto">
      {products.length > 0 ? (
        <Catalog
          data={products}
        />
      ) : (
        <div>Products not found</div>
      )}
    </div>
  );
};
