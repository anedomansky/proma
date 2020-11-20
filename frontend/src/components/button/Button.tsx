import React from 'react';
import './Button.scss';

interface Props {
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    ariaLabel?: string;
}

const Button: React.FC<Props> = ({ type, onClick, ariaLabel, children }) => (
    <button
        tabIndex={0}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${type}-btn`}
    >
        {children}
    </button>
);

export default Button;
