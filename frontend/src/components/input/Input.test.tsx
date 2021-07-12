import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

test('Renders the Input component', () => {
    const { container } = render(<Input label="E-Mail" id="mail" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" value="" onChange={() => null} />);
    expect(container).toBeInTheDocument();
});

test('Renders the Input component', () => {
    let value = '';
    let valid = false;
    const { getByLabelText } = render(<Input label="E-Mail" title="E-Mail Test" id="mail" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" value={value} onChange={(validation) => { value = validation.value; valid = validation.valid; }} />);

    fireEvent.change(getByLabelText('E-Mail'), { target: { value: 'Test' } });

    expect(value).toEqual('Test');
    expect(valid).toBeFalsy();
});

test('Renders the Input component', () => {
    let value = '';
    let valid = false;
    const { getByLabelText } = render(<Input label="E-Mail" title="E-Mail Test" id="mail" type="email" value={value} onChange={(validation) => { value = validation.value; valid = validation.valid; }} />);

    fireEvent.change(getByLabelText('E-Mail'), { target: { value: 'Test' } });

    expect(value).toEqual('Test');
    expect(valid).toBeTruthy();
});
