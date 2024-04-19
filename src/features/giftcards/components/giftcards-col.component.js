import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { GiftCardInfoCard } from "./giftcard-card.component";
import { Text } from "../../../components/typography/text.component";
import { GiftCardsWrapper } from "./giftcard-card.styles";
import { GetNWords } from "../../../utils/env";

export const GiftCardsCol = ({ giftcards, onNavigate }) => {
    if (!giftcards.length) {
        return null;
    }
    return (
        <GiftCardsWrapper elevation={3} style={{ height: 600 }}>
            <Spacer position="margin" size="md">
                <Text variant="caption">Gift Cards</Text>
            </Spacer>

            <ScrollView showsHorizontalScrollIndicator={true} nestedScrollEnabled={true} scrollEnabled={true}>
                <View style={styles.container}>
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
                </View>
            </ScrollView>
        </GiftCardsWrapper>
    );
};


const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        flex: 1,
        // overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '133%' // is 50% of container width
    }
})
