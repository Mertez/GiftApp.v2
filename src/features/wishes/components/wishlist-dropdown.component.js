import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { WishesContext } from '../../../services/wishes/wishes.context';
import styled from 'styled-components';
import { standardcolors } from '../../../infrastructure/theme/colors';
import { CustomPicker } from '../../../components/picker/itemPicker.component';

const WishListDropDown = () => {
    const [selectedValue, setSelectedValue] = useState('1');

    const Border = styled(View)`
        padding:0;
        margin-left: auto;
        margin-right: auto;
        border:1px solid gray;
        height:50px;
    `

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

    useEffect(() => {
        console.log("selectedValue:", selectedValue);
    }, [selectedValue]);

    const [refreshing, setRefreshing] = React.useState(false);

    return (
        <Border>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomPicker
                    data={myWishLists}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                />
            </View>
            {/* <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={{ height: 160, width: 150, borderColor: standardcolors.red100, borderWidth: 14, }}
            >
                {myWishLists && myWishLists.map((wishList, index) => (
                    <Picker.Item key={index} label={wishList.name} value={wishList.id} />
                ))}
            </Picker> */}
        </Border>
    );
};

export default WishListDropDown;