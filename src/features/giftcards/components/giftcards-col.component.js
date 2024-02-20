import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { GiftCardInfoCard } from "./giftcard-card.component";
import { Text } from "../../../components/typography/text.component";
import { GiftCardsWrapper } from "./giftcard-card.styles";

export const GiftCardsCol = ({ giftcards, onNavigate }) => {
    if (!giftcards.length) {
        return null;
    }
    return (
        <GiftCardsWrapper elevation={3}>
            <Spacer variant="left.large">
                <Text variant="caption">Gift Cards</Text>
            </Spacer>

            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
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
                </View>
            </ScrollView>
        </GiftCardsWrapper>
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
        width: '133%' // is 50% of container width
    }
})
