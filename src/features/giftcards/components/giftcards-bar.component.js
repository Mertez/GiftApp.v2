import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { GiftCardInfoCard } from "./giftcard-card.component";
import { Text } from "../../../components/typography/text.component";
import { GiftCardsWrapper } from "./giftcard-card.styles";
import { GetNWords } from "../../../utils/env";

export const GiftCardsBar = ({ giftcards, onNavigate }) => {
    if (!giftcards.length) {
        return null;
    }
    return (
        <>

            <GiftCardsWrapper elevation={3}>

                <Spacer variant="left.large">
                    <Text variant="caption">Gift Cards</Text>
                </Spacer>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                    {giftcards.map((giftcard, index) => {
                        const key = giftcard.name + "_" + index;
                        return (
                            <Spacer key={"Spacer" + key} position="left" size="md">
                                <TouchableOpacity key={"TouchableOpacity" + key}
                                    onPress={() =>
                                        onNavigate("productDetailStack", {
                                            product: giftcard, isGiftCard: true
                                        })
                                    }
                                >
                                    <GiftCardInfoCard key={"GiftCardInfoCard" + key} giftcard={giftcard} />
                                </TouchableOpacity>
                            </Spacer>
                        );
                    })}
                </ScrollView>
            </GiftCardsWrapper>
        </>
    );
};
