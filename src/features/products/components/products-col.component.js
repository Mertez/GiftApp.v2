import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductInfoCard } from "./product-card.component";
import { Text } from "../../../components/typography/text.component";

const ProductsWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  flex:1;
  //background-color:yellow;
  overflow: hidden;
`;

export const ProductsCol = ({ products, navigation, variant, variantCover }) => {

    //console.log("ProductsCol", products);

    if (products === null)
        return null;
    if (!products.length) {
        return null;
    }
    return (
        <ProductsWrapper elevation={5}>
            <View style={styles.container}>
                {products.map((product) => {
                    const key = product.id;
                    return (
                        <Spacer key={key} position="left" size="md" style={styles.item}>
                            <TouchableOpacity
                                onPress={() =>

                                    navigation.navigate("productDetailStack", {
                                        product: product, isGiftCard: false
                                    })
                                }
                            >
                                <ProductInfoCard product={product} variant={variant} variantCover={variantCover} navigation={navigation} />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </View>
        </ProductsWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    }
})
