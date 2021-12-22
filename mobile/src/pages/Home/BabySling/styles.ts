import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const Container = styled.View`
  align-items: center;
`;

export const Text = styled(OpenSansRegular)`
  margin-bottom: 30px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin-top: 20px;
`;
