import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Registration from './Registration';

test('Renders the Registration component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><Registration /></Router>);
    expect(container).toBeInTheDocument();
});
