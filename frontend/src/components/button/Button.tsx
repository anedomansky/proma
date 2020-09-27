import React from 'react';
import './Button.scss';

interface Props {
    type: 'submit' | 'button' | 'reset';
    onClick: () => void;
    text: string;
    ariaLabel: string;
}

const Button: React.FC<Props> = ({ type, onClick, text, ariaLabel }) => (
    <button
        tabIndex={0}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
    >
        {text}
    </button>
);

export default Button;
