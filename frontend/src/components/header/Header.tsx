import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import userIcon from '../../assets/icons/user.svg';
import './Header.scss';
import Button from '../button/Button';

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <header>
            <Link to="/"><img className="logo" src={logoImg} alt="Logo" /></Link>
            <h1 className="title">Fancy IT Company Name</h1>
            <div>
                {!(location.pathname === '/register' || location.pathname === '/login') && (
                    <Button type="button" ariaLabel="User menu" onClick={() => null}>
                        <img className="user-menu" src={userIcon} alt="User-menu" />
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
