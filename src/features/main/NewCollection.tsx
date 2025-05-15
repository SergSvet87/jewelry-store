import { Link } from 'react-router-dom';

import { products } from '@/mock';
import { AppRoute } from '@/enums';
import { Card, CardContent, CardFooter } from '@/components/Card';
import { FavoriteIcon, NewColLarge, ShoppingBagIcon } from '@/assets';
import { useProductStore } from '@/store/products/useProductsStore';
import { useCartStore } from '@/store/cart/useCart';

export const NewCollection = () => {
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const addToCart = useCartStore((state) => state.addToCart);
  
  return (
    <section className="relative w-full mb-[var(--section-indent)]">
      <h2 className="text-center mb-[61px]">Колекція весна 2025</h2>

      <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-center">
        <Card className="w-full md:w-1/2 lg:w-[650px] group">
          <CardContent className="relative mb-3 overflow-hidden">
            <div className="flex flex-col h-[790px] items-center justify-end gap-2.5 relative w-full bg-cover bg-center">

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              <img
                className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                src={NewColLarge}
                alt="Hew Collection Large Image"
              />

              <div className="absolute top-5 right-5 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button className="btn">
                  <FavoriteIcon fill="var(--brown-dark)" />
                </button>
                <button className="btn">
                  <ShoppingBagIcon stroke="var(--brown-dark)" />
                </button>
              </div>

              <Link to={AppRoute.PRODUCTS} className="absolute bottom-5 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button className="btn-buy">Купити</button>
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="font-normal text-brown-dark text-xl tracking-[0] leading-5">
              <span className="font-medium text-[#1d110a] leading-[26px]">Сережки </span>
              <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                &quot;Heart&quot;
              </span>
            </div>
            <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap">
              14 344 грн
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-[650px]">
          <div className="flex flex-col md:flex-row gap-4">
            {products.slice(1, 3).map((product) => (
              <Card key={product.id} className=" w-full md:w-1/2 lg:w-[315px] group">
                <CardContent className="relative mb-3 overflow-hidden">
                  <div className="flex flex-col h-[400px] items-center justify-end gap-2.5 relative w-full bg-cover bg-[50%_50%]">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    <img
                      className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                      src={product?.image}
                      alt={product.name}
                    />

                    <div className="absolute top-5 right-5 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button className="btn" onClick={() => toggleFavorite(product.id)}>
                        <FavoriteIcon fill="var(--brown-dark)" />
                      </button>
                      <button className="btn" onClick={() => addToCart(product.id)}>
                        <ShoppingBagIcon stroke="var(--brown-dark)" />
                      </button>
                    </div>

                    <Link to={AppRoute.PRODUCTS} className="absolute bottom-5 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button className="btn-buy">Купити</button>
                    </Link>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div className="font-normal text-brown-dark text-xl tracking-[0] leading-5">
                    <span className="font-[number:var(--body-font-weight)] text-[#1d110a] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                      {product.name}{' '}
                    </span>
                    <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                      {product.type}
                    </span>
                  </div>
                  <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap">
                    {product.price} грн
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-auto ml-auto relative bottom-[38px] max-w-[290px]">
            Почни весну з блиску, який не тільки прикрашає, але і змінює настрій!
          </div>
        </div>
      </div>
    </section>
  );
};
