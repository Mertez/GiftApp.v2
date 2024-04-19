import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";
import { Image, FlatList } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { width } from "../../../utils/env";


export const Center = styled.View`
  justify-content: center,
  align-content: center,
  align-items: center,
`

export const OfferIcon = styled(Image)`
  position: absolute;
  left: 0;
  top: -100px;
  width:50px;
  z-index:99999;
  overflow: visible;
  opacity: 1;
`

export const OfferIconDetail = styled(Image)`
  position: absolute;
  left: 0;
  top: -70px;
  width:100px;
  z-index:99999;
  overflow: visible;
  opacity: 1;
`

export const OfferIconCol2 = styled(Image)`
  position: absolute;
  left: 0;
  top: -110px;
  width:60px;
  z-index:99999;
  overflow: visible;
  opacity: 1;
`


export const Icon = styled.Image`
  width: 15px;
  height: 15px;
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


export const BrandList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const SelectButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;



const defaultBrandCardStyles = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: 110px;
  height:110px;
  align-self: center;
  text-align:center;
  margin: 10px 10px;
  border-radius: 20px;
`;

const defaultBrandHotCardStyles = (theme) => `
  background-color: ${theme.colors.bg.hot};
  padding-top: ${theme.spaces[1]};
  width: 130px;
  height:170px;
  align-self: center;
  text-align:center;
  margin: 10px auto;
  border-radius: 20px;
`;

const defaultBrandCardCoverStyles = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:120px;
  height:120px;
  margin: auto;
  
  border-radius: 20px;
  
`;

const defaultBrandHotCardCoverStyles = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:80px;
  height:80px;
  margin: 0 auto;
  overflow: visible;
`;



const bar = (theme) => ``;
const col2 = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: ${(width / 2) - 30}px;
  height:220px;
  align-self: center;
  text-align:center;
  margin: 10px 0px;
  border-radius: 20px;
  `;
const col3 = (theme) => `width: ${(width / 3) - 25}px;`;
const barHot = (theme) => ``;
const col2Hot = (theme) => ``;
const col3Hot = (theme) => ``;
const barCover = (theme) => ``;
const col2Cover = (theme) => `width: 120px; height:120px`;
const col3Cover = (theme) => ``;
const barHotCover = (theme) => `width:80px; height:80px; border-radius: 15px; background-color: #fffff0`;
const col2HotCover = (theme) => ``;
const col3HotCover = (theme) => ``;
const detailCover = (theme) => `
  width:90%;
  height: 250px;
  margin: 20px auto;
  border-radius: 10px;
  overflow: visible;
`;

const variants = {
  bar,
  col2,
  col3,

  barHot,
  col2Hot,
  col3Hot,

  barCover,
  col2Cover,
  col3Cover,
  detailCover,

  barHotCover,
  col2HotCover,
  col3HotCover,

  defaultBrandCardStyles,
  defaultBrandHotCardStyles,
  defaultBrandCardCoverStyles,
  defaultBrandHotCardCoverStyles,
};



export const BrandCard = styled(Card)`
  ${({ theme }) => variants["defaultBrandCardStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const BrandCardCover = styled(Image)`
  ${({ theme }) => variants["defaultBrandCardCoverStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const BrandHotCard = styled(Card)`
  ${({ theme }) => variants["defaultBrandHotCardStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const BrandHotCardCover = styled(Image)`
  ${({ theme }) => variants["defaultBrandHotCardCoverStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

BrandCard.defaultProps = {
  variant: "bar",
};


BrandCardCover.defaultProps = {
  variant: "barCover",
};


BrandHotCard.defaultProps = {
  variant: "barHot",
};


BrandHotCardCover.defaultProps = {
  variant: "barHotCover",
};