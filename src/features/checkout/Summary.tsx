  import { Link } from 'react-router-dom';
  import { AppRoute } from '@/enums';
  import { useSmartCart } from '@/lib/hooks/useSmartCart';

  export const Summary = () => {
      
    const {cartItemsWithData} = useSmartCart()
    
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
      <div className="w-full leading-[130%] ">

      <div className='grid grid-cols-2 justify-between items-center'>
        <span className='text-[20px] font-medium'>Промокод</span>
        <button 
          type='button'
          className='text-[16px] border-1 p-3'
          >
            Додати
          </button>
      </div>

      <div className='flex flex-col gap-8 py-8 w-full' >
        <section className="flex items-start justify-between">
          <span>Послуги доставки</span>
          <span className="">{deliveryService}&nbsp;грн</span>
        </section>

        <section className="flex items-start justify-between">
          <span>Подарункове паковання</span>
          <span className="">{giftWrapping}&nbsp;грн</span>
        </section>

        <section className="flex justify-between items-baseline">
          <span className="font-medium text-second">До сплати</span>
          <span className="text-2xl text-button">{totalPayment}грн</span>
        </section>
      </div>

      

        <div className="flex items-center w-full mb-10">
          <button 
          className="w-full btn-buy bg-button" 
          type="submit" 
          >
            Замовлення підтверджую
          </button>
        </div>

        <div className="flex w-full font-main font-light text-[12px]">
          {conditions.map((item, index) => (
            <div key={index} className="flex flex-col items-start gap-2 w-full">
              <p className="">{item.title}</p>

              {item.content.map((content, i) => (
                <Link key={i} to={content.link} className="underline ">
                  {content.text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
