import React, { useEffect, useRef } from 'react';
import Button from '../button/Button';
import './Modal.scss';
import crossIcon from '../../assets/icons/cross-close.svg';

interface Props {
    confirm: () => void;
    cancel: () => void;
    text: string;
    show: boolean;
}

const Modal: React.FC<Props> = ({ confirm, cancel, text, show }) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (ref.current && !(ref.current! as any).contains(event.target)) {
                cancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref.current]);

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal__content" ref={ref}>
                <div className="modal__header">
                    <Button type="button" onClick={() => cancel()}>
                        <img src={crossIcon} alt="Close" />
                    </Button>
                </div>
                <div className="modal__body">
                    <p>{text}</p>
                </div>
                <div className="modal__footer">
                    <Button btnType="secondary" type="button" onClick={() => cancel()}>
                        <span>No</span>
                    </Button>
                    <Button btnType="primary" type="button" onClick={() => confirm()}>
                        <span>Yes</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
