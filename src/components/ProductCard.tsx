import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { AppRoute } from '@/enums';
import { ICertificateItem, IProductItem } from '../types/';
import { useCartStore, useProductStore } from '@/store';
import { Card, CardContent, CardFooter } from './ui';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';

interface ProductCardProps {
  product: IProductItem;
  certificate?: ICertificateItem;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  isHidden?: boolean;
}

export const ProductCard = ({ product, size = 'small', className, isHidden }: ProductCardProps) => {
  const isInCart = useCartStore((state) => state.isInCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setFavorites = useProductStore((state) => state.setFavorites);
  const favorites = useProductStore((state) => state.favorites);  

  const isFavorite = favorites.includes(product.id);
  const isInCartProduct = isInCart(product.id);

  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  return (
    <Card
      className={cn(
        'group relative border-0 overflow-hidden flex flex-col justify-between transition-all',
        isLarge
          ? 'lg:w-[650px] w-[361px] lg:h-[828px] h-[399px]'
          : isMedium
            ? 'lg:w-[315px] w-[176px] lg:h-[438px] h-[262px]'
            : 'lg:w-[259px] w-[177px] lg:h-[297px] h-[266px]',
        className,
      )}
    >
      <CardContent
        className={cn(
          'flex flex-col items-center justify-end gap-2.5 relative flex-1 shrink-0 mb-3 overflow-hidden border-0 w-full bg-cover bg-center',
          isLarge
            ? 'lg:h-[593px] h-[383px]'
            : isMedium
              ? 'lg:h-[400px] h-[244px]'
              : 'lg:h-[276px] h-[244px]',
        )}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

        <img
          className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
          src={product.images?.url}
          alt={product.name}
        />

        <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
          <button className="btn w-6 h-6" onClick={() => setFavorites(product.id)}>
            {isFavorite ? (
              <FavoriteFilledIcon classname="w-6 h-6" />
            ) : (
              <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
            )}
          </button>

          <button
            className="btn w-6 h-6"
            onClick={() => (isInCartProduct ? removeFromCart(product.id) : addToCart(product))}
          >
            {isInCart(product.id) ? (
              <ShoppingBagFilledIcon classname="w-6 h-6" />
            ) : (
              <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
            )}
          </button>
        </div>

        <Link
          to={AppRoute.PRODUCT.replace(':id', product.id.toString())
            .replace(':category', product.categoryName)
            .replace(':collection', product.collectionName)
            .replace(':title', product.name)}
          className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
        >
          <button className="btn-buy">Купити</button>
        </Link>
      </CardContent>

      {isHidden ? null : (
        <CardFooter className="flex justify-between items-center">
          <div className="font-medium text-brown-dark">
            <span>{product.name.split(' ')[0]} </span>

            <span className="text-grey">{product.collectionName}</span>
          </div>

          <div className="text-right lg:text-text text-mobile text-brown-dark">
            {product.sale ? (
              <>
                <div className="line-through text-grey">{product.price}&nbsp;грн</div>
                <div>{product.sale}&nbsp;грн</div>
              </>
            ) : (
              <div>{product.price}&nbsp;грн</div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
