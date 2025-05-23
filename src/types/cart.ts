export interface ICartItem {
  id?: number,
  userId: number,
  items: {
    productId: number,
    quantity: number,
  }[],
}

// export interface ICartItem {
//   id?: number,
//   userId: number,
//   items: {
//     id?: number,
//     cartId?: number,
//     product: ISingleProduct,
//     productName?: string,
//     quantity: number,
//   }[],
// }
