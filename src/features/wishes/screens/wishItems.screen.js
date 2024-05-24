import React, { useContext, useState, useEffect } from "react";
import { ScrollView, RefreshControl, View, TouchableOpacity, Image, Share, Modal, StyleSheet } from "react-native";
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
import { BlurView } from "expo-blur";

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
    var showBadge = params.ShowBadge;
    var totalValue = wishlist.price;
    var paidValue = Math.round(wishlist.price * percent * 100) / 100;
    const [giftAmount, setGiftAmout] = useState(100);
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const shareContent = async () => {
        simpleHaptic();
        try {
            var wishlistName = wishlist.name;
            var wishlistCode = wishlist.id;
            const result = await Share.share({
                message: `Hey, this is my ${wishlistName} wishlist!\r\n`,
                // You can also add a URL
                url: `https://gift.app/wishlist/share/${wishlistCode}`,
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
            {!showBadge && <Spacer position="bottom" size="md">
                <BuyAGiftButton mode="contained" color={"white"} onPress={() => {
                    //navigation.navigate("CreditCardPaymentStack", { giftAmount, email }) 
                    setModalVisible(true);
                }} style={{ margin: 0, padding: 0 }}>
                    <Row>

                        <BuyAGiftIcon source={require("../../../../assets/buyagift.png")} resizeMode="contain" />

                        <Col><Text variant="button" style={{ color: "#fff", fontSize: 12 }}>Buy something for</Text>
                            <Text variant="button" style={{ color: "#fff", fontSize: 22 }}>{wishlist.name}</Text></Col>

                    </Row>
                </BuyAGiftButton></Spacer>


            }

            {modalVisible && (
                <Modal transparent={true} animationType="fade" visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.circularButton}
                            //onPress={() => handleNavigate('Page1')}
                            >
                                <Text style={styles.buttonText}>By PiggyBank</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circularButton}
                                onPress={() => { setModalVisible(false); navigation.navigate("CreditCardPaymentStack", { giftAmount, email }) }}
                            //onPress={() => handleNavigate('Page2')}
                            >
                                <Text style={styles.buttonText}>By Credit Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circularButton}

                            >
                                <Text style={styles.buttonText}>Buy a Giftcard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circularButton, { color: 'white' }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText, { fontSize: 40 }}>🔙</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <ScrollView style={{ flex: 1 }}>


                <WishItems wishItems={wishlist.wishes} onIconPress={(item) => {
                    //console.log(item); 
                    navigation.navigate('MainAppFeature', { extraDescription: `This product name is "${item.name}" and it costs about $${item.currentPrice}, You will able to view this product's detail, move it to another wishlist, buy this gift or completely remove it from the wish list.` });
                }} />
            </ScrollView >

            {
                wishlist.wishes.length === 0 ? (
                    <Text>No images to display</Text>
                ) : (

                    <View style={{ flex: .6 }}>

                        <WishProgress progress={wishlist.price === 0 ? 0 : percent} color={standardcolors.t10} />
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 25, padding: 0, margin: 0 }}>{formatCurrency(paidValue)}  <AnimatedText />  {formatCurrency(totalValue)}</Text>
                        {/* <RandomImagesComponent /> */}
                        <RandomPersonComponent totalAmount={paidValue} showBadge={showBadge} />
                    </View>
                )
            }

        </>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
    },
});