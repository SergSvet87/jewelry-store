import { Card, CardContent, CardFooter } from "../../components/Card";
import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import { products } from "../../mock";

export const NewCollection = () => {
  return (
      <section className="relative w-full py-16 px-4">
        <h2 className="text-center mb-8 font-heading-3 text-brown-dark text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)]">
          Колекція весна 2025
        </h2>
  
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Large product card */}
          <Card className="border-none shadow-none w-full md:w-1/2 lg:w-[650px]">
            <CardContent className="p-0 relative">
              <div className="flex flex-col h-[790px] items-center justify-end gap-2.5 p-5 relative w-full bg-cover bg-[50%_50%]">
                <div className="absolute top-5 right-5 flex gap-2">
                  <button
                    className="w-8 h-8 rounded-2xl bg-[#fafafa4c] backdrop-blur"
                  >
                    <HeartIcon className="w-6 h-6" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-2xl bg-[#fafafa4c] backdrop-blur"
                  >
                    <ShoppingBagIcon className="w-6 h-6" />
                  </button>
                </div>
                <button className="px-[50px] py-2.5 bg-[color:var(--button)] backdrop-blur font-button text-main text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
                  Купити
                </button>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3">
              <div className="font-normal text-brown-dark text-xl tracking-[0] leading-5">
                <span className="font-medium text-[#1d110a] leading-[26px]">
                  Сережки{" "}
                </span>
                <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                  &quot;HeartIcon&quot;
                </span>
              </div>
              <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap">
                14 344 грн
              </div>
            </CardFooter>
          </Card>
  
          {/* Right column with two smaller cards */}
          <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-[650px]">
            <div className="flex flex-col md:flex-row gap-4">
              {products.slice(1, 3).map((product) => (
                <Card
                  key={product.id}
                  className="border-none shadow-none w-full md:w-1/2 lg:w-[315px]"
                >
                  <CardContent className="p-0 relative">
                    <div className="flex flex-col h-[400px] items-center justify-end gap-2.5 p-5 relative w-full bg-cover bg-[50%_50%]">
                      <div className="absolute top-5 right-5 flex gap-2">
                        <button
                          className="w-8 h-8 rounded-2xl bg-[#fafafa4c] backdrop-blur"
                        >
                          <HeartIcon className="w-6 h-6" />
                        </button>
                        <button
                          className="w-8 h-8 rounded-2xl bg-[#fafafa4c] backdrop-blur"
                        >
                          <ShoppingBagIcon className="w-6 h-6" />
                        </button>
                      </div>
                      <button className="px-[50px] py-2.5 bg-[color:var(--button)] backdrop-blur font-button text-main text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)]">
                        Купити
                      </button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between p-3">
                    <div className="font-normal text-brown-dark text-xl tracking-[0] leading-5">
                      <span className="font-[number:var(--body-font-weight)] text-[#1d110a] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                        {product.name}{" "}
                      </span>
                      <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                        {product.type}
                      </span>
                    </div>
                    <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap">
                      {product.price}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-auto ml-auto max-w-[290px] font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
              Почни весну з блиску, який не тільки прикрашає, але і змінює
              настрій!
            </div>
          </div>
        </div>
      </section>
  );
}
