import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../enums';
import { navItems } from '../mock';
import { headerButtons } from '../mock/headerButtons';
import { Logo, MessageSquareIcon, MessageQuestionIcon } from '../assets';

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);

  const promoMessage = "Безкоштовна доставка кур'єром Нової Пошти!";

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, el: string) => {
    e.preventDefault();

    const elem = document.querySelector(el) as HTMLAnchorElement;
    elem?.scrollIntoView({ behavior: 'smooth' });
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

      <div className="w-full h-[50px] bg-[var(--brown-dark)] backdrop-blur-lg text-[var(--main)]">
        <div className="container flex items-center justify-between h-full">
          <Link id="header-logo" to={AppRoute.ROOT} className="w-[105px] h-[30px] cursor-pointer">
            <Logo width={'105'} height={'30'} fill="var(--accent)" />
          </Link>

          <div className="flex items-center gap-[196px] h-full">
            <nav className="flex gap-10 items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="flex w-[88px] justify-center px-0 pb-[5px] py-2 border border-solid border-transparent items-center hover:border-b-[var(--main)] active:text-[var(--accent)]"
                  onClick={(e) => handleScrollClick(e, item.href)}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-8">
              {headerButtons.map((item) => (
                <Link to={item.href} key={item.title} className="btn">
                  {item.type === 'fill'
                    ? item.icon({ fill: 'var(--main)' })
                    : item.icon({ stroke: 'var(--main)' })}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-15 right-15 z-100 flex align-center gap-1">
        <MessageQuestionIcon classname={cn(isHovering ? 'block' : 'hidden')} />

        <button
          className="bg-[color:var(--button)] rounded-[20px] w-[36px] h-[36px] cursor-pointer flex items-center justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <MessageSquareIcon stroke="var(--main)" />
        </button>
      </div>
    </header>
  );
};

export default Header;
