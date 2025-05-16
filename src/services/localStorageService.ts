// import { LocalStorage } from '@/enums';

// export const getAccessToken = (): string | null => localStorage.getItem(LocalStorage.ACCESS_TOKEN_KEY);
// export const setAccessToken = (token: string): void => localStorage.setItem(LocalStorage.ACCESS_TOKEN_KEY, token);

// export const getRefreshToken = (): string | null => localStorage.getItem(LocalStorage.REFRESH_TOKEN_KEY);
// export const setRefreshToken = (token: string): void => localStorage.setItem(LocalStorage.REFRESH_TOKEN_KEY, token);

// export const clearTokens = (): void => {
//   localStorage.removeItem(LocalStorage.ACCESS_TOKEN_KEY);
//   localStorage.removeItem(LocalStorage.REFRESH_TOKEN_KEY);
// };


export const localStorageService = {
  getItem: (key: string): string | null => localStorage.getItem(key),
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: (key: string) => localStorage.removeItem(key),
};
