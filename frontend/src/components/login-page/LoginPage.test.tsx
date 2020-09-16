import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from './LoginPage';

test('Renders the LoginPage component', () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeInTheDocument();
});
