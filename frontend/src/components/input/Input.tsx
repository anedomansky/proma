import React, { ChangeEvent } from 'react';
import './Input.scss';

interface Props {
    label: string;
    id: string;
    type: string;
    pattern?: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ label, id, type, pattern, title, minLength, maxLength, value, onChange }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            pattern={pattern}
            title={title}
            minLength={minLength}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
        />
    </>
);

export default Input;
