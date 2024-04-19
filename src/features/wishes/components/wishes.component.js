import React from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform, FlatList } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { WishListIcons } from "./wishlist-iconset.component";
import { CompactWishInfo } from "./compact-wish-info.component";
import { WidthPercent } from "../../../utils/env";
import { Spacer } from "../../../components/spacer/spacer.component";


export const WishItems = ({ wishItems, onIconPress }) => {
    const renderItem = ({ item, index }) => {

        const key = item.id;
        //console.log(item);
        return (
            <Spacer key={key} position="left" size="md">
                <TouchableOpacity onPress={() => { onIconPress(item) }}
                // onPress={() =>
                //     onNavigate("productDetailStack", {
                //         product: product, isGiftCard: false
                //     })
                // }
                >
                    <CompactWishInfo wish={item} />

                </TouchableOpacity>
            </Spacer>
        );
    };

    return (
        <FlatList style={{ width: WidthPercent(96), backgroundColor: 'transparent' }}
            data={wishItems}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            //extraData={selectedId}
            numColumns={2}
        />
    );
}