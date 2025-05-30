import { FC, useEffect, useState } from 'react';

import { IProductItem } from '@/types/';
import { AppRoute } from '@/enums';
import { Banner } from '@/components/Banner';
import { Catalog } from '@/components/Catalog';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Filters } from '@/features/products/Filters';
import { Sort } from '@/features/products/Sort';
import { useCatalogStore } from '@/store/useCatalogStore';

interface PageLayoutProps {
  products: IProductItem[];
}

export const PageLayout: FC<PageLayoutProps> = ({ products }) => {
  const [sort, setSort] = useState('popular');
  const page = useCatalogStore((state) => state.page);
  const setTotalPages = useCatalogStore((state) => state.setTotalPages);

  const itemsPerPage = 24;
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

      <div className="container py-10 lg:block hidden">
        <BreadCrumbs items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Каталог' }]} />
      </div>

      <div className="container flex gap-5 pb-section">
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
