import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { BrandHotCardShow } from "./brand-card.component";
import { Text } from "../../../components/typography/text.component";
import { BrandDetailScreen } from "../screens/brand-detail.screen";
import { GiftsNavigator } from "../../../infrastructure/navigation/gifts.navigator";
import { IgnoreWarnings } from "../../../utils/env";
import { standardcolors } from "../../../infrastructure/theme/colors";

const BrandsWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  background-color: ${standardcolors.t60};
  border-radius:0;
  shadow:none;
`;
export const BrandsHotBar = ({ brands, onNavigate }) => {

    IgnoreWarnings();

    if (brands === null)
        return null;
    if (!brands.length) {
        return null;
    }
    return (
        <BrandsWrapper elevation={5}>
            <Spacer variant="left.large">
                <Text variant="caption">Hot Brands of the weeks</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {brands.map((brand) => {
                    const key = brand.id;
                    return (
                        <Spacer key={key} position="left" size="md">
                            <TouchableOpacity
                                onPress={() =>
                                    onNavigate("brandDetailStack", {
                                        brand: brand
                                    })
                                }
                            >
                                <BrandHotCardShow brand={brand} variant="barHot" variantCover="barHotCover" />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </BrandsWrapper>
    );
};
