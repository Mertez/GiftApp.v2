import React, { useContext, useState, useEffect, useRef, createContext } from "react";

// export const GlobalVariables = {
//     apiUrl: 'http://192.168.2.104:5000/api',
//     userId: null, // Set this value when user logs in 
//     bannersAspectRatio: 2.95
// };

// export default React.createContext(GlobalVariables);

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {

    const GlobalVariables = {
        apiUrl: 'http://192.168.2.104:5000/api',
        userId: null, // Set this value when user logs in
        bannersAspectRatio: 2.95
    };

    return (
        <GlobalContext.Provider value={GlobalVariables}>
            {children}
        </GlobalContext.Provider>
    );
}