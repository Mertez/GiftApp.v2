import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { Image } from "react-native";
import LottieView from "lottie-react-native";
import { HeightPercent } from "../../../utils/env";

export const LogoImg = styled(Image)`
  
  background-color: ${(props) => props.theme.colors.bg.transparent};
  width:80px;
  height:70px;
  margin: 0px auto 20px;
  overflow:hidden;
  
`;

export const Lottie = styled(LottieView)`
    width: 50%;
    margin: auto auto 20px;
`

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/login_bg.webp"),
})`
  align-items: center;
  justify-content: center;
  height: 100%; 
  width: 100%;
`;


export const AppBackground = styled.ImageBackground.attrs({
  // source: require("../../../../assets/login_bg.webp"),
  //source: require("../../../../assets/settings.jpg"),
})`
  align-items: center;
  justify-content: center;
  background-color:white;
  position: absolute;
  top:-100px;
  height: ${HeightPercent(100, 200)}px; 
  width:100%;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  padding: ${(props) => props.theme.spaces[4]};
  margin-top: ${(props) => props.theme.spaces[2]};
  border-radius: ${(props) => props.theme.spaces[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.muted,
})`
  
  padding: ${(props) => props.theme.spaces[2]};
  margin: ${(props) => props.theme.spaces[1]};
`;


export const ShutterButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  position: absolute;
  bottom:100px;
  left: 0px;
  width: 100%;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.spaces[2]};
  margin-bottom: ${(props) => props.theme.spaces[2]};
`;

export const AnimationWrapper = styled.View`
  width: 300px;
  height: 220px;
  position: absolute;
  bottom: 0px;
  
  padding: ${(props) => props.theme.spaces[2]};
`;