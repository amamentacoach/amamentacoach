import styled from 'styled-components/native';

import ImageWrapper from 'components/ImageWrapper';
import { Line as SharedLine, OpenSansRegular } from 'lib/sharedStyles';

interface OptionTextProps {
  color?: string;
  isBold?: boolean;
  disabled?: boolean;
}

export const Container = styled.View`
  align-items: center;
  background-color: ${props => props.theme.white};
  border-radius: 3.6px;
  border: 1px ${props => props.theme.brightGrey} solid;
  justify-content: center;
  margin: auto 50px;
  padding: 15px;
`;

export const Content = styled(OpenSansRegular)`
  text-align: center;
`;

export const MaxWidthImage = styled(ImageWrapper)`
  max-width: 300px;
`;

export const Line = styled(SharedLine)`
  margin: 10px 0;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
`;

export const Option = styled.TouchableOpacity`
  flex: 1;
`;

export const OptionText = styled.Text<OptionTextProps>`
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
