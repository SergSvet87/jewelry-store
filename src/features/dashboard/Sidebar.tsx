import { NavLink, useNavigate } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { menuItems } from '@/mock/menuItems';
import { UserContacts } from './UserContacts';
import { useAuthStore } from '@/store/useAuthStore';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const {isMobile} = useWindowWidth();
  const logout = useAuthStore((state) => state.logout);

  const linkClass = 'flex gap-5 p-0 w-full items-center transition-all duration-200';

  const activeClass = 'text-brown-dark';

  const handleLogout = () => {
    logout();
    navigate(AppRoute.ROOT);
  };

  return (
    <aside className="flex flex-col h-[calc(100vh-100px)] w-full md:pl-15 md:pt-10">
      <UserContacts />

    {isMobile && (
      <>
        <div className='border-1 border-gray-400 '/>
      </>
    )}
      <nav className="pl-[10px] py-4 mb-[98px]">
        <ul className="flex flex-col p-0 w-fit">
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="w-full h-15">
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `${linkClass} text-[20px] font-medium md:${isActive ? activeClass : 'text-grey'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon.type
                        {...item.icon.props}
                        fill={isActive ? 'var(--brown-dark)' : 'var(--grey)'}
                        stroke={isActive ? 'var(--brown-dark)' : 'var(--grey)'}
                      />
                      {item.text}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        className="btn mt-auto pl-6 mb-4 text-[16px] text-[#5B242A] md:pl-0 md:pb-16"
        onClick={handleLogout}
      >
        Вийти
      </button>
    </aside>
  );
};