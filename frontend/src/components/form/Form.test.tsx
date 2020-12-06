import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';

test('Renders the Form component', () => {
    const { container } = render(<Form />);
    expect(container).toBeInTheDocument();
});
