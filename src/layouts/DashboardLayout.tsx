import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

import { Sidebar } from '@/features/dashboard/Sidebar';
import { ArrowLeft } from '@/assets/icons/ArrowLeft';


export const DashboardLayout = () => {

  const location = useLocation()
  const isMenuPage = location.pathname === '/dashboard';
  const navigate = useNavigate()

  const {isDesktop, isTablet} = useWindowWidth();

  return (
    <>
      {isDesktop || isTablet ? (
        <div className="grid grid-cols-[300px_1fr]">
          <nav>
            <Sidebar />
          </nav>
          <main className='grid grid-cols'>
            <Outlet />
          </main>
        </div>
      ) : (
        <>
        {isMenuPage ?
        (<Sidebar />) : 
        (
          <div>
              <button
                onClick={() => navigate(-1)}
                className='pl-4 flex items-center leading-none gap-1 text-[16px] font-medium'>
                  <ArrowLeft />
                <span>Назад</span>
              </button>
            <Outlet />
          </div>
        )
        }
        </>
      )}
    </>
  );
};
