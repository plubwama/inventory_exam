import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    return (
        <AppContext.Provider value={{ products, setProducts }}>
            {children}
        </AppContext.Provider>
    );
};
