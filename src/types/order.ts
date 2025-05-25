import { ProductItem } from "./product"

export interface IOrderItem {
  id: number,
  userId: number,
  items:
  {
    id: number,
    cartId: number,
    product: ProductItem[],
    productName: string,
    quantity: number,
  }
}