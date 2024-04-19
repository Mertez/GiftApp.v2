import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";
import { Image, FlatList } from "react-native";
import { colors, standardcolors } from "../../../infrastructure/theme/colors";
import { width } from "../../../utils/env";


export const Center = styled.View`
  justify-content: center;
  align-content: center;
  align-items: center;
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

export const OfferIconList = styled(Image)`
  position: absolute;
  left: 0;
  top: -115px;
  width:45px;
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


export const ProductList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  background-color: ${standardcolors.t60};
  margin-bottom: 100px;
  padding-bottom:100px;
`;

export const SelectButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;



const defaultProductCardStyles = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: 110px;
  height:110px;
  align-self: center;
  text-align:center;
  margin: 10px 10px;
  border-radius: 20px;
`;

const defaultProductHotCardStyles = (theme) => `
  background-color: ${theme.colors.bg.hot};
  padding-top: ${theme.spaces[1]};
  width: 130px;
  height:170px;
  align-self: center;
  text-align:center;
  margin: 10px auto;
  border-radius: 20px;
`;

const defaultProductCardCoverStyles = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:50px;
  height:50px;
  margin: auto;
  overflow: visible;
`;

const defaultProductHotCardCoverStyles = (theme) => `
  
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
  border-radius: 20px;`;
const col3 = (theme) => `  
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: ${(width / 3) - 25}px;
  height:150px;
  align-self: center;
  text-align:center;
  margin: 10px 0px;
  border-radius: 20px;`;
const barHot = (theme) => ``;
const col2Hot = (theme) => ``;
const col3Hot = (theme) => ``;
const listOnlineDeal = (theme) => `width: 100%; height:80px`;
const col2OnlineDeal = (theme) => `width: ${(width / 2) - 30}px;`;
const col3OnlineDeal = (theme) => `width: ${(width / 3) - 45}px;`;
const barCover = (theme) => ``;
const col2Cover = (theme) => `width: 120px; height:120px`;
const col3Cover = (theme) => ``;
const listCoverOnlineDeal = (theme) => `width: 70px;height: 70px; margin-top: -12px;margin-left:8px; border-radius: 10px; overflow: visible; border: 1px solid #ccc; padding:0;`;
const col2CoverOnlineDeal = (theme) => `width: 180px; height:180px;`;
const col3CoverOnlineDeal = (theme) => `width: 20px;`;
const barHotCover = (theme) => ``;
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
  col2OnlineDeal,
  col3OnlineDeal,
  listOnlineDeal,

  barCover,
  col2Cover,
  col3Cover,
  col2CoverOnlineDeal,
  col3CoverOnlineDeal,
  detailCover,
  listCoverOnlineDeal,

  barHotCover,
  col2HotCover,
  col3HotCover,

  defaultProductCardStyles,
  defaultProductHotCardStyles,
  defaultProductCardCoverStyles,
  defaultProductHotCardCoverStyles,
};



export const ProductCard = styled(Card)`
  ${({ theme }) => variants["defaultProductCardStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const ProductCardCover = styled(Image)`
  ${({ theme }) => variants["defaultProductCardCoverStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const ProductHotCard = styled(Card)`
  ${({ theme }) => variants["defaultProductHotCardStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const ProductHotCardCover = styled(Image)`
  ${({ theme }) => variants["defaultProductHotCardCoverStyles"](theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

ProductCard.defaultProps = {
  variant: "bar",
};


ProductCardCover.defaultProps = {
  variant: "barCover",
};


ProductHotCard.defaultProps = {
  variant: "barHot",
};


ProductHotCardCover.defaultProps = {
  variant: "barHotCover",
};