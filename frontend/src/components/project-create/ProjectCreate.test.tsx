import React from 'react';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import ProjectCreate from './ProjectCreate';

test('Renders the ProjectCreate component', () => {
    const history = createBrowserHistory();
    const { container } = render(<Router history={history}><ProjectCreate /></Router>);
    expect(container).toBeInTheDocument();
});
