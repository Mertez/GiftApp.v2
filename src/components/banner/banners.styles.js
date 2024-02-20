import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from "react-native";
import Swiper from 'react-native-swiper';
import { ActivityIndicator } from "react-native-paper";
import { host, height, width, isAndroid, bannerHeight } from "../../utils/env";

export const BannerImage = styled.Image`
  width: 100%;
  height: ${bannerHeight}px;
  overflow:hidden;
  background-color: '#000000';
`;

export const SwiperWrapper = styled(Swiper)`
    height:${bannerHeight}px;
    background-color: '#000000';
`;

export const SwiperSlide = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: '#000000';
`;

export const SwiperDot = styled.View`
    
    background-color: rgba(255, 0, 0, 100);
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin: 3px;
    bottom: 0px;
`