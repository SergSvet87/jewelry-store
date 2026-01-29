import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IFullOrderDetails } from '@/types/orderDetails';
import { getUserOrderService } from '@/services/orderService';
import { useProductStore } from './useProductStore';
import { IOrderItem } from '@/types/orderDetails';

interface OrderState {
  orders: IFullOrderDetails[];
  loading: boolean;
  error: string | null;
  
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>()(devtools((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
  set({ loading: true });

  try {
    const res = await getUserOrderService(0, 10);
    const fetchedOrders = res.content;

    const addProductsToAll = useProductStore.getState().addProductsToAll;

    const allProductsFromOrders = fetchedOrders.flatMap(order => 
  order.items.map((item: IOrderItem) => ({
    ...item.product, 
    quantity: 0,
  }))
);

    addProductsToAll(allProductsFromOrders);

    set({ orders: fetchedOrders, loading: false });

  } catch (error) {
    set({ error: `Помилка : ${error}`, loading: false });
  }
}
})));