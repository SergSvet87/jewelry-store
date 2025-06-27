import { request } from "@/api/requestService";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IProductItem, IProducts } from "@/types/";

const getAllProducts = async (
  page: number,
  pageSize?: number
): Promise<IProducts> => {
  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS,
    method: HttpMethod.GET,
    params: { page, pageSize },
  });
};

const fetchProductById = async (id: number): Promise<IProductItem> => {
  return await request<IProductItem>({
    url: `${ApiEndpoint.PRODUCTS}/id/${id}`,
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

const getSortedProducts = async (
  page: number,
  sort?: string,
  maxPrice?: number,
  minPrice?: number,
  category?: string[],
  collection?: string[],
  material?: string[]
): Promise<IProducts> => {
  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS_SORTED,
    method: HttpMethod.POST,
    params: {
      page: page - 1,
      direction: sort,
      minPrice,
      maxPrice,
      material,
    },
    data: {
      categories: category,
      collections: collection,
    }
  });
};

const getSearchProducts = async (
  page: number,
  category?: string,
  collection?: string,
  name?: string,
  stone?: string,
  color?: string,
  metal?: string
): Promise<IProducts> => {
  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS_SEARCH,
    method: HttpMethod.GET,
    params: {
      page: page - 1,
      category,
      collection,
      name,
      stone,
      color,
      metal
    },
  });
};

export {
  getAllProducts,
  fetchProductById,
  getProductBySku,
  deleteProductById,
  getSortedProducts,
  getSearchProducts,
}
