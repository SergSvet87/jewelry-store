import { NewColHeart, NewColRing, SaleMoon, SaleRing } from "@/assets";
import { Card, CardContent } from "@/components/ui";


export const AlsoBuy = () => {
  const products = [
    {
      id: 1,
      image: NewColHeart,
      type: "Підвіска",
      name: "Heart",
      price: "22 636 грн",
    },
    {
      id: 2,
      image: NewColRing,
      type: "Каблучка",
      name: "Heart",
      price: "20 124 грн",
    },
    {
      id: 3,
      image: SaleMoon,
      type: "Ланцюжок",
      name: "Moon",
      price: "24 586 грн",
    },
    {
      id: 4,
      image: SaleRing,
      type: "Каблучка",
      name: "Moon",
      price: "7 329 грн",
    },
  ];

  return (
    <section className="flex flex-col items-start gap-10 w-full">
      <h2 className="w-full [font-family:'Merriweather',Helvetica] font-normal text-brown-dark text-2xl leading-[31.2px] tracking-[0]">
        Разом із цим товаром також купують
      </h2>

      <div className="flex items-center gap-5 w-full">
        {products.map((product) => (
          <Card key={product.id} className="w-full border-none shadow-none">
            <div className="relative w-full h-[276px] bg-grey">
              <img
                className="absolute w-full h-full top-0 left-0 object-cover"
                alt={`${product.type} ${product.name}`}
                src={product.image}
              />
            </div>
            <CardContent className="p-0 pt-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                      {product.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-body-small font-[number:var(--body-small-font-weight)] text-grey text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                      &quot;{product.name}&quot;
                    </span>
                  </div>
                </div>
                <span className="font-body-small font-[number:var(--body-small-font-weight)] text-brown-dark text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                  {product.price}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
