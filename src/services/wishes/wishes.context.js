import React, { useState, useEffect, useContext } from "react";

import { getPiggyBankRequest, getPiggyBankTransform } from "./wishes.service";

export const WishesContext = React.createContext();

export const WishesContextProvider = ({ children }) => {
    // const [keyword, setKeyword] = useState("San Francisco");
    // const [wishes, setWishes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [piggyBank, setPiggyBank] = useState(null);

    const onGetPiggyBank = () => {
        setIsLoading(true);
        getPiggyBankRequest()
            .then(getPiggyBankTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getPiggyBankRequest.Context:", err);
            });
    };

    return (
        <WishesContext.Provider
            value={{
                isLoading,
                error,
                // wishes,
                // search: onSearch,
                // keyword,

                onGetPiggyBank,
                piggyBank,
            }}
        >
            {children}
        </WishesContext.Provider>
    );
};