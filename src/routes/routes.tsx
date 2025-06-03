import { Outlet, createBrowserRouter, redirect } from 'react-router-dom';

import { mainPath } from './paths';

import MainContainer from '@containers/MainContainer';

import ErrorPage from '@pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Outlet />,
    children: [
      {
        index: true,
        loader: async () => redirect(mainPath.dashboard.path),
      },

      {
        path: '/main',
        element: <MainContainer />,
        caseSensitive: true,
        children: [
          {
            index: true,
            loader: async () => redirect(mainPath.dashboard.path),
          },
          ...Object.values(mainPath).map((path) => ({
            path: path.path,
            element: <path.component />,
            caseSensitive: true,
          })),
        ],
      },
    ],
  },
]);
