/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageService = {
  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  },
  setItem: (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value)),
  removeItem: (key: string) => localStorage.removeItem(key),
};
