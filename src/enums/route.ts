const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  CHECKOUT: '/checkout',
  ADMIN: '/admin',
  USER_DATA: '/dashboard',
  USER_CART: '/dashboard/cart',
  USER_LOYALTY: '/dashboard/loyalty',
  USER_ORDERS: '/dashboard/orders',
  USER_REVIEWS: '/dashboard/reviews',
  USER_FAVORITES: '/dashboard/favorites',
  USER_SCALES: '/dashboard/scales',
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
