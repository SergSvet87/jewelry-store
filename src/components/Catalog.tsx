import { FC } from 'react';

import { IProductItem } from '@/types/';
import { Pagination } from '@/features/products/Pagination';
import { useCatalogStore } from '@/store/useCatalogStore';
import { ProductCard } from './ProductCard';

interface ICatalogProps {
  data: IProductItem[];
  totalPages: number;
  page: number;
}

export const Catalog: FC<ICatalogProps> = ({ data, totalPages, page }) => {
  const setPage = useCatalogStore((state) => state.setPage);

  return (
    <>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[297px] auto-rows-[266px] lg:gap-5 gap-1 mb-12">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            size="small"
            className="col-span-1 row-span-1"
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};
