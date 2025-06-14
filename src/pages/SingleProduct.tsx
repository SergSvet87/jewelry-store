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
            {product?.images
              .map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ))
              .slice(0, 1)}

            <div className="flex items-center gap-5 w-full">
              {product?.images
                .slice(1)
                .map((image, index) => (
                  <div
                    key={index}
                    className="w-[315px] h-[315px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    role="img"
                  />
                ))}
            </div>
          </div>

          {product && <Info product={product} />}
        </div>

        <AlsoBuy />
      </div>
    </div>
  );
};
