import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { ArrowUp } from '@/assets';
import { categories, footerLinks, socialLinks } from '@/mock';
// import { useCatalogStore } from '@/store';

const Footer = () => {
  const { pathname } = useLocation();
  // const categories = useCatalogStore((state) => state.category);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, el: string) => {
    e.preventDefault();

    const elem = document.querySelector(el) as HTMLAnchorElement;
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="w-full bg-brown-dark lg:py-16 py-12 text-main relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div
          className="md:flex justify-start items-center hidden cursor-pointer pr-[165px]"
          onClick={() => AppRoute.ROOT}
        >
          <div className="text-accent text-[54px] [font-family:'Aboreto'] font-normal">JEMMA</div>
        </div>

        <div className="w-full grid lg:grid-cols-[1fr_1.2fr_1fr] grid-cols-[0.8fr_1.4fr_auto] gap-2 mb-5 md:text-text text-[10px] pl-auto">
          <div className="">
            <ul className="flex flex-col gap-4">
              {categories.map((category) => (
                <li key={`product-${category.id}`}>
                  <Link
                    to="#"
                    className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav className="flex flex-col gap-4">
            {footerLinks
              .filter((item) => {
                if (
                  (item.href === '#about-us' || item.href === '#certificate') &&
                  pathname !== AppRoute.ROOT
                ) {
                  return false;
                }
                return true;
              })
              .map((item, index) =>
                item.href.startsWith('#') ? (
                  <a
                    key={`footer-${index}`}
                    href={item.href}
                    onClick={(e) =>
                      handleScrollClick(e as React.MouseEvent<HTMLAnchorElement>, item.href)
                    }
                    className=""
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                  </a>
                ) : (
                  <Link to={item.href} className="" key={`footer-${index}`}>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                ),
              )}
          </nav>

          <ul className="flex flex-col gap-4 lg:items-start items-end">
            {socialLinks.map((link, index) => (
              <li key={`social-${index}`}>
                <a href="#" className="">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="w-full md:hidden flex justify-center items-center"
          onClick={() => AppRoute.ROOT}
        >
          <div className="text-accent text-[51px] [font-family:'Aboreto'] font-normal">JEMMA</div>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-[30px] h-[26px] left-2 w-[26px] z-1 flex items-center justify-center bg-button rounded-full border-none cursor-pointer sm:hidden"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp classname="fill-main w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
