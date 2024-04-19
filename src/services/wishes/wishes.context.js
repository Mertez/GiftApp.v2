import React, { useState, useEffect, useContext } from "react";

import {
    getPiggyBankRequest,
    getPiggyBankTransform,

    getWishListsRequest,
    getWishListsTransform,
    getMyWishListsRequest,
    getMyWishListsTransform,
    createWishListRequest,
    createWishListTransform,
    updateWishListRequest,
    updateWishListTransform,
    deleteWishListRequest,
    deleteWishListTransform,

    getWishesRequest,
    getWishesTransform,
    createWishRequest,
    createWishTransform,
    updateWishRequest,
    updateWishTransform,
    deleteWishRequest,
    deleteWishTransform,
} from "./wishes.service";

export const WishesContext = React.createContext();

export const WishesContextProvider = ({ children }) => {
    // const [keyword, setKeyword] = useState("San Francisco");
    // const [wishes, setWishes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const [piggyBank, setPiggyBank] = useState(null);
    const [wishLists, setWishLists] = useState(null);
    const [myWishLists, setMyWishLists] = useState(null);
    const [wishes, setWishes] = useState(null);
    const [wish, setWish] = useState(null);

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

    const onGetWishLists = () => {
        setIsLoading(true);
        getWishListsRequest()
            .then(getWishListsTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                setWishLists(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from createWishListRequest.Context:", err);
            });
    };

    const onGetMyWishLists = (getListOnly) => {
        setIsLoading(true);
        getMyWishListsRequest(getListOnly)
            .then(getMyWishListsTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                setMyWishLists(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from createWishListRequest.Context:", err);
            });
    };

    const onCreateWishList = (name, icon) => {
        setIsLoading(true);
        createWishListRequest(name, icon)
            .then(createWishListTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                //setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from createWishListRequest.Context:", err);
            });
    };

    const onUpdateWishList = (id, name) => {
        setIsLoading(true);
        updateWishListRequest(id, name)
            .then(updateWishListTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                //setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from updateWishListRequest.Context:", err);
            });
    };

    const onDeleteWishList = (id) => {
        setIsLoading(true);
        deleteWishListRequest(id)
            .then(deleteWishListTransform)
            .then((result) => {
                //console.log("result from context: ", result);
                setError(null);
                setIsLoading(false);
                //setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from createWishListRequest.Context:", err);
            });
    };



    const onGetWishes = (userId, wishlistId) => {
        setIsLoading(true);
        getWishesRequest(userId, wishlistId)
            .then(getWishesTransform)
            .then((result) => {
                console.log("result from getWishesRequest.Context: ", result);
                setError(null);
                setIsLoading(false);
                setWishes(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from getWishesRequest.Context:", err);
            });
    };

    const onCreateWish = (name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId) => {
        setIsCreating(true);
        createWishRequest(name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId)
            .then(createWishTransform)
            .then((result) => {
                //console.log("result from createWishRequest.Context: ", result);
                setError(null);
                setIsCreating(false);
                setWish(result);
            })
            .catch((err) => {
                setIsCreating(false);
                setError(err);
                console.error("Error from createWishRequest.Context:", err);
            });
    };

    const onUpdateWish = (id, name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId) => {
        setIsLoading(true);
        updateWishRequest(id, name, productId, currentPrice, amazonAsin, sourceUrl, sourceImageUrl, wishlistId)
            .then(updateWishTransform)
            .then((result) => {
                console.log("result from updateWishRequest.Context: ", result);
                setError(null);
                setIsLoading(false);
                //setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from updateWishRequest.Context:", err);
            });
    };

    const onDeleteWish = (id) => {
        setIsLoading(true);
        deleteWishRequest(id)
            .then(deleteWishTransform)
            .then((result) => {
                console.log("result from deleteWishTransform.Context: ", result);
                setError(null);
                setIsLoading(false);
                //setPiggyBank(result.result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
                console.error("Error from deleteWishTransform.Context:", err);
            });
    };

    return (
        <WishesContext.Provider
            value={{
                isLoading,
                error,

                onGetPiggyBank,
                piggyBank,

                onGetWishLists,
                wishLists,

                onGetMyWishLists,
                myWishLists,

                onCreateWishList,
                onUpdateWishList,
                onDeleteWishList,

                onGetWishes,
                wishes,

                onCreateWish,
                isCreating,
                wish,

                onUpdateWish,
                onDeleteWish,
            }}
        >
            {children}
        </WishesContext.Provider>
    );
};