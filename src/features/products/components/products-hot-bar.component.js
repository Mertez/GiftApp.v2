import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductHotCardShow } from "./product-hot-card.component";
import { Text } from "../../../components/typography/text.component";

import { IgnoreWarnings } from "../../../utils/env";

const ProductsWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  height:220px;
`;
export const ProductsHotBar = ({ products, onNavigate }) => {

    IgnoreWarnings();

    if (products === null)
        return null;
    if (!products.length) {
        return null;
    }
    return (
        <ProductsWrapper elevation={5}>
            <Spacer variant="left.large">
                <Text variant="caption">Hot Products of the week</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product) => {
                    const key = product.id;
                    return (
                        <Spacer key={key} position="left" size="md">
                            <TouchableOpacity
                                onPress={() =>
                                    onNavigate("productDetailStack", {
                                        product: product, isGiftCard: false
                                    })
                                }
                            >
                                <ProductHotCardShow product={product} variant="barHot" variantCover="barHotCover" />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </ProductsWrapper>
    );
};
