import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CategoryInfoCard } from "./category-card.component";
import { Text } from "../../../components/typography/text.component";
import { standardcolors } from "../../../infrastructure/theme/colors";

const CategoriesWrapper = styled(Card)`
    padding: 5px 5px 200px 5px;
    z-index: 999;
    background-color: ${standardcolors.t60};
`;

export const CategoriesCol = ({ categories, onNavigate, navigation, variant = '', variantCover = '' }) => {
    if (categories === null) {
        return null;
    }
    if (!categories.length) {
        return null;
    }
    // if (variant === '') {
    //     variant = "col2";
    //     variantCover = "col2Cover";
    // }
    return (
        <CategoriesWrapper elevation={5}>
            <Spacer variant="left.large">
                <Text variant="caption">Categories...</Text>
            </Spacer>

            <View style={styles.container}>
                {categories.map((category, index) => {
                    const key = category.name + "_" + index;

                    //console.log("categories col component", onNavigate)
                    return (
                        <Spacer key={"Spacer_" + key} position="top" size="sm" style={styles.item}>
                            <TouchableOpacity key={"TouchableOpacity_" + key}
                                onPress={() => {
                                    //navigation.setOptions({ title: 'Gifts 🎁' })
                                    onNavigate("categoryProductStack", { categoryId: category.id, categoryName: category.name })
                                    navigation = { navigation }
                                    onNavigate = { onNavigate }
                                    // console.log(navigation.options)
                                    // console.log(onNavigate)
                                }}
                            >
                                <CategoryInfoCard key={"CategoryInfoCard" + key} category={category}
                                    variant={variant} variantCover={variantCover}
                                //variant="bar" variantCover="barCover"
                                />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}

            </View>

        </CategoriesWrapper>
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
