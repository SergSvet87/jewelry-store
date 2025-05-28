import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ICartItem } from '../types/';
import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { getUserByToken } from '@/services';
import { useUserStore, useAuthStore, useProductStore, useCartStore } from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PopUpDeleteFromCart } from '@/features/cart/PopUpDeleteFromCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';

export const Layout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const storedFavorites = localStorageService.getItem<number[]>(LocalStorage.FAVORITE_PRODUCTS);
    const storedCart = localStorageService.getItem<ICartItem>(LocalStorage.CART_PRODUCTS);
    const storedCartQuantity = localStorageService.getItem<number>(LocalStorage.CART_QUANTITY);

    if (accessToken) {
      getUserByToken(accessToken)
        .then((user) => {
          setUser(user);

          if (!storedCart) {
            const newCart: ICartItem = {
              userId: user.id,
              items: [],
            };
            localStorageService.setItem(LocalStorage.CART_PRODUCTS, newCart);
            useCartStore.setState({ cart: newCart });
          } else {
            useCartStore.setState({ cart: storedCart });
          }
        })
        .catch((err) => {
          console.error('Не вдалося отримати юзера за токеном:', err);
          localStorage.removeItem('access_token');
        });
    } else {
      if (!storedCart) {
        const newCart: ICartItem = {
          userId: null,
          items: [],
        };
        localStorageService.setItem(LocalStorage.CART_PRODUCTS, newCart);
        useCartStore.setState({ cart: newCart });
      } else {
        useCartStore.setState({ cart: storedCart });
      }
    }

    if (!storedCartQuantity) {
      localStorageService.setItem(LocalStorage.CART_QUANTITY, 0);
      useCartStore.setState({ cartTotalQuantity: 0 });
    }else {
      useCartStore.setState({ cartTotalQuantity: storedCartQuantity });
    }

    if (!storedFavorites) {
      localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, []);
      useProductStore.setState({ favorites: [] });
    } else {
      useProductStore.setState({ favorites: storedFavorites });
    }
  }, [accessToken, setUser]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>

      <Footer />

      <PopUpConfirmationPhone />
      <PopUpDeleteFromCart />
    </div>
  );
};
