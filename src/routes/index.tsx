import { createBrowserRouter } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { Layout } from '@/layouts';
import {
  Auth,
  Cart,
  Favorite,
  HomePage,
  Products,
  Scale,
  PublicAgreement,
  SingleProduct,
  PrivacyPolicy,
  UserAccount,
  Checkout,
} from '@/pages';
import {
  UserCart,
  UserData,
  UserFavorites,
  UserLoyalty,
  UserOrders,
  UserReviews,
  UserScales,
} from '@/features/dashboard';

export const routes = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <Layout />,
    children: [
      { path: AppRoute.ROOT, element: <HomePage /> },
      { path: AppRoute.PRODUCTS, element: <Products /> },
      { path: AppRoute.PRODUCT, element: <SingleProduct /> },
      { path: AppRoute.FAVORITE, element: <Favorite /> },
      { path: AppRoute.SCALE, element: <Scale /> },
      { path: AppRoute.PUBLIC, element: <PublicAgreement /> },
      { path: AppRoute.PRIVACY, element: <PrivacyPolicy /> },
      {
        path: AppRoute.SIGN_IN,
        element: <Auth />,
      },
      {
        path: AppRoute.CART,
        element: <Cart />,
      },
      {
        path: AppRoute.USER_DATA,
        element: <UserAccount />,
        children: [
          {
            path: AppRoute.USER_DATA,
            element: <UserData />,
          },
          {
            path: AppRoute.USER_CART,
            element: <UserCart />,
          },
          {
            path: AppRoute.USER_FAVORITES,
            element: <UserFavorites />,
          },
          {
            path: AppRoute.USER_ORDERS,
            element: <UserOrders />,
          },
          {
            path: AppRoute.USER_REVIEWS,
            element: <UserReviews />,
          },
          {
            path: AppRoute.USER_LOYALTY,
            element: <UserLoyalty />,
          },
          {
            path: AppRoute.USER_SCALES,
            element: <UserScales />,
          },
        ],
      },
      {
        path: AppRoute.CHECKOUT,
        element: <Checkout />,
      },
      // {
      //   path: AppRoute.ADMIN,
      //   element: <AdminPage />,
      // },
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
]);
