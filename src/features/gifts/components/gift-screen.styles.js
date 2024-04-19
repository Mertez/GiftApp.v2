import React from "react";
import { ActivityIndicator, Image, View, Text as Txt, FlatList, Button as Btn } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import LottieView from "lottie-react-native";
import { TextInput, Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { WidthPercent } from "../../../utils/env";
//import Button from "../../../components/controls/Button";

export const GiftFormButton = styled(Button).attrs({
  color: colors.brand.muted,
})`
  padding: ${(props) => props.theme.spaces[2]};
  margin: ${(props) => props.theme.spaces[1]};
`;

export const GiftFormInput = styled(TextInput)`
  width: 300px;
`;

export const Lottie = styled(LottieView)`
    width: 70%;
    margin: 0px auto auto auto;
`

export const BuyAGiftButton = styled(Button)`
  //margin:0;
  padding:0;
  margin-left: ${WidthPercent(2)}px;
  margin-right: ${WidthPercent(2)}px;
`
export const BuyAGiftIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin-left:-5px;
  padding-left:0;
`
export const BuyAGiftIconS = styled.Image`
  width: 30px;
  height: 30px;
  margin-left:-3px;
  margin-top:5px;
  padding-left:0;
`
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Col = styled.View`
  //flex-direction: colum;
  text-align:center;
  justify-content: space-between;

`

export const BuyAGiftSection = styled.View`
    margin-top: 20px;
    height:100px;
    flex-direction: row;
`

export const Space50 = styled.View`
    margin-top:10px;
    width: 46%;
    padding: ${(props) => props.theme.spaces[0]};
    margin-left: ${WidthPercent(2)}px;
    margin-right: ${WidthPercent(2)}px;
    height: 80px;
`

export const Space50R = styled.View`
    width: 46%;
    padding: ${(props) => props.theme.spaces[2]};
    margin-left: ${WidthPercent(4)}px;
    height: 80px;
    border: 1px solid #ccc;
    border-radius:5px;
    background-color: #fcfcfc;
`

export const Space50L = styled.View`
    width: 46%;
    padding: ${(props) => props.theme.spaces[0]};
    margin-left: ${WidthPercent(2)}px;
    height: 80px;
    background-color:transparent;
`

export const giftList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 12,
    paddingTop: 5,
  }
})`
  marginBottom: ${(props) => props.theme.spaces[2]};
`;

export const SearchResult = styled(View)`
`

export const LoadingIndicator = styled(ActivityIndicator)`
  margin-left: -25px;
  top: 50%;
  left: ${WidthPercent(50, -25)}px;
  z-index: 1000;
  position: absolute;
`

export const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: ${WidthPercent(50, -25)}px;
  z-index: 1000;
`