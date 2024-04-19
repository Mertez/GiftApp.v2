import React, { useState, useEffect, useContext } from 'react';
import { WishesContext } from '../../../services/wishes/wishes.context';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WishListIcons } from './wishlist-iconset.component';
import { WidthPercent, HeightPercent } from '../../../utils/env';
import { standardcolors } from '../../../infrastructure/theme/colors';
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from '../../../components/spacer/spacer.component';

import { CompactWishListSelector } from './compact-wishlist-info.selector.component';


const WishlistSelector = ({ onIconPress }) => {


    // const Img = styled(Image)`
    //     width: ${WidthPercent(14)}px;
    //     height: ${WidthPercent(14)}px;
    //     padding: ${WidthPercent(2)}px;
    //     margin: ${WidthPercent(2)}px;
    //     border-radius: ${WidthPercent(2)}px;
    // `

    const {
        isLoading,
        error,
        onGetMyWishLists,
        myWishLists,
    } = useContext(WishesContext);

    useEffect(() => {
        //onGetDealBrands();
        onGetMyWishLists(true);
        //console.log("myWishLists:", myWishLists);
    }, []);

    // useEffect(() => {
    //     //onGetDealBrands();
    //     //onGetMyWishLists(true);
    //     console.log("myWishLists:", myWishLists);
    // }, [myWishLists]);

    // useEffect(() => {
    //     console.log("selectedValue:", selectedValue);
    // }, [selectedValue]);

    const [selectedId, setSelectedId] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState('1');

    //console.log(myWishLists);

    const renderItem = ({ item, index }) => {

        const backgroundColor = index === selectedId ? standardcolors.white : 'transparent'; // '#5e57bfAA' : 'transparent';
        const opacity = (index === selectedId || !isTouched) ? 1 : 0.3;
        const imageSource = WishListIcons[item]; // Use the mapping to get the image source

        return (
            <TouchableOpacity onPress={() => { setSelectedId(index); onIconPress(item); setIsTouched(true); }}>
                {/* <Img
                    source={imageSource}
                    style={[{ backgroundColor, opacity }]}
                /> */}
                {/* <Img source={WishListIcons[item.icon]} resizeMode="cover" preserveAspectRatio="xMidYMid slice" />
                <Spacer variant="left.large">
                    <Text variant="title" style={{ color: 'gray' }}>{item.name}</Text>
                </Spacer> */}
                <CompactWishListSelector itemsInRow={4.5} wishlist={item} style={{ backgroundColor: backgroundColor }} ></CompactWishListSelector>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList style={{ backgroundColor: 'transparent', paddingTop: 15 }}
            data={myWishLists}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            extraData={selectedId}
            numColumns={4}
            scrollEnabled={false}
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

export default WishlistSelector;
