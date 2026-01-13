import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { AppRoute } from '@/enums';
import { useProductStore } from '@/store';
import { IProductItem } from '../types/';
import { Card, CardContent, CardFooter } from './ui';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { 
  FavoriteFilledIcon, 
  FavoriteIcon, 
  ShoppingBagFilledIcon, 
  ShoppingBagIcon 
} from '@/assets';

interface ProductCardProps {
  product: IProductItem;
  className?: string;
  isHidden?: boolean;
  discounted?: boolean;
}

export const ProductCard = ({
  product,
  discounted,
}: ProductCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useSmartCart();
  const { setFavorites, favorites} = useProductStore();

  const isFavorite = favorites.includes(product.id);
  const inCart = isInCart(product.id);

  const mainImg = product.images.find((img) => img.isMainImage)?.url || product.images[0]?.url;

  return (
<<<<<<< Updated upstream
    <Card
      className={cn(
        'group relative overflow-hidden flex flex-col justify-between transition-all',
        isLarge
          ? 'w-full h-[399px] lg:w-full sm:w-full lg:h-[828px] sm:h-[426px]'
          : isMedium
            ? 'lg:w-full w-full lg:h-[438px] h-[262px]'
            : 'lg:w-full w-full lg:h-[297px] h-[266px]',
        className,
      )}
    
    >
      <CardContent
        className={cn(
          'cursor-pointer flex flex-col items-center justify-end gap-2.5 relative flex-1 shrink-0 mb-3 overflow-hidden border-0 w-full bg-cover bg-center ',
          isLarge
            ? 'lg:h-[593px] h-[383px]'
            : isMedium
              ? 'lg:h-[400px] h-[244px]'
              : 'lg:h-[276px] h-[244px]',
        )}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

        {product.images
          .map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={product.name}
              className={cn(' object-cover w-full h-full')}
            />
          ))
          .slice(0, 1)}

        <div className="absolute flex flex-col w-full top-2 gap-4 px-2 items-end sm:flex sm:flex-col sm:top-1 sm:items-end sm:opacity-100 xl:top-4 xl:px-5 z-5 xl:opacity-0 xl:group-hover:opacity-100 easy-in-out transition-transform duration-500">
          <button className="btn w-6 h-6" onClick={() => setFavorites(product.id)}>
            {isFavorite ? (
              <FavoriteFilledIcon classname="w-6 h-6" />
            ) : (
              <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
            )}
=======
    <Card className={cn("group flex flex-col h-full border-0 shadow-none w-full")}>
      <CardContent className="relative overflow-hidden aspect-[3/4] ">
        <img 
          src={mainImg}
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
          <div className="flex flex-col md:flex-row absolute top-2 right-2 gap-1 z-10">
          <button className="p-1.5  rounded-full transition-colors cursor-pointer" onClick={() => setFavorites(product.id)}>
            {isFavorite ? <FavoriteFilledIcon/> : <FavoriteIcon />}
>>>>>>> Stashed changes
          </button>

          <button className="p-1.5  rounded-full  transition-colors cursor-pointer" onClick={() => inCart ? removeFromCart(product.id) : addToCart(product)}>
            {inCart ? <ShoppingBagFilledIcon classname="w-5 h-5" /> : <ShoppingBagIcon classname="w-5 h-5" />}
          </button>
        </div>
        <Link 
          to={AppRoute.PRODUCT.replace(':id', product.id.toString())}
          className='flex justify-center lg:invisible lg:group-hover:visible'
        >
        <button 
          className="btn-buy absolute bottom-5"
          >
            Купити
        </button>
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between">
        <section className='flex flex-row gap-1'>
          <h3 className="text-[12px] md:text-[16px]">{product.name}</h3>
          <span className="md:text-[16px]">"{product.collectionName}"</span>
        </section>
        
        
        <div className="mt-auto font-bold text-brown-dark">
          {product.price.discountPercentage && discounted ? (
            <div className="flex flex-col">
              <span className="text-xs line-through text-grey font-normal">{product.price.normalPrice} грн</span>
              <span className="text-[12px] font-normal">{product.price.discountedPrice} грн</span>
            </div>
          ) : (
            <span>{product.price.normalPrice} грн</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
