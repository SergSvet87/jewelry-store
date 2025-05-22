import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FavoriteIcon, ScalesIcon } from '@/assets';
// import { useCartStore } from '@/store/cart/useCartStore';
// import { useProductStore } from '@/store/products/useProductsStore';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/enums';

export const Info = () => {
  // const addToCart = useCartStore((state) => state.addToCart);
  // const toggleFavorite = useProductStore((state) => state.toggleFavorite);

  const productDetails = {
    name: 'Підвіска "Glow"',
    articleNumber: '0025150',
    price: '5 248 грн',
  };

  const specifications = [
    { name: 'Метал', value: 'Золото' },
    { name: 'Колір', value: 'Білий' },
    { name: 'Середня вага', value: '~2,18 г' },
  ];

  const dimensions = [
    { name: 'Ширина', value: '8 мм' },
    { name: 'Висота', value: '8 мм' },
    { name: 'Довжина', value: '2 мм' },
  ];

  return (
    <div className="flex flex-col w-full items-start gap-8">
      <div className="flex-col items-end gap-7 flex relative self-stretch w-full">
        <div className="flex flex-col items-start gap-1 relative self-stretch w-full">
          <div className="flex items-center justify-between relative self-stretch w-full">
            <h3 className="">{productDetails.name}</h3>

            <div className="flex items-center gap-4">
              <button type="button" className="btn" onClick={() => {}}>
                <ScalesIcon fill="var(--brown-dark)" />
              </button>

              <button type="button" className="btn" onClick={() => {}}>
                <FavoriteIcon fill="var(--brown-dark)" />
              </button>
            </div>
          </div>

          <div className="self-stretch font-medium text-grey text-base leading-[20.8px]">
            Артикул: {productDetails.articleNumber}
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 relative self-stretch w-full">
          <div className="inline-flex h-8 items-center justify-center">
            <h3 className="">{productDetails.price}</h3>
          </div>

          <div className="flex items-center justify-between gap-5 relative self-stretch w-full">
            <Link to={AppRoute.CHECKOUT} className=''>
              <button className="btn-buy">Купити</button>
            </Link>

            <button className="btn-add " onClick={() => {}}>
              Додати в кошик
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={['characteristics', 'delivery', 'returns']}
        >
          <AccordionItem value="characteristics" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Характеристики</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col w-full items-start gap-1">
                {specifications.map((spec, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-between w-full">
                      <div className="font-medium text-grey text-base leading-[20.8px]">
                        {spec.name}
                      </div>
                      <div className="font-medium text-grey text-base leading-[20.8px]">
                        {spec.value}
                      </div>
                    </div>
                  </React.Fragment>
                ))}

                <div className="flex items-center justify-between w-full">
                  <div className="font-medium text-grey text-base leading-[20.8px]">Розміри</div>
                </div>
                <div className="flex items-center justify-between w-full pl-4 pr-0 py-2">
                  <div className="flex flex-col items-start gap-1">
                    {dimensions.map((dim, index) => (
                      <div key={index} className="font-medium text-grey text-base leading-[20.8px]">
                        {dim.name}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {dimensions.map((dim, index) => (
                      <div key={index} className="font-medium text-grey text-base leading-[20.8px]">
                        {dim.value}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="font-medium text-grey text-base leading-[20.8px]">Камінь</div>
                  <div className="font-medium text-grey text-base leading-[20.8px]">Фіаніт</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Доставка та оплата</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-grey text-base">
                <span className="text-[#717171] leading-[var(--body-small-line-height)] font-body-small tracking-[var(--body-small-letter-spacing)] text-[length:var(--body-small-font-size)]">
                  Доставка у відділення і поштомат Нової Пошти та кур&apos;єром Нової Пошти
                  незалежно від суми замовлення - безкоштовно.{' '}
                </span>

                <span className="font-medium text-[#717171] block my-2">
                  Оплату можна здійснити:
                </span>

                <span className="text-[#717171] leading-[var(--body-small-line-height)] font-body-small tracking-[var(--body-small-letter-spacing)] text-[length:var(--body-small-font-size)]">
                  Готівкою при отриманні; <br />
                  Післяплатою від Нової Пошти; <br />
                  Картою Visa / MasterCard; <br />
                  Скористатися сервісами LiqPay, Приват24, Monobank; <br />
                  Оформити оплату частинами від Приват 24, Monobank; <br />
                  Подарунковим сертифікатом ТМ &#34;Jemma&#34;.
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Повернення</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-medium text-grey text-base leading-[normal]">
                Просимо звернути увагу, що згідно з чинного законодавства України ювелірні виробу
                входять до переліку товарі, що НЕ підлягають поверненню та обміну : &quot;Ювелірні
                вироби належної якості, указані в переліку Непродовольчих товарів, затвердженим
                Постановою Кабінету міністрів України від 19 березня 1994 руку №172, не підлягають
                поверненню та обміну.&quot;
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
