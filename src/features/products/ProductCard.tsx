import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ISingleProduct } from '@/types/';
import { AppRoute } from '@/enums';
import { useCartStore } from '@/store/cart/useCartStore';
import { useProductStore } from '@/store/products/useProductsStore';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteIcon, ShoppingBagIcon, FavoriteFilledIcon, ShoppingBagFilledIcon } from '@/assets';

export const ProductCard = ({ product }: { product: ISingleProduct }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const favorites = useProductStore((state) => state.favorites);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  const isInFavorite = favorites.some((id) => id === (product.id));

  return (
    <Card className={cn('min-w-[259px] min-h-[297px] group rounded-none')}>
      <CardContent
        className={cn(
          'relative w-full overflow-hidden',
          product.isLarge ? 'h-[617px]' : 'h-[276px]',
        )}
      >
        <div className="w-full h-full relative bg-cover bg-center">
          <div className="absolute w-full h-auto  inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <img
            src={product.image}
            alt={product.name}
            className={cn(
              'absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300',
            )}
          />

          <div className="absolute top-5 right-5 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button className="btn" onClick={() => toggleFavorite(product.id)}>
              {isInFavorite ? (
                <FavoriteFilledIcon classname="w-5 h-5" />
              ) : (
                <FavoriteIcon fill="var(--brown-dark)" />
              )}
            </button>

            <button className="btn" onClick={() => addToCart(product)}>
              {isInCart ? (
                <ShoppingBagFilledIcon classname="w-5 h-5" />
              ) : (
                <ShoppingBagIcon stroke="var(--brown-dark)" />
              )}
            </button>
          </div>

          <Link
            to={AppRoute.PRODUCT.replace(':id', String(product.id))
              // .replace(':category', product.categoryName)
              // .replace(':collection', product.collectionName)
              .replace(':title', `${product.categoryName} ${product.collectionName}`)
              .toLowerCase()}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <button className="btn-buy">Купити</button>
          </Link>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-medium text-lg">{product.categoryName}</span>

          <span className="text-sm text-gray-500">{product.collectionName}</span>
        </div>

        <span className="font-semibold text-md mt-2">{product.price} грн</span>
      </CardFooter>
    </Card>
  );
};
