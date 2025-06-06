import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useCartStore, useProductStore, useModalStore } from '@/store';
import { CardCart } from './CardCart';

export const PopUpCart = () => {
  const { openModal, close } = useModalStore();

  const isOpen = openModal === 'deleteFromCart';

  const cart = useCartStore((state) => state.cart);
  const { getProductById } = useProductStore();

  const total = cart.items?.reduce((sum, { productId, quantity }) => {
    const product = getProductById(productId);

    return product ? sum + product.price * quantity : sum;
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogTrigger className="hidden" />
      <DialogContent className="!max-w-[650px] flex flex-col items-center gap-7 p-7">
        <DialogTitle className="w-full text-center text-second font-[500] font-main">
          Кошик
        </DialogTitle>

        <DialogDescription className="hidden" />

        <div className="w-full text-center">
          {cart && cart?.items?.length > 0 ? (
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-7 overflow-y-auto max-h-[440px]">
                {cart?.items?.map(({ productId, quantity }) => {
                  const product = getProductById(productId);

                  if (!product) return null;

                  return <CardCart key={product.id} item={product} quantity={quantity} />;
                })}
              </div>

              <div className="pt-7 border-t border-brown-dark flex items-center justify-between">
                <span className="text-second  font-[500] font-main text-brown-dark">Разом</span>{' '}
                <span className="font-third text-[24px] text-button">{total?.toFixed(2)} грн</span>
              </div>
            </div>
          ) : (
            <span className="w-full text-center">У вас немає товарів у кошику</span>
          )}
        </div>

        <DialogFooter className="w-full">
          {cart && cart?.items?.length > 0 ? (
            <div className="flex items-center justify-between gap-5">
              <Button variant="outline" className="w-[287px]" asChild onClick={() => close()}>
                <Link to={AppRoute.PRODUCTS}>Продовжити покупки</Link>
              </Button>

              <Button className="w-[287px]" asChild onClick={() => close()}>
                <Link to={AppRoute.CHECKOUT}>Оформити замовлення</Link>
              </Button>
            </div>
          ) : (
            <Button className="w-[307px]" asChild onClick={() => close()}>
              <Link to={AppRoute.PRODUCTS}>Переглянути каталог</Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
