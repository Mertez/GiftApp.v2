import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform, Alert } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { WishListIcons } from "./wishlist-iconset.component";
import { WidthPercent } from "../../../utils/env";
import { ActivityIndicator, ProgressBar, MD3Colors } from "react-native-paper";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { WishesContext } from "../../../services/wishes/wishes.context";
import Toast from 'react-native-toast-message';

const CompactImage = styled.Image`
    padding-top:10px;
    border-radius: 10px;
    width:80%;
    height:60%;
    overflow: visible;
    background-color:transparent;
`
const CompactWebview = styled(WebView)`
    padding-top:10px;
    border-radius: 10px;
    width:90%;
    height:80%;
    overflow: visible;
    background-color:red;
`;
const Item = styled.View`
    width:${WidthPercent(42)}px;
    margin:${WidthPercent(1)}px;
    align-items:center;
    height:${WidthPercent(50)}px;
    padding:10px;
    background-color: white;
    border: 1px solid #FFF;
    border-radius: 5px;
`
const Caption = styled(Text)`
    flex:.5;
    padding:2px 10px;
    background-color:transparent;
    text-align:center;
    margin-top:0px;
`
const Price = styled(Text)`
    flex:1;
    padding:2px 10px;
    background-color:transparent;
    text-align:center;
    margin-top:0px;
    color:red;
    font-size:18px;
    line-height:28px;
`
const WishProgress = styled(ProgressBar)`
  margin: 10px 0px;
  height: 15px;
  border-radius: 10px;
  border: 3px solid ${standardcolors.pink};
  width:${WidthPercent(37)}px;
`

const Gift = styled(View)`
    position: absolute;
    z-index:99999;
    width: 50px; 
    height: 50px;
    padding: 5px;
    text-align:center;
    margin-top:-5px;
    left:135px;
    background-color: ${standardcolors.t100}66;
    border-radius: 50%;
`
const GiftText = styled(Txt)`
    text-align:center;
    font-size: 30px;
`

// const PhotoContainer = styled(Txt)`
//     flex: 1;
//     margin-top: -25px;
//     background-color:transparent;
// `
const isAndroid = Platform.OS === "android";

export const CompactWishInfo = ({ wish, onWishRemoved }) => {

    const {
        isLoading: isLoadingWish,
        error,
        wishes,
        search: onSearch,
        keyword,

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
        onCreateWish,
        isCreating,

        onUpdateWish,
        onDeleteWish,
    } = useContext(WishesContext);

    const confirmDeleteItem = (id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to remove this item?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        onDeleteWish(wish.id);
                        onWishRemoved(wish.id);
                        Toast.show({
                            type: 'success',
                            text1: 'Item Removed',
                            text2: 'The item has been removed successfully',
                        });
                    }
                }
            ],
            { cancelable: true }
        );
    };


    const Img = isAndroid ? CompactWebview : CompactImage;
    //console.log(wish);
    //const rand = Math.floor(Math.random() * gift.photos.length);
    //gift.rating = gift.rating ? gift.rating : 4.9;
    //const rand = (50 - (gift.rating * 10));
    //console.log(gift.rating);
    return (

        <Item>
            {/* <PhotoContainer> */}
            {
                (wish.isAGift) && <><Gift><GiftText>🎁</GiftText></Gift></>

            }
            {/* ((wish.isAGift) && <><Txt>🎁</Txt></>) */
                (!wish.isAGift) && <><Gift><GiftText>

                    <TouchableOpacity key={"TouchableOpacity" + wish.id}
                        onPress={() =>
                            confirmDeleteItem(wish.id)
                        }
                    ><Text style={{ color: 'red', marginLeft: 10, marginTop: 8 }}>❌</Text>

                    </TouchableOpacity>

                </GiftText></Gift></>
            }
            <Img source={{ uri: wish.sourceImageUrl }} resizeMode="contain" preserveAspectRatio="xMidYMid slice" />
            {/* </PhotoContainer> */}
            <Caption variant="caption" numberOfLines={1} style={{ color: 'black' }}>{wish.name}</Caption>
            <Price numberOfLines={2}>${wish.currentPrice}</Price>
            {/* <WishProgress progress={Math.random()} color={standardcolors.t10} /> */}
        </Item>
    )
}