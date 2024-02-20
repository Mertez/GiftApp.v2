import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { host } from "../../../utils/env";

import {
    CategoryCard,
    CategoryCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    Icon,
    Address,
} from "./category-card.styles";

export const CategoryInfoCard = ({ category = {}, variant = '', variantCover = '' }) => {
    const {
        id = "",
        name = "",
        icon = "",
    } = category;

    //console.log(variant);

    return (
        <CategoryCard variant={variant} elevation={2}>
            <View>
                {/* <Favourite restaurant={restaurant} /> */}
                <CategoryCardCover variant={variantCover} key={name} source={{ uri: `${host}/images/categories/${icon}` }} />
            </View>
            <Info>
                <Text variant="caption" style={{ textAlign: 'center', color: 'black' }}>{name}</Text>
            </Info>
        </CategoryCard>
    );
};
