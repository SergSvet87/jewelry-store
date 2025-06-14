import { AppRoute } from '@/enums';
import { useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { Banner } from '@/components/Banner';
import { Catalog } from '@/components/Catalog';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Sort } from '@/features/products/Sort';
import { Filters } from '@/features/products/Filters';

export const PageLayout = () => {
  const { products, loading, error } = useProductStore();

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

          {products.content.length > 0 ? (
            <Catalog data={products.content} />
          ) : (
            <div>Products not found</div>
          )}
        </div>
      </div>
    </>
  );
};
