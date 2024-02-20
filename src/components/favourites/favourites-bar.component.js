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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}
            >
                {favourites.map((gift) => {
                    return (
                        <Spacer key={gift.placeId} position="right" size="xs" >
                            <TouchableOpacity onPress={() => onNavigate("gifts Detail Stack", { gift })}>
                                <CompactgiftInfo gift={gift} />
                            </TouchableOpacity>
                        </Spacer>
                    )
                })}

            </ScrollView>
        </FavouriteWrapper>
    )
}