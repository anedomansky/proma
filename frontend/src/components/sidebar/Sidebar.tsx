import React from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/login' && location.pathname !== '/register' ? (
                <nav>SIDEBAR</nav>
            )
                : null}
        </>
    );
};

export default Sidebar;
