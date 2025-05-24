import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PopUpCart } from '@/features/cart/PopUpCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';
import { useEffect } from 'react';
import { getUserByToken } from '@/services/userService';
import { useUserStore } from '@/store/user/useUserStore';

export const Layout = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      getUserByToken(token)
        .then(setUser)
        .catch((err) => {
          console.error('Не вдалося отримати юзера за токеном:', err);
          localStorage.removeItem('access_token');
        });
    }
  }, [setUser]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>

      <Footer />
      
      <PopUpConfirmationPhone />
      <PopUpCart />
    </div>
  );
};
