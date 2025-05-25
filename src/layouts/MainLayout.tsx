import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PopUpDeleteFromCart } from '@/features/cart/PopUpDeleteFromCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';
import { useEffect } from 'react';
import { getUserByToken } from '@/services/userService';
import { useUserStore } from '@/store/user/useUserStore';
import { useAuthStore } from '@/store/auth/useAuthStore';

export const Layout = () => {
  const accessToken = useAuthStore(state => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {    
    if (accessToken) {
      getUserByToken(accessToken)
        .then(setUser)
        .catch((err) => {
          console.error('Не вдалося отримати юзера за токеном:', err);
          localStorage.removeItem('access_token');
        });
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
