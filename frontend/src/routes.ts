import { RouteConfig } from 'react-router-config';
import LandingPage from './components/landing-page/LandingPage';

const routes: RouteConfig[] = [
    {
        component: LandingPage,
        exact: true,
        path: '/',
    },
];

export default routes;
