import { createBrowserRouter } from 'react-router-dom';

import { AppRoute } from '../enums';
import { Layout } from '../layouts';
import { HomePage } from '../pages';

export const routes = createBrowserRouter(
  [
    {
      path: AppRoute.ROOT,
      element: <Layout />,
      children: [
        { path: AppRoute.ROOT, element: <HomePage /> },
        // {
        //   path: AppRoute.SIGN_IN,
        //   element: <SignIn />,
        // },
        // {
        //   path: AppRoute.CART,
        //   element: <CartPage />,
        // },

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
  ],
);
