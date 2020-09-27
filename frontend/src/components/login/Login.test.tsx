import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from './Login';

test('Renders the Login component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><Login /></Router>);
    expect(container).toBeInTheDocument();
});
