import React, { useContext, useState, useEffect } from "react";
import { ScrollView, RefreshControl, View, TouchableOpacity, Image, Share } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { host, height, width, bannerHeight, WidthPercent, formatCurrency } from "../../../utils/env";
import { HomeHeaderBanner } from "../../../components/banner/banners.component";
import { PiggyBank } from "../../../components/piggyBank/piggyBank.component";
import { WishesContext } from "../../../services/wishes/wishes.context";
import CreateWishListModalForm from "../components/createWishListModalForm.component";
import { CompactWishListInfo } from "../components/compact-wishlist-info.component";
import { BuyAGiftButton, BuyAGiftIcon } from "../../gifts/components/gift-screen.styles";
import { Row, Col } from "../../gifts/components/gift-screen.styles";
import { WishLists } from "../components/wishlists.component";
import { AnimatedLoading } from "../../../components/animations/loading.component";
import { WishItems } from "../components/wishes.component";
import { WishListIcons } from "../components/wishlist-iconset.component";
import { Ionicons } from "@expo/vector-icons";
import { simpleHaptic } from "../../../utils/haptic";
import { RandomPersonComponent } from "../../account/components/getrandomimages.component";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { AnimatedText } from "../../../components/animations/animatedtext.component";

const Header = styled.View`
  background-color: white;
  content-align:center;
  width: 100%;
  padding: 15px;
  margin-bottom:10px;
`

const WishProgress = styled(ProgressBar)`
  margin: 10px ${WidthPercent(10)}px 20px ${WidthPercent(10)}px;
  height: 15px;
  border-radius: 10px;
  border: 3px solid ${standardcolors.pink};
  width:${WidthPercent(80)}px;
`


export const WishItemsScreen = ({ route, navigation }) => {

    var params = route.params;
    var wishlist = params.Wistlist;
    var percent = params.Percent;
    var totalValue = wishlist.price;
    var paidValue = Math.round(wishlist.price * percent * 100) / 100;

    const shareContent = async () => {
        simpleHaptic();
        try {
            var wishlistName = wishlist.name;
            var wishlistCode = wishlist.id;
            const result = await Share.share({
                message: `Hey, this is my ${wishlistName} wishlist!\r\n`,
                // You can also add a URL
                url: `https://giftapp.com/wishlist/share/${wishlistCode}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    //console.log(wishlist.icon);

    return (
        <>
            <Header>
                <Row>
                    <Col><Image style={{ width: 50, height: 50 }} source={WishListIcons[wishlist.icon]} resizeMode="cover" preserveAspectRatio="xMidYMid slice" /></Col>
                    <Col>
                        <Spacer variant="left.large">

                            <TouchableOpacity onPress={shareContent}>
                                <Row>
                                    <Text variant="title" style={{ color: 'gray' }}>{wishlist.name} </Text>
                                    <Ionicons name="share-outline" size={24} color="#000" />
                                </Row>

                            </TouchableOpacity>
                        </Spacer>
                    </Col>
                </Row>
            </Header>

            <ScrollView style={{ flex: 1 }}>
                <WishItems wishItems={wishlist.wishes} onIconPress={(item) => {
                    //console.log(item); 
                    navigation.navigate('MainAppFeature', { extraDescription: `This product name is "${item.name}" and it costs about $${item.currentPrice}, You will able to view this product's detail, move it to another wishlist, buy this gift or completely remove it from the wish list.` });
                }} />
            </ScrollView>

            {wishlist.wishes.length === 0 ? (
                <Text>No images to display</Text>
            ) : (

                <View style={{ flex: .6 }}>
                    <WishProgress progress={wishlist.price === 0 ? 0 : percent} color={standardcolors.t10} />
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 25, padding: 0, margin: 0 }}>{formatCurrency(paidValue)}  <AnimatedText />  {formatCurrency(totalValue)}</Text>
                    {/* <RandomImagesComponent /> */}
                    <RandomPersonComponent totalAmount={paidValue} />
                </View>
            )}

        </>

    )

}