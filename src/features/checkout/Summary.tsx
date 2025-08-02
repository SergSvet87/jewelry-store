// import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { CardCheckout } from './CardCheckout';
import { useSmartCart } from '@/lib/hooks/useSmartCart';

export const Summary = ({isOrderReady, handleSubmit}: {isOrderReady: boolean, handleSubmit: () => void}) => {
  const { cartItemsWithData } = useSmartCart();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!cartItemsWithData.length) {
  //     navigate(AppRoute.PRODUCTS);
  //   }
  // }, [cartItemsWithData]);

  const conditions = [
    {
      title: 'Підтверджуючи замовлення, ви приймаєте умови:',
      content: [
        { text: '· Угоди користувача', link: AppRoute.USER_AGREEMENT },
        { text: '· Політику Конфіденційності', link: AppRoute.PRIVACY },
      ],
    },
  ];

  const giftWrapping = 240;
  const deliveryService = 0;

  const cartTotal = cartItemsWithData.reduce((sum, { product, quantity }) => {
    const price = product.price.discountedPrice ?? product.price.normalPrice;
    return sum + price * quantity;
  }, 0);

  const totalPayment = cartTotal + giftWrapping + deliveryService;

  return (
    <div className="flex flex-col w-full max-w-[538px] items-start gap-10">

      <div className="flex w-full flex-col gap-7 ">
        {cartItemsWithData.map(({ product, quantity }) => {
          if (!product) return null;

          return <CardCheckout key={product.id} item={product} quantity={quantity} />;
        })}
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="">Послуги доставки</div>

        <div className="flex items-center justify-center">
          <div className="">{deliveryService}&nbsp;грн</div>
        </div>
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="">Подарункове паковання</div>

        <div className="flex items-center justify-center">
          <div className="">{giftWrapping}&nbsp;грн</div>
        </div>
      </div>

      <div className="flex items-start justify-between w-full">
        <div className="font-medium text-second">До сплати</div>

        <div className="text-2xl text-button">{totalPayment}&nbsp;грн</div>
      </div>

      <div className="flex items-center w-full mb-10">
        <button className="w-full btn-buy" type="submit" disabled={!isOrderReady} onClick={handleSubmit}>
          Замовлення підтверджую
        </button>
      </div>

      <div className="flex w-full font-main font-light text-[12px]">
        {conditions.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-2 w-full">
            <p className="">{item.title}</p>

            {item.content.map((content, i) => (
              <Link key={i} to={content.link} className="hover:underline">
                {content.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
