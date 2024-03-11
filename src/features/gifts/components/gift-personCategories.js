import React from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";
import { CategoriesAmazon } from "../../categories/screens/categories-amz.screen";
import { Spacer } from "../../../components/spacer/spacer.component";


export const PersonGifCat = ({ catItems, navigation }) => {

    if (catItems === null) {
        return null
    }
    return (

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {catItems.map((catItem) => {
                //const key = giftcard.name;
                return (
                    <Spacer key={catItem.original} position="left" size="sm">
                        {/* <TouchableOpacity
                            onPress={() =>
                                onNavigate("productDetailStack", {
                                    product: giftcard, isGiftCard: true
                                })
                            }
                        >
                            <GiftCardInfoCard giftcard={giftcard} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={{ backgroundColor: '#63519f', margin: 0, borderColor: 'black', padding: 10, borderRadius: 8, borderWidth: 1 }}
                            onPress={() =>
                                //navigation.setParams({"x":1})
                                navigation.navigate("categoryAmazonStack", { keyword: catItem.modified }, navigation)
                            }
                        >
                            <Text style={{ color: 'white' }}>{catItem.original}</Text>
                            {/* <Image source={require('../../../../assets/Shop-Now-on-Amazon-button.png')} style={{ width: (WidthPercent(60)), height: (WidthPercent(15)), alignSelf: 'center', padding: 0, margin: 0 }} resizeMode={"contain"} /> */}
                        </TouchableOpacity>
                    </Spacer>
                );
            })}
        </ScrollView>

    );
}
