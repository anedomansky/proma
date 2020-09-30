import React from 'react';
import './Input.scss';

interface Props {
    label: string;
    id: string;
    type: string;
    pattern: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
}

const Input: React.FC<Props> = ({ label, id, type, pattern, title, minLength, maxLength }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} pattern={pattern} title={title} minLength={minLength} maxLength={maxLength} />
    </>
);

export default Input;
