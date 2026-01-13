import { IProductItem } from '@/types/';

export const groupProductsByCategory = (products : IProductItem[]) => {
    return products.reduce((acc, product) => {
        const category = product.categoryName;
        if(!acc[category]) acc[category] = [];
        acc[category].push(product
        ) 
        return acc
    }, {} as Record <string, IProductItem[]>)
}