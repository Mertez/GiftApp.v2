import React, { useContext } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

import { FavouritesContext } from "../../../services/favourites/favourites.context";

//import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { giftList } from "../../gifts/components/gift-list.styles";
import { giftInfoCard } from "../../gifts/components/gift-info-card.component";

const NoFavouritesArea = styled(View)`
  align-items: center;
  justify-content: center;
  padding-top:30px;
`;
export const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ? (
        <>
            <giftList
                data={favourites}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("gifts Detail Stack", {
                                    gift: item,
                                })
                            }
                        >
                            <Spacer position="bottom" size="large">
                                <giftInfoCard gift={item} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </>
    ) : (
        <NoFavouritesArea>
            <Text center>No favourites yet</Text>
        </NoFavouritesArea>
    );
};