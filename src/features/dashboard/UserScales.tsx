import cn from 'classnames';

import { useProductStore } from '@/store/useProductStore';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/product';
import { DeleteIcon } from '@/assets';

export const UserScales = () => {
  const scales = useProductStore((state) => state.scales);
  const setScales = useProductStore((state) => state.setScale)

  const products = scales
  .map((id) => useProductStore.getState().getProductById(id))
  .filter((product): product is IProductItem => Boolean(product));

  return (
    <div className="flex flex-col gap-12 w-full h-auto leading-[130%]">
      <h4 className="mt-8 text-[20px] text-[#5B242A] text-center">Список порівнянь</h4>
      
      <div className="grid grid-cols-2 px-3 gap-2 pb-12">
        {scales.length > 0 ? (
          products.map((product) => (
            <Card className="relative">
               <CardContent className={cn('relative w-full overflow-hidden')}>
                <div className="w-full h-full relative bg-cover bg-center">
                  <div className="absolute w-full h-auto  inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pyx" />
                      {product?.images
                        .map((image, index) => (
                          <div className='w-full aspect-[4/5] overflow-hidden'>
                            <img
                              key={index}
                              src={image.url}
                              alt={product.name}
                              className={cn(
                                'object-cover h-full w-full',
                              )}
                            />
                          </div>
                         
                          ))
                        .slice(0, 1)}

                    <div className='absolute bottom-2 left-0 right-0 flex justify-center z-20'>
                    <Link to={`${AppRoute.PRODUCTS}/${product.id}/${product.categoryName}/${product.collectionName}/${product.name}`.trim()}>
                     <button
                        className="btn-buy"
                        type='button'
                      >
                        Купити
                      </button>
                     </Link>
                    </div>

                    <div className="absolute top-5 right-5 flex gap-2 z-20 ">
                       <button className="btn" onClick={() => setScales(product.id)}>
                           <DeleteIcon classname="w-5 h-5 text-grey" />
                       </button>
                    </div>    
                </div>

                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                  <span className="font-medium">{product.categoryName}</span>

                  <span className="text-md text-gray-500">"{product.collectionName}"</span>
                </div>

                <span className="font-semibold ">{product.price.discountedPrice ?? product.price.normalPrice} грн</span>
                    </CardFooter>
                  </Card>
                ))
              ) : (
            <div className='text-center text-xl font-medium'>У вас немає товарів для порівняння</div>
          )}
      </div>
    </div>
  );
};
