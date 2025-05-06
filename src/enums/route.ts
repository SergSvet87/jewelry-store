const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  ORDER: '/order',
  ADMIN: '/admin',
  CART: '/cart',
  PRODUCTS: '/products',
  NEW: '/products-new',
  SCALE: '/scale',
  FAVORITE: '/favorite',
  
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
