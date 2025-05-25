import { create } from 'zustand';

type ModalType = 'phoneVerification' | 'deleteFromCart' | null;

interface ModalState {
  openModal: ModalType;
  phone: string;
  error: string | null;
  deleteProductId: number | null;
  
  open: (modal: ModalType) => void;
  setError: (error: string | null) => void;
  close: () => void;
  openDeleteFromCartModal: (id: number) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: null,
  phone: '',
  error: null,
  deleteProductId: null,

  open: (modal) => set({ openModal: modal }),
  close: () => set({ openModal: null }),

  setError: (error) => set({ error }),

  openDeleteFromCartModal: (id: number) =>
    set({ openModal: 'deleteFromCart', deleteProductId: id }),
}));