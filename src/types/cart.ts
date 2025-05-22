import { ISingleProduct } from "./product";

export interface ICartItem {
  id: number,
  userId: number,
  items: {
    id: number,
    cartId: number,
    product: ISingleProduct,
    productName: string,
    quantity: number,
  }[],
}
