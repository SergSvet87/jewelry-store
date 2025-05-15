interface CartItem {
  id: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (id: string) => void;
}
