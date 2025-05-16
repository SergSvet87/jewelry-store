interface UserItem {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  role?: string;
  gender?: string;
  phoneNumber?: string;
  secondaryPhoneNumber?: string;
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
}

export interface UserState {
  users: UserItem[];
  getUserById: (id: string) => void;
}