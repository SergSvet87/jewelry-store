import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { useUserStore } from './useUserStore';
import { ICartItem, IProductItem } from '@/types/';
import {
  addToCartService,
  getAllProductsFromCartService,
  // getProductFromCartService,
  changeQuantityCartService,
  removeFromCartService,
  clearCartService,
} from '@/services';

interface CartState {
  cart: ICartItem;
  cartTotalQuantity: number;
  isLoading: boolean;

  fetchCart: () => Promise<void>;
  isInCart: (productId: number) => boolean;
  addToCart: (product: IProductItem) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => Promise<void>;
}

const defaultCart: ICartItem = {
  id: null,
  userId: null,
  items: [],
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: defaultCart,
  cartTotalQuantity: 0,
  isLoading: false,

  isInCart: (productId) => get().cart.items.some(i => i.productId === productId),

  fetchCart: async () => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;

    set({ isLoading: true });
    const data = await getAllProductsFromCartService(userId);
    const quantity = data.items.reduce((sum, i) => sum + i.quantity, 0);

    set({ cart: data, cartTotalQuantity: quantity, isLoading: false });

    localStorageService.setItem(LocalStorage.CART_PRODUCTS, data);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  // getOneProductCart: async (productId: number) => {
  //   const item = get().cart.items.find(i => i.productId === productId);
  //   if (!userId || !item) return;

  //   set({ isLoading: true });
  //   const data = await getProductFromCartService(userId, productId);
  //   const quantity = data.items.reduce((sum, i) => sum + i.quantity, 0);

  //   set({ cart: data, cartTotalQuantity: quantity, isLoading: false });
  // },

  addToCart: async (product, qty = 1) => {

    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;

    const res = await addToCartService(product.id, qty, userId);
    const quantity = res.items.reduce((sum, i) => sum + i.quantity, 0);

    set({ cart: res, cartTotalQuantity: quantity });

    localStorageService.setItem(LocalStorage.CART_PRODUCTS, res);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  increaseQuantity: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;
    const item = get().cart.items.find(i => i.productId === productId);

    if (!item || !userId) return;

    const res = await changeQuantityCartService(item.id, item.quantity + 1, productId, userId);
    const quantity = res.items.reduce((sum, i) => sum + i.quantity, 0);
    set({ cart: res, cartTotalQuantity: quantity });

    localStorageService.setItem(LocalStorage.CART_PRODUCTS, res);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  decreaseQuantity: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;
    const item = get().cart.items.find(i => i.productId === productId);
    if (!userId || !item) return;

    if (item.quantity <= 1) {
      await get().removeFromCart(productId);
      return;
    }
    const res = await changeQuantityCartService(item.id, item.quantity - 1, productId, userId);
    const quantity = res.items.reduce((sum, i) => sum + i.quantity, 0);
    set({ cart: res, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, res);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  removeFromCart: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;

    const item = get().cart.items.find(i => i.productId === productId);
    if (!item || !userId) return;

    const res = await removeFromCartService(item.id, userId);
    const quantity = res.items.reduce((sum, i) => sum + i.quantity, 0);
    set({ cart: res, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, res);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);
  },

  clearCart: async () => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;
    await clearCartService(userId);
    set({ cart: defaultCart, cartTotalQuantity: 0 });
    localStorageService.removeItem(LocalStorage.CART_PRODUCTS);
    localStorageService.removeItem(LocalStorage.CART_QUANTITY);
  },
}));
