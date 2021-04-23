import styled from 'styled-components/native';

interface OptionProps {
  color?: string;
  selected?: boolean;
  horizontal?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.black};
  font-size: 14px;
`;

export const OptionsContainer = styled.View<OptionProps>`
  flex: 1;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
`;

// Regras que são aplicadas caso a opção deve ser apresentada horizontalmente.
const horizontalRadioButtonStyle = `
  flex: 1;
  justify-content: center;
  min-height: 50px;
  margin-left: 5px;
`;

// Regras que são aplicadas caso a opção deve ser apresentada verticalmente.
const verticalRadioButtonStyle = `
  padding: 12px;
`;

export const OptionButton = styled.TouchableOpacity<OptionProps>`
  border: 1.4px solid
    ${({ theme, color, selected }) => {
      if (!selected) {
        return theme.brightGrey;
      }
      return color || theme.primary;
    }};

  flex-direction: row;
  border-radius: 3.6px;
  align-items: center;
  margin-top: 5px;
  // Caso a opção horizontal tenha sido passada ao componente as regras definidas em
  // horizontalRadioButtonStyle são aplicadas, caso contrário as regras de verticalRadioButtonStyle
  // são aplicadas.
  ${({ horizontal }) =>
    horizontal ? horizontalRadioButtonStyle : verticalRadioButtonStyle}
`;

export const OuterCircle = styled.View<OptionProps>`
  border: 1.4px solid
    ${({ theme, color, selected }) => {
      if (!selected) {
        return theme.brightGrey;
      }
      return color || theme.primary;
    }};

  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.View<OptionProps>`
  background-color: ${({ theme, color, selected }) => {
    if (!selected) {
      return 'transparent';
    }
    return color || theme.primary;
  }};

  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

export const TextOption = styled.Text<OptionProps>`
  color: ${({ theme, color, horizontal, selected }) => {
    if (!selected || !horizontal) {
      return theme.grey;
    }
    return color || theme.primary;
  }};

  font-family: 'OpenSans-Regular';
  margin-left: 15px;
  margin-right: 15px;
  font-size: 16px;
`;

export const OtherInputContainer = styled.View`
  margin-top: 10px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
  margin-top: 5px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.error};
  font-size: 14px;
`;
