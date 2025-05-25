import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import { Button } from '@/components/ui';
import { CardCart } from '@/features/cart/CardCart';
import { useCartStore } from '@/store/cart/useCartStore';
import { useProductStore } from '@/store/products/useProductsStore';

export const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const { getProductById } = useProductStore();

  const total = cart.items?.reduce((sum, { productId, quantity }) => {
    const product = getProductById(productId);

    return product ? sum + product.price * quantity : sum;
  }, 0);

  return (
    <section className="w-full min-h-screen mt-[100px] py-[100px]">
      <div className="container h-full flex items-center justify-center">
        <div
          className={cn(
            'flex flex-col items-center gap-7 p-7',
            cart?.items?.length > 0 ? 'max-w-[650px]' : 'max-w-[363px]',
          )}
        >
          <h6 className="w-full text-center text-[length:var(--text)]  font-[500] font-[family-name:var(--font-main)]">
            Кошик
          </h6>

          <div className="w-full text-center pr-5 max-h-[440px] overflow-y-auto custom-scroll">
            {cart && cart?.items?.length > 0 ? (
              <div className="w-full flex flex-col gap-1">
                <div className="flex flex-col gap-7 ">
                  {cart?.items?.map(({ productId, quantity }) => {
                    const product = getProductById(productId);

                    if (!product) return null;

                    return <CardCart key={product.id} item={product} quantity={quantity} />;
                  })}
                </div>
              </div>
            ) : (
              'У  вас немає товарів у кошику'
            )}
          </div>

          <div className="w-full pt-7 border-t border-[var(--brown-dark)] flex items-center justify-between">
            <span className="text-[length:var(--text)]  font-[500] font-[family-name:var(--font-main)] text-[var(--brown-dark)]">
              Разом
            </span>{' '}
            <span className="font-[family-name:var(--font-third)] text-[24px] text-[var(--button)]">
              {total?.toFixed(2)} грн
            </span>
          </div>

          <div className="w-full">
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
              <Button className="w-full" asChild onClick={() => close()}>
                <Link to={AppRoute.PRODUCTS}>Переглянути каталог</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
