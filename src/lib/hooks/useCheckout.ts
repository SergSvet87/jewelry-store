import { Reducer, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '@/store';
import { localStorageService } from '@/api';
import { createOrderGuestService, createOrderService } from '@/services';
import { IPersonalInfo, IPaymentInfo, IDeliveryInfo, IOrderRequest, IGuestOrderRequest } from '@/types/';
import { AppRoute, DeliveryMethod, LocalStorage, OrderAction, OrderStage, PaymentMethod } from '@/enums';
import { useSmartCart } from './useSmartCart';

type Return = {
  orderProcessStage: OrderStage;
  contactsFormValue: IPersonalInfo;
  deliveryFormValue: IDeliveryInfo;
  paymentFormValue: IPaymentInfo;
  onContactsFormSubmit: (contactsFormValue: IPersonalInfo) => void;
  onDeliveryFormSubmit: (deliveryFormValue: IDeliveryInfo) => void;
  onPaymentFormSubmit: (paymentFormValue: IPaymentInfo) => void;
  onResetOrderProcess: () => void;
  onOrderConfirmed: () => void;
  isOrderReady: boolean;
};

type State = {
  contactsFormValue: IPersonalInfo;
  deliveryFormValue: IDeliveryInfo;
  paymentFormValue: IPaymentInfo;
  orderProcessStage: OrderStage;
  isOrderReady: boolean;
};

type ReducerAction =
  | {
    type: OrderAction.SUBMIT_CONTACT_FORM;
    payload: IPersonalInfo;
  }
  | {
    type: OrderAction.SUBMIT_DELIVERY_FORM;
    payload: IDeliveryInfo;
  }
  | {
    type: OrderAction.SUBMIT_PAYMENT_FORM;
    payload: IPaymentInfo;
  }
  | {
    type: OrderAction.RESET_ORDER_PROCESS;
  }
  | {
    type: OrderAction.TOGGLE_RULES;
  }
  | {
    type: OrderAction.ORDER_READY;
  }
  | {
    type: OrderAction.CONFIRM_ORDER;
    payload: { orderId: number };
  } | {
    type: OrderAction.EDIT_FORM;
    payload: OrderStage;
  };

const CONTACTS_INITIAL_VALUE = {
  firstName: '',
  lastName: '',
  fatherName: '',
  phone: '',
  email: '',
  isGift: false,
};

const DELIVERY_INITIAL_VALUE = {
  city: '',
  method: DeliveryMethod.COURIER,
};

const PAYMENT_INITIAL_VALUE = {
  method: PaymentMethod.CARD,
  cardData: {
    number: '',
    expiry: '',
    cvv: '',
  },
}

const INITIAL_STATE: State = {
  contactsFormValue: CONTACTS_INITIAL_VALUE,
  deliveryFormValue: DELIVERY_INITIAL_VALUE,
  paymentFormValue: PAYMENT_INITIAL_VALUE,
  orderProcessStage: OrderStage.CONTACTS,
  isOrderReady: false,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case OrderAction.SUBMIT_CONTACT_FORM:
      return {
        ...state,
        contactsFormValue: action.payload,
        orderProcessStage: OrderStage.DELIVERY,
      };

    case OrderAction.SUBMIT_DELIVERY_FORM:
      return {
        ...state,
        deliveryFormValue: action.payload,
        orderProcessStage: OrderStage.PAYMENT,
      };

    case OrderAction.SUBMIT_PAYMENT_FORM:
      return {
        ...state,
        paymentFormValue: action.payload,
        orderProcessStage: OrderStage.DONE,
        isOrderReady: true,
        isEditing: false,
      };

    case OrderAction.RESET_ORDER_PROCESS:
      return INITIAL_STATE;

    case OrderAction.CONFIRM_ORDER:
      return {
        ...state,
        orderId: action.payload.orderId,
        acceptWithRules: true,
        isSuccessOpen: true,
      };

    case OrderAction.ORDER_READY:
      return {
        ...state,
        isOrderReady: true,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useCheckout = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const navigate = useNavigate();
  const { cartItems } = useSmartCart();
  const currentUser = useUserStore.getState().currentUser;
  const sessionId = localStorageService.getItem(LocalStorage.SESSION_ID);

  const onContactsFormSubmit = (contactsFormValue: IPersonalInfo) =>
    dispatch({
      type: OrderAction.SUBMIT_CONTACT_FORM,
      payload: contactsFormValue,
    });

  const onDeliveryFormSubmit = (deliveryFormValue: IDeliveryInfo) =>
    dispatch({
      type: OrderAction.SUBMIT_DELIVERY_FORM,
      payload: deliveryFormValue,
    });

  const onPaymentFormSubmit = (paymentFormValue: IPaymentInfo) =>
    dispatch({
      type: OrderAction.SUBMIT_PAYMENT_FORM,
      payload: paymentFormValue,
    });

  const onOrderConfirmed = async () => {
    const { contactsFormValue, deliveryFormValue, paymentFormValue } = state;

    const items = cartItems.map((item) => ({
      id: 0,
      cartId: 0,
      productId: Number(item.productId),
      quantity: item.quantity,
    }));

    const userOrderFields = {
      deliveryMethod: deliveryFormValue.method,
      paymentMethod: paymentFormValue.method,
      items,
    };

    const guestOrderFields = {
      deliveryMethod: deliveryFormValue.method,
      paymentMethod: paymentFormValue.method,
      firstName: contactsFormValue.firstName,
      lastName: contactsFormValue.lastName,
      fatherName: contactsFormValue.fatherName,
      phone: contactsFormValue.phone,
      email: contactsFormValue.email,
    };

    if (currentUser?.id) {
      const orderData: IOrderRequest = {
        userId: currentUser.id,
        ...userOrderFields,
      };

      try {
        const result = await createOrderService(orderData);
        dispatch({ type: OrderAction.CONFIRM_ORDER, payload: { orderId: result.id } });
        navigate(AppRoute.PRODUCTS);
      } catch (err) {
        console.error('Error creating user order:', err);
      }
    }

    // гостьовий користувач
    else if (sessionId) {
      const guestOrderData: IGuestOrderRequest = {
        sessionId: sessionId.toString(),
        ...guestOrderFields,
      };

      try {
        const result = await createOrderGuestService(guestOrderData);
        dispatch({ type: OrderAction.CONFIRM_ORDER, payload: { orderId: result.id } });
        navigate(AppRoute.PRODUCTS);
      } catch (err) {
        console.error('Error creating guest order:', err);
      }
    }

    else {
      console.error('No user or session ID — cannot create order.');
    }

    dispatch({ type: OrderAction.RESET_ORDER_PROCESS });
  };

  const onResetOrderProcess = () => {
    dispatch({
      type: OrderAction.RESET_ORDER_PROCESS,
    });
  };

  return {
    onResetOrderProcess,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onPaymentFormSubmit,
    onOrderConfirmed,
    orderProcessStage: state.orderProcessStage,
    contactsFormValue: state.contactsFormValue,
    deliveryFormValue: state.deliveryFormValue,
    paymentFormValue: state.paymentFormValue,
    isOrderReady: state.isOrderReady,
  };
};

export { useCheckout };
