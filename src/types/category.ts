import { ISingleProduct } from "./product";

export interface ICategory {
  id: number,
  name: string,
  description: string,
  products: ISingleProduct[],
}