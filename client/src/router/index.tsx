import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { LinkStats } from '../pages/LinkStats';
import { NotFound } from '../pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/code/:code', element: <LinkStats /> },
  { path: '*', element: <NotFound /> }
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
