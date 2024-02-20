import { TextInput, Button as Btn } from "react-native-paper";
import styled from "styled-components/native";

const variants = {
    selected,
    unselected,
    disabled,
};

//can be ${({ props }) => variants[props.variant](props.theme)}
const ButtonX = styled(Btn)`
  ${({ theme }) => defaultButtontyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

export const Button = ({ children }) => {
    <ButtonX>
        <Text></Text>
    </ButtonX>
}

Button.defaultProps = {
    variant: "unselected",
};


const defaultButtontyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
  padding:0;
  margin-left: ${WidthPercent(2)}px;
  margin-right: ${WidthPercent(2)}px;
`;


const selected = (theme) => `
    color: ${theme.colors.button.primary}
`;

const unselected = (theme) => `
    color: ${theme.colors.ui.primary};
`;

const disabled = (theme) => `
    color: ${theme.colors.ui.primary};
`;


