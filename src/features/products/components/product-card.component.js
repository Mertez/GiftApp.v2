import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";
import { Row } from "../../gifts/components/gift-screen.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { host } from "../../../utils/env";

import {
    ProductCard,
    ProductCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    Icon,
    Address,
    OfferIconCol2,
    OfferIconList,
} from "./product-card.styles";

export const ProductInfoCard = ({ navigation, product = {}, variant, variantCover }) => {
    const {
        id,
        name,
        icon,
        price,
        brand,
        hot,
        type,
    } = product;

    //console.log("ProductInfoCard", variant, variantCover);
    //var imgUrl = (type == "OnlineDeals") ? product.icon : `${host}/images/products/${id}/${icon}`;

    if (type == "OnlineDeals") {

        return (
            <ProductCard variant={variant} elevation={2}>
                <Row>
                    <View>
                        <ProductCardCover variant={variantCover} resizeMode="contain" source={{ uri: icon }} />
                        {
                            hot ? (
                                <OfferIconList source={require("../../../../assets/offer.png")} resizeMode={"contain"} />
                            ) : (<></>)
                        }
                    </View>
                    <Info>
                        <Text variant="caption" style={{ textAlign: 'center', color: 'black' }}>{name}</Text>
                        {/* <Text variant="label" style={{ textAlign: 'center', color: 'red' }}>${price}</Text> */}
                        <Text variant="caption" style={{ textAlign: 'center' }}>{brand}</Text>
                    </Info>
                </Row>
            </ProductCard>
        );

    } else {

        return (
            <ProductCard variant={variant} elevation={2}>
                <View>
                    <ProductCardCover variant={variantCover} resizeMode="contain" source={{ uri: `${host}/images/products/${id}/${icon}` }} />
                    {
                        hot ? (
                            <OfferIconCol2 source={require("../../../../assets/offer.png")} resizeMode={"contain"} />
                        ) : (<></>)
                    }
                </View>
                <Info>
                    <Text variant="caption" style={{ textAlign: 'center', color: 'black' }}>{name}</Text>
                    <Text variant="label" style={{ textAlign: 'center', color: 'red' }}>${price}</Text>
                    <Text variant="caption" style={{ textAlign: 'center' }}>{brand}</Text>
                </Info>
            </ProductCard>
        )
    }

};
