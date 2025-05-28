import { request } from "@/api/requestService";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IProductItem } from "@/types/";

const getAllProducts = async (): Promise<IProductItem[]> => {
  return await request<IProductItem[]>({
    url: ApiEndpoint.PRODUCTS,
    method: HttpMethod.GET,
  });
};

const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
  sort: 'asc' | 'desc' = 'asc'
): Promise<IProductItem[]> => {
  return await request<IProductItem[]>({
    url: ApiEndpoint.PRODUCTS_SORTED,
    method: HttpMethod.GET,
    params: { minPrice, maxPrice, sort },
  });
};

const getProductById = async (id: number): Promise<IProductItem> => {
  return await request<IProductItem>({
    url: `${ApiEndpoint.PRODUCTS}/${id}`,
    method: HttpMethod.GET,
  });
};

const getProductBySku = async (sku: string): Promise<IProductItem> => {
  return await request<IProductItem>({
    url: `${ApiEndpoint.PRODUCTS}/sku/${sku}`,
    method: HttpMethod.GET,
  });
};

const deleteProductById = async (id: number): Promise<void> => {
  return await request<void>({
    url: `${ApiEndpoint.PRODUCTS}/${id}`,
    method: HttpMethod.DELETE,
  });
};

export {
  getAllProducts,
  getProductsByPriceRange,
  getProductById,
  getProductBySku,
  deleteProductById,
}
