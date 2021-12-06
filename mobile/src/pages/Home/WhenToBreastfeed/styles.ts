import styled from 'styled-components/native';

import { ScrollView as SharedScrollView } from 'lib/sharedStyles';

export const ScrollView = styled(SharedScrollView)`
  padding: 0 24px;
`;

export const ContentTitleText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.black};
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

export const ContentText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.grey};
`;

export const ColoredText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.primary};
`;
