import styled from 'styled-components/native';

interface IOptionTextProps {
  color?: string;
  isBold?: boolean;
  disabled?: boolean;
}

export const Container = styled.View`
  margin: auto 50px;
  padding: 15px;
  background-color: ${props => props.theme.white};
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
`;

export const Content = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 300px;
  max-height: 300px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.grey};
  opacity: 0.2;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
`;

export const Option = styled.TouchableOpacity`
  flex: 1;
`;

export const OptionText = styled.Text<IOptionTextProps>`
  font-size: 16px;
  text-align: center;
  color: ${({ theme, color, disabled }) => {
    if (disabled) {
      return theme.brightGrey;
    }
    return color || theme.primary;
  }};
  font-family: ${({ isBold }) =>
    isBold ? 'OpenSans-Bold' : 'OpenSans-Regular'};
`;
