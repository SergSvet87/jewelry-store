const ApiEndpoint = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  FORGOT_PASSWORD: 'resetPassword',
  CHANGE_PASSWORD: 'changePassword',
  USERS: 'users',
  USER: 'users/token',
  USER_ID: 'users/id/:id',
  USER_UPDATE: 'users/update',
  USER_UPDATE_ID: 'users/update/:id',
  SIGNUP: 'users/register',
  USER_VERIFY: 'users/verify',
  SIGNIN: 'signIn',
  BRANDS: 'brands',
  CATEGORIES: 'categories',
  COLLECTIONS: 'collections',
  ATTRIBUTES: 'attributes',
  CART: '/cart',
  CART_ADD: '/cart/add',
  GOOGLE: 'http://ec2-16-170-255-92.eu-north-1.compute.amazonaws.com:8080/oauth2/authorize/google',
  APPLE: '#',
} as const;

export type ApiEndpointPath = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };