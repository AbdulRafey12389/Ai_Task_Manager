// NODES MODULES...
import { createBrowserRouter } from 'react-router';

// PAGES...
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import AuthSyncPage from '@/pages/AuthSyncPage';
import InboxPage from '@/pages/InboxPage';

// LAYOUTS...
import RootLayout from '../layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

// ERROR BOUNDARIES...
import RootErrorBoundary from '@/pages/RootErrorBoundary';

// TYPES...
import type { RouteObject } from 'react-router';

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },

  {
    path: 'login',
    element: <LoginPage />,
  },

  {
    path: 'auth-sync',
    element: <AuthSyncPage />,
  },
];

const AppRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },

  {
    path: '/app',
    element: <AppLayout />,
    children: AppRouteChildren,
  },
]);

export default router;
