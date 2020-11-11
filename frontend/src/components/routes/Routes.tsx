import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../landing-page/LandingPage';
import LoginPage from '../login-page/LoginPage';
import RegistrationPage from '../registration-page/RegistrationPage';
import SecuredRoute from './SecuredRoute';

const Routes: React.FC = () => (
    <Switch>
        <SecuredRoute exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/login/:registered" component={LoginPage} />
        <Route exact path="/register" component={RegistrationPage} />
    </Switch>
);

export default Routes;
