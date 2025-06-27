import { ICartItem } from "./cart";
import { IOrderResponse } from "./order";

export interface IUserItem {
  id: number;
  email?: string;
  firstName: string;
  lastName: string;
  role?: string;
  status?: string;
  gender?: string;
  phone?: string;
  secondaryPhone?: string;
  birthdate?: string;
  address?: {
    city?: string;
    street?: string;
    houseNumber?: string;
    flat?: string;
    department?: string;
    addressLine?: string;
  };
  password?: string;
  orders?: IOrderResponse[];
  cart?: ICartItem[];
}