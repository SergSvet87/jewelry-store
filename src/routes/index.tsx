import { createBrowserRouter } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { Layout } from '@/layouts';
import {
  Cart,
  Favorite,
  HomePage,
  Catalog,
  Scale,
  PublicAgreement,
  SingleProduct,
  PrivacyPolicy,
  UserAccount,
  Checkout,
  AuthRegister,
  AuthLogin,
  UserAgreement,
  SuccessfulRegister,
  Certificates,
  NotFound,
} from '@/pages';
import {
  UserData,
  UserFavorites,
  UserLoyalty,
  UserOrders,
  UserReviews,
  UserScales,
} from '@/features/dashboard';
import { SingleCertificate } from '@/pages/SingleCertificate';

export const routes = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <Layout />,
    children: [
      { path: AppRoute.ROOT, element: <HomePage /> },
      { path: AppRoute.PRODUCTS, element: <Catalog /> },
      { path: AppRoute.PRODUCT, element: <SingleProduct /> },
      { path: AppRoute.FAVORITE, element: <Favorite /> },
      { path: AppRoute.SCALE, element: <Scale /> },
      { path: AppRoute.PUBLIC, element: <PublicAgreement /> },
      { path: AppRoute.PRIVACY, element: <PrivacyPolicy /> },
      { path: AppRoute.USER_AGREEMENT, element: <UserAgreement /> },
      { path: AppRoute.SUCCESS, element: <SuccessfulRegister /> },
      {
        path: AppRoute.SIGN_IN,
        element: <AuthLogin />,
      },
      {
        path: AppRoute.SIGN_UP,
        element: <AuthRegister />,
      },
      {
        path: AppRoute.CART,
        element: <Cart />,
      },
      {
        path: AppRoute.CERTIFICATES,
        element: <Certificates />,
      },
      {
        path: AppRoute.CERTIFICATE,
        element: <SingleCertificate />,
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
            path: AppRoute.USER_FAVORITES,
            element: <UserFavorites />,
          },
          {
            path: AppRoute.USER_PROFILE,
            element : <UserData />
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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
