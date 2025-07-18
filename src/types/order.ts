interface IOrderRequest {
  id: number;
  userId: number;
  paymentMethod: string;
  deliveryMethod: string;
  items: {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
  }[];
}


interface IOrderResponse {
  id: number,
  userId: number,
  items: [
    {
      id: number,
      productId: number,
      orderId: number,
      priceAtPurchase: number,
      quantity: number
    }
  ],
  status: string,
  totalPrice: number,
  createdAt: string,
}

interface IGuestOrderRequest {
  id: number;
  sessionId: string;
  paymentMethod: string;
  deliveryMethod: string;
  items: {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
  }[];
}

export type { IOrderRequest, IOrderResponse, IGuestOrderRequest }