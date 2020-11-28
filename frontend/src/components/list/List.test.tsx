import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

test('Renders the List component', () => {
    const { container } = render(<List />);
    expect(container).toBeInTheDocument();
});
