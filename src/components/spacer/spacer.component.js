import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  none: 0,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
  margin: "margin"
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = (theme.sizes[sizeIndex]);
  //console.log(value, `${property}:${value}`);
  return `${property}:${value}`;
}

const SpacerView = styled.View`
  ${({ variant }) => variant};  
`; // Prevent Crashing on android

export const Spacer = ({ position, size, children }) => {
  //console.log(position, size, children);
  const theme = useTheme();
  //console.log(theme);
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};


Spacer.defaultProps = {
  position: "top",
  size: "sm",
};