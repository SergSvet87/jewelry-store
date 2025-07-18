import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IGuestOrderRequest, IOrderRequest } from "../types/";

const createOrderService = async (data: IOrderRequest) => {
  const res = await request<IOrderRequest>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    data: data
  });


return res;
};

const createOrderGuestService = async (data: IGuestOrderRequest) => {
  const res = await request<IOrderRequest>({
    url: `${ApiEndpoint.ORDERS}/guest/create`,
    method: HttpMethod.POST,
    data: data
  });

  
return res;
};

export { createOrderService, createOrderGuestService }