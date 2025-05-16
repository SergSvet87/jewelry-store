import { Link } from 'react-router-dom';

import { productsSale } from '@/mock';
import { AppRoute } from '@/enums';
import { Card, CardContent } from '@/components/ui';
import { FavoriteIcon, ShoppingBagIcon } from '@/assets';
import { useProductStore } from '@/store/products/useProductsStore';
import { useCartStore } from '@/store/cart/useCartStore';

export const Sale = () => {
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="relative w-full mb-[var(--section-indent)]">
      <div className="container mx-auto relative">
        <h2 className="text-center mb-[61px]">Розпродаж минулої колекції</h2>

        <div className="flex gap-5">
          {productsSale.map((product) => (
            <div key={product.id} className={`flex flex-col ${product.width} gap-3 group`}>
              <Card className="border-0 rounded-none">
                <CardContent
                  className={`p-0 relative ${product.imageClass} bg-main overflow-hidden`}
                >
                  <img
                    className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  <div className="absolute w-[68px] h-6 top-5 right-5 flex gap-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className="btn" onClick={() => toggleFavorite(product.id)}>
                      <FavoriteIcon fill="var(--brown-dark)" />
                    </button>

                    <button className="btn" onClick={() => addToCart(product.id)}>
                      <ShoppingBagIcon stroke="var(--brown-dark)" />
                    </button>
                  </div>

                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Link to={AppRoute.PRODUCTS}>
                      <button className="btn-buy">Купити</button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-start justify-between w-full">
                <div className="[font-family:'Manrope',Helvetica] text-brown-dark text-xl">
                  <span className="font-medium text-[#1d110a] leading-[26px]">{product.name} </span>
                  <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body [font-style:var(--body-font-style)] tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                    {product.description}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="font-body-crossed font-[number:var(--body-crossed-font-weight)] text-grey text-[length:var(--body-crossed-font-size)] text-right tracking-[var(--body-crossed-letter-spacing)] leading-[var(--body-crossed-line-height)] line-through whitespace-nowrap [font-style:var(--body-crossed-font-style)]">
                    {product.originalPrice}
                  </div>
                  <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] text-right tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)]">
                    {product.discountedPrice}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="absolute bottom-[50px] left-[60px] w-[600px]">
          Кращий момент для оновлення
          <br />
          образу - знижки на розкішну колекцію!
        </p>
      </div>
    </section>
  );
};
