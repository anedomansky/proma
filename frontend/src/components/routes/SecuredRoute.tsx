import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useStores from '../../hooks/useStores';

interface Props extends Omit<RouteProps, 'component'> {
    component: React.ElementType;
}

const SecuredRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
    const { userStore } = useStores();

    return (
        <Route
            exact={exact}
            path={path}
            render={() => (
                userStore.isAuthenticated
                    ? <Component />
                    : <Redirect to="/login" />
            )}
        />
    );
};

export default SecuredRoute;
