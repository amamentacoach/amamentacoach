import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansRegular)`
  margin-bottom: 12px;
  color: ${props => props.theme.grey};
  text-align: center;
`;
