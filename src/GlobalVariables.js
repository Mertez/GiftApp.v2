import React, { useContext, useState, useEffect, useRef, createContext } from "react";
import { host } from "./utils/env";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {

    console.log("host: ", host);
    const GlobalVariables = {
        apiUrl: host,
        userId: null, // Set this value when user logs in
        bannersAspectRatio: 2.95
    };

    return (
        <GlobalContext.Provider value={GlobalVariables}>
            {children}
        </GlobalContext.Provider>
    );
}