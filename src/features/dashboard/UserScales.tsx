import { useMemo, useEffect} from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { getAllProducts } from '@/services';
import { useProductStore } from '@/store/useProductStore';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/product';
import { DeleteIcon } from '@/assets';

export const UserScales = () => {

  const scales = useProductStore((state) => state.scales);
  const setScales = useProductStore((state) => state.setScale)
  const allProducts = useProductStore((state) => state.allProducts);
  const getProductById = useProductStore((state) => state.getProductById);
  const setAllProducts = useProductStore((state) => state.setAllProducts);

  const products = useMemo(() => {
  return scales
    .map((id) => getProductById(id))
    .filter((product): product is IProductItem => Boolean(product));
}, [scales, allProducts.content, getProductById]);

  const groupedProducts = useMemo(() => {
  return products.reduce((acc, product) => {
    const category = product.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, IProductItem[]>);
}, [products]);

useEffect(() => {
  const fetchProducts = async () => {
    if (allProducts.content.length === 0) {
      try {
        const res = await getAllProducts({ 
          page: 0, 
          size: 100 
        });
        
        setAllProducts(res); 
        
      } catch (err) {
        console.error("Помилка при завантаженні товарів:", err);
      }
    }
  };

  fetchProducts();
}, [allProducts.content.length, setAllProducts]);

return (
  <div className="flex flex-col gap-12 w-full h-auto leading-[130%]">
    <h4 className="mt-8 text-[20px] text-[#5B242A] text-center font-medium">Списки порівнянь</h4>
    
    <div className="flex flex-col gap-10 px-3 pb-12">
      {Object.entries(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-4">
              <h5 className="font-medium text-[20px]">{category}</h5>
            <div className="grid grid-cols-2 gap-2">
              {items.map((product) => (
                <Card key={product.id} className="relative">
                  <CardContent className={cn('relative w-full overflow-hidden')}>
                    <div className="w-full h-full relative bg-cover bg-center">
                        {product?.images.slice(0, 1).map((image, index) => (
                            <div 
                            key={index} 
                            className='w-full aspect-[4/5] overflow-hidden'>
                                <img
                                  src={image.url}
                                  alt={product.name}
                                  className='object-cover h-full w-full'
                                />
                            </div>
                        ))}
                        
                        <div className='absolute bottom-2 left-0 right-0 flex justify-center z-20'>
                            <Link to={`${AppRoute.PRODUCTS}/${product.id}/${product.categoryName}/${product.collectionName}/${product.name}`.trim()}>
                                <button className="btn-buy" type='button'>Купити</button>
                            </Link>
                        </div>

                        <div className="absolute top-5 right-5 flex gap-2 z-20">
                           <button className="btn" onClick={() => setScales(product.id)}>
                               <DeleteIcon classname="w-5 h-5 text-grey" />
                           </button>
                        </div> 
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-1 pb-2 text-[12px]">
                    <div className='flex gap-1'>
                      <span>{product.categoryName}</span>
                      <span className="text-[#727272]">"{product.collectionName}"</span>
                    </div>
                     <span>
                        {product.price.discountedPrice ?? product.price.normalPrice} грн
                     </span>
                  </CardFooter>

                 
                </Card>
              ))}
            </div>

                    {items.length > 1 ? (
                    <button 
                      className="text-sm text-black border-1 font-medium w-full py-2 hover:bg-[#7a3138] transition-colors"
                      onClick={() => console.log(`Порівнюємо ${category}`)}
                    >
                      Порівняти {category}
                    </button>
                  ):(
                    <div className='text-center text-xl text-red-400 font-medium'>Для порівняння потрібно мінімум два товара</div>
                  )}
              <div className="flex items-center justify-between border-b border-[#5B242A]/20 pt-5"/>
          </div>

        ))
      ) : (
        <div className='text-center text-xl font-medium'>У вас немає товарів для порівняння</div>
      )}
    </div>
  </div>
);
};
