import { render } from '@testing-library/react';
import React from 'react';
import ProjectCreatePage from './ProjectCreatePage';

test('Renders the ProjectCreatePage component', () => {
    const { container } = render(<ProjectCreatePage />);
    expect(container).toBeInTheDocument();
});
