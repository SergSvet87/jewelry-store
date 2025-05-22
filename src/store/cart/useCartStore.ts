import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { ICartItem, ISingleProduct } from '@/types/';
import { addToCartService } from '@/services/cartService';
import { localStorageService } from '@/services/localStorageService';

interface CartState {
  items: ICartItem[];
  cardTotalAmount: number;
  cardTotalQuantity: number;
  addToCart: (product: ISingleProduct) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  cardTotalAmount: parseFloat(
    localStorageService.getItem(LocalStorage.CART_TOTAL_AMOUNT) || '0',
  ),
  cardTotalQuantity: parseInt(
    localStorageService.getItem(LocalStorage.CART_QUANTITY) || '0',
  ),
  addToCart: (product) => {
    const userId = 1;
    const updatedItems = addToCartService(product, get().items, userId);

    const totalQuantity = updatedItems.reduce(
      (sum, cart) =>
        sum + cart.items.reduce((itemSum, i) => itemSum + i.quantity, 0),
      0,
    );

    const totalAmount = updatedItems.reduce(
      (sum, cart) =>
        sum +
        cart.items.reduce(
          (itemSum, i) => itemSum + i.quantity * i.product.price,
          0,
        ),
      0,
    );

    set({
      items: updatedItems,
      cardTotalAmount: totalAmount,
      cardTotalQuantity: totalQuantity,
    });

    localStorageService.setItem(LocalStorage.CART_TOTAL_AMOUNT, totalAmount.toString());
    localStorageService.setItem(LocalStorage.CART_QUANTITY, totalQuantity.toString());
  },
}));
