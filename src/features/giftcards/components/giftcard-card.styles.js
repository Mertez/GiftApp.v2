import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { Image, StyleSheet } from "react-native";
import { standardcolors } from "../../../infrastructure/theme/colors";

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: standardcolors.black,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    //elevation: 5,
    // borderColor: 'black',
    // borderWidth: 3,

  },
})

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const GiftCardCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 150px;
  height:160px;
  align-self: center;
  text-align:center;
  margin: 10px auto;
  
`;

export const GiftCardsWrapper = styled(Card)`
  padding: 5px;
  z-index: 999;
  background-color: ${standardcolors.t60};
  border-radius:0;
  shadow:none;
  padding-bottom:70px;
`;

export const GiftCardCardCover = styled(Image)`
  padding: ${(props) => props.theme.spaces[3]};
  background-color: ${(props) => props.theme.colors.bg.transparent};
  width:90px;
  height:130px;
  padding-bottom:0;
  margin-bottom:10px;
  border-radius: 10px;
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.spaces[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.spaces[2]};
  padding-bottom: ${(props) => props.theme.spaces[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
