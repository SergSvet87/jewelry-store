import { NavLink, useNavigate } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { menuItems } from '@/mock/menuItems';
import { UserContacts } from './UserContacts';
import { useAuthStore } from '@/store/auth/useAuthStore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const linkClass = 'flex gap-5 p-0 w-full items-center transition-all duration-200';

  const activeClass = 'text-[var(--brown-dark)]';

  const handleLogout = () => {
    logout();
    navigate(AppRoute.ROOT);
  };

  return (
    <aside className="w-[426px] bg-transparent">
      <UserContacts />

      <nav className="pl-[10px] py-4 mb-[98px]">
        <ul className="flex flex-col items-start gap-8 p-0 w-full">
          {menuItems.map((item, index) => {
            return (
              <li key={index} className="w-full">
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : 'text-[var(--grey)]'}`
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
        className="btn text-[var(--grey)] hover:text-[var(--brown-dark)]"
        onClick={handleLogout}
      >
        Вийти
      </button>
    </aside>
  );
};
