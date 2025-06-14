import { FC } from 'react';

import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { Pagination } from '@/features/products/Pagination';
import { ProductCard } from './ProductCard';
import { CardSkeleton } from './CardSkeleton';

interface ICatalogProps {
  data: IProductItem[];
}

export const Catalog: FC<ICatalogProps> = ({ data }) => {
  const { loading } = useProductStore((state) => state);

  return (
    <>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[297px] auto-rows-[266px] lg:gap-5 gap-1 mb-12">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <CardSkeleton key={index} size="small" className="col-span-1 row-span-1" />
            ))
          : data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="small"
                className="col-span-1 row-span-1"
              />
            ))}
      </div>

      <Pagination />
    </>
  );
};
