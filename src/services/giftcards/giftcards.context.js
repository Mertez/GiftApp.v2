import React, { useState, useEffect } from "react";

import { getAllGiftCardsRequest, getAllGiftCardsTransform } from "./giftcards.service";

export const GiftCardsContext = React.createContext();

export const GiftCardsContextProvider = ({ children }) => {
    //const [keyword, setKeyword] = useState("");
    const [giftCards, setGiftCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const onSearch = (searchKeyword) => {
    //     setIsLoading(true);
    //     setKeyword(searchKeyword);
    // };

    useEffect(() => {
        // if (!keyword.length) {
        //     // don't do anything
        //     return;
        // }
        getAllGiftCardsRequest()
            .then(getAllGiftCardsTransform)
            .then((result) => {
                setError(null);
                setIsLoading(false);
                setGiftCards(result);
                //console.log("GiftCards:", result.length);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from GiftCards.Context:", err);
            });
    }, []);

    return (
        <GiftCardsContext.Provider
            value={{
                isLoading,
                error,
                giftCards,
                //search: onSearch,
                //keyword,
            }}
        >
            {children}
        </GiftCardsContext.Provider>
    );
};