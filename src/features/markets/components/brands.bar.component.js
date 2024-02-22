import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { BrandCardShow } from "./brand-card.component";
import { Text } from "../../../components/typography/text.component";
// import { BrandDetailScreen } from "../screens/brand-detail.screen";
import { GiftsNavigator } from "../../../infrastructure/navigation/gifts.navigator";
import { IgnoreWarnings } from "../../../utils/env";
import { BrandCardCover } from "./brand-card.styles";
import { standardcolors } from "../../../infrastructure/theme/colors";

const BrandsWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  background-color: ${standardcolors.t60};
  border-radius:0;
  shadow:none;
`;
export const BrandBar = ({ brands, onNavigate, onBrandPressed }) => {

    IgnoreWarnings();

    //console.log("From BrandBar", brands);


    if (brands === null)
        return null;
    if (!brands.length) {
        return null;
    }
    return (
        <BrandsWrapper elevation={5}>
            <Spacer variant="left.large">
                <Text variant="caption">Hot Brands of the week</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                <Spacer key="wishappCats" position="left" size="sm">
                    <TouchableOpacity
                        onPress={() => onBrandPressed({ id: "wishappCats" })}
                    >
                        <Spacer position="top" size="sm"><Spacer position="bottom" size="sm">
                            <BrandCardCover variant="barHotCover" key="p0" source={require("../../../../assets/wishappBtn.png")} resizeMode={"contain"} />
                        </Spacer></Spacer>

                    </TouchableOpacity>
                </Spacer>

                <Spacer key="wishappCards" position="left" size="sm">
                    <TouchableOpacity
                        onPress={() => onBrandPressed({ id: "wishappCards" })}
                    >
                        <Spacer position="top" size="sm"><Spacer position="bottom" size="sm">
                            <BrandCardCover variant="barHotCover" key="p0" source={require("../../../../assets/gcs.png")} resizeMode={"contain"} />
                        </Spacer></Spacer>

                    </TouchableOpacity>
                </Spacer>

                {brands.map((brand) => {
                    //console.log(brand);
                    const key = brand.id;
                    return (
                        <Spacer key={key} position="left" size="sm">
                            <TouchableOpacity
                                onPress={() => onBrandPressed(brand)}
                            >
                                <BrandCardShow brand={brand} variant="barHot" variantCover="barHotCover" />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </BrandsWrapper>
    );
};
