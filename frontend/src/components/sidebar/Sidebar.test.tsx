import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

test('Renders the Sidebar component', () => {
    const { container } = render(<Sidebar />);
    expect(container).toBeInTheDocument();
});
