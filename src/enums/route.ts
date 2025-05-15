const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  ORDER: '/order',
  ADMIN: '/admin',
  CART: '/cart',
  PRODUCTS: '/products',
  PRODUCT: '/products/:id/:category/:collection/:title',
  NEW: '/products-new',
  SCALE: '/scale',
  FAVORITE: '/favorite',
  PUBLIC: '/public-agreement',
  PRIVACY: '/privacy-policy',
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
