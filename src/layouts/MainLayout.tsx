import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>

      <Footer />
      
      <PopUpConfirmationPhone />
    </div>
  );
};
