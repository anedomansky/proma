import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import plusIcon from '../../assets/icons/plus.svg';
import userIcon from '../../assets/icons/user.svg';
import logoImg from '../../assets/images/logo.svg';
import useStores from '../../hooks/useStores';
import Button from '../button/Button';
import List from '../list/List';
import Modal from '../modal/Modal';
import './Header.scss';

interface TitleProps {
    isAdmin: boolean;
}

const Title: React.FC<TitleProps> = ({ isAdmin }) => {
    if (isAdmin) {
        return (
            <h1 className="title">
                Fancy IT Company Name
                <Link to="/project/create">
                    <img src={plusIcon} alt="Add project" />
                </Link>
            </h1>
        );
    }
    return <h1 className="title">Fancy IT Company Name</h1>;
};

const Header: React.FC = () => {
    const { userStore } = useStores();
    const location = useLocation();
    const history = useHistory();
    const [show, setShow] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
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
    }, []);

    const logout = () => {
        userStore.logout();
        setShowModal(false);
        setShow(false);
        history.push('/login');
    };

    return (
        <header>
            <Link to="/" className="logo"><img className="logo__img" src={logoImg} alt="Logo" /></Link>
            <Title isAdmin={userStore.isAdmin()} />
            <div className="user" ref={ref}>
                {!(location.pathname === '/register' || location.pathname.startsWith('/login')) && (
                    <>
                        <Button type="button" onClick={() => setShow(!show)}>
                            <img className="user__icon" src={userIcon} alt="User-menu" />
                        </Button>
                        {
                            show && (
                                <List>
                                    <Button type="button" onClick={() => { setShowModal(true); setShow(false); }}>
                                        Logout
                                    </Button>
                                </List>
                            )
                        }
                    </>
                )}
            </div>
            <Modal show={showModal} text="Do you really want to log out now?" cancel={() => setShowModal(false)} confirm={() => logout()} />
        </header>
    );
};

export default observer(Header);
