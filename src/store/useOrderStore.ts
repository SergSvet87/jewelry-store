import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IFullOrderDetails, IOrderItem } from '@/types/orderDetails';
import { getUserOrderService } from '@/services/orderService';
import { useProductStore } from './useProductStore';

interface OrderState {
  orders: IFullOrderDetails[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>()(
  devtools((set) => ({
    orders: [],
    loading: false,
    error: null,

    fetchOrders: async () => {
      set({ loading: true, error: null });

      try {
        const res = await getUserOrderService(0, 10);
        const fetchedOrders = res?.content || [];
        const addProductsToAll = useProductStore.getState().addProductsToAll;
        const allProductsFromOrders = fetchedOrders.flatMap((order) =>
          (order.items || []).map((item: IOrderItem) => ({
            ...item.product,
            quantity: 0, 
          }))
        );
        if (allProductsFromOrders.length > 0) {
          addProductsToAll(allProductsFromOrders);
        }

        set({ orders: fetchedOrders, loading: false });
      } catch (error: unknown) {
          const errorMessage = error instanceof Error 
          ? error.message 
          : 'Невідома помилка при завантаженні замовлень';
          
        set({ 
          error: errorMessage, 
          loading: false 
        });
      }
    },
  }))
);