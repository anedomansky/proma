import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('Renders the Button component', () => {
    const { container } = render(<Button type="submit" onClick={() => null} ariaLabel="Sign in"><span>Sign In</span></Button>);
    expect(container).toBeInTheDocument();
});
