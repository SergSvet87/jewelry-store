import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Logo } from '@/assets';
import { AppRoute } from '@/enums';
import { navItems } from '@/mock';
import { headerButtons } from '@/mock/headerButtons';
import { SearchDropdown } from './SearchDropdown';
import { SupportDrawer } from './SupportDrawer';
import { useCartStore } from '@/store/cart/useCartStore';
import { useProductStore } from '@/store/products/useProductsStore';
import { useModalStore } from '@/store/modal/useModalStore';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { pathname } = useLocation();
  const cartCount = useCartStore((state) => state.cart?.items?.length);
  const favoriteCount = useProductStore((state) => state.favorites.length);

  const toggleActiveButton = (title: string) => {
    if (activeButton === title) {
      setActiveButton(null);
    } else {
      setActiveButton(title);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('activeButton');
    if (stored) {
      setActiveButton(stored);
    }
  }, []);

  useEffect(() => {
    const matched = headerButtons.find((btn) => btn.href === pathname);

    if (matched) {
      setActiveButton(matched.title);
      localStorage.setItem('activeButton', matched.title);
    } else {
      setActiveButton(null);
      localStorage.removeItem('activeButton');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const promoMessage = "Безкоштовна доставка кур'єром Нової Пошти!";

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, el: string) => {
    e.preventDefault();

    const target = document.querySelector(el);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full fixed z-999">
      <div className="w-[5000px] h-[50px] bg-[var(--main)] flex items-center gap-[248px] animation-marquee whitespace-nowrap overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="w-[443px] font-body font-[number:var(--body-font-weight)] text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]"
          >
            {promoMessage}
          </div>
        ))}
      </div>

      <div
        className={cn(
          'w-full h-[50px] text-[var(--main)] transition-colors duration-300',
          pathname === AppRoute.ROOT || pathname === AppRoute.PRODUCTS
            ? scrolled
              ? 'bg-[var(--brown-dark)]'
              : 'bg-transparent'
            : 'bg-[var(--brown-dark)]',
        )}
      >
        <div className="container flex items-center justify-between h-full">
          <Link id="header-logo" to={AppRoute.ROOT} className="w-[105px] h-[30px] cursor-pointer">
            <Logo width={'105'} height={'30'} classname="text-[var(--accent)]" />
          </Link>

          <div className="flex items-center gap-[196px] h-full">
            <nav className="flex gap-10 items-center">
              {navItems
                .filter((item) => {
                  if (item.href === '#about-us' && pathname !== AppRoute.ROOT) {
                    return false;
                  }
                  return true;
                })
                .map((item, index) =>
                  item.href.startsWith('#') ? (
                    <a
                      key={index}
                      href={item.href}
                      onClick={(e) =>
                        handleScrollClick(e as React.MouseEvent<HTMLAnchorElement>, item.href)
                      }
                      className={cn(
                        'flex w-[88px] justify-center px-0 pb-[5px] py-2 border border-solid border-transparent items-center hover:border-b-[var(--main)] active:text-[var(--accent)]',
                      )}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={item.href}
                      className={cn(
                        'flex w-[88px] justify-center px-0 pb-[5px] py-2 border border-solid border-transparent items-center hover:border-b-[var(--main)] active:text-[var(--accent)]',
                      )}
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  ),
                )}
            </nav>

            <div className="flex items-center gap-8">
              {headerButtons.map((item) => {
                const isActive = activeButton === item.title || pathname === item.href;

                const iconColor = isActive ? 'var(--accent)' : 'var(--main)';
                const Icon = item.icon;

                if (item.title === 'search') {
                  return (
                    <button
                      className="btn"
                      onClick={() => {
                        setSearchOpen(!searchOpen);
                        toggleActiveButton('search');
                      }}
                      key={item.title}
                    >
                      <Icon fill={iconColor} />
                    </button>
                  );
                }

                if (item.title === 'shoppingBag') {
                  return (
                    <button
                      key={item.title}
                      className="btn relative"
                      onClick={() => {
                        useModalStore.getState().open('cart');
                      }}
                    >
                      <Icon stroke={iconColor} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-[var(--accent)] text-[var(--main)] rounded-full w-3 h-3 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setActiveButton(item.title)}
                    className={cn('btn relative', isActive && 'text-[var(--accent)]')}
                  >
                    {item.type === 'fill' ? <Icon fill={iconColor} /> : <Icon stroke={iconColor} />}

                    {item.title === 'favorite' && favoriteCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-[var(--accent)] text-[var(--main)] rounded-full w-3 h-3 flex items-center justify-center">
                        {favoriteCount}
                      </span>
                    )}

                    {item.title === 'shoppingBag' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-[var(--accent)] text-[var(--main)] rounded-full w-3 h-3 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}

                    {/* {item.title === 'scale' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-[var(--accent)] text-[var(--main)] rounded-full w-3 h-3 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )} */}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SupportDrawer />

      <SearchDropdown
        isOpen={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          toggleActiveButton('search');
        }}
      />
    </header>
  );
};

export default Header;
