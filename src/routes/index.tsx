// NODES MODULES...
import { createBrowserRouter } from 'react-router';

// PAGES...
import HomePage from '@/pages/HomePage';

// LAYOUTS...
import RootLayout from '../layouts/RootLayout';

// ERROR BOUNDARIES...
import RootErrorBoundary from '@/pages/RootErrorBoundary';

// TYPES...
import type { RouteObject } from 'react-router';

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
]);

export default router;
