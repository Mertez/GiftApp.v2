import React, { useEffect, useContext } from "react";
import { BlurView } from "expo-blur";
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import LottieView from "lottie-react-native";
import styled from 'styled-components';
import { WidthPercent, HeightPercent } from "../../utils/env";

const Lotti = styled(LottieView)`

  width: ${WidthPercent(30)}px;
  height: 100px;
  z-index:9999999;
`;

const V = styled.View`
  background-color: transparent;
  flex:1;
  width: 100%;
  height: 100px;
`
// {
//   (() => {
//     if (condition) {
//       return (<AnimatedLoading isLoading={true} />)

//     } else {
//       return (
//         <></>
//       )
//     }
//   })()
// }

export const AnimatedLoading = ({ isLoading }) => {

  if (isLoading)
    return (
      <V style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Lotti
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/anims/loading.json")}
        />
      </V>
    );

  return (<></>);

}
