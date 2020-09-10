import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import routes from '../../routes';
import './App.scss';

const App: React.FC = () => (
    <div className="content" role="application">
        <BrowserRouter>
            <Header />
            <Sidebar />
            <main>
                {renderRoutes(routes)}
            </main>
        </BrowserRouter>
    </div>
);

export default App;
