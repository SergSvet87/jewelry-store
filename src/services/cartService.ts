import { ICartItem, IProductItem } from '@/types/';

const addToCartService = (
  product: IProductItem,
  currentCart: ICartItem,
  userId: number | null,
): ICartItem => {
  const isNewCart = !currentCart || !currentCart.items;

  const cart: ICartItem = isNewCart
    ? {
        userId,
        items: [{ productId: product.id, quantity: 1 }],
      }
    : (() => {
        const existingItem = currentCart.items.find(i => i.productId === product.id);

        if (existingItem) {
          return {
            ...currentCart,
            items: currentCart.items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            ...currentCart,
            items: [...currentCart.items, { productId: product.id, quantity: 1 }],
          };
        }
      })();


  return cart;
};

const removeFromCartService = (
  productId: number,
  currentItems: ICartItem[],
): ICartItem[] => {
  const updatedItems = currentItems
    .map(cart => ({
      ...cart,
      items: cart.items.filter(i => i.productId !== productId),
    }))
    .filter(cart => cart.items.length > 0);

  return updatedItems;
};

const changeQuantityService = (
  productId: number,
  quantity: number,
  currentItems: ICartItem[],
): ICartItem[] => {
  return currentItems.map(cart => ({
    ...cart,
    items: cart.items.map(i =>
      i.productId === productId ? { ...i, quantity } : i,
    ),
  }));
};

const clearCartService = (): ICartItem[] => {
  return [];
};

export {
  addToCartService,
  removeFromCartService,
  changeQuantityService,
  clearCartService
}
