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
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';

// LAYOUTS...
import RootLayout from '../layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

// ERROR BOUNDARIES...
import RootErrorBoundary from '@/pages/RootErrorBoundary';
import ProjectErrorBoundary from '@/pages/ProjectErrorBoundary';

// ACTIONS...
import appAction from '@/routes/actions/appAction';
import projectAction from '@/routes/actions/projectAction';

// LOADERS...
import inboxTaskLoader from '@/routes/loaders/inboxLoader';
import todayTaskLoader from '@/routes/loaders/todayTaskLoader';
import upcomingTaskLoader from '@/routes/loaders/upcomingTaskLoader';
import completedTaskLoader from '@/routes/loaders/completedTaskLoader';
import projectsLoader from '@/routes/loaders/projectsLoader';
import projectsDetailLoader from '@/routes/loaders/projectsDetailLoader';
import appLoader from '@/routes/loaders/appLoader';

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

  {
    path: 'projects',
    element: <ProjectsPage />,
    action: projectAction,
    loader: projectsLoader,
  },

  {
    path: 'projects/:projectId',
    element: <ProjectDetailPage />,
    loader: projectsDetailLoader,
    errorElement: <ProjectErrorBoundary />,
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
    loader: appLoader,
  },
]);

export default router;
