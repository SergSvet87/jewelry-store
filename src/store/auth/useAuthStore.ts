import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/services/localStorageService';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY),
  refreshToken: localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY),
  setTokens: (accessToken, refreshToken) => {
    localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, accessToken);
    localStorageService.setItem(LocalStorage.REFRESH_TOKEN_KEY, refreshToken);
    set({ accessToken, refreshToken });
  },
  
  logout: () => {
    localStorageService.removeItem(LocalStorage.ACCESS_TOKEN_KEY);
    localStorageService.removeItem(LocalStorage.REFRESH_TOKEN_KEY);
    set({ accessToken: null, refreshToken: null });
  },
}));
