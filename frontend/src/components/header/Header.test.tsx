import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from './Header';

test('Renders the Header component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><Header /></Router>);
    expect(container).toBeInTheDocument();
});
