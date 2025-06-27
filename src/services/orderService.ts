import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IOrderRequest } from "../types/";

const createOrderService = async (
  userId: number,
  cartId: number,
  productId: number,
  quantity: number,
): Promise<IOrderRequest> => {
  const res = await request<IOrderRequest>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    data: {
      userId,
      items: {
        cartId,
        productId,
        quantity
      }
    },
  });

return res;
};

export { createOrderService }