import React, { useEffect, useContext } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Text } from "../typography/text.component";
import LottieView from "lottie-react-native";
import styled from 'styled-components';
import { WidthPercent, HeightPercent } from "../../utils/env";

const Lotti = styled(LottieView)`

  width: ${WidthPercent(30)}px;
  height: 100px;
  flex:1;
  z-index:9999999;
`;

const V = styled.View`
  background-color: transparent;
  margin-top:100px;
  width: 100%;
  height: 100px;
`

const T = styled(Text)`
    text-align:center;
    margin: 20px;

`

export const MainAppFeature = (props) => {

    const { extraDescription } = props.route.params;

    //console.log("props", props.route.params);

    return (
        <>
            <V style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Lotti
                    key="animation"
                    autoPlay
                    loop
                    resizeMode="cover"
                    source={require("../../../assets/anims/mainapp.json")}
                />
            </V>
            <T variant="title">{`This is the MVP version of the main application,\rWe are designing this feature for the main application‼️`}</T>
            <T variant="title" style={{ color: '#000000' }}>{extraDescription}</T>
        </>

    );
}