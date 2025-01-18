import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { Dashboard } from './pages/Dashboard';
import { Jobs } from './pages/Jobs';
import { Inward } from './pages/Inward';
import { Datasheet } from './pages/Datasheet';
import { DatasheetDetails } from './pages/DatasheetDetails';
import App from './App';

const rootRoute = createRootRoute({
  component: App,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jobs',
  component: Jobs,
});

const inwardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inward',
  component: Inward,
});

const datasheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/datasheet',
  component: Datasheet,
});

const datasheetDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/datasheet/$inwardId',
  component: DatasheetDetails,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  jobsRoute,
  inwardRoute,
  datasheetRoute,
  datasheetDetailsRoute,
]);

export const router = createRouter({ routeTree });