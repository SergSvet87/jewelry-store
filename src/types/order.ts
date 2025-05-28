import { IProductItem } from "./"

export interface IOrderItem {
  id: number,
  userId: number,
  items:
  {
    id: number,
    cartId: number,
    product: IProductItem[],
    productName: string,
    quantity: number,
  }
}