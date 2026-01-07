import { create } from 'zustand';

import {
  addToGuestCartService,
  changeQuantityGuestCartService,
  clearGuestCartService,
  fetchProductById,
  getOrCreateGuestId,
  getProductFromGuestCartService,
  removeFromGuestCartService
} from '@/services';
import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { IGuestCartItem, IProductItem } from '@/types/';

interface GuestCartState {
  guestCart: IGuestCartItem[];
  cartTotalQuantity: number;
  isLoading: boolean;
  guestId: string;
  loadedProducts: IProductItem[];

  fetchGuestCart: () => Promise<void>;
  createGuestCart: () => Promise<void>;

  isInCart: (productId: number) => boolean;
  addToCart: (product: IProductItem) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useGuestCartStore = create<GuestCartState>((set, get) => {

  return {
    guestCart: [],
    cartTotalQuantity: 0,
    isLoading: false,
    guestId: localStorageService.getItem(LocalStorage.GUEST_ID) || getOrCreateGuestId(),

    loadedProducts: [] as IProductItem[],
    setLoadedProducts: (products: IProductItem[]) => set({ loadedProducts: products }),

    createGuestCart: async () => {
      const guestId = get().guestId;
      localStorage.setItem(LocalStorage.GUEST_CART_ID, guestId);

      set({
        guestCart: [],
        cartTotalQuantity: 0,
      });
    },

    fetchGuestCart: async () => {
      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) {
        console.warn("Спроба завантажити гостьовий кошик без Guest ID");
        set({ isLoading: false, guestCart: [], cartTotalQuantity: 0 });
        return;
      }

      set({ isLoading: true });

      try {
        const items = await getProductFromGuestCartService(initialGuestId);
        
        if (!items) {
          set({ guestCart: [], cartTotalQuantity: 0, isLoading: false });
          return;
        }

        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const productPromises = items.map(item => fetchProductById(item.productId));
        const resolvedProducts = await Promise.all(productPromises);

        set({
          guestCart: items,
          cartTotalQuantity: totalQuantity,
          loadedProducts: resolvedProducts,
          isLoading: false
        });
      } catch (error) {
        console.error("Помилка завантаження гостьового кошика:", error);
        set({ isLoading: false });
      }
    },

    isInCart: (productId) => {
      return get().guestCart.some((i) => i.productId === productId);
    },

    addToCart: async (product) => {
      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) return;

      const existing = get().guestCart.find((i) => i.productId === product.id);
      const newQuantity = existing ? existing.quantity + 1 : 1;

      await addToGuestCartService(product.id, newQuantity, initialGuestId);

      const updatedCart = [...get().guestCart];
      const index = updatedCart.findIndex((i) => i.productId === product.id);
      if (index > -1) {
        updatedCart[index].quantity = newQuantity;
      } else {
        updatedCart.push({ productId: product.id, quantity: newQuantity });
      }

      const updatedQuantity = updatedCart.reduce((sum, i) => sum + i.quantity, 0);

      set({ guestCart: updatedCart, cartTotalQuantity: updatedQuantity });
      await get().fetchGuestCart();
    },

    increaseQuantity: async (productId) => {
      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) return;

      const cart = get().guestCart;
      const index = cart.findIndex((i) => i.productId === productId);
      if (index === -1) return;

      const item = cart[index];
      const newQuantity = item.quantity + 1;

      await changeQuantityGuestCartService(productId, newQuantity, initialGuestId);

      const updatedCart = [...cart];
      updatedCart[index] = { ...item, quantity: newQuantity };

      const updatedQuantity = updatedCart.reduce((sum, i) => sum + i.quantity, 0);
      set({ guestCart: updatedCart, cartTotalQuantity: updatedQuantity });
      await get().fetchGuestCart();
    },

    decreaseQuantity: async (productId) => {
      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) return;

      const cart = get().guestCart;
      const index = cart.findIndex((i) => i.productId === productId);
      if (index === -1) return;

      const item = cart[index];
      const newQuantity = item.quantity - 1;

      if (newQuantity < 1) return;

      await changeQuantityGuestCartService(productId, newQuantity, initialGuestId);

      const updatedCart = [...cart];
      updatedCart[index] = { ...item, quantity: newQuantity };

      const updatedQuantity = updatedCart.reduce((sum, i) => sum + i.quantity, 0);
      set({ guestCart: updatedCart, cartTotalQuantity: updatedQuantity });
      await get().fetchGuestCart();
    },

    removeFromCart: async (productId) => {
      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) return;

      await removeFromGuestCartService(productId, initialGuestId);

      const updatedCart = get().guestCart.filter((i) => i.productId !== productId);
      const updatedQuantity = updatedCart.reduce((sum, i) => sum + i.quantity, 0);

      set({ guestCart: updatedCart, cartTotalQuantity: updatedQuantity });
      await get().fetchGuestCart();
    },

    clearCart: async () => {

      const initialGuestId = localStorageService.getItem(LocalStorage.GUEST_ID) as string;

      if (!initialGuestId) return;

      await clearGuestCartService(initialGuestId);
      set({ guestCart: [], cartTotalQuantity: 0 });
      await get().fetchGuestCart();
    },
  };
});
