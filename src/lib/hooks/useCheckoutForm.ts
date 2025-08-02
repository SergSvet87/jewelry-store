import { useUserStore } from '@/store';
import { useSmartCart } from './useSmartCart';

export const useCheckoutForm = () => {
  const { cartItems } = useSmartCart();
  const currentUser = useUserStore.getState().currentUser;

  return {
    cartItems,
    currentUser,
  };
};


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormContext } from 'react-hook-form';

// import { useUserStore } from '@/store';
// import { localStorageService } from '@/api';
// import { useSmartCart } from './useSmartCart';
// import { IFormSchema } from '@/schemas/formSchema';
// import { AppRoute, LocalStorage } from '@/enums';
// import { IGuestOrderRequest, IOrderRequest } from '@/types/order';
// import { createOrderGuestService, createOrderService } from '@/services';

// export const useCheckoutForm = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useSmartCart();
//   const currentUser = useUserStore.getState().currentUser;
//   const sessionId = localStorageService.getItem(LocalStorage.SESSION_ID);

//   const onOrderConfirmed = async (data: IFormSchema) => {
//     const { contactsFormValue, deliveryFormValue, paymentFormValue } = state;

//     const items = cartItems.map((item) => ({
//       id: 0,
//       cartId: 0,
//       productId: Number(item.productId),
//       quantity: item.quantity,
//     }));

//     const userOrderFields = {
//       deliveryMethod: deliveryFormValue.method,
//       paymentMethod: paymentFormValue.method,
//       items,
//     };

//     const guestOrderFields = {
//       deliveryMethod: deliveryFormValue.method,
//       paymentMethod: paymentFormValue.method,
//       firstName: contactsFormValue.firstName,
//       lastName: contactsFormValue.lastName,
//       fatherName: contactsFormValue.fatherName,
//       phone: contactsFormValue.phone,
//       email: contactsFormValue.email,
//     };

//     if (currentUser?.id) {
//       const orderData: IOrderRequest = {
//         userId: currentUser.id,
//         ...userOrderFields,
//       };

//       try {
//         const result = await createOrderService(orderData);
//         dispatch({ type: OrderAction.CONFIRM_ORDER, payload: { orderId: result.id } });
//         navigate(AppRoute.PRODUCTS);
//       } catch (err) {
//         console.error('Error creating user order:', err);
//       }
//     }

//     // гостьовий користувач
//     else if (sessionId) {
//       const guestOrderData: IGuestOrderRequest = {
//         sessionId: sessionId.toString(),
//         ...guestOrderFields,
//       };

//       try {
//         const result = await createOrderGuestService(guestOrderData);
//         dispatch({ type: OrderAction.CONFIRM_ORDER, payload: { orderId: result.id } });
//         navigate(AppRoute.PRODUCTS);
//       } catch (err) {
//         console.error('Error creating guest order:', err);
//       }
//     }

//     else {
//       console.error('No user or session ID — cannot create order.');
//     }
//   };

//   const isOrderReady = useFormContext()?.formState?.isValid ?? false;

//   return {
//     onOrderConfirmed,
//     isOrderReady,
//   };
// };