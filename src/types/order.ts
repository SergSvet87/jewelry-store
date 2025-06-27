interface IOrderRequest {
  id: number,
  userId: number,
  items:
  {
    id: number,
    cartId: number,
    productId: string,
    quantity: number,
  }
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

export type { IOrderRequest, IOrderResponse }