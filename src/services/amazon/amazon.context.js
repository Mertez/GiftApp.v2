import React, { useState, useEffect } from "react";

import { getAsinDataRequest, getAsinDataTransform } from "./amazon.service";

export const AmazonContext = React.createContext();

export const AmazonContextProvider = ({ children }) => {
    //const [keyword, setKeyword] = useState("");
    const [asinData, setAsinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onGetAsinDataRequest = (asin) => {
        setIsLoading(true);
        console.log('onGetAsinDataRequest: ', asin);
        getAsinDataRequest(asin)
            .then(getAsinDataTransform)
            .then((result) => {
                setError(null);
                setIsLoading(false);
                setAsinData(result);
                //console.log("Categories:", result.length);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from Amazon.Context:", err);
            });
    };


    return (
        <AmazonContext.Provider
            value={{
                isLoading,
                error,

                onGetAsinDataRequest,
                asinData,

                //search: onSearch,
                //keyword,
            }}
        >
            {children}
        </AmazonContext.Provider>
    );
};