import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

test('Renders the Input component', () => {
    const { container } = render(<Input label="E-Mail" id="mail" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" />);
    expect(container).toBeInTheDocument();
});
