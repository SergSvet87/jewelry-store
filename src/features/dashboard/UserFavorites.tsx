import cn from 'classnames';

import { DeleteIcon } from '@/assets';
import { useProductStore } from '@/store';
import { Card, CardContent, CardFooter } from '@/components/ui';

export const UserFavorites = () => {
  const favorites = useProductStore((state) => state.favorites);
  const setFavorites = useProductStore((state) => state.setFavorites);
  const getProductById = useProductStore((state) => state.getProductById);

  const products = favorites
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="flex flex-col gap-7 w-full h-auto">
      <h4 className="mt-2">Улюблені товари</h4>

      <div className="flex flex-wrap gap-12">
        {products.length > 0 ? (
          products.map((product) => (
            <Card className={cn('min-w-[259px] min-h-[297px] group rounded-none')}>
              <CardContent className={cn('relative w-full overflow-hidden')}>
                <div className="w-full h-full relative bg-cover bg-center">
                  <div className="absolute w-full h-auto  inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {product.images
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={product.name}
                        className={cn(
                          'absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300',
                        )}
                      />
                    ))
                    .slice(0, 1)}

                  <div className="absolute top-5 right-5 flex gap-2 z-20 ">
                    <button className="btn" onClick={() => setFavorites(product.id)}>
                      <DeleteIcon classname="w-5 h-5 text-grey" />
                    </button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-lg">{product.categoryName}</span>

                  <span className="text-sm text-gray-500">{product.collectionName}</span>
                </div>

                <span className="font-semibold text-md">{product.price.discountedPrice ?? product.price.normalPrice} грн</span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>У вас немає улюблених товарів</div>
        )}
      </div>
    </div>
  );
};
