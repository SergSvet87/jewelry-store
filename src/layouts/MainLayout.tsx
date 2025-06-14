import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ICartItem } from '../types/';
import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import {
  getAllCategories,
  getAllCollections,
  getFilteredProducts,
  getOrCreateGuestId,
  getUserByToken,
} from '@/services';
import {
  useUserStore,
  useAuthStore,
  useProductStore,
  useCartStore,
  useCatalogStore,
} from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PopUpDeleteFromCart } from '@/features/cart/PopUpDeleteFromCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';

export const Layout = () => {
  const guestId = getOrCreateGuestId();
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const {  setLoading, setProducts } = useProductStore();
  const { page, category, collection, sort, setTotalPages, setCategories, setCollections } = useCatalogStore();

  const initUser = async () => {
    if (!accessToken) return;

    try {
      const user = await getUserByToken(accessToken);
      setUser(user);

      useCartStore.setState((state) => {
        const updatedCart = { ...state.cart, userId: user.id };
        localStorageService.setItem(LocalStorage.CART_PRODUCTS, updatedCart);
        return { cart: updatedCart };
      });
    } catch (err) {
      console.error('Не вдалося отримати юзера за токеном:', err);
      localStorage.removeItem('access_token');
    }
  };

  const initCart = () => {
    const storedCart = localStorageService.getItem<ICartItem>(LocalStorage.CART_PRODUCTS);
    const storedCartQuantity = localStorageService.getItem<number>(LocalStorage.CART_QUANTITY);

    if (!storedCart) {
      const newCart: ICartItem = {
        userId: accessToken ? null : guestId,
        items: [],
      };
      localStorageService.setItem(LocalStorage.CART_PRODUCTS, newCart);
      useCartStore.setState({ cart: newCart });
    } else {
      useCartStore.setState({ cart: storedCart });
    }

    if (!storedCartQuantity) {
      localStorageService.setItem(LocalStorage.CART_QUANTITY, 0);
      useCartStore.setState({ cartTotalQuantity: 0 });
    } else {
      useCartStore.setState({ cartTotalQuantity: storedCartQuantity });
    }
  };

  const initFavorites = () => {
    const storedFavorites = localStorageService.getItem<number[]>(LocalStorage.FAVORITE_PRODUCTS);
    if (!storedFavorites) {
      localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, []);
      useProductStore.setState({ favorites: [] });
    } else {
      useProductStore.setState({ favorites: storedFavorites });
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [products, categories, collections] = await Promise.all([
        getFilteredProducts(page,
        category || undefined,
        collection || undefined,
        sort,),
        getAllCategories(),
        getAllCollections(),
      ]);

      setCategories(categories);
      setProducts(products);
      setCollections(collections);
      setTotalPages(products.page.totalPages);
    } catch (err) {
      console.error('Помилка завантаження даних', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initFavorites();
    initCart();
    initUser();
    fetchInitialData();
  }, [accessToken, page, category, collection, sort]);

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
