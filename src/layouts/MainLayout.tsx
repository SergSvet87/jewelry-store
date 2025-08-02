import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { getQueryParams } from '@/utils/urlParams';
import { getAllCategories, getAllCollections, getSearchProducts, getUserByToken } from '@/services';
import {
  useUserStore,
  useAuthStore,
  useProductStore,
  useCartStore,
  useCatalogStore,
  useGuestCartStore,
} from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Notification } from '@/components/Notification';
import { PopUpCart } from '@/features/cart/PopUpCart';
import { PopUpDeleteFromCart } from '@/features/cart/PopUpDeleteFromCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';

export const Layout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const { setProducts, setLoading, setIsNew } = useProductStore();
  const {
    setCategories,
    setCollections,
    setPage,
    setSort,
    setSearch,
    setSelectedCategories,
    setSelectedCollections,
    setSelectedMaterials,
    setPriceRange,
    setTotalPages,
  } = useCatalogStore();

  const [searchParams] = useSearchParams();
  const isNewFromUrl = searchParams.get('isNew') === 'true';

  const initUser = async () => {
    if (!accessToken) return;

    try {
      const user = await getUserByToken(accessToken);
      setUser(user);
    } catch (err) {
      console.error('Не вдалося отримати юзера за токеном:', err);
      localStorage.removeItem('access_token');
    }
  };

  const initCart = async () => {
    const currentUser = useUserStore.getState().currentUser;

    try {
      if (currentUser) {
        await useCartStore.getState().fetchCart();
      } else {
        const guestCartId = localStorage.getItem(LocalStorage.GUEST_CART_ID);
        if (!guestCartId) {
          await useGuestCartStore.getState().createGuestCart();
        } else {
          await useGuestCartStore.getState().fetchGuestCart();
        }
      }
    } catch (error) {
      console.error('Помилка при ініціалізації кошика:', error);
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

  useEffect(() => {
    const query = getQueryParams(searchParams);

    if (query.page) setPage(query.page);
    if (query.size) setPage(query.size);
    if (query.query) setSearch(query.query);
    if (query.categories) setSelectedCategories(query.categories);
    if (query.collections) setSelectedCollections(query.collections);
    if (query.materials) setSelectedMaterials(query.materials);
    if (query.sortBy) setSort(query.sortBy);
    if (query.minPrice !== undefined && query.maxPrice !== undefined)
      setPriceRange([query.minPrice, query.maxPrice]);

    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const [products, categories, collections] = await Promise.all([
          getSearchProducts({
            page: query.page || 1,
            size: 12,
            query: query.query || '',
            maxPrice: query.maxPrice || 0,
            minPrice: query.minPrice || 0,
            categories: query.categories || [],
            collections: query.collections || [],
            materials: query.materials || [],
            sortBy: query.sortBy || '',
          }),
          getAllCategories(),
          getAllCollections(),
        ]);

        setIsNew(isNewFromUrl);
        setProducts(products);
        setCategories(categories);
        setCollections(collections);
        setTotalPages(products.page.totalPages);
      } catch (err) {
        console.error('Помилка завантаження даних', err);
      } finally {
        setLoading(false);
      }
    };

    initFavorites();
    initCart();
    initUser();
    fetchInitialData();
  }, [accessToken, searchParams]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>

      <Footer />

      <PopUpConfirmationPhone />
      <PopUpDeleteFromCart />
      <PopUpCart />

      <Notification />
      <ToastContainer />
    </div>
  );
};
