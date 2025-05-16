const LocalStorage = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
} as const;

export type LocalStoragePath = (typeof LocalStorage)[keyof typeof LocalStorage];

export { LocalStorage };