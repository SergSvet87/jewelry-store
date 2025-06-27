import { create } from 'zustand';

import { IUserItem } from '@/types/';

export interface UserState {
  users: IUserItem[];
  currentUser: IUserItem | null;
  setUser: (user: IUserItem) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
}));
