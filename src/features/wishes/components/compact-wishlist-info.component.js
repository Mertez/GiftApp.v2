import React from "react";
import { ScrollView, TouchableOpacity, Image, View, Text as Txt, Platform, FlatList } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { CompactWishInfo } from "./compact-wish-info.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { WishListIcons } from "./wishlist-iconset.component";
import { WidthPercent } from "../../../utils/env";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { ActivityIndicator, ProgressBar, MD3Colors } from "react-native-paper";

//const imgSize = WidthPercent(18) + "px";


export const CompactWishListInfo = ({ wishlist, itemsInRow }) => {
    //console.log(wishlist.icon, WishListIcons[wishlist.icon]);
    console.log(wishlist);

    const imgSize = (100 / itemsInRow) + "%";

    const CompactImage = styled.Image`
    padding-top:10px;
    border-radius: 10px;
    width: ${imgSize};
    height:${imgSize};
    overflow: visible;
`
    const CompactWebview = styled(WebView)`
    padding-top:10px;
    border-radius: 10px;
    width:${imgSize};
    height:${imgSize};
    overflow: visible;
`;

    const Item = styled.View`
    width:${WidthPercent(28)}px;
    align-items:center;
    height:200px;
    padding-top:20px;
    background-color: white;
    border: 1px solid #FFF;
    border-radius: 10px;
    margin-top:20px;
`
    const WishProgress = styled(ProgressBar)`
  margin: 10px 0px ;
  height: 15px;
  border-radius: 10px;
  border: 3px solid ${standardcolors.pink};
  width:${WidthPercent(26)}px;
`
    // const PhotoContainer = styled(Txt)`
    //     flex: 1;
    //     margin-top: -25px;
    //     background-color:transparent;
    // `
    const isAndroid = Platform.OS === "android";

    const Image = isAndroid ? CompactWebview : CompactImage;

    //const rand = Math.floor(Math.random() * gift.photos.length);
    //gift.rating = gift.rating ? gift.rating : 4.9;
    //const rand = (50 - (gift.rating * 10));
    //console.log(gift.rating);
    return (
        <Item>
            {/* <PhotoContainer> */}
            {/* <Image source={{ uri: wish.SourceImageUrl }} resizeMode="cover" preserveAspectRatio="xMidYMid slice" /> */}
            {/* </PhotoContainer> */}

            <Image source={WishListIcons[wishlist.icon]} resizeMode="cover" preserveAspectRatio="xMidYMid slice" />
            <Spacer variant="left.large">
                <Text variant="title" style={{ color: 'gray', textAlign: 'center' }}>{wishlist.name}</Text>
                <Text style={{ color: 'red', textAlign: 'center', marginTop: -5, marginBottom: -2 }}>${wishlist.price}</Text>
            </Spacer>

            <WishProgress progress={wishlist.price === 0 ? 0 : Math.random()} color={standardcolors.t10} />
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {wishlist.wishes.map((wish, index) => {
                    const key = wish.id;
                    return (
                        <Spacer key={"Spacer" + key} position="left" size="md">
                            <TouchableOpacity key={"TouchableOpacity" + key}
                            // onPress={() =>
                            //     onNavigate("productDetailStack", {
                            //         product: product, isGiftCard: false
                            //     })
                            // }
                            >
                                <CompactWishInfo key={"CompactWishInfo" + key} wish={wish} variant="barHot" variantCover="barHotCover" />

                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView> */}
        </Item>
    )
}

