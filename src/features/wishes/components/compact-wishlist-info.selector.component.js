import React from "react";
import { ScrollView, TouchableOpacity, Image, View, Text as Txt, Platform, FlatList } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { CompactWishInfo } from "./compact-wish-info.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { WishListIcons } from "./wishlist-iconset.component";
import { WidthPercent } from "../../../utils/env";

//const imgSize = WidthPercent(18) + "px";


export const CompactWishListSelector = ({ wishlist, itemsInRow, style }) => {
    //console.log(wishlist.icon, WishListIcons[wishlist.icon]);

    const imgSize = (300 / itemsInRow) + "%";

    const CompactImage = styled.Image`
    padding-top:10px;
    border-radius: 10px;
    width: ${imgSize};
    height:${imgSize};
    
`
    const CompactWebview = styled(WebView)`
    padding-top:10px;
    border-radius: 10px;
    width:${imgSize};
    height:${imgSize};
    
`;
    const Item = styled.View`
    width:${WidthPercent(100 / itemsInRow)}px;
    align-items:center;
    height:${WidthPercent(25)}px;
    align:center;
    border: 0px solid #FFF;
    border-radius: 15px;
    margin:2px;
    padding: 10px 0px 0px;
`

    // const PhotoContainer = styled(Txt)`
    //     flex: 1;
    //     margin-top: -25px;
    //     background-color:transparent;
    // `
    const isAndroid = Platform.OS === "android";

    const Image = isAndroid ? CompactWebview : CompactImage;

    return (
        <Item style={{ ...style }}>
            <Image source={WishListIcons[wishlist.icon]} resizeMode="cover" preserveAspectRatio="xMidYMid slice" />
            <Spacer variant="left.large">
                <Text variant="caption" style={{ color: 'gray' }}>{wishlist.name}</Text>
            </Spacer>
        </Item >
    )
}

