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
  margin-top: 10px;
`;

export const OtherInputContainer = styled.View`
  margin-top: 10px;
`;
