const DeliveryMethod = {
  COURIER : 'courier',
  POSTAMAT: 'postamat',
  OFFICE: 'office',
} as const;

export type DeliveryMethodPath = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];

export { DeliveryMethod };