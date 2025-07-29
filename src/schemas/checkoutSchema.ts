import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  patronymic: z.string().min(2),
  phone: z.string().regex(/^\+380\d{9}$/, 'Некоректний номер'),
  email: z.string().email(),
  isGift: z.boolean(),
});

export const deliveryInfoSchema = z.object({
  city: z.string().min(2),
  method: z.string(),
});

export const cardDataSchema = z.object({
  number: z.string().min(16, 'Мінімум 16 цифр'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'MM/YY'),
  cvv: z.string().length(3, 'CVV має бути 3 цифри'),
});

export const paymentInfoSchema = z.object({
  method: z.string(),
  cardData: z
    .object({
      number: z.string().min(16, 'Мінімум 16 цифр'),
      expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'MM/YY'),
      cvv: z.string().length(3, 'CVV має бути 3 цифри'),
    })
    .optional(),
}).refine(
  (data) => {
    if (data.method === 'card') {
      return !!data.cardData &&
        data.cardData.number.length >= 16 &&
        /^\d{2}\/\d{2}$/.test(data.cardData.expiry) &&
        data.cardData.cvv.length === 3;
    }
    return true;
  },
  {
    message: 'Заповніть дані картки',
    path: ['cardData'],
  }
);

export const checkoutSchema = z.object({
  personalInfo: personalInfoSchema,
  deliveryInfo: deliveryInfoSchema,
  paymentInfo: paymentInfoSchema,
});
