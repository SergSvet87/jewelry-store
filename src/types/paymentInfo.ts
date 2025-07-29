import { type PaymentMethodPath } from '@/enums';

export interface IPaymentInfo {
  method: PaymentMethodPath;
  cardData: {
    number: string;
    expiry: string;
    cvv: string;
  };
}