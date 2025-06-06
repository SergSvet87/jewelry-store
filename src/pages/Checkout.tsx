import { Details } from "@/features/checkout/Details";
import { Summary } from "@/features/checkout/Summary";

export const Checkout = () => {
  return (
    <div className="container flex flex-col items-start mt-[100px] py-10  section-indent">
      <h2 className="  mb-[65px]">
        Оформлення замовлення
      </h2>

      <div className="flex flex-col items-start justify-between md:flex-row gap-8">
        <Details />
        <Summary />
      </div>
    </div>
  );
};
