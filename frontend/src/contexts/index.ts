import React from 'react';
import UserStore from '../stores/UserStore';

const storesContext = React.createContext({
    userStore: new UserStore(),
});

export default storesContext;
