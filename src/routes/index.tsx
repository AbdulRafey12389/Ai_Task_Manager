// NODES MODULES...
import { createBrowserRouter } from 'react-router';

// PAGES...
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import AuthSyncPage from '@/pages/AuthSyncPage';
import InboxPage from '@/pages/InboxPage';
import TodayTaskPage from '@/pages/TodayTaskPage';
import UpcomingTaskPage from '@/pages/UpcomingTaskPage';
import CompletedTaskPage from '@/pages/CompletedTaskPage';

// LAYOUTS...
import RootLayout from '../layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

// ERROR BOUNDARIES...
import RootErrorBoundary from '@/pages/RootErrorBoundary';

// ACTIONS...
import appAction from '@/routes/actions/appAction';

// LOADERS...
import inboxTaskLoader from '@/routes/loaders/inboxLoader';
import todayTaskLoader from './loaders/todayTaskLoader';
import upcomingTaskLoader from './loaders/upcomingTaskLoader';
import completedTaskLoader from './loaders/completedTaskLoader';

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
    loader: inboxTaskLoader,
    element: <InboxPage />,
  },

  {
    path: 'today',
    loader: todayTaskLoader,
    element: <TodayTaskPage />,
  },

  {
    path: 'upcoming',
    loader: upcomingTaskLoader,
    element: <UpcomingTaskPage />,
  },

  {
    path: 'completed',
    loader: completedTaskLoader,
    element: <CompletedTaskPage />,
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
    action: appAction,
  },
]);

export default router;
