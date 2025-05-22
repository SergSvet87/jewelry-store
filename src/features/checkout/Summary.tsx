import { MinusIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';

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
  return (
    <div className="flex flex-col w-full max-w-[650px] items-start gap-10">
      {/* Product Card */}
      <div className="flex gap-5 self-stretch w-full items-start">
        <img className="w-[203px] h-[203px] object-cover" alt="Product" src={product.image} />

        <div className="flex flex-col w-full h-[203px] items-start justify-between">
          <div className="flex items-center gap-2 relative self-stretch w-full">
            <div className="flex w-full items-start justify-between">
              <div className="w-full font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] leading-[var(--body-small-line-height)] tracking-[var(--body-small-letter-spacing)] [font-style:var(--body-small-font-style)]">
                {product.title}
              </div>

              <button className="flex items-center justify-center">
                <MoreVerticalIcon className="w-5 h-5 text-brown-dark" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 pr-2 w-full">
            <div className="flex items-center gap-2">
              <button className="p-0 h-auto w-auto">
                <MinusIcon className="w-5 h-5 text-brown-dark" />
              </button>

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
              <div className="font-body-small font-[number:var(--body-small-font-weight)] text-[length:var(--body-small-font-size)] leading-[var(--body-small-line-height)] text-button text-right tracking-[var(--body-small-letter-spacing)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                {product.price}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Service */}
      <div className="flex items-start justify-between w-full">
        <div className="font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] leading-[var(--body-small-line-height)] whitespace-nowrap tracking-[var(--body-small-letter-spacing)] [font-style:var(--body-small-font-style)]">
          Послуги доставки
        </div>

        <div className="flex items-center justify-center">
          <div className="font-body-small font-[number:var(--body-small-font-weight)] text-[length:var(--body-small-font-size)] leading-[var(--body-small-line-height)] text-button text-right tracking-[var(--body-small-letter-spacing)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
            {summaryData.deliveryService}
          </div>
        </div>
      </div>

      {/* Total Payment */}
      <div className="flex items-start justify-between w-full">
        <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] leading-[var(--body-line-height)] whitespace-nowrap tracking-[var(--body-letter-spacing)] [font-style:var(--body-font-style)]">
          До сплати
        </div>

        <div className="flex items-center justify-center">
          <div className="font-body font-[number:var(--body-font-weight)] text-[length:var(--body-font-size)] leading-[var(--body-line-height)] text-button text-right tracking-[var(--body-letter-spacing)] whitespace-nowrap [font-style:var(--body-font-style)]">
            {summaryData.totalPayment}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between w-full gap-5">
        <button className="w-full h-auto py-2.5 px-10 rounded-none border-[#1d110a] text-brown-dark hover:text-brown-dark hover:bg-transparent">
          <span className="font-body font-[number:var(--body-font-weight)] text-[length:var(--body-font-size)] leading-[var(--body-line-height)] tracking-[var(--body-letter-spacing)] [font-style:var(--body-font-style)]">
            Продовжити покупки
          </span>
        </button>

        <button className="w-full h-auto py-2.5 px-[50px] rounded-none bg-[#5b242a] text-main hover:bg-[#5b242a]/90">
          <span className="font-body font-[number:var(--body-font-weight)] text-[length:var(--body-font-size)] leading-[var(--body-line-height)] tracking-[var(--body-letter-spacing)] [font-style:var(--body-font-style)]">
            Замовлення підтверджую
          </span>
        </button>
      </div>
    </div>
  );
};
