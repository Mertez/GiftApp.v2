import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { Image } from "react-native";
import { width } from "../../../utils/env";

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

const defaultCategoryCardStyles = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: 110px;
  height:110px;
  align-self: center;
  text-align:center;
  margin: 10px auto;
  border-radius: 20px;
`;

const bar = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: 110px;
  height: 110px;
  align-self: center;
  text-align: center;
  margin: 10px auto;
  border-radius: 20px;
`;

const col2 = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]}px;
  width: ${(width / 2) - 25}px;
  height:140px;
  align-self: center;
  text-align: center;
  margin: 10px 10px;
  border-radius: 20px;
  float: left;
`;

const col3 = (theme) => `
  background-color: ${theme.colors.bg.secondary};
  padding-top: ${theme.spaces[3]};
  width: ${(width / 3) - 25}px;
  height: 110px;
  align-self: center;
  text-align: center;
  margin: 10px 10px;
  border-radius: 20px;
`;

const defaultCategoryCardCoverStyles = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:50px;
  height:50px;
  margin: auto;
  overflow:hidden;
  
`;


const barCover = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:50px;
  height:50px;
  margin: auto;
  overflow:hidden;
  
`;

const col2Cover = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:80px;
  height:80px;
  margin: auto;
  overflow:hidden;
  
`;


const col3Cover = (theme) => `
  
  background-color: ${theme.colors.bg.transparent};
  width:50px;
  height:50px;
  margin: auto;
  overflow:hidden;
  
`;

const variants = {
  bar,
  col2,
  col3,

  barCover,
  col2Cover,
  col3Cover
};



export const CategoryCard = styled(Card)`
  ${({ theme }) => defaultCategoryCardStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const CategoryCardCover = styled(Image)`
  ${({ theme }) => defaultCategoryCardCoverStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

CategoryCard.defaultProps = {
  variant: "bar",
};


CategoryCardCover.defaultProps = {
  variant: "barCover",
};