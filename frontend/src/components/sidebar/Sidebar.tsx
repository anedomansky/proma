import React from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <>
            {!location.pathname.startsWith('/login') && location.pathname !== '/register' ? (
                <nav>No Projects available!</nav>
            )
                : null}
        </>
    );
};

export default Sidebar;
