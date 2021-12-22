import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

export const DateText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
  margin-bottom: 24px;
`;

export const ListContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;
