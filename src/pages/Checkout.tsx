import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IFormSchema } from '@/types/';
import { checkoutSchema } from '@/schemas';
import { Details } from '@/features/checkout/Details';
import { Summary } from '@/features/checkout/Summary';
import { useCheckoutForm } from '@/lib/hooks/useCheckoutForm';
import { AppRoute, DeliveryMethod, PaymentMethod } from '@/enums';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    submitForm,
    personalInfo,
    deliveryInfo,
    paymentInfo,
    handlePersonalChange,
    handleDeliveryChange,
    handlePaymentChange,
  } = useCheckoutForm();
  
  const methods = useForm<IFormSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        surname: '',
        patronymic: '',
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

  const handleSubmit = async () => {
    try {
      const result = await submitForm();
      console.log('result: ', result);
      console.log('Замовлення прийнято в роботу:', result);

      methods.reset();
      navigate(AppRoute.PRODUCTS);
    } catch (error) {
      console.error('Помилка при оформленні:', error);
    }
  };

  return (
    <div className="container flex flex-col items-start mt-[100px] py-10  section-indent">
      <h2 className="  mb-[65px]">Оформлення замовлення</h2>

      <div className="w-full">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitForm)} className="w-full flex flex-col items-start justify-between md:flex-row gap-8">
            <Details
              personalInfo={personalInfo}
              deliveryInfo={deliveryInfo}
              paymentInfo={paymentInfo}
              onPersonalChange={handlePersonalChange}
              onDeliveryChange={handleDeliveryChange}
              onPaymentChange={handlePaymentChange}
            />

            <Summary handleSubmit={handleSubmit} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
