export const personalFields = [
  { id: 'firstName', label: "Ім'я" },
  { id: 'lastName', label: 'Прізвище' },
  { id: 'fatherName', label: 'По-батькові' },
  { id: 'phone', label: 'Номер телефону' },
  { id: 'email', label: 'Електронна пошта' },
];

export const deliveryMethods = [
  { id: 'courier', label: "Кур'єр Нова Пошта", price: 'Безкоштовно' },
  { id: 'postamat', label: 'Поштомат Нова Пошта', price: 'Безкоштовно' },
  { id: 'office', label: 'Відділення Нова Пошта', price: 'Безкоштовно' },
];

export const paymentMethods = [
  { id: 'onDelivery', label: 'Оплата при отриманні' },
  { id: 'card', label: 'Оплата платіжною картою VISA/Mastercard' },
  { id: 'privatbank', label: 'Оплата частинами ПриватБанк' },
  { id: 'monobank', label: 'Оплата частинами Monobank' },
  { id: 'gift', label: 'Подарунковий сертифікат' },
];
