import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansRegular)`
  margin: 0px 24px 30px 24px;
  color: ${props => props.theme.grey};
  text-align: center;
`;
