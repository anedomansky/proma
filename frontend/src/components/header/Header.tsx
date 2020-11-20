import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import logoImg from '../../assets/images/logo.svg';
import userIcon from '../../assets/icons/user.svg';
import './Header.scss';
import Button from '../button/Button';
import useStores from '../../hooks/useStores';

const Header: React.FC = () => {
    const { userStore } = useStores();
    const location = useLocation();
    const history = useHistory();
    const [show, setShow] = useState<boolean>(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current && !(ref.current! as any).contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref.current]);

    const logout = () => {
        userStore.logout();
        setShow(false);
        history.push('/login');
    };

    return (
        <header>
            <Link to="/" className="logo"><img className="logo__img" src={logoImg} alt="Logo" /></Link>
            <h1 className="title">Fancy IT Company Name</h1>
            <div className="user" ref={ref}>
                {!(location.pathname === '/register' || location.pathname.startsWith('/login')) && (
                    <>
                        <Button type="button" ariaLabel="User menu" onClick={() => setShow(!show)}>
                            <img className="user__icon" src={userIcon} alt="User-menu" />
                        </Button>
                        {
                            show && (
                                <ul className="user__menu">
                                    <li>
                                        <Button type="button" onClick={() => logout()}>
                                            Logout
                                        </Button>
                                    </li>
                                </ul>
                            )
                        }
                    </>
                )}
            </div>
        </header>
    );
};

export default observer(Header);
