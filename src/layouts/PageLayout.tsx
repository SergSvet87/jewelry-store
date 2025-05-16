import { FC, useEffect, useState } from 'react';

import { Product } from '@/types/';
import { AppRoute } from '@/enums';
import { Banner } from '@/components/Banner';
import { Catalog } from '@/components/Catalog';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Filters } from '@/features/products/Filters';
import { Sort } from '@/features/products/Sort';
import { useProductStore } from '@/store/products/useProductsStore';

interface PageLayoutProps {
  products: Product[];
}

export const PageLayout: FC<PageLayoutProps> = ({ products }) => {
  const [sort, setSort] = useState('');
  const page = useProductStore((state) => state.page);
  const setTotalPages = useProductStore((state) => state.setTotalPages);

  const itemsPerPage = 22;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setTotalPages(totalPages);
  }, [totalPages, setTotalPages]);

  const filtered = products.filter((product) => product.name.toLowerCase());

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <Banner />

      <div className="container mx-auto py-10">
        <BreadCrumbs items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Каталог' }]} />
      </div>

      <div className="container mx-auto flex gap-5 pb-[var(--section-indent)]">
        <Filters />

        <div className="flex flex-col grow gap-7 ">
          <Sort sort={sort} setSort={setSort} />

          {products.length > 0 ? (
            <Catalog data={paginated} page={page} totalPages={totalPages} />
          ) : (
            <div>Products not found</div>
          )}
        </div>
      </div>
    </>
  );
};
