import { useState} from "react";

import InfoIcon from "@/admin-panel/icons/InfoIcon";
import VerticalBreadCrumble from "@/admin-panel/icons/VerticalBreadCrumble";
import { IProductItem } from "@/types/product";

interface AdminProductCardProps {
    product: IProductItem;
    onDeleteCard : () => void;
    onEditCard : () => void;
}

export const AdminProductCard = ({product} : AdminProductCardProps) => {
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    const hasSizes = product.productSizes && product.productSizes.length > 0 ;
    const spacingClasses = hasSizes ? "pb-[11px] pt-[11px]" : "pt-9 pb-9";

    return (
        <div className="px-2 pt-2 bg-white flex flex-col w-full">
            <div className="flex w-full">
                <div className="w-[92px] h-[120px]">
                    {product?.images?.map((img) => (
                        <div key={img.url}>
                            {img.isMainImage ? (
                                <img src={img.url} alt={product.name}></img>
                            ) : null}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col pl-5 gap-4">
                    <span className="text-[#727272] text-[12px]">Артикул : {product.sku}</span>
                    <div>
                        <span>{product.name}</span> <span className="text-[#727272]">"{product.collectionName}"</span>
                    </div>
                    <span>{product?.price?.normalPrice} грн</span>
                </div>
                <div className="ml-auto relative flex flex-col">
                    <div 
                        className="text-[#727272] cursor-pointer "
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <VerticalBreadCrumble />
                    </div>
                    {isMenuOpen && (
                        <div className="absolute flex flex-col gap-2 py-4 right-0 top-6 bg-white shadow-md border rounded-md z-10 w-32">
                            <button className="text-left pl-4 hover:text-white hover:bg-[#5B242A] hover-pl-5">Редагувати</button>
                            <button className="text-left pl-4 hover:text-white hover:bg-[#5B242A]">Видалити</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={`flex flex-col gap-2 ${spacingClasses}`}>
                <div className="flex justify-between">
                    <span>Продажі</span>
                    <span>29</span>
                </div>
                <div className="flex justify-between">
                    <span>Залишок</span>
                    <span>40</span>
                </div>
                {product.productSizes && product.productSizes.length >= 1 && (
                    <div className="flex justify-between items-center">
                        <span className="text-[12px] text-[#727272]">Залишки по розмірах</span>
                    <div>
                        <InfoIcon />
                    </div>
                    </div>
                )}
            </div>
        </div>
    )       
}