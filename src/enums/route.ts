const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  ORDER: '/order',
  ADMIN: '/admin',
  CART: '/cart',
} as const;

export type RoutePath = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
