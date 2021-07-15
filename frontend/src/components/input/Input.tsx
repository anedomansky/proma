import React, { ChangeEvent, useState } from 'react';
import { Validation } from '../../interfaces/InputValidation';
import './Input.scss';
import checkmarkIcon from '../../assets/icons/checkmark.svg';

interface Props {
    label: string;
    id: string;
    type: string;
    pattern?: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
    value: string;
    onChange: (validation: Validation) => void;
}

const Input: React.FC<Props> = ({ label, id, type, pattern, title, minLength, maxLength, value, onChange }) => {
    const [inputValid, setInputValid] = useState<boolean>(false);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const changeValue = event.target.value;

        if (!pattern) {
            onChange({
                value: changeValue,
                valid: true,
            });
            return;
        }

        const regExp = new RegExp(pattern);
        const valid = regExp.test(changeValue);
        onChange({
            value: changeValue,
            valid,
        });
        setInputValid(valid);
    };

    return (
        <>
            <label htmlFor={id}>
                {label}
                {' '}
                {inputValid && <img src={checkmarkIcon} alt="Checkmark" />}
            </label>
            <input
                id={id}
                type={type}
                pattern={pattern}
                title={title}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                onChange={inputChange}
                required
            />
            {!inputValid && value.length > 0 && <span className="hint">{title}</span>}
        </>
    );
};

export default Input;
