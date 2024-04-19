import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WishListIcons } from './wishlist-iconset.component';
import { WidthPercent, HeightPercent } from '../../../utils/env';
import { standardcolors } from '../../../infrastructure/theme/colors';
import styled from "styled-components/native";

const Img = styled(Image)`
    width: ${WidthPercent(14)}px;
    height: ${WidthPercent(14)}px;
    padding: ${WidthPercent(2)}px;
    margin: ${WidthPercent(2)}px;
    border-radius: ${WidthPercent(2)}px;
`

const ImageSelector = ({ wishListIconNames, onIconPress }) => {

    const [selectedId, setSelectedId] = useState();
    const [isTouched, setIsTouched] = useState(false);

    const renderItem = ({ item, index }) => {

        const backgroundColor = index === selectedId ? 'transparent' : 'transparent'; // '#5e57bfAA' : 'transparent';
        const opacity = (index === selectedId || !isTouched) ? 1 : 0.3;
        const imageSource = WishListIcons[item]; // Use the mapping to get the image source

        return (
            <TouchableOpacity style={styles.iconContainer} onPress={() => { setSelectedId(index); onIconPress(item); setIsTouched(true); }}>
                <Img
                    source={imageSource}
                    style={[{ backgroundColor, opacity }]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList style={{ width: WidthPercent(60), backgroundColor: 'transparent' }}
            data={wishListIconNames}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            extraData={selectedId}
            numColumns={4}
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

export default ImageSelector;
