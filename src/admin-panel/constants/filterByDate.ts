export interface FilterOption {
  label: string;
  value: string;
}

export const FILTER_BY_DATA: FilterOption[] = [
  { label: 'За тиждень', value: 'WEEK' },
  { label: 'За місяць', value: 'MONTH' }, 
  { label: 'За квартал', value: 'QUARTER' },
  { label: 'За рік', value: 'YEAR' },
];

export const FILTER_BY_DELIVERY_METHOD : FilterOption[] = [
   { label: 'Курʼєр Нової пошти', value: 'NOVA_POST_COURIER' },
   { label: 'Відділення Нової пошти', value: 'NOVA_POST_DEPARTMENT' },
   { label: 'Поштомат Нової пошти', value: 'NOVA_POST_PARCEL_LOCKER' },
]

export const FILTER_BY_PAYMENT_METHOD : FilterOption[] = [
   { label: 'При отриманні', value: 'ON_DELIVERY' },
   { label: 'Оплата платіжною картою VISA/Mastercard', value: 'BY_CARD' },
   { label: 'ПриватБанк розстрочка', value: 'IN_INSTALLMENTS_PRIVATBANK' },
   { label: 'МоноБанк розстрочка', value: 'IN_INSTALLMENTS_MONOBANK' },
   { label: 'Подарунковий сертифікат', value: 'GIFT_CERTIFICATE' },
]

// export const FILTER_BY_CATEGORY : FilterOption[] = [
//   { label: 'Підвіска', value: 'PIDVISKA' },
//   { label: 'Каблучка', value: 'RING' },
//   { label: 'Ланцюжок', value: 'LANTSUZHOK' },
//   { label: 'Сережки', value: 'SEREZHKI' },
//   { label: 'Браслет', value: 'BRACELET' },
// ]

export const FILTER_BY_CATEGORY : FilterOption[] = [
  { label: 'Підвіска', value: 'Підвіски' },
  { label: 'Каблучка', value: 'Каблучки' },
  { label: 'Ланцюжок', value: 'Ланцюжки' },
  { label: 'Сережки', value: 'Сережки' },
  { label: 'Браслет', value: 'Браслети' },
]

export const FILTER_BY_COLLECTION  : FilterOption[] = [
  { label: 'Moon', value: 'MOON' },
  { label: 'Heart', value: 'HEART' },
  { label: 'Sun', value: 'SUN' },
  { label: 'Snow', value: 'SNOW' },
  { label: 'Ocean', value: 'OCEAN' },
  { label: 'Spark', value: 'SPARK' },
  { label: 'Glow', value: 'GLOW' },
]

export const FILTER_BY_METAL : FilterOption[] = [
  {label : "Біле золото", value : "WHITE_GOLD"},
  {label : "Жовте золото", value : "YELOW_GOLD"},
  {label : "Срібло", value : "SILVER"},
  {label : "Платина", value : "PLATINUM"},
]
export const FILTER_BY_STONE : FilterOption[] = [
  {label : "Фіаніт", value : "PHIANIT"},
  {label : "Сапфір", value : "SAPFIR"},
  {label : "Діамант", value : "DIAMOND"},
]
