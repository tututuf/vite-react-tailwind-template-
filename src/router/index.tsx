import { createBrowserRouter } from 'react-router-dom';
import { mainRouters } from './mainRouter';
import { lazy } from 'react';
import { Navigate } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login"></Navigate>
  },
  {
    path: '/login',
    Component: lazy(() => import('@/pages/Login'))
  },
  mainRouters
]);

export default router;
