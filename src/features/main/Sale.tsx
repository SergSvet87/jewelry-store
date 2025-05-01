import { Card, CardContent } from '../../components/Card'
import { HeartIcon, ShoppingBagIcon } from "lucide-react";
import { productsSale } from "../../mock";

export const Sale = () => {
  return (
    <section className="relative w-full py-16">
      <div className="container mx-auto">
        <h2 className="font-heading-3 text-brown-dark text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)] mb-12">
          Розпродаж минулої колекції
        </h2>

        <div className="flex flex-wrap gap-5">
          {productsSale.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col ${product.width} gap-3`}
            >
              <Card className="border-0 rounded-none">
                <CardContent
                  className={`p-0 relative ${product.imageClass} bg-main`}
                >
                  <div className="absolute w-[68px] h-6 top-5 right-5 flex gap-4">
                    <HeartIcon className="w-6 h-6" />
                    <ShoppingBagIcon className="w-6 h-6" />
                  </div>

                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                    <button className="px-[50px] py-2.5 bg-[color:var(--button)] text-main font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)] rounded-none">
                      Купити
                    </button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-start justify-between w-full">
                <div className="[font-family:'Manrope',Helvetica] text-brown-dark text-xl">
                  <span className="font-medium text-[#1d110a] leading-[26px]">
                    {product.name}{" "}
                  </span>
                  <span className="font-[number:var(--body-font-weight)] text-[#717171] leading-[var(--body-line-height)] font-body [font-style:var(--body-font-style)] tracking-[var(--body-letter-spacing)] text-[length:var(--body-font-size)]">
                    {product.description}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="font-body-crossed font-[number:var(--body-crossed-font-weight)] text-grey text-[length:var(--body-crossed-font-size)] text-right tracking-[var(--body-crossed-letter-spacing)] leading-[var(--body-crossed-line-height)] line-through whitespace-nowrap [font-style:var(--body-crossed-font-style)]">
                    {product.originalPrice}
                  </div>
                  <div className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] text-right tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)]">
                    {product.discountedPrice}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
          Кращий момент для оновлення
          <br />
          образу - знижки на розкішну колекцію!
        </p>
      </div>
    </section>
  )
}
