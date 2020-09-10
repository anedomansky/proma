import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('Renders the Header component', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
});
