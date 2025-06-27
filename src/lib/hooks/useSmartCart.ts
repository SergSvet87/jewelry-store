import { useEffect, useMemo } from 'react';

import { LocalStorage } from '@/enums';
import { IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { useCartStore, useGuestCartStore, useProductStore, useUserStore } from '@/store';

export const useSmartCart = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const getProductById = useProductStore((state) => state.getProductById);
  const guestProducts = useGuestCartStore((state) => state.loadedProducts);

  const {
    addToCart: addUserToCart,
    removeFromCart: removeUserFromCart,
    increaseQuantity: increaseUserQuantity,
    decreaseQuantity: decreaseUserQuantity,
    isInCart: isUserInCart,
    cartTotalQuantity: userCartQuantity,
    cart: userCart,
  } = useCartStore();

  const {
    addToCart: addGuestToCart,
    removeFromCart: removeGuestFromCart,
    increaseQuantity: increaseGuestQuantity,
    decreaseQuantity: decreaseGuestQuantity,
    isInCart: isGuestInCart,
    cartTotalQuantity: guestCartQuantity,
    guestCart,
  } = useGuestCartStore();

  const isGuest = !currentUser;

  useEffect(() => {
    if (!isGuest) return;

    localStorageService.setItem(LocalStorage.CART_PRODUCTS, guestCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, guestCartQuantity);
  }, [guestCart, guestCartQuantity, isGuest]);

  const cartItemsWithData = useMemo(() => {
    const rawItems = isGuest ? guestCart : userCart?.items || [];

    return rawItems
      .map(({ productId, quantity }) => {
        const product = isGuest
          ? guestProducts.find(p => p.id === productId)
          : getProductById(productId);

        if (!product) return null;

        return { product, quantity };
      })
      .filter(Boolean) as { product: IProductItem; quantity: number }[];
  }, [isGuest, guestCart, userCart, getProductById, guestProducts]);

  const cartTotalQuantity = isGuest ? guestCartQuantity : userCartQuantity;

  return {
    addToCart: (product: IProductItem) =>
      isGuest ? addGuestToCart(product) : addUserToCart(product),
    removeFromCart: (productId: number) =>
      isGuest ? removeGuestFromCart(productId) : removeUserFromCart(productId),
    increaseQuantity: (productId: number) =>
      isGuest ? increaseGuestQuantity(productId) : increaseUserQuantity(productId),
    decreaseQuantity: (productId: number) =>
      isGuest ? decreaseGuestQuantity(productId) : decreaseUserQuantity(productId),
    isInCart: (productId: number) =>
      isGuest ? isGuestInCart(productId) : isUserInCart(productId),

    cartItems: isGuest ? guestCart : userCart?.items || [],
    cartItemsWithData,
    cartTotalQuantity,
  };
};
