import { FC } from 'react';

import { Product } from '@/types/';
import ProductCard from '@/features/products/ProductCard';
import { useProductStore } from '@/store/products/useProductsStore';

interface ICatalogProps {
  data: Product[];
  totalPages: number;
  page: number;
}

export const Catalog: FC<ICatalogProps> = ({ data, totalPages, page }) => {
  const setPage = useProductStore((state) => state.setPage);

  const goToPrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  return (
    <>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-[320px] gap-5">
        {data.map((product) => (
          <div
            key={product.id}
            className={product.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
      <button
          onClick={goToPrevPage}
          disabled={page === 1}
          className="px-4 py-2 border rounded hover:bg-muted disabled:opacity-50"
        >
          Попередня
        </button>
        <div className="text-sm">
          Сторінка <strong>{page}</strong> з <strong>{totalPages}</strong>
        </div>
        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded hover:bg-muted disabled:opacity-50"
        >
          Наступна
        </button>
      </div>
    </>
  );
};
