import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { CompactgiftInfo } from "../../features/gifts/components/compact-gift-info.component";
import { Spacer } from "../spacer/spacer.component";

const FavouriteWrapper = styled.View`
    padding:10px;
`

export const FavouritesBar = ({ favourites, onNavigate }) => {
    return (
        <FavouriteWrapper>
            <ScrollView nestedScrollEnabled={true} horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}
            >
                {favourites.map((gift, index) => {
                    return (
                        <Spacer key={"Spacer" + gift.placeId + "_" + index} position="right" size="xs" >
                            <TouchableOpacity key={"TouchableOpacity" + gift.placeId + "_" + index} onPress={() => onNavigate("gifts Detail Stack", { gift })}>
                                <CompactgiftInfo gift={gift} key={"CompactgiftInfo" + gift.placeId + "_" + index} />
                            </TouchableOpacity>
                        </Spacer>
                    )
                })}

            </ScrollView>
        </FavouriteWrapper>
    )
}