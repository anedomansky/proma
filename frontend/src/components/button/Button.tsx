import React from 'react';
import './Button.scss';

interface Props {
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    ariaLabel?: string;
    disabled?: boolean;
}

const Button: React.FC<Props> = ({ type, onClick, ariaLabel, disabled, children }) => (
    <button
        tabIndex={0}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${type}-btn`}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
