import { Button } from '@/components/ui';
import { AppRoute } from '@/enums';
import { MinusIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define data structure for product
const product = {
  image: '/pic.png',
  title: 'Сережки з білого золота з фіанітами "Glow"',
  price: '22 636 грн',
  quantity: 1,
};

// Define data for summary
const summaryData = {
  deliveryService: '0 грн',
  totalPayment: '22 636 грн',
};

export const Summary = () => {
  const conditions = [
    {
      title: 'Підтверджуючи замовлення, ви приймаєте умови:',
      content: [
        { text: '· Угоди користувача', link: AppRoute.USER_AGREEMENT },
        { text: '· Політику Конфіденційності', link: AppRoute.PRIVACY },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[538px] items-start gap-10">
      {/* Product Card */}
      <div className="flex gap-5 self-stretch w-full items-start">
        <img className="w-[203px] h-[203px] object-cover" alt="Product" src={product.image} />

        <div className="flex flex-col w-full h-[203px] items-start justify-between">
          <div className="flex items-center gap-2 relative self-stretch w-full">
            <div className="flex w-full items-start justify-between">
              <div className="w-full ">{product.title}</div>

              <button className="flex items-center justify-center">
                <MoreVerticalIcon className="w-5 h-5 text-brown-dark" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 pr-2 w-full">
            <div className="flex items-center gap-2">
              <Button variant="ghost" type='button' className="p-0 h-auto w-auto">
                <MinusIcon className="w-5 h-5 text-brown-dark" />
              </Button>

              <div className="relative w-[30px] h-[30px] border border-solid border-[#717171] flex items-center justify-center">
                <div className="font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] text-center tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
                  {product.quantity}
                </div>
              </div>

              <button className="p-0 h-auto w-auto">
                <PlusIcon className="w-5 h-5 text-brown-dark" />
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="">{product.price}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Service */}
      <div className="flex items-start justify-between w-full">
        <div className="">Послуги доставки</div>

        <div className="flex items-center justify-center">
          <div className="">{summaryData.deliveryService}</div>
        </div>
      </div>

      {/* Total Payment */}
      <div className="flex items-start justify-between w-full">
        <div className="font-medium text-second">До сплати</div>

        <div className="text-2xl text-button">{summaryData.totalPayment}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center w-full mb-10">
        <button className="w-full btn-buy">Замовлення підтверджую</button>
      </div>

      <div className="flex w-full font-main font-light text-[12px]">
        {conditions.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-2 w-full">
            <p className="">{item.title}</p>

            {item.content.map((content, i) => (
              <Link key={i} to={content.link} className='hover:underline'>
                {content.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
