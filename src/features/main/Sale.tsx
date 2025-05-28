import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { useProductStore, useCartStore } from '@/store';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';

export const Sale = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const setFavorites = useProductStore((state) => state.setFavorites);
  const products = useProductStore((state) => state.products);
  const favorites = useProductStore((state) => state.favorites);
  const visibleProducts = products.slice(0, 3);

  const lastProduct = visibleProducts[0];
  const isInFavoriteLast = favorites.includes(lastProduct.id);
  const isInCartLast = useCartStore.getState().isInCart(lastProduct.id);

  return (
    <section className="relative w-full section-indent">
      <div className="container mx-auto relative">
        <h2 className="text-center lg:mb-[61px] mb-[36px]">Розпродаж минулої колекції</h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="flex flex-col gap-4 w-full lg:w-[650px]">
            <div className="flex flex-row justify-between lg:gap-4 gap-1">
              {visibleProducts.slice(0, 2).map((product) => {
                const isInCart = useCartStore.getState().isInCart(product.id);
                const isInFavorite = favorites.includes(product.id);

                return (
                  <Card key={product.id} className="min-w-[177px] flex-1 lg:w-[315px] group">
                    <CardContent className="relative mb-3 overflow-hidden">
                      <div className="flex flex-col lg:h-[400px] h-[244px] items-center justify-end gap-2.5 relative w-full bg-cover bg-[50%_50%]">
                        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

                        <img
                          className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="absolute w-full top-2 lg:top-4 left-0 flex items-center lg:justify-end justify-between px-2 lg:px-4 gap-4 z-20 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
                          <button className="btn w-6 h-6" onClick={() => setFavorites(product.id)}>
                            {isInFavorite ? (
                              <FavoriteFilledIcon classname="w-6 h-6" />
                            ) : (
                              <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
                            )}
                          </button>

                          <button className="btn w-6 h-6" onClick={() => addToCart(product)}>
                            {isInCart ? (
                              <ShoppingBagFilledIcon classname="w-6 h-6" />
                            ) : (
                              <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
                            )}
                          </button>
                        </div>

                        <Link
                          to={AppRoute.PRODUCTS}
                          className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                        >
                          <button className="btn-buy w-[160px]">Купити</button>
                        </Link>
                      </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                      <div className="">
                        <span className="">{product.name} </span>

                        <span className="text-grey">{product.collectionName}</span>
                      </div>

                      <div className="flex flex-col items-end gap-1 lg:text-second text-mobile">
                        <div className="text-grey line-through whitespace-nowrap">
                          {product.price}&nbsp;грн
                        </div>
                        <div className="text-brown-dark">{product.price}&nbsp;грн</div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
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

                  <img
                    className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
                    src={visibleProducts[2].image}
                    alt={visibleProducts[2].name}
                  />

                  <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
                    <button
                      className="btn w-6 h-6"
                      onClick={() => setFavorites(visibleProducts[2].id)}
                    >
                      {isInFavoriteLast ? (
                        <FavoriteFilledIcon classname="w-6 h-6" />
                      ) : (
                        <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
                      )}
                    </button>

                    <button className="btn w-6 h-6" onClick={() => addToCart(visibleProducts[2])}>
                      {isInCartLast ? (
                        <ShoppingBagFilledIcon classname="w-6 h-6" />
                      ) : (
                        <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
                      )}
                    </button>
                  </div>

                  <Link
                    to={AppRoute.PRODUCTS}
                    className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
                  >
                    <button className="btn-buy">Купити</button>
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="font-medium text-brown-dark">
                  <span className="">{visibleProducts[2].name} </span>
                  <span className="text-grey">{visibleProducts[2].collectionName}</span>
                </div>

                <div className="flex flex-col items-end gap-1 lg:text-second text-mobile">
                  <div className="text-grey line-through whitespace-nowrap">
                    {visibleProducts[2].price}&nbsp;грн
                  </div>
                  <div className="text-brown-dark">{visibleProducts[2].sale}&nbsp;грн</div>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
