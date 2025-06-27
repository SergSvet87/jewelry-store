import { create } from 'zustand';

import { IOrderResponse } from '@/types/';

interface OrderState {
  order: IOrderResponse | null;
  status: string;
}

export const useOrderStore = create<OrderState>(() => ({
  order: null,
  status: 'Виконано',
  

//   removeOrder: (orderId) => {
//     const { cart } = get();
//     // const updatedItems = cart.items.filter(item => item.productId !== productId);
//     // const quantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
//     // const updatedCart = { ...cart, items: updatedItems };

//     // set({ cart: updatedCart, cardTotalQuantity: quantity });
//     // localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedItems);
//     // localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
//   },
}));
