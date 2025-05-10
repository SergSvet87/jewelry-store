import { FC } from 'react';

import { Product } from '@/types/';
import { Catalog } from '@/components/Catalog';
import { Filters } from '@/features/products/Filters';
import { Sort } from '@/features/products/Sort';
import { Banner } from '@/components/Banner';
import { BreadCrumbs } from '@/components/BreadCrumbs';

interface PageLayoutProps {
  products: Product[];
}

export const PageLayout: FC<PageLayoutProps> = ({ products }) => {
  return (
    <>
      <Banner />

      <div className="container mx-auto py-10">
        <BreadCrumbs />
      </div>

      <div className="container mx-auto flex gap-5">
        <Filters />

        <div className="flex flex-col gap-7">
          <Sort />

          {products.length > 0 ? <Catalog data={products} /> : <div>Products not found</div>}
        </div>
      </div>
    </>
  );
};
