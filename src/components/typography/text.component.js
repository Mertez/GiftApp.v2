import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
    font-weight: ${theme.fontWeights.bold};
`;

const warning = (theme) => `
    color: ${theme.colors.text.warning};
    background-color: ${theme.standardcolors.darkestgray};
    font-family: ${theme.fonts.monospace};
    padding: 3px 5px;
    overflow: visible;
    border-radius: 3px;
`;

const success = (theme) => `
    color: ${theme.colors.text.success};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const button = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.button};
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.button.primary}
`;
const title = (theme) => `
    color: ${theme.colors.ui.primary};
    marginBottom: ${theme.spaces[2]};
    font-family: ${theme.fonts.monospace};
    font-Size: ${theme.fontSizes.title};
`;

const variants = {
    title,
    body,
    label,
    caption,
    error,
    warning,
    success,
    hint,
    button,
};

//can be ${({ props }) => variants[props.variant](props.theme)}
export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)} 
`;

Text.defaultProps = {
    variant: "body",
};