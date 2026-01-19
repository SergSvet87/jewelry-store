import { Card, CardContent } from '@/components/ui';
import { ContactsForm } from './ContactsForm';
import { DeliveryForm } from './DeliveryForm';
import { GiftCheckbox } from './GiftCheckbox';
import { PaymentForm } from './PaymentForm';

export const Details = () => {
  return (
    <div className="flex flex-col w-full">
      <Card className="bg-main font-main">
        <CardContent className="flex flex-col items-start gap-7">
          <h2 className="font-medium text-[20px]">Ваші дані</h2>

          <ContactsForm />

          <GiftCheckbox />
        </CardContent>
      </Card>

      <Card className="bg-main">
        <CardContent className="flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full pt-12">
            <h2 className="font-body text-brown-dark font-medium text-second">Доставка</h2>

            <DeliveryForm />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main">
        <CardContent className="pt-12 flex flex-col items-start gap-9">
          <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>
          
          <PaymentForm />
        </CardContent>
      </Card>
    </div>
  );
};
