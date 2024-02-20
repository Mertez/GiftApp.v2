import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { host } from "../../../utils/env";

import {
    BrandCard,
    BrandCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    OfferIcon,
    Icon,
    Address,
} from "./brand-card.styles";

export const BrandCardShow = ({ brand = {}, variant = '', variantCover = '' }) => {
    const {
        id = "",
        name = "",
        logo = "",
    } = brand;

    //console.log(brand);
    return (
        <Spacer position="top" size="sm"><Spacer position="bottom" size="sm">
            <BrandCardCover variant={variantCover} key={`p${id}`} source={{ uri: `${host}/images/brands/${logo}` }} resizeMode={"contain"} />
        </Spacer></Spacer>
    );
};
