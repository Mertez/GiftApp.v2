import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform, FlatList } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { WishListIcons } from "./wishlist-iconset.component";
import { CompactWishInfo } from "./compact-wish-info.component";
import { WidthPercent } from "../../../utils/env";
import { Spacer } from "../../../components/spacer/spacer.component";
import Toast from 'react-native-toast-message';


export const WishItems = ({ wishItems, onIconPress }) => {

    const [currenItems, setCurrentItems] = useState(wishItems);

    const deleteItem = (id) => {
        setCurrentItems(currenItems.filter(item => item.id !== id));
        showToast();
    };

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Product Deleted',
            text2: 'The product has been deleted successfully.',
        });
    };

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
                    <CompactWishInfo wish={item} onWishRemoved={deleteItem} />

                </TouchableOpacity>
            </Spacer>
        );
    };

    return (
        <FlatList style={{ width: WidthPercent(96), backgroundColor: 'transparent' }}
            data={currenItems}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            //extraData={selectedId}
            numColumns={2}
        />
    );
}