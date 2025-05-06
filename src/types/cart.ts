interface CartItem {
  id: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (id: number) => void;
}