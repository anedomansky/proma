import React, { useLayoutEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useStores from '../../hooks/useStores';

interface Props extends Omit<RouteProps, 'component'> {
    component: React.ElementType;
}

const SecuredRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
    const { userStore } = useStores();
    const [verified, setVerified] = useState<boolean>(true);

    useLayoutEffect(() => {
        (async function verifyUser() {
            const isVerified = await userStore.isAuthenticated();
            setVerified(isVerified);
        }());
    }, []);

    return (
        <Route
            exact={exact}
            path={path}
            render={() => (
                verified
                    ? <Component />
                    : <Redirect to="/login" />
            )}
        />
    );
};

export default SecuredRoute;
