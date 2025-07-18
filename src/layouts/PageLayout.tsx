import { useEffect } from 'react';

import { AppRoute } from '@/enums';
import { useCatalogStore, useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { Banner } from '@/components/Banner';
import { Catalog } from '@/components/Catalog';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Sort } from '@/features/products/Sort';
import { Filters } from '@/features/products/Filters';

const PAGE_SIZE = 12;

export const PageLayout = () => {
  const { products, allProducts, loading, isNew, error } = useProductStore();
  const { setTotalPages } = useCatalogStore();

  const newProducts = isNew
    ? allProducts.content.filter((product) => product.isNew)
    : products.content;

  useEffect(() => {
    const total = isNew ? newProducts.length : products.page.totalElements;
    setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
  }, [isNew, newProducts.length, products.page.totalElements, setTotalPages]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-20 text-error">{error}</div>;

  return (
    <>
      <Banner />

      <div className="container py-10 lg:block hidden">
        <BreadCrumbs items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Каталог' }]} />
      </div>

      <div className="container flex gap-5 pb-section">
        <Filters />

        <div className="flex flex-col grow gap-7 ">
          <Sort />

          {newProducts.length > 0 ? <Catalog data={newProducts} /> : <div>Products not found</div>}
        </div>
      </div>
    </>
  );
};
