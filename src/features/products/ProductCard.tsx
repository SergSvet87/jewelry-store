import cn from 'classnames';

import { Product } from '@/types/';
import { useCartStore } from '@/store/cart/useCart';
import { FavoriteIcon, ShoppingBagIcon } from '@/assets';
import { Card, CardContent, CardFooter } from '@/components/Card';

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className={cn("group", product.isLarge ? 'w-[540px] h-[614px]' : 'w-[259px] h-[297px]')}>
      <CardContent className="relative overflow-hidden">
        <div className="w-full h-[276px] relative bg-cover bg-center">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <img
            src={product.image}
            alt={product.name}
            className={cn(
              'absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300',
            )}
          />

          <div className="absolute top-5 right-5 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button className="btn">
              <FavoriteIcon fill="var(--brown-dark)" />
            </button>

            <button className="btn" onClick={() => addToCart(product.id)}>
              <ShoppingBagIcon stroke="var(--brown-dark)" />
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-medium text-lg">{product.category}</span>

          <span className="text-sm text-gray-500">{product.collection}</span>
        </div>

        <span className="font-semibold text-md mt-2">{product.price} грн</span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
