import React from 'react';
import logoImg from '../../assets/images/logo.svg';
import userIcon from '../../assets/icons/user.svg';
import './Header.scss';

const Header: React.FC = () => (
    <header>
        <img className="logo" src={logoImg} alt="Logo" />
        <h1 className="title">Fancy IT Company Name</h1>
        <img className="user-menu" src={userIcon} alt="User-menu" />
    </header>
);

export default Header;
