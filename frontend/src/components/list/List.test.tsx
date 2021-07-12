import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

test('Renders the List component', () => {
    const { container } = render(<List />);
    expect(container).toBeInTheDocument();
});

test('Renders the children', () => {
    const { getByText } = render(
        <List>
            <span>Test1</span>
            <span>Test2</span>
        </List>,
    );
    expect(getByText('Test1')).toBeInTheDocument();
    expect(getByText('Test2')).toBeInTheDocument();
});
