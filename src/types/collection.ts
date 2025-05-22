import { ISingleProduct } from "./product";

export interface ICollection {
  id: number,
  name: string,
  description: string,
  products: ISingleProduct[],
}