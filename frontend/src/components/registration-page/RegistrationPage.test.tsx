import React from 'react';
import { render } from '@testing-library/react';
import RegistrationPage from './RegistrationPage';

test('Renders the RegistrationPage component', () => {
    const { container } = render(<RegistrationPage />);
    expect(container).toBeInTheDocument();
});
