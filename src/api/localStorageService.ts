/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageService = {
  getItem<T = unknown>(key: string): T | null {
    const value = localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  },

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void { localStorage.removeItem(key) },
};
