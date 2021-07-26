import React from 'react';
import './Button.scss';

interface Props {
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    ariaLabel?: string;
    disabled?: boolean;
    btnType?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<Props> = ({ type, onClick, ariaLabel, disabled, btnType, children }) => (
    <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={btnType}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
