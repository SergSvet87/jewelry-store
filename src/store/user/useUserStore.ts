import { create } from 'zustand';

import { UserState } from '@/types/';
import { userData } from '@/mock/userData';

export const useUserStore = create<UserState>((set, get) => ({
  users: userData,
  getUserById: (id) => get().users.find((user) => user.id === id),
}));
