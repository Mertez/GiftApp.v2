import React, { useState, createContext, useEffect, useContext } from "react";
import { LocationContext } from "../wishes/wishes.context";
import { giftsRequest, giftsTransform } from "./gift.service";

export const giftsContext = createContext();

export const giftsContextProvider = ({ children }) => {
    const [gifts, setgifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(LocationContext);

    const retrievegifts = (loc) => {
        setIsLoading(true);
        setgifts([]);
        setTimeout(() => {
            giftsRequest(loc)
                .then(giftsTransform)
                .then((results) => {
                    setIsLoading(false);
                    setgifts(results);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setError(err);
                    console.error("Error from gift.Context: ", err);
                });
        }, 1000); // wait for 1000 milisec
    };

    useEffect(() => {
        if (location) {
            const locationString = `${location.lat},${location.lng}`;
            //console.log("gift.context:", locationString);
            retrievegifts(locationString);
        }
    }, [location]);

    //console.log(gifts);

    return (
        <giftsContext.Provider
            value={{
                gifts, // equal to gifts: gifts
                isLoading,
                error,
            }}
        >
            {children}
        </giftsContext.Provider>
    );
};
