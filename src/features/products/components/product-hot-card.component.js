import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { host } from "../../../utils/env";

import {
    ProductHotCard,
    ProductHotCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    OfferIcon,
    Icon,
    Address,
} from "./product-card.styles";

export const ProductHotCardShow = ({ product = {}, variant = '', variantCover = '' }) => {
    const {
        id = "",
        name = "",
        icon = "",
        price = 0,
        brand = "",
        hot = false
    } = product;

    return (
        <ProductHotCard variant={variant} elevation={2}  >
            <View>
                {/* <Favourite restaurant={restaurant} /> */}

                <ProductHotCardCover variant={variantCover} key={`p${id}`} source={{ uri: `${host}/images/products/${id}/t${icon}` }} resizeMode={"contain"} />
                <OfferIcon key={`o${id}`} source={require("../../../../assets/offer.png")} resizeMode={"contain"} />
            </View>
            <Info>
                <Text variant="caption" style={{ textAlign: 'center', color: 'black' }}>{name}</Text>

                <Text variant="caption" style={{ textAlign: 'center', color: 'gray' }}>{brand}</Text>
                <Text variant="caption" style={{ textAlign: 'center', color: 'red' }}>${price}</Text>
                <Section>
                    <Rating>
                        {/* {ratingArray.map((_, i) => (
                            <SvgXml
                                key={`star-${name}-${i}`}
                                xml={star}
                                width={20}
                                height={20}
                            />
                        ))} */}
                    </Rating>
                    <SectionEnd>
                        {/* {isClosedTemporarily && (
                            <Text variant="error">CLOSED TEMPORARILY</Text>
                        )}
                        <Spacer position="left" size="large">
                            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
                        </Spacer> */}
                        {/* <Spacer position="left" size="large">
                            <Icon source={{ uri: icon }} />
                        </Spacer> */}
                    </SectionEnd>
                </Section>
                {/* <Address>{name}</Address> */}
            </Info>
        </ProductHotCard>
    );
};
