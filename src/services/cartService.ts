import { LocalStorage } from '@/enums';
import { ICartItem, ISingleProduct } from '@/types/';
import { localStorageService } from './localStorageService';

export const addToCartService = (
  product: ISingleProduct,
  currentItems: ICartItem[],
  userId: number,
): ICartItem[] => {
 const existingItem = currentItems.find(item =>
    item.items.some(i => i.product.id === product.id),
  );

  let updatedItems: ICartItem[];

  if (existingItem) {
    updatedItems = currentItems.map(item => {
      if (item.items.some(i => i.product.id === product.id)) {
        return {
          ...item,
          items: item.items.map(i =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return item;
    });
  } else {
    const newItem: ICartItem = {
      id: Date.now(),
      userId,
      items: [
        {
          id: Date.now(),
          cartId: 0,
          product,
          productName: product.name,
          quantity: 1,
        },
      ],
    };
    updatedItems = [...currentItems, newItem];
  }

  const totalQuantity = updatedItems.reduce(
    (sum, cartItem) =>
      sum + cartItem.items.reduce((s, i) => s + i.quantity, 0),
    0,
  );

  const totalAmount = updatedItems.reduce(
    (sum, cartItem) =>
      sum +
      cartItem.items.reduce((s, i) => s + i.quantity * i.product.price, 0),
    0,
  );

  localStorageService.setItem(LocalStorage.CART_TOTAL_AMOUNT, totalAmount.toString());
  localStorageService.setItem(LocalStorage.CART_QUANTITY, totalQuantity.toString());

  return updatedItems;
};

export const removeFromCartService = (
  productId: number,
  currentItems: ICartItem[],
): ICartItem[] => {
  const updatedItems = currentItems
    .map(cart => ({
      ...cart,
      items: cart.items.filter(i => i.product.id !== productId),
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
      i.product.id === productId ? { ...i, quantity } : i,
    ),
  }));
};

export const clearCartService = (): ICartItem[] => {
  return [];
};
