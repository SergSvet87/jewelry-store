import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { addToCartService } from '@/services';
import { ICartItem, IProductItem } from '@/types/';
import { useUserStore } from './useUserStore';

interface CartState {
  cart: ICartItem;
  cartTotalQuantity: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: IProductItem) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

const defaultCart: ICartItem = {
  userId: null,
  items: [],
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: localStorageService.getItem<ICartItem>(LocalStorage.CART_PRODUCTS) ?? defaultCart,
  cartTotalQuantity: Number(
    localStorageService.getItem(LocalStorage.CART_QUANTITY)
  ) || 0,
  isInCart: (productId) => {
    return get().cart?.items?.some((i) => i.productId === productId);
  },

  addToCart: (product) => {
    const userId = useUserStore.getState().currentUser?.id ?? null;
    const { cart } = get();
    const updatedCart = addToCartService(product, cart, userId);

    const quantity = updatedCart?.items?.reduce((sum, i) => sum + i.quantity, 0);

    set({
      cart: updatedCart,
      cartTotalQuantity: quantity,
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

    set({ cart: updatedCart, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedCart);
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

    set({ cart: updatedCart, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    const updatedItems = cart.items.filter(item => item.productId !== productId);
    const quantity = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
    const updatedCart = { ...cart, items: updatedItems };

    set({ cart: updatedCart, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },
}));
