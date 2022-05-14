import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

interface OptionProps {
  isSelected: boolean;
}

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

export const TextModal = styled(OpenSansRegular)`
  text-align: left;
`;

export const OuterCircle = styled.View<OptionProps>`
  border: 1.4px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.primary : theme.brightGrey};
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const InnerCircle = styled.View<OptionProps>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.primary : 'transparent'};
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

export const ExtraOptionsContainer = styled.View`
  margin-top: 10px;
`;
