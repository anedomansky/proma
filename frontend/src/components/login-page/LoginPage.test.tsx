import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from './LoginPage';

test('Renders the LoginPage component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><LoginPage /></Router>);
    expect(container).toBeInTheDocument();
});
