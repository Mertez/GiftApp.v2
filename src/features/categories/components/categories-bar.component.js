import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CategoryInfoCard } from "./category-card.component";
import { Text } from "../../../components/typography/text.component";
import { standardcolors } from "../../../infrastructure/theme/colors";

const CategoriesWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  background-color: ${standardcolors.t60};
  border-radius:0;
  shadow:none;
`;

export const CategoriesBar = ({ categories, onNavigate }) => {
    if (categories === null) {
        return null;
    }
    if (!categories.length) {
        return null;
    }
    return (
        <CategoriesWrapper elevation={5}>
            <Spacer variant="left.large">
                <Text variant="caption">Categories</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                {categories.map((category, index) => {
                    const key = category.name + "_" + index;
                    return (
                        <Spacer key={"Spacer" + key} position="left" size="md">
                            <TouchableOpacity key={"TouchableOpacity" + key}
                                onPress={() =>
                                    onNavigate("categoryProductStack", { categoryId: category.id, categoryName: category.name })
                                }
                            >
                                <CategoryInfoCard key={"CategoryInfoCard" + key} category={category} variant="bar" variantCover="barCover" />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </CategoriesWrapper>
    );
};
