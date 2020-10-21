import React from 'react';
import storesContext from '../contexts/index';

const useStores = () => React.useContext(storesContext);

export default useStores;
