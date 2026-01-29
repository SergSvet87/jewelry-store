interface IOrderItemRequest {
  productId: number;
  quantity: number;
}

interface IAuthOrderItemRequest {
  id: number;        
  cartId: number;    
  productId: number;
  quantity: number;
}

interface IAuthOrderRequest {
  id? : number;
  userId: number;
  items: IAuthOrderItemRequest[];
}

interface IGuestOrderRequest {
  firstName: string;
  lastName: string;
  fatherName: string;
  phone: string;
  email: string;
  items: IOrderItemRequest[];
}

// interface IOrderResponse {
//   id: number;
//   orderNumber: string;
//   createdAt: string;
//   userId: number | null;
//   items: IAuthOrderItemRequest[]; 
//   status: string;
//   totalPrice: number;
//   isGift: boolean | null;

//   orderDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     deliveryMethod: string;
//     paymentMethod: string;
//   };
// }

export type { 
  // IOrderResponse, 
  IGuestOrderRequest, 
  IOrderItemRequest, 
  IAuthOrderRequest,
  IAuthOrderItemRequest 
};