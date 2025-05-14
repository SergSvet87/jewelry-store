import { createBrowserRouter } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { Layout } from '@/layouts';
import { Auth, Cart, Favorite, HomePage, Products, Scale } from '@/pages';
import { SingleProduct } from '@/pages/SingleProduct';

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
      {
        path: AppRoute.SIGN_IN,
        element: <Auth />,
      },
      {
        path: AppRoute.CART,
        element: <Cart />,
      },

      // {
      //   path: AppRoute.ORDER,
      //   element: <Order />,
      // },
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
