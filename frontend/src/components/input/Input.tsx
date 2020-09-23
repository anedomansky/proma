import React from 'react';
import './Input.scss';

interface Props {
    label: string;
    id: string;
    type: string;
    pattern: string;
    title?: string;
}

const Input: React.FC<Props> = ({ label, id, type, pattern, title }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} pattern={pattern} title={title} />
    </>
);

export default Input;
