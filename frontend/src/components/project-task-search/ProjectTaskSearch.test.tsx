import React from 'react';
import { render } from '@testing-library/react';
import ProjectTaskSearch from './ProjectTaskSearch';

test('Renders the ProjectTaskSearch component', () => {
    const { container } = render(<ProjectTaskSearch />);
    expect(container).toBeInTheDocument();
});
