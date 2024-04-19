import React, { useState, useContext, useEffect } from "react";
import { Image, View, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import { Text } from "../../../components/typography/text.component";
import styled from 'styled-components';
import { SvgXml } from "react-native-svg";
import { ActivityIndicator, Button } from "react-native-paper";
import { WidthPercent, GetNWords } from "../../../utils/env";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { Row } from "../components/gift-info-card.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import WishlistSelector from "../../wishes/components/wishlistselector.component";
// import WishListDropDown from "../../wishes/components/wishlist-dropdown.component";
import { WishesContext } from "../../../services/wishes/wishes.context";
import { AnimatedLoading } from "../../../components/animations/loading.component";
import { BuyAGiftButton, BuyAGiftIcon, Col, Lottie } from "../components/gift-screen.styles";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Btn = styled(Button)`
  //margin:0;
  padding:0;
  margin-left: ${WidthPercent(2)}px;
  margin-right: ${WidthPercent(2)}px;
`
const W50 = styled.View`
  width: 50%;
  overflow: visible;
`

const ViewPanel = styled(View)`
    margin: 20px 20px 140px 20px;
    text-align:center;
    align-items: center;
    align-content: center; 
`

const ImgIcon = styled(Image)`
  width: 100%; height: 100%;
  border-radius: 20px; 
`
const ImgIconContainer = styled.View`
  width: ${WidthPercent(30, 10)}px;
  height: ${WidthPercent(30, 10)}px;
  border-radius: 20px; 
  margin: 10px auto;
  border: 1px solid gray;
  padding: 1px;
  
  background-color:white;
`
const ImgConfirm = styled(Image)`
  width: 120px;
  height: 38px;
  border-radius: 10px;
  margin: 10px auto;
`

export const GiftAddConfirm = ({ route, navigation }) => {
    // const {
    //     productId = null,
    //     name = "",
    //     icon = "",
    //     price = "",
    //     brand = "",
    //     amzUrl = "",
    // } = gift;

    const gift = route.params.gift;
    const isAGift = route.params.isagift;
    const [selectedWishlist, setSelectedWishlist] = useState(null);
    const [wishAdded, setWishAdded] = useState(0);

    const {
        isLoading,
        error,

        onCreateWish,
        isCreating,
        wishes,
        wish,
    } = useContext(WishesContext);


    useEffect(() => {
        setWishAdded(0);
        console.log('isAGift AddConfirm: ', isAGift);
    }, []);

    return (
        <ScrollView nestedScrollEnabled={true}>
            <ViewPanel>

                {
                    (() => {

                        if (isCreating) {

                            return (<AnimatedLoading isLoading={true} />)

                        } else if (wishAdded == 1 && selectedWishlist) {

                            return (
                                <>

                                    <Lottie
                                        style={{ width: 100, height: 100 }}
                                        key="animation"
                                        autoPlay
                                        loop
                                        resizeMode="cover"
                                        source={require("../../../../assets/anims/85185-checkmark.json")}
                                    />
                                    <Text variant="label" style={{ color: standardcolors.green, fontSize: 24 }}>Product added to {(selectedWishlist) && selectedWishlist.name} wishlist</Text>
                                    <Spacer position={"top"} size="md"></Spacer>
                                    <BuyAGiftButton mode="contained" color={"white"} onPress={() => { setWishAdded(0); navigation.goBack(); }} >
                                        <Row>
                                            {/* <BuyAGiftIcon source={require("../../../../assets/buyagift.png")} resizeMode="contain" /> */}
                                            <Col>
                                                <Text variant="button" style={{ color: "#fff" }}>❌ Close</Text>
                                                {/* <Text variant="caption">...............</Text> */}
                                            </Col>
                                        </Row>
                                    </BuyAGiftButton>
                                </>
                            )

                        } else {

                            return (
                                <>
                                    <Row>
                                        <W50><ImgIconContainer><ImgIcon source={{ uri: gift.icon }} resizeMode='contain' /></ImgIconContainer></W50>
                                        <W50>
                                            <Spacer position={"top"} size="md"></Spacer>
                                            <Text variant='label' style={{ color: 'black' }}>{GetNWords(gift.name, 9)}...</Text>
                                            <Row>
                                                <Text variant='caption' style={{ marginTop: 5 }}>by </Text><Text variant='title'>{gift.brand}</Text>
                                            </Row>
                                            <Spacer position={"top"} size="s"></Spacer>
                                            <Text variant='label' style={{ color: standardcolors.purple, fontSize: 22 }}>${gift.price}</Text></W50>
                                    </Row>


                                    <Spacer position={"top"} size="md"></Spacer>
                                    <>
                                        {(() => {

                                            if (isAGift) {
                                                return (<Text variant="label" style={{ color: standardcolors.red }}>This is a gift</Text>)
                                            } else {
                                                return (
                                                    <>
                                                        <Text variant="label" style={{ color: standardcolors.purple }}>Add this item to my {(selectedWishlist) && selectedWishlist.name} wishlist</Text>
                                                        <WishlistSelector onIconPress={(item) => { setSelectedWishlist(item); }} />

                                                        <Spacer position={"top"} size="md"></Spacer>
                                                        <Row>
                                                            <Btn mode="contained" color={"white"}
                                                                onPress={() => { setWishAdded(0); navigation.goBack(); }} >
                                                                <Text variant="label" style={{ color: standardcolors.white }}>❌ Cancel</Text>
                                                            </Btn>
                                                            {(selectedWishlist != null) &&
                                                                <Btn mode="contained" color={null}
                                                                    onPress={() => {

                                                                        if (selectedWishlist == null) { alert("Select a wishlist") } else {
                                                                            onCreateWish(gift.name, null, gift.price, gift.asin, gift.amzUrl, gift.icon, selectedWishlist.id);
                                                                            setWishAdded(1)
                                                                            //console.log(gift.name, null, gift.price, gift.asin, gift.amzUrl, gift.icon, selectedWishlist.id);
                                                                            //navigation.popToTop();
                                                                        }
                                                                    }} >
                                                                    <Text variant="label" style={{ color: standardcolors.white }}>✅ Confirm</Text>
                                                                </Btn>
                                                            }

                                                        </Row>
                                                    </>
                                                )
                                            }

                                        })()}
                                    </>


                                </>
                            )
                        }
                    })()
                }


            </ViewPanel>
        </ScrollView>
    )

}
