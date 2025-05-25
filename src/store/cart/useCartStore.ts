import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { ICartItem, ISingleProduct } from '@/types/';
import { addToCartService } from '@/services/cartService';
import { localStorageService } from '@/services/localStorageService';

interface CartState {
  cart: ICartItem;
  cardTotalQuantity: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: ISingleProduct) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const cart = localStorageService.getItem<ICartItem>(LocalStorage.CART_PRODUCTS) || {
  userId: 1,
  items: [],
};

export const useCartStore = create<CartState>((set, get) => ({
  cart,
  cardTotalQuantity: parseInt(
    localStorageService.getItem(LocalStorage.CART_QUANTITY) || '0',
  ),
  isInCart: (productId) => {
    return get().cart?.items?.some((i) => i.productId === productId);
  },

  addToCart: (product) => {
    const userId = 1;
    const { cart } = get();
    const updatedCart = addToCartService(product, cart, userId);

    const quantity = updatedCart?.items?.reduce((sum, i) => sum + i.quantity, 0);

    set({
      cart: updatedCart,
      cardTotalQuantity: quantity,
    });

    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },
  
  increaseQuantity: (productId) => {
    const { cart } = get();
    const updatedItems = cart.items.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    const quantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
    const updatedCart = { ...cart, items: updatedItems };

    set({ cart: updatedCart, cardTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedItems);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  decreaseQuantity: (productId) => {
    const { cart } = get();
    const updatedItems = cart.items.map(item =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    const quantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
    const updatedCart = { ...cart, items: updatedItems };

    set({ cart: updatedCart, cardTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedItems);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    const quantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
    const updatedCart = { ...cart, items: updatedItems };

    set({ cart: updatedCart, cardTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedItems);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },
}));
