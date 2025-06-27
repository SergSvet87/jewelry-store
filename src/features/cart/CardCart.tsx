import { FC, useState } from 'react';
import cn from 'classnames';

import { DeleteIcon } from '@/assets';
import { Button } from '@/components/ui';
import { IProductItem } from '@/types/';
import { useModalStore } from '@/store';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { calculateItemTotalPrice } from '@/utils/calculateItemTotal';

interface ICardCart {
  item: IProductItem;
  quantity: number;
  itemId: number;
  availableQuantity?: number;
}

export const CardCart: FC<ICardCart> = ({ item, quantity }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useSmartCart();

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleDeleteProduct = () => {
    useModalStore.getState().openDeleteFromCartModal(item.id);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(item.id);
    } else {
      decreaseQuantity(item.id);
    }
  };

  return (
    <article className="flex justify-between gap-5 h-[202px]">
      <div className="w-[202px] h-auto">
        {item.images.slice(0, 1).map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      <div className="flex flex-col justify-between pb-[53px] relative flex-1">
        <div className="pr-[30px] flex-wrap text-left">{item.name}&nbsp;&quot;{item?.collectionName}&quot;</div>

        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center gap-1 ">
            <Button
              variant="ghost"
              className="!w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark disabled:text-grey disabled:cursor-default transition-all duration-300"
              disabled={quantity === 1}
              onClick={handleDecrease}
            >
              -
            </Button>

            <span className="w-[30px] h-[30px] border border-grey flex items-center justify-center">
              {quantity}
            </span>

            <Button
              variant="ghost"
              className="!w-[20px] h-[20px] text-grey text-[30px] hover:text-brown-dark transition-all duration-300"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </Button>
          </div>

          <div className="min-w-[120px] text-second font-[500] font-main text-button">
            {calculateItemTotalPrice(quantity, item.price.discountedPrice ?? item.price.normalPrice).toFixed(2)} грн
          </div>
        </div>

        <Button
          variant="ghost"
          className="absolute top-0 right-0 h-auto !p-0"
          onClick={handleDeleteProduct}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <DeleteIcon
            classname={cn(
              'w-5 h-5 transition-all duration-300',
              isHovering ? 'text-brown-dark' : 'text-grey',
            )}
          />
        </Button>
      </div>
    </article>
  );
};
