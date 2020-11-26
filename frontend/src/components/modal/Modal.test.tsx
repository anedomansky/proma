import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('Renders the Modal component', () => {
    const { container } = render(<Modal show text="Test" cancel={() => null} confirm={() => null} />);
    expect(container).toBeInTheDocument();
});
