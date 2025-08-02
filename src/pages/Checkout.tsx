import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IFormSchema } from '@/types/';
import { checkoutSchema } from '@/schemas';
import { DeliveryMethod, PaymentMethod } from '@/enums';
import { CheckoutForm } from '@/features/checkout/CheckoutForm';

export const Checkout = () => {
  const methods = useForm<IFormSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        fatherName: '',
        phone: '',
        email: '',
        isGift: false,
      },
      deliveryInfo: {
        city: '',
        method: DeliveryMethod.COURIER,
      },
      paymentInfo: {
        method: PaymentMethod.CARD,
        cardData: {
          number: '',
          expiry: '',
          cvv: '',
        },
      },
    },
  });

  return (
    <div className="container flex flex-col items-start mt-[100px] py-10  section-indent">
      <h2 className="  mb-[65px]">Оформлення замовлення</h2>

      <div className="w-full">
        <FormProvider {...methods}>
          <CheckoutForm methods={methods} />
        </FormProvider>
      </div>
    </div>
  );
};
