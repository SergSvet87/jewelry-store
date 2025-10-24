import { Card, CardContent } from '@/components/ui';
import { ContactsForm } from './ContactsForm';
import { DeliveryForm } from './DeliveryForm';
import { GiftCheckbox } from './GiftCheckbox';
import { PaymentForm } from './PaymentForm';

export const Details = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-[538px]">
      <Card className="bg-main shadow-main rounded-none font-main">
        <CardContent className="p-6 flex flex-col items-start gap-7">
          <h2 className="font-body text-brown-dark font-medium text-second">Ваші дані</h2>

          <ContactsForm />

          <GiftCheckbox />
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark font-medium text-second">Доставка</h2>

            <DeliveryForm />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>
          
          <PaymentForm />
        </CardContent>
      </Card>
    </div>
  );
};
