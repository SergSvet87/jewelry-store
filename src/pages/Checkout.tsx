import { Details } from "@/features/checkout/Details";
import { Summary } from "@/features/checkout/Summary";

export const Checkout = () => {
  return (
    <div>
      <h1 className="font-heading-2 text-brown-dark text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] mb-8">
        Оформлення замовлення
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Details />
        <Summary />
      </div>
    </div>
  );
};
