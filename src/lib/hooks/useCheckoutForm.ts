import { useState } from 'react';

import { useUserStore } from '@/store';
import { createOrderService, createOrderGuestService } from '@/services';
import { DeliveryMethod, LocalStorage, PaymentMethod } from '@/enums';
import { useSmartCart } from './useSmartCart';
import { localStorageService } from '@/api';
import { checkoutSchema } from '@/schemas';

export const useCheckoutForm = () => {
  const { cartItems } = useSmartCart();
  const currentUser = useUserStore.getState().currentUser;
  const sessionId = localStorageService.getItem(LocalStorage.SESSION_ID);

  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    email: '',
    isGift: false,
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    city: '',
    method: DeliveryMethod.COURIER,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: PaymentMethod.CARD,
    cardData: {
      number: '',
      expiry: '',
      cvv: '',
    },
  });

  const handlePersonalChange = (field: string, value: string | boolean) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string | object) => {
    if (field === 'cardData' && typeof value === 'object' && value !== null) {
      setPaymentInfo((prev) => ({
        ...prev,
        cardData: { ...prev.cardData, ...(value as typeof prev.cardData) },
      }));
    } else {
      setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const submitForm = async () => {
    const data = {
      personalInfo,
      deliveryInfo,
      paymentInfo,
    };

    const validation = checkoutSchema.safeParse(data);
    if (!validation.success) {
      console.error('Помилки валідації:', validation.error.flatten());
      throw new Error('Некоректні дані. Перевірте форму.');
    }

    const items = cartItems.map((item) => ({
      id: 0,
      cartId: 0,
      productId: Number(item.productId),
      quantity: item.quantity,
    }));

    try {
      if (currentUser) {
        const payload = {
          id: 0,
          userId: currentUser.id,
          paymentMethod: paymentInfo.method,
          deliveryMethod: deliveryInfo.method,
          items,
        };
        return await createOrderService(payload);
      } else {
        if (!sessionId) throw new Error('Session ID відсутній');

        const guestPayload = {
          id: 0,
          sessionId: sessionId.toString(),
          paymentMethod: paymentInfo.method,
          deliveryMethod: deliveryInfo.method,
          items,
        };

        return await createOrderGuestService(guestPayload);
      }
    } catch (error) {
      console.error('Помилка створення замовлення:', error);
      throw error;
    }
  };

  return {
    personalInfo,
    deliveryInfo,
    paymentInfo,
    handlePersonalChange,
    handleDeliveryChange,
    handlePaymentChange,
    submitForm,
  };
};