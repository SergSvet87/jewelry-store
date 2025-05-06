import { Link } from 'react-router-dom';

import { productsSale } from '@/mock';
import { AppRoute } from '@/enums';
import { Card, CardContent } from '@/components/Card';
import { FavoriteIcon, ShoppingBagIcon } from '@/assets';

export const Sale = () => {
  return (
    <section className="relative w-full mb-[var(--section-indent)]">
      <div className="container mx-auto relative">
        <h2 className="text-center mb-[61px]">Розпродаж минулої колекції</h2>

        <div className="flex flex-wrap gap-5">
          {productsSale.map((product) => (
            <div key={product.id} className={`flex flex-col ${product.width} gap-3`}>
              <Card className="border-0 rounded-none">
                <CardContent className={`p-0 relative ${product.imageClass} bg-main`}>
                  <img
                    className="absolute w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute w-[68px] h-6 top-5 right-5 flex gap-4">
                    <FavoriteIcon fill="var(--main)" />
                    <ShoppingBagIcon stroke="var(--main)" />
                  </div>

                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                    <Link to={AppRoute.PRODUCTS} className="absolute bottom-5">
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
