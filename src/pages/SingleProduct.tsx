import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { fetchProductById } from '@/services';
import { setQueryParams } from '@/utils/urlParams';
import { useCatalogStore, useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Info } from '@/features/singleProduct/Info';
import { AlsoBuy } from '@/features/singleProduct/AlsoBuy';

export const SingleProduct = () => {
  const { id, category, title } = useParams();
  const numericId = Number(id);
  const { page, sort, priceRange } = useCatalogStore();
  const { loading, selectedProduct, getProductById, setSelectedProduct, setLoading } =
    useProductStore();

   useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const localProduct = getProductById(numericId);

      if (localProduct) {
        setSelectedProduct(localProduct);
        setLoading(false);
      } else {
        try {
          const fetched = await fetchProductById(numericId);
          setSelectedProduct(fetched);
        } catch (error) {
          console.error('Помилка завантаження продукту', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!isNaN(numericId)) {
      loadProduct();
    }
  }, [numericId]);

  if (loading) return <Loader />;
  if (!selectedProduct) return <div className="container py-10">Товар не знайдено</div>;

  const firstImage = selectedProduct?.images[0];

  return (
    <div className="mt-[100px]">
      <div className="container mx-auto py-10">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            {
              label: category?.toString() || '',
              href: `${AppRoute.PRODUCTS}${setQueryParams({
                page,
                direction: sort,
                category: [category] as string[],
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
              })}`,
            },
            { label: title?.toString() || '' },
          ]}
        />
      </div>

      <div className="container mx-auto pb-[var(--section-indent)]">
        <div className="flex gap-20 mb-20 w-full justify-between">
          <div className="flex flex-col w-full max-w-[650px] items-start gap-5">
            {firstImage && (
              <img
                key={id}
                src={firstImage.url}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            )}

            <div className="flex items-center gap-5 w-full">
              {selectedProduct?.images
                .map((image, index) => (
                  <div
                    key={index}
                    className="w-[315px] h-[315px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                    role="img"
                  />
                ))
                .slice(1)}
            </div>
          </div>

          {selectedProduct && loading ? <Loader /> : <Info product={selectedProduct} />}
        </div>

        <AlsoBuy />
      </div>
    </div>
  );
};
