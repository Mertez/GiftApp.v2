import React, { useState, useContext } from "react";
import { Image, View, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import { Text } from "../../../components/typography/text.component";
import styled from 'styled-components';
import { SvgXml } from "react-native-svg";
import { ActivityIndicator, Button } from "react-native-paper";
import { WidthPercent } from "../../../utils/env";
import { standardcolors } from "../../../infrastructure/theme/colors";
import { Row } from "../components/gift-info-card.styles";
import { Spacer } from "../../../components/spacer/spacer.component";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const Btn = styled(Button)`
  //margin:0;
  padding:0;
  margin-left: ${WidthPercent(2)}px;
  margin-right: ${WidthPercent(2)}px;
`

const ViewPanel = styled(View)`
    margin: 20px 20px 140px 20px;
    text-align:center;
    align-items: center;
    align-content: center; 
`

const ImgIcon = styled(Image)`
  width: 100%; height: 100%;
`
const ImgIconContainer = styled.View`
  width: ${WidthPercent(50, 10)}px;
  height: ${WidthPercent(50, 10)}px;
  border-radius: 20px; 
  margin: 20px auto;
  border: 3px solid gray;
  padding: 20px;
  background-color:white;
`
const ImgConfirm = styled(Image)`
  width: 120px;
  height: 38px;
  border-radius: 10px;
  margin: 10px auto;
`

export const GiftAddConfirm = ({ route, navigation }) => {
    // const {
    //     productId = null,
    //     name = "",
    //     icon = "",
    //     price = "",
    //     brand = "",
    //     amzUrl = "",
    // } = gift;

    const gift = route.params.gift;

    gift.name = gift.name.replace("Amazon.com:", "").replace("Amazon.com :", "")
    //console.log(gift);

    return (
        <ScrollView>
            <ViewPanel>
                <ImgIconContainer>
                    <ImgIcon source={{ uri: gift.icon }} resizeMode='contain' /></ImgIconContainer>
                <Text variant='title'>{gift.productId}</Text>
                <Text variant='label'>{gift.name}</Text>
                {/* <Text>{gift.amzUrl}</Text> */}
                {/* <Text>{gift.brand}</Text> */}
                <Spacer position={"top"} size="md"></Spacer>
                <Text variant='label' style={{ color: standardcolors.red }}>{gift.price}</Text>
                <Spacer position={"top"} size="md"></Spacer>
                <Text variant="label" style={{ color: standardcolors.purple }}>Select this product as a gift?</Text>
                <Spacer position={"top"} size="md"></Spacer>
                <Row>
                    <Btn mode="contained" color={"white"}
                        onPress={() => { navigation.goBack(); }} >
                        <Text variant="label" style={{ color: standardcolors.black }}>Cancel</Text>
                    </Btn>
                    <Btn mode="contained" color={null}
                        onPress={() => {
                            navigation.popToTop();

                        }} >
                        <Text variant="label" style={{ color: standardcolors.white }}>Confirm</Text>
                    </Btn>
                </Row>

            </ViewPanel>
        </ScrollView>
    )
}
