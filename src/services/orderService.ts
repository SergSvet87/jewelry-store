import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import {  
  IGuestOrderRequest,
} from "../types/";

import { IFullOrderDetails } from "@/types/orderDetails";

import { IAuthOrderRequest } from "@/types/order";

const createOrderService = async (
  orderData: IAuthOrderRequest, 
  paymentMethod: string, 
  deliveryMethod: string,
  isGiftMethod : boolean,
) => {
  return await request<IFullOrderDetails>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    params: {
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
      isGift : isGiftMethod,
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
  deliveryMethod: string,
  isGift : boolean,
) => {
  return await request<IFullOrderDetails>({
    url: `${ApiEndpoint.ORDERS}/guest/create`,
    method: HttpMethod.POST,
    params: {
      sessionId,
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
      isGift : isGift,
    },
    data: orderData
  });
};

const getUserOrderService = async (page :number = 0, pageSize: 10) => {
  return await request<{content : IFullOrderDetails[]; page: number}>({
    url : `${ApiEndpoint.ORDERS}/user`,
    method : HttpMethod.GET,
    params : {
      page,
      pageSize,
    }
  })
}

export { createOrderService, createOrderGuestService, getUserOrderService};