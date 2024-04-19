import React from "react";
import { Linking, TouchableOpacity, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProductInfoCard } from "./product-card.component";
import { Text } from "../../../components/typography/text.component";
import { ProductList } from "./product-card.styles";
import { FadeInView } from "../../../components/animations/fade.animation";

export const ProductsList = ({ products, navigation, variant, variantCover }) => {

    //console.log("ProductsCol", products);

    if (products === null)
        return null;
    if (!products.length) {
        return null;
    }
    return (
        <ProductList elevation={5} scrollEnabled={true} nestedScrollEnabled={true}
            data={products}
            renderItem={({ item }) => {
                //console.log("ProductList", products, item);
                return (
                    <TouchableOpacity key={"TouchableOpacity" + item.id}
                        onPress={() => Linking.openURL(item.url)
                        }
                    >
                        <Spacer position="bottom" size="large" key={"Spacer" + item.id}>
                            <FadeInView duration={500} key={"FadeInView" + item.id}>
                                <ProductInfoCard key={"ProductInfoCard" + item.id} product={item} variant={variant} variantCover={variantCover} navigation={navigation} />
                            </FadeInView>
                        </Spacer>
                    </TouchableOpacity>
                );
            }}
            keyExtractor={(item) => item.id}

        />
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
