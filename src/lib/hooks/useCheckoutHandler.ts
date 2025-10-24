import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { AppRoute, LocalStorage } from '@/enums';
import { useUserStore } from '@/store';
import { localStorageService } from '@/api';
import { IFormSchema } from '@/schemas/formSchema';
import { IGuestOrderRequest, IOrderRequest } from '@/types/';
import { createOrderGuestService, createOrderService } from '@/services';

export const useCheckoutHandler = ({
  getValues,
  formState,
}: {
  getValues: UseFormReturn<IFormSchema>['getValues'];
  formState: UseFormReturn<IFormSchema>['formState'];
}) => {
  const navigate = useNavigate();
  const { cartItems } = useSmartCart();
  const currentUser = useUserStore.getState().currentUser;
  const sessionId = localStorageService.getItem(LocalStorage.SESSION_ID);

  const onOrderConfirmed = async () => {
    const values = getValues();

    const items = cartItems.map((item) => ({
      id: 0,
      cartId: 0,
      productId: Number(item.productId),
      quantity: item.quantity,
    }));

    const userOrderFields = {
      deliveryMethod: values.deliveryInfo.method,
      paymentMethod: values.paymentInfo.method,
      items,
    };

    const guestOrderFields = {
      deliveryMethod: values.deliveryInfo.method,
      paymentMethod: values.paymentInfo.method,
      firstName: values.personalInfo.firstName,
      lastName: values.personalInfo.lastName,
      fatherName: values.personalInfo.fatherName,
      phone: values.personalInfo.phone,
      email: values.personalInfo.email,
    };

    try {
      if (currentUser?.id) {
        const orderData: IOrderRequest = { userId: currentUser.id, ...userOrderFields };
        const result = await createOrderService(orderData);
        console.log('result: ', result);
        navigate(AppRoute.PRODUCTS);
      } else if (sessionId) {
        const guestOrderData: IGuestOrderRequest = {
          sessionId: sessionId.toString(),
          ...guestOrderFields,
        };
        const result = await createOrderGuestService(guestOrderData);
        console.log('result: ', result);
        navigate(AppRoute.PRODUCTS);
      } else {
        console.error('No user or session ID');
      }
    } catch (err) {
      console.error('Error confirming order:', err);
    }
  };

  return {
    onOrderConfirmed,
    isOrderReady: formState?.isValid ?? false,
  };
};
