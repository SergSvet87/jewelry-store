import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Info } from '@/features/singleProduct/Info';
import { AlsoBuy } from '@/features/singleProduct/AlsoBuy';
import { SP1, SP2, SPLarge } from '@/assets';

export const SingleProduct = () => {
  const { id, category, title } = useParams();
  console.log('id: ', id);

  const productImages = [
    {
      id: 1,
      src: SPLarge,
      alt: "Pendant main image",
      className: "w-full h-[690px]",
    },
    {
      id: 2,
      src: SP1,
      alt: "Pendant detail image",
      className: "w-[315px] h-[315px] bg-cover bg-center",
    },
    {
      id: 3,
      src: SP2,
      alt: "Pendant on silk",
      className: "w-[315px] h-[315px] bg-cover bg-center",
    },
  ];

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
          <div className="flex flex-col w-full md:w-[650px] items-start gap-5">
            <img
              className={productImages[0].className}
              alt={productImages[0].alt}
              src={productImages[0].src}
            />

            <div className="flex items-center gap-5 w-full">
              {productImages.slice(1).map((image) => (
                <div
                  key={image.id}
                  className={image.className}
                  style={{ backgroundImage: `url(${image.src})` }}
                  role="img"
                  aria-label={image.alt}
                />
              ))}
            </div>
          </div>

          <Info  />
        </div>

        <AlsoBuy />
      </div>
    </div>
  );
};
