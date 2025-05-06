import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { categories, footerLinks, socialLinks } from '@/mock';

const Footer = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, el: string) => {
    e.preventDefault();

    const elem = document.querySelector(el) as HTMLAnchorElement;
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="w-full bg-[var(--brown-dark)] py-16 text-[var(--main)]">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full flex justify-start items-center md:w-1/4 mb-8 md:mb-0 cursor-pointer" onClick={() => AppRoute.ROOT}>
          <div className="text-[var(--accent)] text-[54px] [font-family:'Aboreto'] font-normal">
            JEMMA
          </div>
        </div>

        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <ul className="flex flex-col gap-4">
            {categories.map((category) => (
              <li key={`product-${category.id}`}>
                <Link
                  to="#"
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <ul className="flex flex-col gap-4">
            {footerLinks.map((item, index) => (
              <li key={`link-${index}`}>
                <Link
                  to={item.href}
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                  onClick={(e) => handleScrollClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <ul className="flex flex-col gap-4">
            {socialLinks.map((link, index) => (
              <li key={`social-${index}`}>
                <a
                  href="#"
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
