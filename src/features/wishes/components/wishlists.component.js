
import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WishListIcons } from './wishlist-iconset.component';
import { WidthPercent, HeightPercent } from '../../../utils/env';
import { standardcolors } from '../../../infrastructure/theme/colors';
import styled from "styled-components/native";
import { Spacer } from '../../../components/spacer/spacer.component';
import { CompactWishListInfo } from './compact-wishlist-info.component';

export const WishLists = ({ wishLists, onIconPress }) => {

    // const [selectedId, setSelectedId] = useState();
    // const [isTouched, setIsTouched] = useState(false);

    const renderItem = ({ item, index }) => {

        // const backgroundColor = index === selectedId ? 'transparent' : 'transparent'; // '#5e57bfAA' : 'transparent';
        // const opacity = (index === selectedId || !isTouched) ? 1 : 0.3;
        // const imageSource = WishListIcons[item]; // Use the mapping to get the image source
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
                    <CompactWishListInfo itemsInRow={2} wishlist={item}></CompactWishListInfo>

                </TouchableOpacity>
            </Spacer>
        );
    };

    return (
        <FlatList style={{ width: WidthPercent(96), backgroundColor: 'transparent' }}
            data={wishLists}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            //extraData={selectedId}
            numColumns={3}
        />
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        alignItems: 'center', // Center icon horizontally
        justifyContent: 'center', // Center icon vertically
    },
});