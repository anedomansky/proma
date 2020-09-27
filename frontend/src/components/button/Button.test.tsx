import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('Renders the Button component', () => {
    const { container } = render(<Button type="submit" text="Sign In" onClick={() => null} ariaLabel="Sign in" />);
    expect(container).toBeInTheDocument();
});
