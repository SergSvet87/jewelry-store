import { create } from 'zustand';

type ModalType = 'phoneVerification' | 'cart' | null;

interface ModalState {
  openModal: ModalType;
  phone: string;
  error: string | null;
  open: (modal: ModalType) => void;
  setError: (error: string | null) => void;
  close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: null,
  phone: '',
  error: null,
  open: (modal) => set({ openModal: modal }),
  close: () => set({ openModal: null }),
  setError: (error) => set({ error }),
}));