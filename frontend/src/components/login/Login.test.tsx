import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('Renders the Login component', () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
});
