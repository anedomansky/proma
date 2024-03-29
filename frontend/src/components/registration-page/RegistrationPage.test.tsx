import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

test('Renders the RegistrationPage component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><RegistrationPage /></Router>);
    expect(container).toBeInTheDocument();
});
