import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { GiftCardInfoCard } from "./giftcard-card.component";
import { Text } from "../../../components/typography/text.component";
import { GiftCardsWrapper } from "./giftcard-card.styles";

export const GiftCardsBar = ({ giftcards, onNavigate }) => {
    if (!giftcards.length) {
        return null;
    }
    return (
        <GiftCardsWrapper elevation={3}>
            <Spacer variant="left.large">
                <Text variant="caption">Gift Cards</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {giftcards.map((giftcard) => {
                    const key = giftcard.name;
                    return (
                        <Spacer key={key} position="left" size="md">
                            <TouchableOpacity
                                onPress={() =>
                                    onNavigate("productDetailStack", {
                                        product: giftcard, isGiftCard: true
                                    })
                                }
                            >
                                <GiftCardInfoCard giftcard={giftcard} />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </GiftCardsWrapper>
    );
};
