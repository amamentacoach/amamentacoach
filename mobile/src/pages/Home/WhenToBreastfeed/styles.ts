import styled from 'styled-components/native';

import {
  OpenSansBold,
  OpenSansRegular,
  ScrollView as SharedScrollView,
} from 'lib/sharedStyles';

export const ScrollView = styled(SharedScrollView)`
  padding: 0 24px;
`;

export const ContentTitleText = styled(OpenSansRegular)`
  font-size: 18px;
  text-align: center;
  margin-top: 24px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 24px;
`;

export const ContentText = styled(OpenSansRegular)`
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const ColoredText = styled(OpenSansBold)`
  text-align: center;
`;
