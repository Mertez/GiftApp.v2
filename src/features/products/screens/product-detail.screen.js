import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Text as Txt, ScrollView, TouchableOpacity, View, SafeAreaView, StatusBar, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { ProductCardCover, Center, OfferIconDetail } from "../components/product-card.styles";
import { BuyAGiftButton, Col, Row, BuyAGiftIcon, Space50 } from "../../gifts/components/gift-screen.styles";
import { width, host } from "../../../utils/env";


export const ProductDetailScreen = ({ route, navigation }) => {
    const { product, isGiftCard } = route.params;
    //console.log(product.hot);
    return (
        <>
            {product.hot ? (
                <OfferIconDetail source={require("../../../../assets/offer.png")} resizeMode={"contain"} />
            ) : (<></>)}
            < ScrollView >
                <Center>
                    <ProductCardCover variant="detailCover" resizeMode="contain" source={{ uri: isGiftCard ? `${host}/images/giftcards/${product.icon}` : `${host}/images/products/${product.id}/${product.icon}` }} />

                    <Text variant="title" >{`${product.name}`}</Text>
                    <Text variant="title" style={{ color: 'red' }}>${`${product.price}`}</Text>
                    <Text variant="body" style={{ color: 'purple' }}>{`${product.brand}`}</Text>
                    <BuyAGiftButton mode="contained" style={{ width: (width / 2), height: 60, marginTop: 20 }} color={false ? "white" : null} onPress={() => navigation.navigate('MainAppFeature', { extraDescription: 'You will able to buy this product for yourself or as a gift.' })} >
                        <Row>
                            <BuyAGiftIcon source={require("../../../../assets/carty.png")} resizeMode="contain" style={{ marginTop: 3, marginBottom: 0, marginRight: 10, marginLeft: 0 }} />
                            <Text variant="title" style={{ marginTop: 5, marginBottom: 0 }}>Buy it now!</Text>
                        </Row>
                    </BuyAGiftButton>
                </Center>
                <Space50 />
            </ScrollView >
        </>
    )
}
