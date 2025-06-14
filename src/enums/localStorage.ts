const LocalStorage = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  CART_PRODUCTS: 'cart_items',
  CART_TOTAL_AMOUNT: 'cart_total_amount',
  CART_QUANTITY: 'cart_quantity',
  FAVORITE_PRODUCTS: 'favorites',
  FAVORITE_CERTIFICATES: 'favorites_certificates',
} as const;

export type LocalStoragePath = (typeof LocalStorage)[keyof typeof LocalStorage];

export { LocalStorage };