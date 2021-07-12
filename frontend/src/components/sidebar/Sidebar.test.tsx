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

test('Renders in small window', () => {
    const history = createBrowserHistory();

    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
    });

    window.dispatchEvent(new Event('resize'));

    const { getByAltText } = render(<Router history={history}><Sidebar /></Router>);

    expect(window.innerWidth).toBe(500);
    expect(getByAltText('Expand menu')).toBeInTheDocument();
});

test('Expands the Sidebar', () => {
    const history = createBrowserHistory();

    const { getByAltText, getByText } = render(<Router history={history}><Sidebar /></Router>);

    getByAltText('Expand menu').click();

    expect(getByAltText('Collapse menu')).toBeInTheDocument();
    expect(getByText('No Projects available!')).toBeInTheDocument();
});

test('Collapses the Sidebar', () => {
    const history = createBrowserHistory();

    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
    });

    window.dispatchEvent(new Event('resize'));

    const { getByAltText } = render(<Router history={history}><Sidebar /></Router>);

    getByAltText('Collapse menu').click();

    expect(window.innerWidth).toBe(800);
    expect(getByAltText('Expand menu')).toBeInTheDocument();
});
