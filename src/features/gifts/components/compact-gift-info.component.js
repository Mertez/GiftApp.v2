import React from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";

const CompactImage = styled.Image`
    padding-top:10px;
    border-radius: 10px;
    width:120px;
    height:80px;
    overflow: visible;
`


const CompactWebview = styled(WebView)`
    padding-top:10px;
    border-radius: 10px;
    width:120px;
    height:80px;
    overflow: visible;
`;

const Item = styled.View`
    width:140px;
    align-items:center;
    height:135px;
    padding-top:10px;
    background-color: white;
    border: 1px solid #FFF;
    border-radius: 5px;
`
const Caption = styled(Text)`
    flex:.5;
    padding-top:10px;
    background-color:transparent;
    text-align:center;
`
// const PhotoContainer = styled(Txt)`
//     flex: 1;
//     margin-top: -25px;
//     background-color:transparent;
// `
const isAndroid = Platform.OS === "android";

export const CompactgiftInfo = ({ gift }) => {
    //console.log(gift.photos[0]);

    const Image = isAndroid ? CompactWebview : CompactImage;

    //const rand = Math.floor(Math.random() * gift.photos.length);
    gift.rating = gift.rating ? gift.rating : 4.9;
    //const rand = (50 - (gift.rating * 10));
    //console.log(gift.rating);
    return (
        <Item>
            {/* <PhotoContainer> */}
            <Image source={{ uri: gift.photos[0] }} resizeMode="cover" preserveAspectRatio="xMidYMid slice" />
            {/* </PhotoContainer> */}
            <Caption variant="caption" numberOfLines={3}>{gift.name}</Caption>
        </Item>
    )
}