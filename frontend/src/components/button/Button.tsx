import React from 'react';
import './Button.scss';

interface Props {
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    ariaLabel?: string;
    disabled?: boolean;
    btnType?: 'primary' | 'secondary' | 'tertiary';
    additionalClassnames?: string;
}

const Button: React.FC<Props> = ({ type, onClick, ariaLabel, disabled, btnType, additionalClassnames, children }) => (
    <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${btnType} ${additionalClassnames}`}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
