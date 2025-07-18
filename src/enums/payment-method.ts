const PaymentMethod = {
  ONDELIVERY : 'onDelivery',
  CARD: 'card',
  PRIVATE: 'privatbank',
  MONO: 'monobank',
  GIFT: 'gift',
} as const;

export type PaymentMethodPath = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export { PaymentMethod };