import { FC } from 'react';

import { Product } from '@/types/';
import ProductCard from '@/features/products/ProductCard';
import { useProductStore } from '@/store/products/useProductsStore';
import { Pagination } from '@/features/products/Pagination';

interface ICatalogProps {
  data: Product[];
  totalPages: number;
  page: number;
}

export const Catalog: FC<ICatalogProps> = ({ data, totalPages, page }) => {
  const setPage = useProductStore((state) => state.setPage);

  return (
    <>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-[320px] gap-5 mb-12">
        {data.map((product) => (
          <div
            key={product.id}
            className={product.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};
