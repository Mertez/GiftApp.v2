import React, { useContext } from "react";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 140px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ gift }) => {
    const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);
    const isFavourite = favourites.find(r => r.placeId === gift.placeId);

    return (
        <>
            <FavouriteButton
                onPress={() => !isFavourite ? addToFavourites(gift) : removeFromFavourites(gift)}
            >
                <AntDesign
                    name={isFavourite ? "heart" : "hearto"}
                    size={isFavourite ? 28 : 24}
                    color={isFavourite ? "#FF0000" : "#FFFFFFAA"}
                />
            </FavouriteButton>
        </>
    );
}