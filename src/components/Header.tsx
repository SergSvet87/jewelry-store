// import { Link } from "react-router-dom";

import { navItems } from "../mock";
import { FavoriteIcon, Logo, ScalesIcon, SearchIcon, ShoppingBagIcon, UserIcon, MessageSquareIcon } from "../assets";

const Header = () => {
  const promoMessage = "Безкоштовна доставка кур'єром Нової Пошти!";

  return (
    <>
   {/* Top promotional banner */}
   <div className="w-full h-[50px] bg-main overflow-hidden">
        <div className="flex items-center gap-[248px] relative top-3 animate-marquee">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative w-[443px] font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)]"
            >
              {promoMessage}
            </div>
          ))}
        </div>
      </div>

      <header className="w-full top-0 left-0 z-50 bg-[var(--brown-dark)] text-[var(--main)]">

        <div className="w-full h-[50px] bg-brown-dark backdrop-blur-lg">
          <div className="flex items-center justify-between max-w-[1320px] mx-auto h-full px-[60px]">

            <Logo width={"105"} height={"30"} fill="var(--accent)"/>

            <div className="flex items-center gap-[196px]">
              <nav className="flex gap-10 items-center">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex w-[88px] justify-center px-0 py-2 items-center"
                  >
                    <span className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                      {item.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-8">
                <button className="p-0 h-5 w-5">
                  <SearchIcon fill="var(--main)" />
                </button>

                <button className="p-0 h-5 w-5">
                  <UserIcon fill="var(--main)" />
                </button>

                <button className="p-0 h-5 w-5">
                  <FavoriteIcon fill="var(--main)" />
                </button>

                <button className="p-0 h-5 w-5">
                  <ScalesIcon fill="var(--main)" />
                </button>

                <button className="p-0 h-5 w-5">
                  <ShoppingBagIcon stroke="var(--main)" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-[color:var(--button)] rounded-[20px] p-2"
          >
            <MessageSquareIcon stroke="var(--main)" />
          </button>
        </div>
      </header>
    </>
    
  )
}

export default Header