import React, { useState, createContext, useEffect, useContext } from "react";
//import { LocationContext } from "../wishes/wishes.context";
import {
    giftsRequest,
    giftsTransform,
    getPersonToBuyGiftCategoriesRequest,
    getPersonToBuyGiftCategoriesTransform
} from "./gift.service";

export const GiftsContext = createContext();

export const GiftsContextProvider = ({ children }) => {
    const [gifts, setgifts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [personToBuyGiftCategories, setPersonToBuyGifCategories] = useState(null);

    //const { location } = useContext(LocationContext);

    // const retrievegifts = (loc) => {
    //     setIsLoading(true);
    //     setgifts([]);
    //     setTimeout(() => {
    //         giftsRequest(loc)
    //             .then(giftsTransform)
    //             .then((results) => {
    //                 setIsLoading(false);
    //                 setgifts(results);
    //             })
    //             .catch((err) => {
    //                 setIsLoading(false);
    //                 setError(err);
    //                 console.error("Error from gift.Context: ", err);
    //             });
    //     }, 1000); // wait for 1000 milisec
    // };


    const onGetPersonToBuyGiftCategories = (personDescription) => {
        //console.log("onGetPersonToBuyGiftCategories input:", personDescription);
        setIsLoading(true);
        getPersonToBuyGiftCategoriesRequest(personDescription)
            //.then(getPersonToBuyGiftCategoriesTransform)
            .then((result) => {
                console.log("onGetPersonToBuyGiftCategories", result);
                setError(null);
                setIsLoading(false);
                setPersonToBuyGifCategories(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from onGetPersonToBuyGiftCategories.Context:", err);
            });
    };

    // useEffect(() => {
    //     if (location) {
    //         const locationString = `${location.lat},${location.lng}`;
    //         //console.log("gift.context:", locationString);
    //         retrievegifts(locationString);
    //     }
    // }, [location]);

    //console.log(gifts);

    return (
        <GiftsContext.Provider
            value={{

                isLoading,
                error,

                onGetPersonToBuyGiftCategories,
                personToBuyGiftCategories,
                //gifts, // equal to gifts: gifts
            }}
        >
            {children}
        </GiftsContext.Provider>
    );
};
