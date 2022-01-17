import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

interface OptionProps {
  color?: string;
  selected?: boolean;
  direction?: 'row' | 'column';
}

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled(OpenSansRegular)`
  font-size: 14px;
`;

export const OptionsContainer = styled.View<OptionProps>`
  flex: 1;
  flex-direction: ${({ direction }) => direction};
`;

const OptionButton = styled.TouchableOpacity<OptionProps>`
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
`;

// Regras que são aplicadas caso a opção deve ser apresentada horizontalmente.
export const HorizontalOptionButton = styled(OptionButton)`
  padding: 12px 0;
`;

// Regras que são aplicadas caso a opção deve ser apresentada verticalmente.
export const VerticalOptionButton = styled(OptionButton)`
  flex: 1;
  justify-content: center;
  min-height: 50px;
  margin: 0 6px;
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
  margin-left: 6px;
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
  color: ${({ theme, color, direction, selected }) => {
    if (!selected || direction === 'column') {
      return theme.grey;
    }
    return color || theme.primary;
  }};
  font-family: 'OpenSans-Regular';
  margin: 0 15px;
  font-size: 16px;
  flex: ${({ direction }) => (direction === 'column' ? 1 : 'none')};
  flex-wrap: wrap;
`;

export const OtherInputContainer = styled.View`
  margin-top: 10px;
`;
