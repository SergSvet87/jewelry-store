import { ICartItem, ISingleProduct } from '@/types/';

export const addToCartService = (
  product: ISingleProduct,
  currentCart: ICartItem,
  userId: number,
): ICartItem => {
  const cart = currentCart || {
    userId,
    items: [],
  };

  const existingItem = cart?.items?.find((i) => i.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart?.items?.push({
      productId: product.id,
      quantity: 1,
    });
  }

  return cart;
};

export const removeFromCartService = (
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

export const changeQuantityService = (
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

export const clearCartService = (): ICartItem[] => {
  return [];
};
