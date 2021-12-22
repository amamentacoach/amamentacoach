import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

export const ContentTitleText = styled(OpenSansRegular)`
  font-size: 18px;
  text-align: center;
  margin: 20px 24px 0 24px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 24px 0 24px;
`;

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
  margin: 30px 0;
`;

export const ColoredText = styled(OpenSansBold)`
  text-align: center;
`;
