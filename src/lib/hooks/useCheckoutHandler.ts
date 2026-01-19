import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { AppRoute } from '@/enums';
import { IFormSchema } from '@/schemas/formSchema';
import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';

export const useCheckoutHandler = ({
  formState,
}: {
  getValues: UseFormReturn<IFormSchema>['getValues'];
  formState: UseFormReturn<IFormSchema>['formState'];
}) => {
  const navigate = useNavigate();
  const { createOrder } = useSmartCart();

  const sessionIdFromStorage = localStorageService.getItem(LocalStorage.SESSION_ID);
  const sessionId = sessionIdFromStorage || `guest_${Math.random().toString(36).substring(2, 9)}`;

  if (!sessionIdFromStorage) {
  localStorageService.setItem(LocalStorage.SESSION_ID, sessionId);
}

  const onOrderConfirmed = async (data: IFormSchema) => {
  try {
    const result = await createOrder(data);

    if (result) {
      console.log('Замовлення створено:', result);
      navigate(AppRoute.ORDER_SUCCESS, { 
        state: result, 
        replace: true
      });
    }
  } catch (err) {
    console.error('Помилка при оформленні:', err);
  }
};

  return {
    onOrderConfirmed,
    isOrderReady: formState.isValid, 
  };
};