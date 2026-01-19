import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { 
  IOrderResponse, 
  IGuestOrderRequest, 
} from "../types/";

import { IAuthOrderRequest } from "@/types/order";

const createOrderService = async (
  orderData: IAuthOrderRequest, 
  paymentMethod: string, 
  deliveryMethod: string
) => {
  return await request<IOrderResponse>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    params: {
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
    },
    data: {
      id: orderData.userId,
      userId: orderData.userId,
      items: orderData.items,
}
  });
};

const createOrderGuestService = async (
  orderData: IGuestOrderRequest,
  sessionId: string,
  paymentMethod: string,
  deliveryMethod: string
) => {
  return await request<IOrderResponse>({
    url: `${ApiEndpoint.ORDERS}/guest/create`,
    method: HttpMethod.POST,
    params: {
      sessionId,
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
    },
    data: orderData
  });
};

export { createOrderService, createOrderGuestService };