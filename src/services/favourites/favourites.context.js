import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from "../authentication/authectication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {

    const { user } = createContext(AuthenticationContext);
    const [favourites, setFavourites] = useState([]);

    const saveFavourites = async (value, uid) => {
        //console.log(uid);
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
            console.log("error storing", e);
        }
    };

    const loadFavourites = async (uid) => {
        //console.log(uid);
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (value !== null) {
                setFavourites(JSON.parse(value));
            }
        } catch (e) {
            console.error("error loading", e);
        }
    };

    const add = (gift) => {
        setFavourites([...favourites, gift]);
    }

    const remove = (gift) => {
        const newFavourites = favourites.filter((t) => t.placeId !== gift.placeId);
        setFavourites(newFavourites);
    }

    useEffect(() => {
        if (user)
            loadFavourites(user.userId);
    }, [user]);

    useEffect(() => {
        if (user)
            saveFavourites(favourites, user.userId);
    }, [favourites, user]);

    return (
        <FavouritesContext.Provider value={{
            favourites,
            addToFavourites: add,
            removeFromFavourites: remove
        }}>
            {children}
        </FavouritesContext.Provider>
    )
}