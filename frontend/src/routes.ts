import { RouteConfig } from 'react-router-config';
import LandingPage from './components/landing-page/LandingPage';
import LoginPage from './components/login-page/LoginPage';
import RegistrationPage from './components/registration-page/RegistrationPage';

const routes: RouteConfig[] = [
    {
        component: LandingPage,
        exact: true,
        path: '/',
    },
    {
        component: LoginPage,
        exact: true,
        path: '/login',
    },
    {
        component: RegistrationPage,
        exact: true,
        path: '/register',
    },
];

export default routes;
