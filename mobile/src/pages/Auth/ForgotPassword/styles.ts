import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const HeaderText = styled(OpenSansRegular)`
  font-size: 14px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 0;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  margin-bottom: 15px;
  justify-content: flex-end;
`;
