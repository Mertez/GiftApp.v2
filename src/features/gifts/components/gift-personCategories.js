import React from "react";
import { TouchableOpacity, Image, View, Text as Txt, Platform, FlatList, StyleSheet } from "react-native";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import WebView from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";
import { CategoriesAmazon } from "../../categories/screens/categories-amz.screen";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Row } from "./gift-info-card.styles";
import { standardcolors } from "../../../infrastructure/theme/colors";


export const PersonGifCat = ({ catItems, navigation }) => {

    const renderItem = ({ item, index }) => (
        //console.log(item)
        <Spacer key={item.itemName + "L" + "_" + index} position="left" size="sm">
            <Spacer key={item.itemName + "R" + "_" + index} position="rightx" size="sm">
                <Spacer key={item.itemName + "T" + "_" + index} position="top" size="sm">
                    <Spacer key={item.itemName + "B" + "_" + index} position="bottomx" size="sm">
                        <TouchableOpacity key={item.itemName + "TO" + "_" + index}
                            style={{ backgroundColor: standardcolors.white, borderColor: 'black', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, borderWidth: 2 }}
                            onPress={() =>
                                //navigation.setParams({"x":1})
                                navigation.navigate("categoryAmazonStackGift", { keyword: item.itemSearch, isagift: true }, navigation)
                            }
                        >
                            <Row key={item.itemName + "ROW" + "_" + index}>
                                {/* <Image source={require('../../../../assets/ams24.png')} style={{ height: 24 }} /> */}
                                <Text style={{ color: 'black' }} key={item.itemName + "TEXT" + "_" + index}>{item.itemName}</Text>
                            </Row>

                            {/* <Image source={require('../../../../assets/Shop-Now-on-Amazon-button.png')} style={{ width: (WidthPercent(60)), height: (WidthPercent(15)), alignSelf: 'center', padding: 0, margin: 0 }} resizeMode={"contain"} /> */}
                        </TouchableOpacity>
                    </Spacer>
                </Spacer>
            </Spacer>
        </Spacer>
    );


    if (catItems === null) {
        return null
    }
    return (
        <FlatList
            scrollEnabled={false}
            data={catItems}
            renderItem={renderItem}
            //keyExtractor={catItem => catItem.id}
            numColumns={2}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 10,
        height: 100, // Specify the height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd', // Just as an example
        borderRadius: 10,
    },
    itemText: {
        // Styling for the item's text
    },
});