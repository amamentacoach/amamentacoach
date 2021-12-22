import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 0px 24px;
`;

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const Footer = styled.View`
  flex-direction: column;
  margin: 0 24px;
  margin-bottom: 30px;
`;

export const CurrentPageWrapper = styled.View`
  margin: 30px 0;
`;

export const FooterButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 50px;
`;

export const ContinueButton = styled.TouchableOpacity`
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const TextContinueButton = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  font-size: 18px;
`;
