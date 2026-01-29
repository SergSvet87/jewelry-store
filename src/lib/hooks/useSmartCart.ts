import { useEffect, useMemo } from 'react';
import { LocalStorage } from '@/enums'
import { IProductItem, IFormSchema } from '@/types/';
import { localStorageService } from '@/api';
import { useCartStore, useGuestCartStore, useProductStore, useUserStore } from '@/store';
import {  
  removeFromGuestCartService,
  changeQuantityGuestCartService,
  createOrderService,
  createOrderGuestService} from '@/services';

export const useSmartCart = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const sessionId = localStorage.getItem(LocalStorage.SESSION_ID) || '';

  const getProductById = useProductStore((state) => state.getProductById);
  const guestProducts = useGuestCartStore((state) => state.loadedProducts);
  const { cartProducts } = useCartStore();

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
    removeFromCart: removeGuestFromCart,
    increaseQuantity: increaseGuestQuantity,
    decreaseQuantity: decreaseGuestQuantity,
    isInCart: isGuestInCart,
    cartTotalQuantity: guestCartQuantity,
    guestCart,
  } = useGuestCartStore();

  const isGuest = !currentUser;

  useEffect(() => {
    if (!isGuest) return
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, guestCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, guestCartQuantity);
  }, [guestCart, guestCartQuantity, isGuest]);

  const cartItemsWithData = useMemo(() => {
    const rawItems = isGuest ? guestCart : userCart?.items || [];

    return rawItems
      .map(({ productId, quantity }) => {
        const product = isGuest
          ? guestProducts.find(p => p.id === productId)
          : cartProducts.find(p => p.id === productId) || getProductById(productId);

        if (!product) return null;
        return { product, quantity };
      })
      .filter(Boolean) as { product: IProductItem; quantity: number }[];
  }, [isGuest, guestCart, userCart, cartProducts, getProductById, guestProducts]);

  const createOrder = async (formData: IFormSchema) => {
    try {
      if (currentUser) {
        
        const authItems = userCart?.items.map((item) => ({
          id: item.id,
          cartId: item.cartId,
          productId: item.productId,
          quantity: item.quantity,
          formData : formData.personalInfo.isGift
        })) || [];

        console.log("🚀 ВІДПРАВКА ЗАМОВЛЕННЯ (АВТОРИЗОВАНИЙ):", {
        userId: currentUser.id,
        paymentMethod: formData.paymentInfo.method,
        deliveryMethod: formData.deliveryInfo.method,
        items: authItems 
      });

        return await createOrderService(
          {
            userId: currentUser.id,
            items: authItems,
          },
          formData.paymentInfo.method,
          formData.deliveryInfo.method,
          formData.personalInfo.isGift,
        );
      } else {
        const guestItems = guestCart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        return await createOrderGuestService(
          {
            ...formData.personalInfo,
            items: guestItems,
          },
          sessionId,
          formData.paymentInfo.method,
          formData.deliveryInfo.method,
          formData.personalInfo.isGift,

        );
      }
      
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      throw error;
    }
  };

  const cartTotalQuantity = isGuest ? guestCartQuantity : userCartQuantity;

  return {
    addToCart: async (product: IProductItem) => {
  if (isGuest) {
    await useGuestCartStore.getState().addToCart(product);
  } else {
    
    addUserToCart(product);
  }
},
    increaseQuantity: async (productId: number) => {
      if (isGuest) {
        const currentItem = guestCart.find(item => item.productId === productId);
        if (currentItem) {
          await changeQuantityGuestCartService(productId, currentItem.quantity + 1, sessionId);
          increaseGuestQuantity(productId);
        }
      } else {
        increaseUserQuantity(productId);
      }
    },
    decreaseQuantity: async (productId: number) => {
      if (isGuest) {
        const currentItem = guestCart.find(item => item.productId === productId);
        if (currentItem && currentItem.quantity > 1) {
          await changeQuantityGuestCartService(productId, currentItem.quantity - 1, sessionId);
          decreaseGuestQuantity(productId);
        }
      } else {
        decreaseUserQuantity(productId);
      }
    },
    removeFromCart: async (productId: number) => {
      if (isGuest) {
        await removeFromGuestCartService(productId, sessionId);
        removeGuestFromCart(productId);
      } else {
        removeUserFromCart(productId);
      }
    },
    isInCart: (productId: number) => isGuest ? isGuestInCart(productId) : isUserInCart(productId),
    createOrder,
    cartItems: isGuest ? guestCart : userCart?.items || [],
    cartItemsWithData,
    cartTotalQuantity,
  };
}