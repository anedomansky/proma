import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Sidebar from './Sidebar';

test('Renders the Sidebar component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><Sidebar /></Router>);
    expect(container).toBeInTheDocument();
});
