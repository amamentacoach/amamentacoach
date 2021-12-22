import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 24px 24px 0 24px;
`;

export const ContentText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  margin: 20px 0 10px 0;
`;
