import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';
import { useSmartCart } from '@/lib/hooks/useSmartCart';

export const Sale = ({
  loading,
  products,
  discounted,
}: {
  loading: boolean;
  discounted: boolean;
  products: IProductItem[];
}) => {
  const discountCol = products.filter((p) => p.price.discountPercentage > 0);
  const { addToCart, removeFromCart, isInCart } = useSmartCart();
  const setFavorites = useProductStore((state) => state.setFavorites);
  const favorites = useProductStore((state) => state.favorites);
  const visibleProducts = discountCol.slice(0, 3);

  const lastProduct = visibleProducts[2];
  const isInFavoriteLast = favorites.includes(lastProduct?.id);
  const isInCartLast = isInCart(lastProduct?.id);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full section-indent">
      <div className="container mx-auto relative">
        <h2 className="text-center lg:mb-[61px] mb-[36px]">Розпродаж минулої колекції</h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="flex flex-col gap-4 w-full lg:w-[650px]">
            <div className="flex flex-row justify-between lg:gap-4 gap-1">
              {visibleProducts.slice(0, 2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  size="small"
                  className="lg:w-[315px] w-[177px] lg:h-[438px] h-[262px]"
                  discounted={discounted}
                />
              ))}
            </div>

            <div className="mt-auto mr-auto relative bottom-[38px] max-w-[490px] hidden lg:block">
              Кращий момент для оновлення
              <br />
              образу - знижки на розкішну колекцію!
            </div>
          </div>

          {lastProduct && (
            <Card className="w-full lg:w-[650px] group border-0">
              <CardContent className="relative mb-3 overflow-hidden border-0">
                <div className="flex flex-col lg:h-[790px] h-[383px] items-center justify-end gap-2.5 relative w-full bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

                  {lastProduct.images
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={lastProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ))
                    .slice(0, 1)}

                  <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
                    <button className="btn w-6 h-6" onClick={() => setFavorites(lastProduct.id)}>
                      {isInFavoriteLast ? (
                        <FavoriteFilledIcon classname="w-6 h-6" />
                      ) : (
                        <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
                      )}
                    </button>

                    <button
                      className="btn w-6 h-6"
                      onClick={() =>
                        isInCartLast ? removeFromCart(lastProduct.id) : addToCart(lastProduct)
                      }
                    >
                      {isInCartLast ? (
                        <ShoppingBagFilledIcon classname="w-6 h-6" />
                      ) : (
                        <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
                      )}
                    </button>
                  </div>

                  <Link
                    to={AppRoute.PRODUCT.replace(':id', lastProduct.id.toString())
                      .replace(':category', lastProduct.categoryName)
                      .replace(':collection', lastProduct.collectionName)
                      .replace(':title', `${lastProduct.name}`)}
                    className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                  >
                    <button className="btn-buy">Купити</button>
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="font-medium text-brown-dark">
                  <span className="">{lastProduct.name} </span>
                  <span className="text-grey">{lastProduct.collectionName}</span>
                </div>

                <div className="flex flex-col items-end gap-1 lg:text-second text-mobile">
                  <div className="text-grey line-through whitespace-nowrap">
                    {lastProduct.price.normalPrice}&nbsp;грн
                  </div>
                  <div className="text-brown-dark">
                    {lastProduct.price.discountedPrice}&nbsp;грн
                  </div>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
