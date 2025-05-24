import { request } from "@/api/requestService";
import { ApiEndpoint } from "@/enums";
import { Product } from "@/types/";

export const getAllProducts = async (): Promise<Product[]> => {
  return await request<Product[]>({
    url: ApiEndpoint.PRODUCTS,
    method: 'GET',
  });
};

// 2. Отримати продукти у діапазоні цін з сортуванням
export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
  sort: 'asc' | 'desc' = 'asc'
): Promise<Product[]> => {
  return await request<Product[]>({
    url: ApiEndpoint.PRODUCTS_SORTED,
    method: 'GET',
    params: { minPrice, maxPrice, sort },
  });
};

// 3. Отримати продукт за ID
export const getProductById = async (id: number): Promise<Product> => {
  return await request<Product>({
    url: `${ApiEndpoint.PRODUCTS}/${id}`,
    method: 'GET',
  });
};

// 4. Отримати продукт за SKU
export const getProductBySku = async (sku: string): Promise<Product> => {
  return await request<Product>({
    url: `${ApiEndpoint.PRODUCTS}/sku/${sku}`,
    method: 'GET',
  });
};

// 5. Видалити продукт за ID
export const deleteProductById = async (id: number): Promise<void> => {
  return await request<void>({
    url: `${ApiEndpoint.PRODUCTS}/${id}`,
    method: 'DELETE',
  });
};

// export const getAllProducts = async () => {
//   const response = await axiosInstance.get('/products');
//   return response;
// };

// export const getProductsByPriceRange = async (
//   minPrice: number,
//   maxPrice: number,
//   sort: 'asc' | 'desc' = 'asc'
// ) => {
//   const response = await axiosInstance.get('/products', {
//     params: {
//       minPrice,
//       maxPrice,
//       sort,
//     },
//   });
//   return response;
// };

// export const getProductById = async (id: string) => {
//   const response = await axiosInstance.get(`/products/${id}`);
//   return response;
// };

// export const getProductBySku = async (sku: string) => {
//   const response = await axiosInstance.get(`/products/sku/${sku}`);
//   return response;
// };

// export const deleteProductById = async (id: string) => {
//   const response = await axiosInstance.delete(`/products/${id}`);
//   return response;
// };
