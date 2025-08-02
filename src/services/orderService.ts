import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IGuestOrderRequest, IOrderRequest, IOrderResponse } from "../types/";

const createOrderService = async ({
  userId,
  paymentMethod,
  deliveryMethod,
  items,
}: IOrderRequest) => {
  const res = await request<IOrderResponse>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    params: {
      deliveryMethod,
      paymentMethod
    },
    data: {
      userId,
      items
    }
  });


  return res;
};

const createOrderGuestService = async ({
  sessionId,
  paymentMethod,
  deliveryMethod,
  firstName,
  lastName,
  fatherName,
  phone,
  email,
}: IGuestOrderRequest) => {
  const res = await request<IOrderResponse>({
    url: `${ApiEndpoint.ORDERS}/guest/create`,
    method: HttpMethod.POST,
    params: {
      sessionId,
      paymentMethod,
      deliveryMethod,
    },
    data: {
      firstName,
      lastName,
      fatherName,
      phone,
      email
    }
  });


  return res;
};

export { createOrderService, createOrderGuestService }