import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCurrentWidth from '../../hooks/useCurrentWidth';
import Button from '../button/Button';
import './Sidebar.scss';
import arrowIcon from '../../assets/icons/arrow-alt.svg';
import crossIcon from '../../assets/icons/cross-alt.svg';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const width = useCurrentWidth();
    const [showContent, setShowContent] = useState<boolean>(width >= 768);

    useEffect(() => {
        if (width >= 768) {
            setShowContent(true);
        } else {
            setShowContent(false);
        }
    }, [width]);

    if (location.pathname.startsWith('/login') || location.pathname === '/register') {
        return null;
    }

    return (
        <nav>
            {
                showContent ? (
                    <>
                        <Button type="button" onClick={() => setShowContent(false)}>
                            <img src={crossIcon} alt="Collapse menu" />
                        </Button>
                        <span>No Projects available!</span>
                    </>
                ) : (
                    <Button type="button" onClick={() => setShowContent(true)}>
                        <img src={arrowIcon} alt="Expand menu" />
                    </Button>
                )
            }
        </nav>
    );
};

export default Sidebar;
