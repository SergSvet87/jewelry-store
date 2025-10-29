import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { FavoriteFilledIcon, FavoriteIcon, ScalesIcon } from '@/assets';

export const ProductHeaderMobile = ({ product }: { product: IProductItem }) => { 

  const setFavorites = useProductStore((state) => state.setFavorites);
  const favorites = useProductStore((state) => state.favorites);
  const isFavorite = favorites.includes(product.id);

return (
    <>
     <div className="flex items-center justify-between relative self-stretch w-full">
        <h3 className="">
            {product?.name}&nbsp;&quot;{product?.collectionName}&quot;
        </h3>
            <div className="flex items-center gap-4">
              <button type="button" className="btn" onClick={() => {}}>
                <ScalesIcon classname="text-brown-dark" />
              </button>

              <button type="button" className="btn" onClick={() => setFavorites(product.id)}>
                {isFavorite ? (
                  <FavoriteFilledIcon classname="w-6 h-6" />
                ) : (
                  <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
                )}
              </button>
            </div>
     </div>

     <div className="self-stretch font-medium text-grey">
        Артикул: {product.sku}
     </div>

    </>
    )
}