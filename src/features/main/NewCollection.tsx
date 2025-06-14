import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/';
import { useProductStore, useCartStore } from '@/store';
import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';

export const NewCollection = ({
  loading,
  products,
}: {
  loading: boolean;
  products: IProductItem[];
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setFavorites = useProductStore((state) => state.setFavorites);

  const favorites = useProductStore((state) => state.favorites);
  const isInCart = useCartStore((state) => state.isInCart);
  const visibleProducts = products.slice(0, 3);

  const firstProduct = visibleProducts[0];
  const isInFavoriteFirst = favorites.includes(firstProduct?.id);
  const isInCartFirst = isInCart(firstProduct?.id);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full section-indent">
      <h2 className="text-center lg:mb-[61px] mb-[36px]">Колекція весна 2025</h2>

      <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-center">
        {firstProduct && (
          <Card className="w-full lg:w-[650px] group border-0">
            <CardContent className="relative mb-3 overflow-hidden border-0">
              <div className="flex flex-col lg:h-[790px] h-[383px] items-center justify-end gap-2.5 relative w-full bg-cover bg-center">
                <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

                {firstProduct.images
                  .map((image, index) => (
                    <img
                      key={index}
                      className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
                      src={image.url}
                      alt={firstProduct.name}
                    />
                  ))
                  .slice(0, 1)}

                <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
                  <button className="btn w-6 h-6" onClick={() => setFavorites(firstProduct?.id)}>
                    {isInFavoriteFirst ? (
                      <FavoriteFilledIcon classname="w-6 h-6" />
                    ) : (
                      <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
                    )}
                  </button>

                  <button
                    className="btn w-6 h-6"
                    onClick={() =>
                      isInCartFirst ? removeFromCart(firstProduct.id) : addToCart(firstProduct)
                    }
                  >
                    {isInCartFirst ? (
                      <ShoppingBagFilledIcon classname="w-6 h-6" />
                    ) : (
                      <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
                    )}
                  </button>
                </div>

                <Link
                  to={AppRoute.PRODUCT.replace(':id', firstProduct.id.toString())
                    .replace(':category', firstProduct.categoryName)
                    .replace(':collection', firstProduct.collectionName)
                    .replace(':title', firstProduct.name)}
                  className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                >
                  <button className="btn-buy">Купити</button>
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <div className="font-medium text-brown-dark">
                <span className="">{firstProduct.name} </span>
                <span className="text-grey">{firstProduct.collectionName}</span>
              </div>

              <div className="whitespace-nowrap lg:text-second text-mobile">
                {firstProduct.price}&nbsp;грн
              </div>
            </CardFooter>
          </Card>
        )}

        <div className="flex flex-col gap-4 w-full lg:w-[650px]">
          <div className="flex flex-row justify-between lg:gap-4 gap-1">
            {visibleProducts.slice(1).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="small"
                className="lg:w-[315px] w-[177px] lg:h-[438px] h-[262px]"
              />
            ))}
          </div>

          <div className="mt-auto ml-auto relative bottom-[38px] max-w-[290px] hidden lg:block">
            Почни весну з блиску, який не тільки прикрашає, але і змінює настрій!
          </div>
        </div>
      </div>
    </section>
  );
};
