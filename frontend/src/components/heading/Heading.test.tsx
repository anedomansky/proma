import { render } from '@testing-library/react';
import React from 'react';
import Heading from './Heading';

test('Renders the Heading component', () => {
    const { container } = render(<Heading title="test" />);
    expect(container).toBeInTheDocument();
});
