import styled from "styled-components/native";
import { SafeAreaView, StatusBar } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { host, height, width, isAndroid } from "../../../utils/env";
import { standardcolors } from "../../../infrastructure/theme/colors";

export const SafeArea = styled(SafeAreaView)`
  ${isAndroid ? "flex: 1" : ""};
  margin-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: ${standardcolors.t60};
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
