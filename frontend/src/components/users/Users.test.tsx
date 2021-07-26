import React from 'react';
import { render } from '@testing-library/react';
import Users from './Users';

test('Renders the Users component', () => {
    const { container } = render(<Users />);
    expect(container).toBeInTheDocument();
});
