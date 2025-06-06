import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { useProductStore } from '@/store';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Info } from '@/features/singleProduct/Info';
import { AlsoBuy } from '@/features/singleProduct/AlsoBuy';

export const SingleProduct = () => {
  const { id, category, title } = useParams();
    const getProductById = useProductStore((state) => state.getProductById);
  const product = getProductById(Number(id));

  return (
    <div className="mt-[100px]">
      <div className="container mx-auto py-10">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            { label: category?.toString() || '', href: `/products&category=${category}` },
            { label: title?.toString() || '' },
          ]}
        />
      </div>

      <div className="container mx-auto pb-[var(--section-indent)]">
        <div className="flex gap-20 mb-20 w-full justify-between">
          <div className="flex flex-col w-full max-w-[650px] items-start gap-5">
            <img
              className='w-full h-[690px] object-cover'
              alt={product?.name}
              src={product?.images?.url}
            />

            <div className="flex items-center gap-5 w-full">
              {/* {product?.image.slice(1).map((image) => (
                <div
                  key={image.id}
                  className='w-[315px] h-[315px] bg-cover bg-center'
                  style={{ backgroundImage: `url(${image})` }}
                  role="img"
                />
              ))} */}
            </div>
          </div>

          {product && <Info product={product}  />}
        </div>

        <AlsoBuy />
      </div>
    </div>
  );
};
