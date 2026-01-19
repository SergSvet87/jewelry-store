import { useCheckoutHandler } from '@/lib/hooks/useCheckoutHandler';
import { Details } from '@/features/checkout/Details';
import { Summary } from '@/features/checkout/Summary';
import { HeaderCheckout } from './HeaderCheckout';
import { FieldErrors } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CheckoutForm = ({ methods }: { methods: any }) => {

  const {handleSubmit : handleFormSubmit} = methods;

  const { getValues, formState } = methods;

  const { onOrderConfirmed } = useCheckoutHandler({
    getValues,
    formState
  });

  return (
    <div className="flex flex-col items-start section-indent">

      <form 
        className="w-full flex flex-col items-start justify-between md:flex-row gap-8"
        onSubmit={handleFormSubmit(onOrderConfirmed, (errors : FieldErrors) => {
        console.log("Помилки валідації:", errors);
      })}
        >
        <HeaderCheckout/>
        <Details />
        <Summary />
      </form>
    </div>
  );
};
