interface IOrderRequest {
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
  sessionId: string;
  paymentMethod: string;
  deliveryMethod: string;
  firstName: string,
  lastName: string,
  fatherName: string,
  phone: string,
  email: string
}

export type { IOrderRequest, IOrderResponse, IGuestOrderRequest }