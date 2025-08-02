import { useCheckoutHandler } from '@/lib/hooks/useCheckoutHandler';
import { Details } from '@/features/checkout/Details';
import { Summary } from '@/features/checkout/Summary';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckoutForm = ({ methods }: { methods: any }) => {
  
  const { getValues, formState } = methods;

  const { onOrderConfirmed, isOrderReady } = useCheckoutHandler({
    getValues,
    formState
  });
  const handleSubmit = async () => {
    await onOrderConfirmed();
  };

  return (
    <div className="container flex flex-col items-start mt-[100px] py-10  section-indent">
      <h2 className="mb-[65px]">Оформлення замовлення</h2>

      <form className="w-full flex flex-col items-start justify-between md:flex-row gap-8">
        <Details />
        <Summary handleSubmit={handleSubmit} isOrderReady={isOrderReady} />
      </form>
    </div>
  );
};
